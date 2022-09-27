import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { StatusCode } from 'status-code-enum';

const client = async (request, response, next) => {
    try {
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;

        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader)
            return response.status(StatusCode.ClientErrorUnauthorized).json({
                statusCode: StatusCode.ClientErrorUnauthorized,
                message: 'Credenciais do client não informada!'
            });

        const [basic, token] = authorizationHeader.split(' ');

        const decoded = Buffer.from(token, 'base64').toString('ascii').split(':');
        if (decoded[0] != client_id)
            return response.status(StatusCode.ClientErrorUnauthorized).json({
                statusCode: StatusCode.ClientErrorUnauthorized,
                message: 'Client_id incorreto!'
            });

        if (decoded[1] != client_secret)
            return response.status(StatusCode.ClientErrorUnauthorized).json({
                statusCode: StatusCode.ClientErrorUnauthorized,
                message: 'Client_secret incorreto!'
            });
        return next();
    } catch (err) {
        return response.status(StatusCode.ClientErrorUnauthorized).json({
            statusCode: StatusCode.ClientErrorUnauthorized,
            message: 'Credenciais do client invalidas!'
        });
    }
}

const resourceOwner = async (request, response, next) => {
    try {
        const chave = process.env.KEY_SECRET;

        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader)
            return response.status(StatusCode.ClientErrorUnauthorized).json({
                statusCode: StatusCode.ClientErrorUnauthorized,
                message: 'Token não informado!'
            });

        const [bearer, token] = authorizationHeader.split(' ');

        const {id, roles} = await promisify(jwt.verify)(token, chave);
        request.usuarioAutenticadoId = id;
        request.usuarioAutenticadoRoles = roles;

        return next();
    } catch (err) {
        return response.status(StatusCode.ClientErrorUnauthorized).json({
            statusCode: StatusCode.ClientErrorUnauthorized,
            message: 'Token inválido!'
        });
    }
}

const validateToken = async (token) => {
    try {
        const chave = process.env.KEY_SECRET;
        return await promisify(jwt.verify)(token, chave);
    } catch (err) {
        return {
            statusCode: StatusCode.ClientErrorUnauthorized,
            message: 'Token inválido!'
        };
    }
}

const validateRoles = async (rolesEndpoint = [], rolesToken = [], endPoint = null) => {
    let roles = [];
    rolesEndpoint.forEach(item => (rolesToken.indexOf(item) === -1) && roles.push(item));

    if (roles && roles.length)
        return {
            statusCode: StatusCode.ClientErrorForbidden,
            message: `${endPoint ? 'Endpoint de origem ' + endPoint + '.' : ''} Acesso negado, solicitação exige a(s) permissão(ões) [${roles}].`
        };
}

export { client, resourceOwner, validateRoles, validateToken };