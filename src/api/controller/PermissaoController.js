import { StatusCode } from 'status-code-enum';
import { validateRoles } from '../../core/auth';
import PermissaoService from '../../domain/service/PermissaoService';

class PermissaoController {
    
    constructor() {
        this.permissaoService = new PermissaoService();
    }

    async ativarPermissao(request, response) {
        const permissoesValidadas = await validateRoles(['editar_permissao'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
        const { id } = request.params;
        const permissaoAtivada = await this.permissaoService.ativarOuDesativarPermissao({ id, ativo: true });
        if (permissaoAtivada.statusCode)
            return response.status(permissaoAtivada.statusCode).json(permissaoAtivada);
        else
            return response.status(StatusCode.SuccessNoContent).json(permissaoAtivada);
        }
    }

    async desativarPermissao(request, response) {
        const permissoesValidadas = await validateRoles(['editar_permissao'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
        const { id } = request.params;
        const permissaoDesativada = await this.permissaoService.ativarOuDesativarPermissao({ id, ativo: false });
        if (permissaoDesativada.statusCode)
            return response.status(permissaoDesativada.statusCode).json(permissaoDesativada);
        else
            return response.status(StatusCode.SuccessNoContent).json(permissaoDesativada);
        }
    }

    async todasPermissoes(request, response) {
        const permissoesValidadas = await validateRoles(['listar_permissao'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
        const permissoes = await this.permissaoService.buscarTodas();
        if (permissoes.statusCode)
            return response.status(permissoes.statusCode).json(permissoes);
        else
            return response.status(StatusCode.SuccessOK).json(permissoes);
        }
    }
}

export default PermissaoController;