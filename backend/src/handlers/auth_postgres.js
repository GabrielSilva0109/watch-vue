const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { response } = require('../utils/response');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.register = async (event) => {
  try {
    const { name, email, password } = JSON.parse(event.body);

    // Validação básica
    if (!name || !email || !password) {
      return response(400, { error: 'Nome, email e senha são obrigatórios' });
    }

    if (password.length < 6) {
      return response(400, { error: 'A senha deve ter pelo menos 6 caracteres' });
    }

    // Verificar se o usuário já existe
    const existingUser = await db('users').where('email', email).first();
    if (existingUser) {
      return response(400, { error: 'Usuário já existe com este email' });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const [user] = await db('users')
      .insert({
        email,
        name,
        password: hashedPassword
      })
      .returning(['id', 'email', 'name', 'created_at']);

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return response(200, {
      success: true,
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    return response(500, { error: 'Erro interno do servidor' });
  }
};

module.exports.login = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    // Validação básica
    if (!email || !password) {
      return response(400, { error: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário
    const user = await db('users').where('email', email).first();
    if (!user) {
      return response(401, { error: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response(401, { error: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return response(200, {
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return response(500, { error: 'Erro interno do servidor' });
  }
};

module.exports.authorize = async (event) => {
  try {
    const token = event.headers.Authorization || event.headers.authorization;
    
    if (!token) {
      return response(401, { error: 'Token não fornecido' });
    }

    const tokenWithoutBearer = token.replace('Bearer ', '');
    
    const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);
    
    // Verificar se o usuário ainda existe
    const user = await db('users').where('id', decoded.userId).first();
    if (!user) {
      return response(401, { error: 'Usuário não encontrado' });
    }

    return response(200, {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Erro na autorização:', error);
    return response(401, { error: 'Token inválido' });
  }
};
