import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../../core/auth';
import PermissaoController from '../controller/PermissaoController';
import UsuarioController from '../controller/UsuarioController';

const swaggerFile = require('../controller/doc/swagger.json');
const swaggerUi = require('swagger-ui-express');
const routes = Router();
const permissaoController = new PermissaoController();
const usuarioController = new UsuarioController();

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//#region CRUD Permissão

routes.get(`/v1/permissoes`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Permissões']
    // #swagger.description = 'Lista de todas permissões cadastradas.'

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Permissoes" },
        description: 'Lista de permissões.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await permissaoController.todasPermissoes(request, response);
}));

//#endregion CRUD Permissão

//#region Fluxo de Autorização

routes.post(`/v1/usuarios/token`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Autorização']
    // #swagger.description = 'Gerar token de acesso para o usuário.'

    /*  #swagger.parameters['UsuarioLogin'] = {
        in: 'body',
        description: 'Credenciais para geração do token de acesso.',
        schema: { $ref: '#/definitions/UsuarioLogin' }
    } */

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/UsuarioAutenticado" },
        description: 'Usuário autenticado.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[409] = {
        schema: { $ref: "#/definitions/Error409" },
        description: 'Duplicidade de dados.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await usuarioController.login(request, response);
}));

routes.post(`/v1/usuarios/sem-senha`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Autorização']
    // #swagger.description = 'Cadastrar um usuário com senha.'

    /*  #swagger.parameters['UsuarioSemSenha'] = {
        in: 'body',
        description: 'Cadastrar usuário sem senha.',
        schema: { $ref: '#/definitions/UsuarioSemSenha' }
    } */

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Informativo" },
        description: 'Usuário cadastrado.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[409] = {
        schema: { $ref: "#/definitions/Error409" },
        description: 'Duplicidade de dados.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await usuarioController.cadastrarUsuarioSemSenha(request, response);
}));

routes.put(`/v1/usuarios/validar-acesso`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Autorização']
    // #swagger.description = 'Valida o acesso do usuário a partir do código recebido por e-mail.'

    /*  #swagger.parameters['ValidarUsuario'] = {
        in: 'body',
        description: 'Cadastrar usuário com senha.',
        schema: { $ref: '#/definitions/ValidarUsuario' }
    } */

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Usuario" },
        description: 'Usuário validado.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await usuarioController.cadastrarSenhaComCodigo(request, response);
}));

routes.put(`/v1/usuarios/recuperar-acesso`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Autorização']
    // #swagger.description = 'Recupear a senha rebendo um código de acesso por email.'

    /*  #swagger.parameters['EmailUsuario'] = {
        in: 'body',
        description: 'Receber um códifo por e-mail para validar acesso.',
        schema: { $ref: '#/definitions/EmailUsuario' }
    } */

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Informativo" },
        description: 'Código de acesso enviado.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[409] = {
        schema: { $ref: "#/definitions/Error409" },
        description: 'Duplicidade de dados.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await usuarioController.enviarCodigoAcessoParaEmail(request, response);
}));

//#endregion Fluxo de Autorização

//#region CRUD Usuário

routes.get(`/v1/usuarios`, auth, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Lista de todos usuários cadastrados.'

    /* #swagger.security = [{
            "oAuthSample": []
        }] 
    */

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Usuarios" },
        description: 'Lista de usuários.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await usuarioController.todosUsuarios(request, response);
}));

routes.post(`/v1/usuarios/com-senha`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Cadastrar um usuário com senha.'

    /*  #swagger.parameters['UsuarioComSenha'] = {
        in: 'body',
        description: 'Cadastrar usuário com senha.',
        schema: { $ref: '#/definitions/UsuarioComSenha' }
    } */

    /** #swagger.responses[201] = {
        schema: { $ref: "#/definitions/Usuario" },
        description: 'Usuário cadastrado.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[409] = {
        schema: { $ref: "#/definitions/Error409" },
        description: 'Duplicidade de dados.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await usuarioController.cadastrarUsuarioComSenha(request, response);
}));

routes.get(`/v1/usuarios/:id`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Consulta usuário por id.'

    //  #swagger.parameters['id'] = { description: 'Id do usuário.' }

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Usuario" },
        description: 'Usuário consultado.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await usuarioController.buscarUsuarioPorId(request, response);
}));

routes.put(`/v1/usuarios/id/:id`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Altera usuário por id.'

    //  #swagger.parameters['id'] = { description: 'Id do usuário.' },
    /*  #swagger.parameters['AlterarUsuario'] = {
        in: 'body',
        description: 'Cadastrar usuário com senha.',
        schema: { $ref: '#/definitions/AlterarUsuario' }
    } */

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Usuario" },
        description: 'Usuário alterado.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await usuarioController.alterarUsuario(request, response);
}));

routes.put(`/v1/usuarios/desativa/:id`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Desativa usuário por id.'

    // #swagger.parameters['id'] = { description: 'Id do usuário.' }

    // #swagger.responses[204] = { description: 'Usuário desativado.' } 

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await usuarioController.desativarUsuario(request, response);
}));

routes.put(`/v1/usuarios/ativa/:id`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Ativa usuário por id.'

    // #swagger.parameters['id'] = { description: 'Id do usuário.' }

    // #swagger.responses[204] = { description: 'Usuário ativado.' } 

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await usuarioController.ativarUsuario(request, response);
}));

//#endregion CRUD Usuário

//#region Controla as permissões do usuário

routes.get(`/v1/usuarios/:id/permissoes`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['UsuáriosPermissões']
    // #swagger.description = 'Lista de todas permissões do usuário.'
    
    // #swagger.parameters['id'] = { description: 'Id do usuário.' }

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/PermissoesUsuario" },
        description: 'Lista as permissões do usuário.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
   
    return await usuarioController.todasPermissoesDoUsuario(request, response);
}));

routes.post(`/v1/usuarios/:id/permissoes`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['UsuáriosPermissões']
    // #swagger.description = 'Cadastar várias permissões ao usuário.'

    /*  #swagger.parameters['CadastrarPermissoes'] = {
        in: 'body',
        description: 'Lista de permissões a ser cadastrada para o usuário.',
        schema: { $ref: '#/definitions/CadastrarPermissoes' }
    } */

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/PermissoesCadastradas" },
        description: 'Lista de permissões cadastrada para o usuário.' 
     } 
    */

    /** #swagger.responses[401] = {
        schema: { $ref: "#/definitions/Error401" },
        description: 'Não autorizado.' 
     } 
    */

    /** #swagger.responses[403] = {
        schema: { $ref: "#/definitions/Error403" },
        description: 'Sem premissão.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
   
    return await usuarioController.incluirPermissoesAoUsuario(request, response);
}));


//#endregion Controla as permissões do usuário

export { routes }
