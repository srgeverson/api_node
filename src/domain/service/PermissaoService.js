import { StatusCode } from 'status-code-enum';
import PermissaoRepository from '../repository/PermissaoRepository';
import { ErrorHandler } from '../../core/helpers/error';

class PermissaoService {

    constructor() {
        this.permissaoRepository = new PermissaoRepository();
    }

    async buscarTodas() {
        return await this.permissaoRepository
            .findAll()
            .then(async permissoes => {
                return permissoes;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao consultar as permissões.');
            });
    }
}

export default PermissaoService;
