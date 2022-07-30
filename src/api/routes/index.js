import { Router } from 'express';
import asyncHandler from 'express-async-handler';

const swaggerFile = require('../controller/doc/swagger.json');
const swaggerUi = require('swagger-ui-express');

import PermissaoController from '../controller/PermissaoController';
import UsuarioController from '../controller/UsuarioController';

const routes = Router();

const permissaoController = new PermissaoController();
const usuarioController = new UsuarioController();

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//#region Permissão

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

//#endregion

//#region Usuário

routes.get(`/v1/usuarios`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Lista de todos usuários cadastrados.'

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

routes.post(`/v1/usuarios`, asyncHandler(async (request, response) => {
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

//#endregion

export { routes }
