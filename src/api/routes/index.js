import { Router } from 'express';
import asyncHandler from 'express-async-handler';

const swaggerFile = require('../controller/doc/swagger.json');
const swaggerUi = require('swagger-ui-express');

import PermissaoController from '../controller/PermissaoController';

const routes = Router();

const permissaoController = new PermissaoController();

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes.get(`/v1/permissoes`, asyncHandler(async (request, response) => {
    // #swagger.tags = ['Permissões']
    // #swagger.description = 'Lista de todas permissões cadastradas.'

    /** #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Permissoes" },
        description: 'Lista de permissões.' 
     } 
    */

    /** #swagger.responses[500] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await permissaoController.todasPermissoes(request, response);
}))

export { routes }
