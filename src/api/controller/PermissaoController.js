import PermissaoService from '../../domain/service/PermissaoService';

class PermissaoController {

    async todasPermissoes(request, response) {

        const permissaoService = new PermissaoService();

        return response.json(await permissaoService.buscarTodas())
    }
}

export default PermissaoController;