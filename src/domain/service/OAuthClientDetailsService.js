import { StatusCode } from 'status-code-enum';
import OAuthClientDetailsRepository from '../repository/OAuthClientDetailsRepository';
import { ErrorHandler } from '../../core/helpers/error';

class OAuthClientDetailsService {

    constructor() {
        this.oAuthClientDetailsRepository = new OAuthClientDetailsRepository();
    }
    
    async buscarPorClientId(clientId) {
        if (!clientId)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Client id não informado.');

        return await this.oAuthClientDetailsRepository
            .findByClientId(clientId)
            .then(async clientCretentials => clientCretentials)
            .catch(() => new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao consultar usuario por clientId.'));
    }
}

export default OAuthClientDetailsService;
