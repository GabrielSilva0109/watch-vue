const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { response } = require('../utils/response');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getTasks = async (event) => {
  try {
    const userId = event.requestContext.authorizer.userId;

    const result = await dynamoDb.query({
      TableName: process.env.TASKS_TABLE,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise();

    return response(200, {
      tasks: result.Items || []
    });

  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return response(500, { error: 'Erro interno do servidor' });
  }
};

module.exports.createTask = async (event) => {
  try {
    const userId = event.requestContext.authorizer.userId;
    const { title, description, priority = 'medium' } = JSON.parse(event.body);

    if (!title) {
      return response(400, { error: 'Título é obrigatório' });
    }

    const taskId = uuidv4();
    const task = {
      userId,
      taskId,
      title,
      description: description || '',
      priority,
      status: 'not-started',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await dynamoDb.put({
      TableName: process.env.TASKS_TABLE,
      Item: task
    }).promise();

    return response(201, {
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
    const userId = event.requestContext.authorizer.userId;
    const taskId = event.pathParameters.id;
    const { title, description, priority, status } = JSON.parse(event.body);

    // Verificar se a tarefa existe e pertence ao usuário
    const existingTask = await dynamoDb.get({
      TableName: process.env.TASKS_TABLE,
      Key: { userId, taskId }
    }).promise();

    if (!existingTask.Item) {
      return response(404, { error: 'Tarefa não encontrada' });
    }

    // Preparar atualização
    const updateExpression = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    if (title) {
      updateExpression.push('#title = :title');
      expressionAttributeNames['#title'] = 'title';
      expressionAttributeValues[':title'] = title;
    }

    if (description !== undefined) {
      updateExpression.push('description = :description');
      expressionAttributeValues[':description'] = description;
    }

    if (priority) {
      updateExpression.push('priority = :priority');
      expressionAttributeValues[':priority'] = priority;
    }

    if (status) {
      updateExpression.push('#status = :status');
      expressionAttributeNames['#status'] = 'status';
      expressionAttributeValues[':status'] = status;
    }

    updateExpression.push('updatedAt = :updatedAt');
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const result = await dynamoDb.update({
      TableName: process.env.TASKS_TABLE,
      Key: { userId, taskId },
      UpdateExpression: 'SET ' + updateExpression.join(', '),
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
      ReturnValues: 'ALL_NEW'
    }).promise();

    return response(200, {
      message: 'Tarefa atualizada com sucesso',
      task: result.Attributes
    });

  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return response(500, { error: 'Erro interno do servidor' });
  }
};

module.exports.deleteTask = async (event) => {
  try {
    const userId = event.requestContext.authorizer.userId;
    const taskId = event.pathParameters.id;

    // Verificar se a tarefa existe e pertence ao usuário
    const existingTask = await dynamoDb.get({
      TableName: process.env.TASKS_TABLE,
      Key: { userId, taskId }
    }).promise();

    if (!existingTask.Item) {
      return response(404, { error: 'Tarefa não encontrada' });
    }

    await dynamoDb.delete({
      TableName: process.env.TASKS_TABLE,
      Key: { userId, taskId }
    }).promise();

    return response(200, {
      message: 'Tarefa deletada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    return response(500, { error: 'Erro interno do servidor' });
  }
};
