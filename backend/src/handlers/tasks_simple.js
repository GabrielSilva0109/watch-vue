const db = require('../config/database');
const { response } = require('../utils/response');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Função para extrair usuário do token JWT
const getUserFromToken = async (event) => {
  try {
    const token = event.headers.Authorization || event.headers.authorization;
    
    if (!token) {
      throw new Error('Token não fornecido');
    }

    const tokenWithoutBearer = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);
    
    // Verificar se o usuário ainda existe
    const user = await db('users').where('id', decoded.userId).first();
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  } catch (error) {
    throw new Error('Token inválido: ' + error.message);
  }
};

// Para teste, vamos usar um usuário fixo
const TEST_USER_ID = 'test-user-id';

// Função para obter usuário de teste
const getTestUser = async () => {
  let user = await db('users').where('email', 'teste@exemplo.com').first();
  if (!user) {
    // Criar usuário de teste se não existir
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    [user] = await db('users').insert({
      email: 'teste@exemplo.com',
      password: hashedPassword,
      name: 'Usuário de Teste'
    }).returning('*');
  }
  return user;
};

module.exports.getTasks = async (event) => {
  try {
    console.log('🔍 Buscando tarefas...');
    
    // Obter usuário do token JWT
    const user = await getUserFromToken(event);
    console.log('👤 Usuário autenticado:', user.email);
    
    const tasks = await db('tasks')
      .where('user_id', user.id)
      .orderBy('created_at', 'desc')
      .select('*');

    // Buscar informações de dependências
    const tasksWithDependencies = await Promise.all(
      tasks.map(async (task) => {
        if (task.depends_on_task_id) {
          const dependentTask = await db('tasks')
            .where('id', task.depends_on_task_id)
            .first();
          
          if (dependentTask) {
            const dependentUser = await db('users')
              .where('id', dependentTask.user_id)
              .first();
            
            task.dependency_info = {
              task_title: dependentTask.title,
              user_name: dependentUser?.name || 'Usuário desconhecido',
              status: dependentTask.status,
              completed: dependentTask.status === 'completed'
            };
          }
        }
        return task;
      })
    );

    console.log('✅ Tarefas encontradas para o usuário:', tasks.length);
    
    return response(200, {
      success: true,
      tasks: tasksWithDependencies
    });
  } catch (error) {
    console.error('❌ Erro ao buscar tarefas:', error);
    return response(500, { error: 'Erro interno do servidor: ' + error.message });
  }
};

module.exports.createTask = async (event) => {
  try {
    console.log('➕ Criando nova tarefa...');
    
    // Obter usuário do token JWT
    const user = await getUserFromToken(event);
    console.log('👤 Usuário autenticado:', user.email);
    
    const { 
      title, 
      description, 
      status, 
      category,
      depends_on_user_email,
      dependency_title
    } = JSON.parse(event.body);

    // Validação básica
    if (!title) {
      return response(400, { error: 'Título é obrigatório' });
    }

    let dependsOnUserId = null;
    let dependsOnTaskId = null;
    let dependencyTaskCreated = false;

    // Se tem dependência, processar
    if (depends_on_user_email && dependency_title) {
      // Buscar usuário dependente
      const dependentUser = await db('users')
        .where('email', depends_on_user_email)
        .first();

      if (!dependentUser) {
        return response(400, { error: 'Usuário dependente não encontrado' });
      }

      // Criar tarefa para o usuário dependente
      const [dependentTask] = await db('tasks')
        .insert({
          title: dependency_title,
          description: `Tarefa criada como dependência para: ${title}`,
          status: 'not-started',
          user_id: dependentUser.id,
          category: category || 'geral'
        })
        .returning('*');

      dependsOnUserId = dependentUser.id;
      dependsOnTaskId = dependentTask.id;
      dependencyTaskCreated = true;
    }

    // Criar tarefa principal
    const [task] = await db('tasks')
      .insert({
        title,
        description: description || '',
        status: status || 'not-started',
        user_id: user.id,
        category: category || 'geral',
        depends_on_task_id: dependsOnTaskId,
        depends_on_user_id: dependsOnUserId,
        dependency_title: dependency_title || null,
        is_blocked: dependsOnTaskId ? true : false
      })
      .returning('*');

    console.log('✅ Tarefa criada para o usuário:', user.email, task);
    
    const result = {
      success: true,
      task,
      dependency_created: dependencyTaskCreated
    };

    if (dependencyTaskCreated) {
      result.message = `Tarefa criada! Uma tarefa de dependência foi criada para ${depends_on_user_email}`;
    }
    
    return response(201, result);
  } catch (error) {
    console.error('❌ Erro ao criar tarefa:', error);
    return response(500, { error: 'Erro interno do servidor: ' + error.message });
  }
};

