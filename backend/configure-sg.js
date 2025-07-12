const AWS = require('aws-sdk');

// Configurar AWS SDK
const ec2 = new AWS.EC2({ region: 'us-east-1' });

async function configureSecurityGroup() {
  try {
    console.log('🔄 Buscando Security Groups do RDS...');
    
    // Buscar todos os security groups
    const result = await ec2.describeSecurityGroups({
      Filters: [
        {
          Name: 'group-name',
          Values: ['rds-launch-wizard-*']
        }
      ]
    }).promise();

    if (result.SecurityGroups.length === 0) {
      console.log('❌ Nenhum Security Group do RDS encontrado');
      console.log('🔧 Configure manualmente no AWS Console:');
      console.log('   1. Vá para RDS → Database → database-1');
      console.log('   2. Clique no Security Group');
      console.log('   3. Adicione regra: PostgreSQL (5432) de 0.0.0.0/0');
      return;
    }

    const sg = result.SecurityGroups[0];
    console.log(`✅ Security Group encontrado: ${sg.GroupId}`);

    // Verificar se a regra já existe
    const hasPostgresRule = sg.IpPermissions.some(rule => 
      rule.FromPort === 5432 && rule.ToPort === 5432
    );

    if (hasPostgresRule) {
      console.log('ℹ️  Regra PostgreSQL já existe');
      return;
    }

    // Adicionar regra para PostgreSQL
    await ec2.authorizeSecurityGroupIngress({
      GroupId: sg.GroupId,
      IpPermissions: [
        {
          IpProtocol: 'tcp',
          FromPort: 5432,
          ToPort: 5432,
          IpRanges: [{ CidrIp: '0.0.0.0/0' }]
        }
      ]
    }).promise();

    console.log('✅ Regra PostgreSQL adicionada com sucesso!');
    console.log('🔄 Aguarde alguns segundos e teste novamente...');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.log('🔧 Configure manualmente no AWS Console');
  }
}

configureSecurityGroup();
