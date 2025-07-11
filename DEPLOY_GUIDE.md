# 🚀 Guia de Deploy - Watch Vue Serverless

Este guia explica como fazer o deploy completo da aplicação Watch Vue em uma arquitetura serverless na AWS.

## 📋 Pré-requisitos

1. **Conta AWS** - Acesso com permissões para Lambda, API Gateway, DynamoDB
2. **Node.js** - Versão 18 ou superior
3. **AWS CLI** - Configurado com suas credenciais
4. **Serverless Framework** - Instalado globalmente

## 🛠️ Configuração Inicial

### 1. Instalar AWS CLI

```bash
# Windows
choco install awscli

# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 2. Configurar AWS CLI

```bash
aws configure
```

Insira suas credenciais AWS:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (ex: us-east-1)
- Default output format (json)

### 3. Instalar Serverless Framework

```bash
npm install -g serverless
```

## 🚀 Deploy do Backend

### 1. Navegue para o diretório do backend

```bash
cd backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
# Editar o arquivo .env
JWT_SECRET=sua-chave-secreta-muito-forte-e-segura-aqui-2024
AWS_REGION=us-east-1
```

### 4. Fazer deploy

```bash
# Deploy para desenvolvimento
npm run deploy

# Deploy para produção
npm run deploy -- --stage prod
```

### 5. Anote a URL da API

Após o deploy, você verá uma saída similar a:

```
endpoints:
  POST - https://abc123def.execute-api.us-east-1.amazonaws.com/dev/auth/register
  POST - https://abc123def.execute-api.us-east-1.amazonaws.com/dev/auth/login
  GET - https://abc123def.execute-api.us-east-1.amazonaws.com/dev/tasks
  POST - https://abc123def.execute-api.us-east-1.amazonaws.com/dev/tasks
  PUT - https://abc123def.execute-api.us-east-1.amazonaws.com/dev/tasks/{id}
  DELETE - https://abc123def.execute-api.us-east-1.amazonaws.com/dev/tasks/{id}
```

## 🎨 Deploy do Frontend

### 1. Configurar a URL da API

```bash
# Editar o arquivo .env na raiz do projeto
VUE_APP_API_URL=https://abc123def.execute-api.us-east-1.amazonaws.com/dev
```

### 2. Construir o projeto

```bash
npm run build
```

### 3. Opções de Deploy do Frontend

#### Opção A: AWS S3 + CloudFront

```bash
# Instalar AWS CLI S3 sync
aws s3 sync dist/ s3://seu-bucket-name --delete

# Configurar CloudFront para distribuição global
```

#### Opção B: Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Fazer deploy
netlify deploy --prod --dir=dist
```

#### Opção C: Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer deploy
vercel --prod
```

## 🔧 Configuração de Domínio Personalizado

### 1. No AWS Route 53

```bash
# Criar zona hospedada para seu domínio
aws route53 create-hosted-zone --name seudominio.com --caller-reference $(date +%s)
```

### 2. Configurar SSL/TLS

```bash
# Solicitar certificado SSL via AWS Certificate Manager
aws acm request-certificate --domain-name seudominio.com --validation-method DNS
```

### 3. Configurar API Gateway

```yaml
# Adicionar no serverless.yml
custom:
  customDomain:
    domainName: api.seudominio.com
    stage: ${self:provider.stage}
    createRoute53Record: true
```

## 📊 Monitoramento e Logs

### 1. CloudWatch Logs

```bash
# Visualizar logs do Lambda
aws logs tail /aws/lambda/watch-vue-backend-dev-getTasks --follow
```

### 2. Métricas

```bash
# Configurar alertas no CloudWatch
aws cloudwatch put-metric-alarm --alarm-name "API-Errors" --alarm-description "API Error Rate" --metric-name "Errors" --namespace "AWS/ApiGateway" --statistic "Sum" --period 300 --threshold 10 --comparison-operator GreaterThanThreshold
```

## 🔄 CI/CD com GitHub Actions

### 1. Criar arquivo .github/workflows/deploy.yml

```yaml
name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd backend
        npm install
    
    - name: Deploy to AWS
      run: |
        cd backend
        npm run deploy
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### 2. Configurar secrets no GitHub

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- JWT_SECRET

## 💰 Estimativa de Custos

### AWS Lambda
- **Gratuito**: 1M requisições/mês
- **Pago**: $0.20 por 1M requisições adicionais

### DynamoDB
- **Gratuito**: 25GB de armazenamento
- **Pago**: $0.25 por GB/mês adicional

### API Gateway
- **Gratuito**: 1M chamadas/mês
- **Pago**: $3.50 por 1M chamadas adicionais

### Total estimado para aplicação pequena: $0-5/mês

## 🔒 Segurança

1. **IAM Roles** - Princípio do menor privilégio
2. **JWT Tokens** - Autenticação segura
3. **HTTPS** - Criptografia em trânsito
4. **Validação** - Sanitização de dados
5. **Rate Limiting** - Proteção contra abuso

## 📚 Comandos Úteis

```bash
# Verificar status dos recursos
serverless info

# Visualizar logs em tempo real
serverless logs -f getTasks -t

# Remover todos os recursos
serverless remove

# Testar função localmente
serverless invoke local -f getTasks

# Executar testes
npm test
```

## 🐛 Troubleshooting

### Erro de permissões
```bash
# Verificar permissões IAM
aws iam get-user
```

### Erro de CORS
```bash
# Verificar configuração de CORS no serverless.yml
cors: true
```

### Erro de região
```bash
# Verificar região configurada
aws configure get region
```

## 🎯 Próximos Passos

1. **Implementar cache** com Redis/ElastiCache
2. **Adicionar notificações** com SNS
3. **Implementar busca** com Elasticsearch
4. **Adicionar métricas** personalizadas
5. **Configurar backup** automático

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do CloudWatch
2. Consulte a documentação da AWS
3. Revise as configurações do Serverless Framework
