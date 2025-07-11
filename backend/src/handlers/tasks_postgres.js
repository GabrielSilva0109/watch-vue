const db = require('../config/database');
const { response } = require('../utils/response');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Função para extrair usuário do token
const getUserFromToken = (event) => {
  const token = event.headers.Authorization || event.headers.authorization;
  if (!token) {
    throw new Error('Token não fornecido');
  }
  
  const tokenWithoutBearer = token.replace('Bearer ', '');
  const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);
  return decoded.userId;
};

module.exports.getTasks = async (event) => {
  try {
    const userId = getUserFromToken(event);

    const tasks = await db('tasks')
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .select('*');

    return response(200, {
      success: true,
      tasks
    });
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return response(500, { error: 'Erro interno do servidor' });
  }
};

module.exports.createTask = async (event) => {
  try {
    const userId = getUserFromToken(event);
    const { title, description, status, priority, due_date } = JSON.parse(event.body);

    // Validação básica
    if (!title) {
      return response(400, { error: 'Título é obrigatório' });
    }

    // Criar tarefa
    const [task] = await db('tasks')
      .insert({
        user_id: userId,
        title,
        description: description || null,
        status: status || 'not-started',
        priority: priority || 1,
        due_date: due_date || null
      })
      .returning(['*']);

    return response(200, {
      success: true,
      message: 'Tarefa criada com sucesso',
      task
    });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    return response(500, { error: 'Erro interno do servidor' });
  }
};

module.exports.updateTask = async (event) => {
  try {
    const userId = getUserFromToken(event);
    const taskId = event.pathParameters.id;
    const { title, description, status, priority, due_date } = JSON.parse(event.body);

    // Verificar se a tarefa existe e pertence ao usuário
    const existingTask = await db('tasks')
      .where('id', taskId)
      .where('user_id', userId)
      .first();

    if (!existingTask) {
      return response(404, { error: 'Tarefa não encontrada' });
    }

    // Atualizar tarefa
    const [updatedTask] = await db('tasks')
      .where('id', taskId)
      .where('user_id', userId)
      .update({
        title: title || existingTask.title,
        description: description !== undefined ? description : existingTask.description,
        status: status || existingTask.status,
        priority: priority !== undefined ? priority : existingTask.priority,
        due_date: due_date !== undefined ? due_date : existingTask.due_date,
        updated_at: new Date()
      })
      .returning(['*']);

    return response(200, {
      success: true,
      message: 'Tarefa atualizada com sucesso',
      task: updatedTask
    });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return response(500, { error: 'Erro interno do servidor' });
  }
};

module.exports.deleteTask = async (event) => {
  try {
    const userId = getUserFromToken(event);
    const taskId = event.pathParameters.id;

    // Verificar se a tarefa existe e pertence ao usuário
    const existingTask = await db('tasks')
      .where('id', taskId)
      .where('user_id', userId)
      .first();

    if (!existingTask) {
      return response(404, { error: 'Tarefa não encontrada' });
    }

    // Deletar tarefa
    await db('tasks')
      .where('id', taskId)
      .where('user_id', userId)
      .del();

    return response(200, {
      success: true,
      message: 'Tarefa deletada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    return response(500, { error: 'Erro interno do servidor' });
  }
};
