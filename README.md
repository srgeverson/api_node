# API Node JS
Este sistema servirá para gerenciar usuários.

## 📌 Versão ainda em desenvolvimento
1.0.0

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/) 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

💡Esta aplicação usa um tokem gerado pelo [MD5 Hash Generator](https://passwordsgenerator.net/md5-hash-generator/).

## 🚀 Comandos executados durante o desenvolvimento.

💡 Para Windows utilize o git bash, para linux utilize o terminal normalmente.

```bash

### Criando a pasta do projeto.
$ mkdir api_node

### Entrando na pasta criada.
$ cd api_node

### Criar o arquivo "package.json".
$ npm init -y

### Gerencia as requisições, rotas e URLs, entre outra funcionalidades.
$ npm install express --save

### Habilitando o compartilhamento de recursos entre diferentes origens.
$ npm install cors --save 

### Carregando variáveis de ambiente de um arquivo .env para process.env.
$ npm install dotenv --save

### Criando o arquivo que armazenará as variáveis necessárias para a aplicação executar.
$ touch .ENV

### Trata as exceções de forma global.
$ npm install express-async-handler --save

### Produz código JS válido - para import do ES6
$ npm install sucrase --save

### Reiniciar o servidor sempre que houver alteração no código fonte
$ npm install -D nodemon --save

# Crie um banco de dados e adicione ao arquivo .env na raiz do projeto as seguintes configurações:
$ DATABASE_DIALECT=dialect
$ DATABASE_NAME=database-name
$ DATABASE_HOST=http://localhost
$ DATABASE_USERNAME=username
$ DATABASE_PASSWORD=password

💡 As tabelas e os dados inicias da aplicação estão dentro das pastas /api_node/src/core/database/migraions e /api_node/src/core/database/seeders respectivamente.

# Rodando as migrations
$ npx sequelize db:migrate

# Rodando as seeders
$ npx sequelize db:seed:all

### 
$ npm install pg --save

### 
$ npm install pg-hstore --save

### 
$ npm install reflect-metadata --save

### 
$ npm install sequelize --save

### 
$ npm install status-code-enum --save

### 
$ npm install swagger-autogen --save

### 
$ npm install swagger-ui-express --save

### 
$ npm install -D sequelize-cli

```

#### 🎲 Rodando a aplicação em ambiente para desenvolvimento

```bash

### Baixando o projeto
$ git clone https://github.com/srgeverson/api_node

### Entrando na pasta criada.
$ cd api_node

### Instalando as dependências.
$ npm install

### Iniciando a aplicação em modo de produção.
$ npm start

### Iniciando a aplicação em modo de desenvolvimento.
$ npm run development

### 
$ http://localhost:8080/doc

```

## 👨‍💻 Equipe de Desenvolvimento

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)

## ✒️ Autor

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)