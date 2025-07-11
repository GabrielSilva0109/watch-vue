const AWS = require('aws-sdk');

async function monitorRDS() {
  const rds = new AWS.RDS({ region: 'us-east-1' });
  
  console.log('🔄 Monitorando modificações do RDS...');
  
  const checkStatus = async () => {
    try {
      const result = await rds.describeDBInstances({
        DBInstanceIdentifier: 'database-1'
      }).promise();
      
      const instance = result.DBInstances[0];
      
      console.log(`📊 Status: ${instance.DBInstanceStatus} | Público: ${instance.PubliclyAccessible}`);
      
      if (instance.PubliclyAccessible && instance.DBInstanceStatus === 'available') {
        console.log('✅ RDS está público e disponível!');
        console.log('🔄 Testando conexão...');
        
        // Testar conexão
        const { Client } = require('pg');
        const client = new Client({
          host: instance.Endpoint.Address,
          port: instance.Endpoint.Port,
          database: 'postgres',
          user: 'postgres',
          password: 'Amora123',
          ssl: { rejectUnauthorized: false }
        });
        
        try {
          await client.connect();
          console.log('🎉 Conexão bem-sucedida!');
          await client.end();
        } catch (error) {
          console.log('❌ Ainda não consegue conectar:', error.message);
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Erro:', error.message);
      return false;
    }
  };
  
  const interval = setInterval(async () => {
    const success = await checkStatus();
    if (success) {
      clearInterval(interval);
    }
  }, 30000); 
  
  await checkStatus();
}

monitorRDS();
