const swaggerAutogen = require('swagger-autogen')();

const docs = {
    info: {
        version: '1.0.0',
        title: 'Gerencia Usuários API',
        description: 'Esta API servirá para gerenciar usuários.'
    },
    host: `${process.env.SERVER_URL || 'localhost'}:${process.env.PORT || 8080}`,
    schemes: ['http'],
    tags: [
        {
            name: 'Permissões',
            description: 'Gerencia o cadastro de permissões.'
        }
    ],
    definitions: {
        Permissoes: [{
            id: 1,
            nome: 'funcionario',
            descricao: "Permissão de funcionário",
            ativo: true
        }],
        Error400: {
            status: 'error',
            statusCode: 400,
            message: 'ErrorMessage'
        },
        Error500: {
            status: 'error',
            statusCode: 500,
            message: 'ErrorMessage'
        }
    }
}

const outputFile = './src/api/controller/doc/swagger.json';
const endpointsFiles = ['./src/api/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, docs);