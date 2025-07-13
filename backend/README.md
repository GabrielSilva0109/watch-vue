# Watch Vue Backend - Serverless

Backend serverless para a aplicação de gerenciamento de tarefas Watch, construído com Node.js, Vue.js e AWS Lambda .

## 🏗️ Arquitetura

- **AWS Lambda** - Funções serverless
- **API Gateway** - Endpoints REST
- **PostsgGREE** - Banco de dados NoSQL
- **JWT** - Autenticação e autorização
- **Serverless Framework** - Deploy e gerenciamento

## 🚀 Instalação e Configuração

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Configurar AWS CLI

```bash
# Instalar AWS CLI
npm install -g aws-cli

# Configurar credenciais
aws configure
```

### 3. Instalar Serverless Framework

```bash
npm install -g serverless
```

### 4. Configurar variáveis de ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar o arquivo .env
JWT_SECRET=sua-chave-secreta-muito-forte-aqui
AWS_REGION=us-east-1
```

## 📝 Desenvolvimento Local

```bash
# Instalar plugin offline
npm install --save-dev serverless-offline

# Executar localmente
npm run local
```

O servidor local estará disponível em `http://localhost:3000`

## 🚀 Deploy

### Deploy para AWS

```bash
# Deploy para ambiente de desenvolvimento
npm run deploy

# Deploy para produção
npm run deploy -- --stage prod
```

### Remover da AWS

```bash
npm run remove
```

## 📋 Endpoints da API

### Autenticação

- **POST** `/auth/register` - Registrar usuário
- **POST** `/auth/login` - Login do usuário
- **PUT** `/auth/login` - Login do usuário

### Tarefas (Requer autenticação)

- **GET** `/tasks` - Listar tarefas do usuário
- **POST** `/tasks` - Criar nova tarefa
- **PUT** `/tasks/{id}` - Atualizar tarefa
- **DELETE** `/tasks/{id}` - Deletar tarefa

## 🔐 Autenticação

Todas as rotas de tarefas requerem autenticação via JWT. Inclua o token no header:

```
Authorization: Bearer <seu-token-jwt>
```

## 📊 Estrutura do Banco de Dados

### Tabela Users

```json
{
  "userId": "uuid",
  "email": "string",
  "name": "string",
  "password": "string (hash)",
  "createdAt": "ISO string",
  "updatedAt": "ISO string"
}
```

### Tabela Tasks

```json
{
  "userId": "uuid",
  "taskId": "uuid",
  "title": "string",
  "description": "string",
  "status": "not-started|in-progress|pending|completed",
  "createdAt": "ISO string",
  "updatedAt": "ISO string"
}
```

## 🧪 Testes

```bash
npm test
```

## 📦 Estrutura do Projeto

```
backend/
├── src/
│   ├── handlers/
│   │   ├── auth.js
│   │   └── tasks.js
│   └── utils/
│       └── response.js
├── package.json
├── serverless.yml
└── .env
```

## 🔧 Configuração do Frontend

Para conectar o frontend com o backend, adicione as variáveis de ambiente:

```javascript
// No seu arquivo de configuração do Vue.js
const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';
```

## 📈 Monitoramento

- **CloudWatch** - Logs e métricas
- **X-Ray** - Rastreamento de requisições
- **AWS Dashboard** - Monitoramento geral
