# Dockerfile para desenvolvimento local
FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache python3 make g++

# Criar diretório de trabalho
WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 5173

# Comando para executar
CMD ["npm", "run", "dev"]
