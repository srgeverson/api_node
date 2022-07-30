import { StatusCode } from 'status-code-enum';
import PermissaoService from '../../domain/service/PermissaoService';
import { ErrorHandler } from '../../core/helpers/error';

class PermissaoController {

    async todasPermissoes(request, response) {
        const permissaoService = new PermissaoService();
        const permissoes = await permissaoService.buscarTodas();
        if (permissoes.statusCode)
            return response.status(permissoes.statusCode).json(permissoes);
        else
            return response.status(StatusCode.SuccessOK).json(permissoes);
    }
}

export default PermissaoController;