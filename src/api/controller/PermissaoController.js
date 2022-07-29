import { StatusCode } from 'status-code-enum';
import PermissaoService from '../../domain/service/PermissaoService';
import { ErrorHandler } from '../../core/helpers/error';

class PermissaoController {

    async todasPermissoes(request, response) {
        const permissaoService = new PermissaoService();
        const permissoes = await permissaoService.buscarTodas();
        if (permissoes)
            return response.json(permissoes);
        else
            return response
                .json(new ErrorHandler(StatusCode.ClientErrorNotFound, 'Não há permissões cadastradas.'))
                .status(StatusCode.ClientErrorNotFound);
    }
}

export default PermissaoController;