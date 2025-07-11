const db = require('../config/database');
const { response } = require('../utils/response');

// Listar todos os usuários
module.exports.getUsers = async (event) => {
  try {
    // Buscar todos os usuários
    const users = await db('users')
      .select('id', 'name', 'email', 'created_at')
      .orderBy('created_at', 'desc');

    // Buscar todas as tasks dos usuários
    const tasks = await db('tasks')
      .select('id', 'title', 'status', 'user_id', 'created_at');

    // Mapear tasks para cada usuário
    const usersWithTasks = users.map(user => ({
      ...user,
      tasks: tasks.filter(task => task.user_id === user.id)
    }));

    return response(200, {
      success: true,
      users: usersWithTasks,
      count: usersWithTasks.length
    });

  } catch (error) {
    console.error('❌ Erro ao listar usuários:', error);
    return response(500, { error: 'Erro interno do servidor: ' + error.message });
  }
};

// Obter estatísticas de um usuário específico
module.exports.getUserStats = async (event) => {
  try {
    const userId = event.pathParameters?.id;
    
    if (!userId) {
      return response(400, { error: 'ID do usuário é obrigatório' });
    }

    // Buscar usuário
    const user = await db('users')
      .select('id', 'name', 'email')
      .where('id', userId)
      .first();
    
    if (!user) {
      return response(404, { error: 'Usuário não encontrado' });
    }

    // Buscar estatísticas das tarefas do usuário
    const taskStats = await db('tasks')
      .select('status')
      .count('* as count')
      .where('user_id', userId)
      .groupBy('status');

    const stats = {
      'not-started': 0,
      'in-progress': 0,
      'pending': 0,
      'completed': 0
    };

    taskStats.forEach(row => {
      stats[row.status] = parseInt(row.count);
    });

    const totalTasks = Object.values(stats).reduce((sum, count) => sum + count, 0);

    return response(200, {
      success: true,
      user: user,
      stats: {
        ...stats,
        total: totalTasks
      }
    });

  } catch (error) {
    console.error('❌ Erro ao obter estatísticas do usuário:', error);
    return response(500, { error: 'Erro interno do servidor: ' + error.message });
  }
};


