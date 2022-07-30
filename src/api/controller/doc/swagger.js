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
        },
        {
            name: 'Usuários',
            description: 'Gerencia o cadastro de usuários.'
        }
    ],
    definitions: {
        Permissoes: [{
            id: 1,
            nome: 'funcionario',
            descricao: "Permissão de funcionário.",
            ativo: true
        }],
        Usuarios: [{
            id: 1,
            nome: 'login@email.com',
            ativo: true
        }],
        UsuarioComSenha: {
            nome: 'login@email.com',
            senha: '123456',
        },
        Error400: {
            status: 'informativo',
            statusCode: 400,
            message: 'Solicitação está no formato incorreto.'
        },
        Error401: {
            status: 'informativo',
            statusCode: 401,
            message: 'Acesso não autorizado.'
        },
        Error403: {
            status: 'atênção',
            statusCode: 403,
            message: 'Permissão negada.'
        },
        Error404: {
            status: 'atênção',
            statusCode: 404,
            message: 'Dados não encontrados.'
        },
        Error500: {
            status: 'erro',
            statusCode: 500,
            message: 'Erro interno, contate o administrador do sistema.'
        }
    }
}

const outputFile = './src/api/controller/doc/swagger.json';
const endpointsFiles = ['./src/api/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, docs);