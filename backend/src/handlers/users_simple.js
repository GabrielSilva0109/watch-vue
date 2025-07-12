const db = require('../config/database');
const { response } = require('../utils/response');

// Listar todos os usuários
module.exports.getUsers = async (event) => {
  try {
    console.log('🔍 Buscando todos os usuários...');
    
    // Buscar todos os usuários
    const users = await db('users')
      .select('id', 'name', 'email', 'created_at')
      .orderBy('created_at', 'desc');

    console.log('✅ Usuários encontrados:', users.length);

    return response(200, {
      success: true,
      users: users,
      count: users.length
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

    console.log('🔍 Buscando estatísticas do usuário:', userId);

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

    console.log('✅ Estatísticas do usuário encontradas:', { user: user.name, stats });

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
