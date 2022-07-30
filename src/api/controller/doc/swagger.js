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
            nome: 'alterar_usuario',
            descricao: "Permite alterar o usuário.",
            ativo: true
        }],
        Usuarios: [{
            id: 1,
            nome: 'meu  nome/apelido',
            email: 'login@email.com',
            ativo: true
        }],
        UsuarioComSenha: {
            nome: 'meu  nome/apelido',
            email: 'login@email.com',
            senha: '123456'
        },
        UsuarioSemSenha: {
            nome: 'meu  nome/apelido',
            email: 'login@email.com'
        },
        Usuario: {
            id: 1,
            nome: 'meu  nome/apelido',
            email: 'login@email.com',
            ativo: true
        },
        AlterarUsuario: {
            nome: 'meu  nome/apelido',
            email: 'login@email.com',
            ativo: false
        },
        AlterarSenha: {
            email: 'login@email.com',
            senhaAntiga: '123456',
            senhaNova: '654321',
        },
        PermissoesUsuario: {
            Usuario: {
                id: 1,
                nome: 'meu  nome/apelido',
                email: 'login@email.com',
                ativo: true,
                Permissoes: [{
                    id: 1,
                    nome: 'alterar_usuario',
                    descricao: "Permite alterar o usuário.",
                    ativo: true
                }]
            },
        },
        UsuarioLogin: {
            email: 'login@email.com',
            senha: '654321',
        },
        UsuarioAutenticado: {
            id: 1,
            nome: 'nome/apelido',
            expiresIn: 21000,
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        },
        Informativo: { mensagem: 'Informação da operação.' },
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