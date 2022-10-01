import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { StatusCode } from 'status-code-enum';
import OAuthClientDetailsService from '../../domain/service/OAuthClientDetailsService';

const client = async (request, response, next) => {
    try {
        const authorizationHeader = request.headers.authorization;
        
        if (!authorizationHeader) {
            return response.status(StatusCode.ClientErrorUnauthorized).json({
                statusCode: StatusCode.ClientErrorUnauthorized,
                message: 'Credenciais do client não informada!'
            });
        }

        const [basic, token] = authorizationHeader.split(' ');

        const oAuthClientDetailsService = new OAuthClientDetailsService();

        const decoded = Buffer.from(token, 'base64').toString('ascii').split(':');

        const credentials = await oAuthClientDetailsService.buscarPorClientId(decoded[0]);

        if (!credentials) {
            return response.status(StatusCode.ClientErrorUnauthorized).json({
                statusCode: StatusCode.ClientErrorUnauthorized,
                message: 'Credenciais inválidas ou inexistente!'
            });
        }

        if (!await bcrypt.compare(decoded[1], credentials.client_secret)) {
            return response.status(StatusCode.ClientErrorUnauthorized).json({
                statusCode: StatusCode.ClientErrorUnauthorized,
                message: 'Client_secret incorreto!'
            });
        }
        request.accessTokenValidity = credentials.access_token_validity;
        request.refreshTokenValidity = credentials.refresh_token_validity;
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
        const chave = fs.readFileSync(`${path.resolve(__dirname, '..', '..', 'infrastructure', 'keys', 'token_key_public.pem')}`, { encoding: 'utf8' });

        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader)
            return response.status(StatusCode.ClientErrorUnauthorized).json({
                statusCode: StatusCode.ClientErrorUnauthorized,
                message: 'Token não informado!'
            });

        const [bearer, token] = authorizationHeader.split(' ');

        const { id, roles } = await promisify(jwt.verify)(token, chave);
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
        const chave = fs.readFileSync(`${path.resolve(__dirname, '..', '..', 'infrastructure', 'keys', 'token_key_public.pem')}`, { encoding: 'utf8' });

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