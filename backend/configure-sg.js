const AWS = require('aws-sdk');

// Configurar AWS SDK
const ec2 = new AWS.EC2({ region: 'us-east-1' });

async function configureSecurityGroup() {
  try {
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
      console.log('Nenhum Security Group do RDS encontrado');
      return;
    }

    const sg = result.SecurityGroups[0];

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

    console.log('Regra PostgreSQL adicionada com sucesso!');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

configureSecurityGroup();
