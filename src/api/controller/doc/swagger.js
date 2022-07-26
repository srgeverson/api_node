const swaggerAutogen = require('swagger-autogen')();

const docs = {
    info: {
        version: '1.0.0',
        title: 'Gerencia Usuários API',
        description: 'Esta API servirá para gerenciar usuários.'
    },
    host: `${process.env.SERVER_URL || 'localhost'}:${process.env.PORT || 8080}`,
    schemes: ['http', 'https'],
    tags: [
        {
            name: 'Autorização',
            description: 'Gerencia o fluxo de autorização de acesso.'
        },
        {
            name: 'Permissões',
            description: 'Gerencia o cadastro de permissões.'
        },
        {
            name: 'Usuários',
            description: 'Gerencia o cadastro de usuários.'
        },
        {
            name: 'UsuáriosPermissões',
            description: 'Gerencia o cadastro de permissões do usuário.'
        },
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
            senhaNova: '654321'
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
            }
        },
        UsuarioLogin: {
            email: 'login@email.com',
            senha: '654321'
        },
        UsuarioAutenticado: {
            id: 1,
            nome: 'nome/apelido',
            expiresIn: 21000,
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        },
        ValidarUsuario: {
            nome: 'meu  nome/apelido',
            email: 'login@email.com',
            codigoAcesso: 'w37f3ggrcs'
        },
        EmailUsuario: {
            email: 'login@email.com'
        },
        CadastrarPermissoes: [1, 2, 3],
        PermissoesCadastradas: [
            { id: 1, mensagem: 'Permissão cadastrada.' },
            { id: 2, mensagem: 'Permissão já existe.' }
        ],
        UsuarioFoto: {
            id: 1,
            foto: '/C:/Users/user/Pictures/nome_imagem.PNG'
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
        Error409: {
            status: 'atênção',
            statusCode: 409,
            message: 'Violação da integridade de dados.'
        },
        Error500: {
            status: 'erro',
            statusCode: 500,
            message: 'Erro interno, contate o administrador do sistema.'
        }
    },
    securityDefinitions: {
        Autorização: {
            type: 'oauth2',
            tokenUrl: `${process.env.PORT_HTTPS ? 'https' : 'http'}://${process.env.SERVER_URL ? process.env.SERVER_URL : 'localhost'}:${process.env.PORT_HTTPS ? process.env.PORT_HTTPS : process.env.PORT_HTTP ? process.env.PORT_HTTP : 8080}/v1/usuarios/token`,
            flow: 'password',
            scopes: {}
        }
    }
}

const outputFile = './src/api/controller/doc/swagger.json';
const endpointsFiles = ['./src/api/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, docs);