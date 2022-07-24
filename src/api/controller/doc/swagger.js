const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: '1.0.0',
        title: 'Gerencia Usuários API',
        description: 'Esta API servirá para gerenciar usuários.'
    },
    host: `${process.env.SERVER_URL || 'localhost'}:${process.env.PORT || 8080}`,
    schemes: ['http'],
    tags: [
        {
            name: 'permissoes',
            description: 'Cadastro de Permissões.'
        }
    ],
    definitions: {
        PopularMovies: [{
            id: 1,
            nome: 'funcionario',
            descricao: "Permissão de funcionário",
            ativo: true
        }],
        Error500: {
            status: 'error',
            statusCode: 500,
            message: 'ErrorMessage'
        },
        Error400: {
            status: 'error',
            statusCode: 400,
            message: 'ErrorMessage'
        }
    }
}

const outputFile = 'src/doc/swagger-output.json';
const endpointsFiles = ['src/api/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);