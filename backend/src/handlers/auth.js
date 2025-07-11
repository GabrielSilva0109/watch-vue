const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { response } = require('../utils/response');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
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
    const existingUser = await dynamoDb.query({
      TableName: process.env.USERS_TABLE,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }).promise();

    if (existingUser.Items.length > 0) {
      return response(400, { error: 'Usuário já existe com este email' });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    // Criar usuário
    await dynamoDb.put({
      TableName: process.env.USERS_TABLE,
      Item: {
        userId,
        email,
        name,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }).promise();

    // Gerar token JWT
    const token = jwt.sign(
      { userId, email, name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return response(201, {
      message: 'Usuário criado com sucesso',
      user: { userId, email, name },
      token
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

    // Buscar usuário por email
    const result = await dynamoDb.query({
      TableName: process.env.USERS_TABLE,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }).promise();

    if (result.Items.length === 0) {
      return response(401, { error: 'Credenciais inválidas' });
    }

    const user = result.Items[0];

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response(401, { error: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.userId, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return response(200, {
      message: 'Login realizado com sucesso',
      user: { userId: user.userId, email: user.email, name: user.name },
      token
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return response(500, { error: 'Erro interno do servidor' });
  }
};

module.exports.authorize = async (event) => {
  try {
    const token = event.authorizationToken;

    if (!token) {
      throw new Error('Unauthorized');
    }

    // Remover "Bearer " se presente
    const cleanToken = token.replace('Bearer ', '');

    const decoded = jwt.verify(cleanToken, JWT_SECRET);

    return {
      principalId: decoded.userId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn
          }
        ]
      },
      context: {
        userId: decoded.userId,
        email: decoded.email,
        name: decoded.name
      }
    };

  } catch (error) {
    console.error('Erro na autorização:', error);
    throw new Error('Unauthorized');
  }
};
