# API Node JS
Este sistema servirá para gerenciar usuários.

## 📌 Versão ainda em desenvolvimento
1.0.0

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/) 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

💡A chave secreta de validação do token é uma palavra encriptada pelo [MD5 Hash Generator](https://www.md5hashgenerator.com/).

💡As senhas de dados iniciais foram encriptada pelo [Bcrypt-Generator.com](https://bcrypt-generator.com/).

💡Os tokens gerados pode ser validado pelo [JWT.io](https://jwt.io/).

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

### Produz código JS válido - para import do ES6.
$ npm install sucrase --save

### Reiniciar o servidor sempre que houver alteração no código fonte.
$ npm install -D nodemon --save

### Instalando ORM [Sequelize](https://sequelize.org/).
$ npm install sequelize --save

### Instalando o driver do Postgres.
$ npm install pg pg-hstore --save

### Apresenta os tipo de dados em tempo de execução
$ npm install reflect-metadata --save

# Crie um banco de dados e adicione ao arquivo .env na raiz do projeto as seguintes configurações:
$ DATABASE_DIALECT='dialect do seu banco de dados.'
$ DATABASE_NAME='Nome do banco de dados criado.'
$ DATABASE_HOST='Endereço IP do banco de dados.'
$ DATABASE_USERNAME='Usuário do banco de dados.'
$ DATABASE_PASSWORD='Senha do banco de dados.'

💡 As tabelas e os dados inicias da aplicação estão dentro das pastas /api_node/src/core/database/migraions e /api_node/src/core/database/seeders respectivamente.

# Rodando as migrations.
$ npx sequelize db:migrate

# Rodando as seeders.
$ npx sequelize db:seed:all

### Apresenta os ENUMs dos status http.
$ npm install status-code-enum --save

### Constroi um arquivo de documentação utilizado pelo swagger.
$ npm install swagger-autogen --save

### Gera a visualização da documentação criada anteriormente.
$ npm install swagger-ui-express --save

### Gerando ducumentação swagger.
$ npm run swagger-autogen

### Criptografar a senha
$ npm install bcryptjs --save

### Validar requisições com JWT
$ npm install jsonwebtoken --save

# Adicione ao arquivo .env na raiz do projeto as seguintes configurações:
$ KEY_SECRET='Chave secreta encriptada pelo site mencionado no início das instruções.'
$ EXPIRES_IN='Tempo de expiração do token.'

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

### Gerando ducumentação swagger
$ npm run swagger-autogen

### URL da documentação em desenvolvimento
$ http://localhost:8080/api-docs

```

## 👨‍💻 Equipe de Desenvolvimento

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)

## ✒️ Autor

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)