import { StatusCode } from 'status-code-enum';
import PermissaoRepository from '../repository/PermissaoRepository';
import { ErrorHandler } from '../../core/helpers/error';

class PermissaoService {

    constructor() {
        this.permissaoRepository = new PermissaoRepository();
    }

    async ativarOuDesativarPermissao(permissao) {
        const permissaoEncontrada = await this.buscarPorId(permissao.id);

        if (permissaoEncontrada.statusCode)
            return permissaoEncontrada;
            
        if (permissao.ativo === permissaoEncontrada.ativo)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Permissão já encontra-se ativado/desativado.');

        return await this.permissaoRepository
            .updatePermissaoAtivo(permissao)
            .then(async permissoesByPermissao => {
                return permissoesByPermissao;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao ativar/desativar permissão.');
            });
    }

    async buscarPorId(id) {

        if (isNaN(id))
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Id da permissão não é válido.');

        const permissao = await this.permissaoRepository
            .findById(id)
            .then(async permissao => {
                return permissao;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao consultar permissão por id.');
            });
        if (permissao)
            return {
                id: permissao.id,
                nome: permissao.nome,
                ativo: permissao.ativo
            }
        else
            return new ErrorHandler(StatusCode.ClientErrorNotFound, `Não foi encontrado permissão com o id = ${id}.`);
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
