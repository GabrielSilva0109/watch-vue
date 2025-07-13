# Watch Brasil Tasks 

Backend serverless para a aplicação de gerenciamento de tarefas Watch, construído com Node.js, Vue.js e AWS Lambda.

## 🏗️ Arquitetura

- **AWS Lambda** - Funções serverless
- **API Gateway** - Endpoints REST
- **PostgreSQL** - Banco de dados relacional
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
DATABASE_URL=postgresql://user:password@localhost:5432/watchdb
```

## 📝 Desenvolvimento Local

```bash
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
- **GET** `/users` - Obter usuários
- **GET** `/users/{id}/stats` - Obter estatísticas do usuário
- **PUT** `/users/{id}` - Atualizar usuário
- **PUT** `/users/{id}` - Atualizar usuário
- **DELETE** `/users/{id}` - Deletar usuário

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
  "id": "uuid",
  "email": "string",
  "name": "string",
  "password": "string (hash)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Tabela Tasks

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "string",
  "description": "string",
  "status": "not-started|in-progress|pending|completed",
  "created_at": "timestamp",
  "updated_at": "timestamp"
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
│   ├── __tests__/handlers
│   │   └── auth.test.js
│   ├── config/
│   │   └── database.js
│   ├── handlers/
│   │   ├── auth_postgres.js
│   │   ├── users_simple.js
│   │   └── tasks_simple.js
│   └── utils/
│       └── response.js
├── package.json
├── serverless.yml
├── serverless_postgres.yml
├── serverless-local.yml
└── .env
└── exemple.env
```

## ⚙️ Configurações Serverless

O projeto possui múltiplas configurações serverless:

- **serverless.yml** - Configuração principal (produção)
- **serverless_postgres.yml** - Configuração específica PostgreSQL
- **serverless-local.yml** - Desenvolvimento local

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

## 🗄️ Handlers Disponíveis

### Autenticação
- `auth_postgres.js` - Handlers de autenticação com PostgreSQL

### Tarefas
- `tasks_simple.js` - Handlers de tarefas simplificados

### Usuários
- `users_simple.js` - Handlers de tarefas simplificados

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento local
npm run local

# Deploy com PostgreSQL
npm run deploy

# Remover deployment
npm run remove
```

# Testes Unitários com Jest

Este projeto utiliza **Jest** para testes unitários no backend (Node.js/Serverless) e **Vitest** para o frontend (Vue.js).

## 📋 Pré-requisitos

- Node.js 16+ instalado
- NPM ou Yarn

## 🚀 Configuração dos Testes

### Backend (Jest)

#### 1. Instalar Dependências

```bash
npm install --save-dev vitest @vue/test-utils jsdom @vitejs/plugin-vue
```

### 2. Executando os Testes

```bash
# Executar todos os testes
cd backend 
npm test
