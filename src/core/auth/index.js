import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { StatusCode } from 'status-code-enum';
import { ErrorHandler } from '../helpers/error';

export default async (request, response, next) => {
    try {
        const chave = process.env.KEY_SECRET;
        //console.log(`chave=${JSON.stringify(chave)}`);

        const authorizationHeader = request.headers.authorization;
        //console.log(`authorizationHeader=${JSON.stringify(authorizationHeader)}`);

        if (!authorizationHeader)
            return response.status(StatusCode.ClientErrorUnauthorized).json({
                statusCode: StatusCode.ClientErrorUnauthorized,
                message: 'Token não informado!'
            });

        const [bearer, token] = authorizationHeader.split(' ');
        //console.log(`bearer, token=${JSON.stringify({ bearer, token })}`);

        const decoded = await promisify(jwt.verify)(token, chave);
        request.usuarioId = decoded.id;
        //console.log(`request.usuarioId=${JSON.stringify(request.usuarioId)}_________decoded.id=${JSON.stringify(decoded.id)}`);
        return next();
    } catch (err) {
        return response.status(StatusCode.ClientErrorUnauthorized).json({
            statusCode: StatusCode.ClientErrorUnauthorized,
            message: 'Token inválido!'
        });
    }
}