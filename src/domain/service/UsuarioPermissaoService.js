import { StatusCode } from 'status-code-enum';
import UsuarioPermissaoRepository from '../repository/UsuarioPermissaoRepository';
import { ErrorHandler } from '../../core/helpers/error';

class UsuarioPermissaoService {

    constructor() {
        this.usuarioPermissaoRepository = new UsuarioPermissaoRepository();
    }

    async ativarOuDesativarPermissaoDoUsuario(usuarioPermissao) {
        return await this.usuarioPermissaoRepository
            .updateAtivoByIdOfUsuarioAndPermissao(usuarioPermissao)
            .then(async usuarioPermissaoAlterado => {
                return usuarioPermissaoAlterado;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao alterara permissão do usuário informado.');
            });
    }

    async buscarPorIdDeUsuarioEPermissao(usuarioPermissao) {
        return await this.usuarioPermissaoRepository
            .findByIdOfUsuarioAndPermissao(usuarioPermissao)
            .then(async usuarioPermissaoEncontrado => {
                return usuarioPermissaoEncontrado;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao consultar as permissões dos usuários.');
            });
    }

    async salvarUsuarioEPermissao(usuarioPermissao) {
        return await this.usuarioPermissaoRepository
            .saveUsuarioAndPermissao(usuarioPermissao)
            .then(async usuarioPermissaoCriado => {
                return usuarioPermissaoCriado;
            })
            .catch((err) => {
                console.log(err)
                return new ErrorHandler(StatusCode.ServerErrorInternal, 
                    err//'Erro ao criar as permissões dos usuários.'
                    );
            });
    }

}

export default UsuarioPermissaoService;
