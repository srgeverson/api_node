import { Router } from 'express';
import asyncHandler from 'express-async-handler';

const swaggerFile = require('../controller/doc/swagger-output.json');
const swaggerUi = require('swagger-ui-express');

import PermissaoController from '../controller/PermissaoController';

const routes = Router()

const permissaoController = new PermissaoController();

routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes.get('/permissoes', asyncHandler(async (request, response) => {
    // #swagger.tags = ['permissoes']
    // #swagger.description = 'Endpoint para todas permissoes cadastradas.'

    /** #swagger.responses[200] = { 
         schema: { $ref: "#/definitions/Permissao" },
        description: 'Lista de todas permissões existentes.' 
     } 
    */

    /** #swagger.responses[5xx] = {
        schema: { $ref: "#/definitions/Error500" },
        description: 'Erro interno.' 
     }
     */
    return await permissaoController.todasPermissoes(request, response);
}))

export { routes }