module.exports.updateTask = async (event) => {
  try {
    console.log('✏️ Atualizando tarefa...');
    
    const taskId = event.pathParameters.id;
    const updates = JSON.parse(event.body);
    
    // Obter usuário do token JWT
    const user = await getUserFromToken(event);
    console.log('👤 Usuário autenticado:', user.email);

    // Buscar tarefa atual
    const currentTask = await db('tasks')
      .where('id', taskId)
      .where('user_id', user.id)
      .first();

    if (!currentTask) {
      return response(404, { error: 'Tarefa não encontrada' });
    }

    // Se a tarefa está sendo marcada como concluída, verificar dependências
    if (updates.status === 'completed') {
      // Buscar tarefas que dependem desta
      const dependentTasks = await db('tasks')
        .where('depends_on_task_id', taskId)
        .select('*');

      if (dependentTasks.length > 0) {
        // Desbloquear tarefas dependentes
        await db('tasks')
          .where('depends_on_task_id', taskId)
          .update({ is_blocked: false });
        
        console.log(`🔓 Desbloqueadas ${dependentTasks.length} tarefas dependentes`);
      }
    }

    // Atualizar tarefa
    const [task] = await db('tasks')
      .where('id', taskId)
      .where('user_id', user.id)
      .update(updates)
      .returning('*');

    console.log('✅ Tarefa atualizada para o usuário:', user.email, task);
    
    return response(200, {
      success: true,
      task
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar tarefa:', error);
    return response(500, { error: 'Erro interno do servidor: ' + error.message });
  }
};

module.exports.deleteTask = async (event) => {
  try {
    console.log('🗑️ Deletando tarefa...');
    
    const taskId = event.pathParameters.id;
    
    // Obter usuário do token JWT
    const user = await getUserFromToken(event);
    console.log('👤 Usuário autenticado:', user.email);

    // Deletar tarefa
    const deletedCount = await db('tasks')
      .where('id', taskId)
      .where('user_id', user.id)
      .del();

    if (deletedCount === 0) {
      return response(404, { error: 'Tarefa não encontrada' });
    }

    console.log('✅ Tarefa deletada para o usuário:', user.email);
    
    return response(200, {
      success: true,
      message: 'Tarefa deletada com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro ao deletar tarefa:', error);
    return response(500, { error: 'Erro interno do servidor: ' + error.message });
  }
};

// Listar todas as tarefas de todos os usuários (para admin)
module.exports.getAllTasks = async (event) => {
  try {
    console.log('🔍 Buscando todas as tarefas de todos os usuários...');
    
    // Buscar todas as tarefas com informações do usuário
    const tasks = await db('tasks')
      .leftJoin('users', 'tasks.user_id', 'users.id')
      .select(
        'tasks.id',
        'tasks.title',
        'tasks.description',
        'tasks.status',
        'tasks.category',
        'tasks.depends_on_task_id',
        'tasks.depends_on_user_id',
        'tasks.dependency_title',
        'tasks.is_blocked',
        'tasks.user_id',
        'tasks.created_at',
        'tasks.updated_at',
        'users.name as user_name',
        'users.email as user_email'
      )
      .orderBy('tasks.created_at', 'desc');

    console.log('✅ Todas as tarefas encontradas:', tasks.length);

    return response(200, {
      success: true,
      tasks: tasks,
      count: tasks.length
    });

  } catch (error) {
    console.error('❌ Erro ao listar todas as tarefas:', error);
    return response(500, { error: 'Erro interno do servidor: ' + error.message });
  }
};

// Listar categorias disponíveis
module.exports.getCategories = async (event) => {
  try {
    console.log('🏷️ Buscando categorias...');
    
    const categories = await db('tasks')
      .distinct('category')
      .whereNotNull('category')
      .orderBy('category');

    const categoryList = categories.map(c => c.category);
    
    // Adicionar categorias padrão se não existirem
    const defaultCategories = ['geral', 'trabalho', 'pessoal', 'estudos', 'saúde', 'urgente'];
    const allCategories = [...new Set([...categoryList, ...defaultCategories])];

    console.log('✅ Categorias encontradas:', allCategories);

    return response(200, {
      success: true,
      categories: allCategories
    });

  } catch (error) {
    console.error('❌ Erro ao listar categorias:', error);
    return response(500, { error: 'Erro interno do servidor: ' + error.message });
  }
};

// Buscar tarefas por categoria
module.exports.getTasksByCategory = async (event) => {
  try {
    console.log('🔍 Buscando tarefas por categoria...');
    
    const user = await getUserFromToken(event);
    const category = event.pathParameters.category;
    
    const tasks = await db('tasks')
      .where('user_id', user.id)
      .where('category', category)
      .orderBy('created_at', 'desc')
      .select('*');

    console.log(`✅ Tarefas da categoria "${category}" encontradas:`, tasks.length);
    
    return response(200, {
      success: true,
      tasks,
      category
    });
  } catch (error) {
    console.error('❌ Erro ao buscar tarefas por categoria:', error);
    return response(500, { error: 'Erro interno do servidor: ' + error.message });
  }
};
