# Watch Brasil Tasks 



## Deploy Your Own

Deploy your own Vite project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)]([https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/framework-boilerplates/vite&template=vite](https://vercel.com/new/clone?demo-description=Vite%2FVue.js%20site%20that%20can%20be%20deployed%20to%20Vercel&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F2T4BUF3mEBKPJF3jcjU6nS%2F0d4a02e7c48091d13814a4ab513e8734%2FScreen_Shot_2022-04-13_at_10.05.56_PM.png&demo-title=Vite%20-%20Vue&demo-url=https%3A%2F%2Fvite-vue-template.vercel.app%2F&from=templates&project-name=Vite%20-%20Vue&repository-name=vite-vue&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel%2Ftree%2Fmain%2Fexamples%2Fvite&skippable-integrations=1))

_Live Example: https://vite-vue-template.vercel.app_

### Deploying From Your Terminal

You can deploy your new Vite project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
$ vercel
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
