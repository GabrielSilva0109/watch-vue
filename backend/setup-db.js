const knex = require('knex');

async function testKnexConnection() {
  console.log('🔄 Testando conexão via Knex...');
  
  const db = knex({
    client: 'pg',
    connection: {
      host: 'database-1.cw9oai2e049m.us-east-1.rds.amazonaws.com',
      port: 5432,
      database: 'watch_vue_db',
      user: 'postgres',
      password: 'Amora123',
      ssl: { rejectUnauthorized: false }
    }
  });

  try {
    // Testar conexão
    await db.raw('SELECT 1');
    console.log('✅ Conexão Knex bem-sucedida!');
    
    // Criar tabela de usuários
    console.log('🔄 Criando tabela users...');
    await db.schema.createTable('users', function(table) {
      table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('name').notNullable();
      table.timestamp('created_at').defaultTo(db.fn.now());
      table.timestamp('updated_at').defaultTo(db.fn.now());
    });
    console.log('✅ Tabela users criada!');
    
    // Criar tabela de tarefas
    console.log('🔄 Criando tabela tasks...');
    await db.schema.createTable('tasks', function(table) {
      table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('title').notNullable();
      table.text('description');
      table.enu('status', ['not-started', 'in-progress', 'pending', 'completed']).defaultTo('not-started');
      table.integer('priority').defaultTo(1);
      table.timestamp('due_date');
      table.timestamp('created_at').defaultTo(db.fn.now());
      table.timestamp('updated_at').defaultTo(db.fn.now());
      
      // Índices para performance
      table.index('user_id');
      table.index('status');
      table.index('created_at');
    });
    console.log('✅ Tabela tasks criada!');
    
    // Inserir usuário de teste
    console.log('🔄 Inserindo usuário de teste...');
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const [user] = await db('users').insert({
      email: 'teste@email.com',
      name: 'Usuário Teste',
      password: hashedPassword
    }).returning(['id']);
    
    console.log('✅ Usuário de teste criado:', user.id);
    
    // Inserir tarefas de teste
    console.log('🔄 Inserindo tarefas de teste...');
    await db('tasks').insert([
      {
        user_id: user.id,
        title: 'Configurar PostgreSQL',
        description: 'Configurar banco de dados PostgreSQL para o projeto',
        status: 'completed',
        priority: 1
      },
      {
        user_id: user.id,
        title: 'Implementar autenticação',
        description: 'Implementar sistema de login e registro',
        status: 'in-progress',
        priority: 2
      },
      {
        user_id: user.id,
        title: 'Criar dashboard',
        description: 'Desenvolver interface do dashboard',
        status: 'not-started',
        priority: 3
      }
    ]);
    
    console.log('✅ Tarefas de teste criadas!');
    console.log('🎉 Banco de dados configurado com sucesso!');
    console.log('👤 Login de teste: teste@email.com / 123456');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await db.destroy();
  }
}

testKnexConnection();
