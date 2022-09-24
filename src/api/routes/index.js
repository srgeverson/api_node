import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { client, resourceOwner } from '../../core/auth';
import image from '../../core/image';
import PermissaoController from '../controller/PermissaoController';
import UsuarioController from '../controller/UsuarioController';

const swaggerFile = require('../controller/doc/swagger.json');
const swaggerUi = require('swagger-ui-express');
const uploadImage = multer(image);
const routes = Router();
const permissaoController = new PermissaoController();
const usuarioController = new UsuarioController();

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//#region Fluxo de Autorização

routes.put(`/v1/usuarios/recuperar-acesso`, client, asyncHandler(async (request, response) => {
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

routes.post(`/v1/usuarios/sem-senha`, client, asyncHandler(async (request, response) => {
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

routes.post(`/v1/usuarios/token`, client, asyncHandler(async (request, response) => {
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

routes.put(`/v1/usuarios/validar-acesso`, client, asyncHandler(async (request, response) => {
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

//#endregion Fluxo de Autorização

//#region CRUD Permissão

routes.get(`/v1/permissoes`, resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Permissões']
    // #swagger.description = 'Lista de todas permissões cadastradas.'

    // #swagger.security = [{'Autorização':[]}]     

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

routes.put(`/v1/permissoes/ativa/:id`, resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Permissões']
    // #swagger.description = 'Ativa permissão por id.'

    // #swagger.security = [{'Autorização':[]}]     

    // #swagger.parameters['id'] = { description: 'Id do permissão.' }

    // #swagger.responses[204] = { description: 'Permissão ativada.' } 

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
    return await permissaoController.ativarPermissao(request, response);
}));

routes.put(`/v1/permissoes/desativa/:id`, resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Permissões']
    // #swagger.description = 'Desativa permissão por id.'

    // #swagger.security = [{'Autorização':[]}]     

    // #swagger.parameters['id'] = { description: 'Id do permissão.' }

    // #swagger.responses[204] = { description: 'Permissão desativada.' } 

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
    return await permissaoController.desativarPermissao(request, response);
}));

//#endregion CRUD Permissão

//#region CRUD Usuário

routes.get(`/v1/usuarios`, resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Lista de todos usuários cadastrados.'

    // #swagger.security = [{'Autorização':[]}] 

    // #swagger.parameters['id'] = { description: 'Id do usuário.', type: 'number', format: 'int32' }

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

routes.get(`/v1/usuarios/:id`,  resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Consulta usuário por id.'

    // #swagger.security = [{'Autorização':[]}] 

    // #swagger.parameters['id'] = { description: 'Id do usuário.', type: 'number', format: 'int32' }

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

routes.put(`/v1/usuarios/alterar-foto`, resourceOwner, uploadImage.single('foto'), asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Atualizar foto perfil.'

    // #swagger.security = [{'Autorização':[]}] 

    // #swagger.consumes  = ['multipart/form-data']

    /*  #swagger.parameters['UsuarioFoto'] = {
        in: 'body',
        description: 'Alterar foto perfil.',
        schema: { $ref: '#/definitions/UsuarioFoto' }
    } */

    // #swagger.responses[204] = { description: 'Foto alterada.' } 

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
    return await usuarioController.alterarFotoUsuario(request, response);
}));

routes.put(`/v1/usuarios/ativa/:id`, resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Ativa usuário por id.'

    // #swagger.security = [{'Autorização':[]}] 

    // #swagger.parameters['id'] = { description: 'Id do usuário.', type: 'number', format: 'int32' }

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

routes.put(`/v1/usuarios/desativa/:id`, resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Desativa usuário por id.'

    // #swagger.security = [{'Autorização':[]}] 

    // #swagger.parameters['id'] = { description: 'Id do usuário.', type: 'number', format: 'int32' }

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

routes.post(`/v1/usuarios/com-senha`, resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Cadastrar um usuário com senha.'

    // #swagger.security = [{'Autorização':[]}] 

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

routes.put(`/v1/usuarios/id/:id`, resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Altera usuário por id.'

    // #swagger.security = [{'Autorização':[]}] 

    // #swagger.parameters['id'] = { description: 'Id do usuário.', type: 'number', format: 'int32' }

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

//#endregion CRUD Usuário

//#region Controla as permissões do usuário

routes.get(`/v1/usuarios/:id/permissoes`, resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['UsuáriosPermissões']
    // #swagger.description = 'Lista de todas permissões do usuário.'

    // #swagger.security = [{'Autorização':[]}] 

    // #swagger.parameters['id'] = { description: 'Id do usuário.', type: 'number', format: 'int32' }

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
     console.log('todasPermissoesDoUsuario');
    return await usuarioController.todasPermissoesDoUsuario(request, response);
}));

routes.get(`/v1/usuarios/:id/permissoes/:ativo`, resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['UsuáriosPermissões']
    // #swagger.description = 'Lista de todas permissões ativada/desativada do usuário.'

    // #swagger.security = [{'Autorização':[]}] 

    // #swagger.parameters['id'] = { description: 'Id do usuário.', type: 'number', format: 'int32' }
    
    // #swagger.parameters['ativo'] = { description: 'status do usuário.',  type: 'boolean'  }

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
console.log('todasPermissoesDoUsuarioPorAtivo');
    return await usuarioController.todasPermissoesDoUsuarioPorAtivo(request, response);
}));

routes.put(`/v1/usuarios/:id/permissoes/:idPermissao/adicionar`,  resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['UsuáriosPermissões']
    // #swagger.description = 'Cadastar permissão ao usuário.'

    // #swagger.security = [{'Autorização':[]}] 

    // #swagger.parameters['id'] = { description: 'Id do usuário.', type: 'number', format: 'int32' }
    // #swagger.parameters['idPermissao'] = { description: 'Id do usuário.', type: 'number', format: 'int32' }

    // #swagger.responses[204] = { description: 'Permissão cadastrada/ativada com sucesso.' } 

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

    return await usuarioController.incluirPermissaoAoUsuario(request, response);
}));

routes.delete(`/v1/usuarios/:id/permissoes/:idPermissao/remover`,  resourceOwner, asyncHandler(async (request, response) => {
    // #swagger.tags = ['UsuáriosPermissões']
    // #swagger.description = 'Cadastar permissão ao usuário.'

    // #swagger.security = [{'Autorização':[]}] 

    // #swagger.parameters['id'] = { description: 'Id do usuário.', type: 'number', format: 'int32' }
    // #swagger.parameters['idPermissao'] = { description: 'Id da permissão.', type: 'number', format: 'int32' }
    
    // #swagger.responses[204] = { description: 'Permissão removida/desativada com sucesso.' } 

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

    return await usuarioController.removerPermissaoDoUsuario(request, response);
}));

//#endregion Controla as permissões do usuário

//#region  Imagens

// v1/imagens/usuarios/nome_da_foto.png

//#endregion Imagens

export { routes }
