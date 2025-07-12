const db = require('./src/config/database');
const path = require('path');
const fs = require('fs');

async function runMigrations() {
  try {
    // Verificar se o banco existe
    await db.raw('SELECT 1');
    
    // Executar migrações
    const migrationFiles = fs.readdirSync('./migrations').sort();
    
    for (const file of migrationFiles) {
      if (file.endsWith('.js')) {
        console.log(`🔄 Executando migração: ${file}`);
        const migration = require(`./migrations/${file}`);
        await migration.up(db);
        console.log(`✅ Migração concluída: ${file}`);
      }
    }

    // Inserir dados de teste (opcional)
    await insertTestData();
    
  } catch (error) {
    console.error('❌ Erro durante as migrações:', error);
  } finally {
    await db.destroy();
  }
}

async function insertTestData() {
  try {
    // Verificar se já existem dados
    const userCount = await db('users').count('id as count').first();
    if (userCount.count > 0) {
      return;
    }
    
    // Inserir usuário de teste
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const [user] = await db('users').insert({
      email: 'teste@email.com',
      name: 'Usuário Teste',
      password: hashedPassword
    }).returning(['id']);
    
    // Inserir algumas tarefas de teste
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
    
    console.log('✅ Dados de teste inseridos com sucesso!');
    console.log('👤 Usuário de teste: teste@email.com / 123456');
    
  } catch (error) {
    console.error('❌ Erro ao inserir dados de teste:', error);
  }
}

// Executar migrações
runMigrations();
