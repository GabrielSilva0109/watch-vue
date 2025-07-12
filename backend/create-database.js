const { Client } = require('pg');

async function createDatabase() {
  // Conectar ao banco postgres padrão
  const client = new Client({
    host: 'database-1.cw9oai2e049m.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'postgres', // Banco padrão
    user: 'postgres',
    password: 'Amora123',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao PostgreSQL');

    // Verificar se o banco watch_vue_db já existe
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'watch_vue_db'"
    );

    if (result.rows.length === 0) {
      // Criar o banco de dados
      await client.query('CREATE DATABASE watch_vue_db');
      console.log('✅ Banco de dados "watch_vue_db" criado com sucesso!');
    } else {
      console.log('ℹ️  Banco de dados "watch_vue_db" já existe');
    }

  } catch (error) {
    console.error('❌ Erro ao criar banco de dados:', error);
  } finally {
    await client.end();
  }
}

createDatabase();
