const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { createResponse } = require('../utils/response');

// Configuração do banco de dados
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware para verificar autenticação
const authenticateUser = (event) => {
  const authHeader = event.headers.Authorization || event.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token não fornecido');
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

// Listar todos os usuários
const listUsers = async (event) => {
  try {
    // Verificar autenticação
    const currentUser = authenticateUser(event);
    
    // Buscar todos os usuários
    const result = await pool.query(`
      SELECT 
        id, 
        name, 
        email, 
        created_at
      FROM users 
      ORDER BY created_at DESC
    `);

    const users = result.rows;

    console.log('Usuários encontrados:', users.length);

    return createResponse(200, {
      success: true,
      users: users,
      count: users.length
    });

  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    
    if (error.message === 'Token não fornecido' || error.message === 'Token inválido') {
      return createResponse(401, {
        success: false,
        message: error.message
      });
    }

    return createResponse(500, {
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Obter estatísticas de um usuário específico
const getUserStats = async (event) => {
  try {
    // Verificar autenticação
    const currentUser = authenticateUser(event);
    
    const userId = event.pathParameters?.id;
    
    if (!userId) {
      return createResponse(400, {
        success: false,
        message: 'ID do usuário é obrigatório'
      });
    }

    // Buscar usuário
    const userResult = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [userId]);
    
    if (userResult.rows.length === 0) {
      return createResponse(404, {
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Buscar estatísticas das tarefas do usuário
    const statsResult = await pool.query(`
      SELECT 
        status,
        COUNT(*) as count
      FROM tasks 
      WHERE user_id = $1 
      GROUP BY status
    `, [userId]);

    const stats = {
      'not-started': 0,
      'in-progress': 0,
      'pending': 0,
      'completed': 0
    };

    statsResult.rows.forEach(row => {
      stats[row.status] = parseInt(row.count);
    });

    const totalTasks = Object.values(stats).reduce((sum, count) => sum + count, 0);

    return createResponse(200, {
      success: true,
      user: userResult.rows[0],
      stats: {
        ...stats,
        total: totalTasks
      }
    });

  } catch (error) {
    console.error('Erro ao obter estatísticas do usuário:', error);
    
    if (error.message === 'Token não fornecido' || error.message === 'Token inválido') {
      return createResponse(401, {
        success: false,
        message: error.message
      });
    }

    return createResponse(500, {
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  listUsers,
  getUserStats
};
