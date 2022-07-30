import { StatusCode } from 'status-code-enum';
import UsuarioRepository from '../repository/UsuarioRepository';
import { ErrorHandler } from '../../core/helpers/error';

class UsuarioService {

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async buscarTodos() {
        return await this.usuarioRepository
            .findAll()
            .then(async usuarios => {
                return usuarios;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao consultar os usuarios.');
            });
    }

    async cadastrarUsuarioComSenha(usuario) {
        if (!usuario.nome)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Nome de usuário não informado.');

        const usuarioExistente = await this.usuarioRepository.findByNome(usuario.nome);
        if (usuarioExistente)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Já existe um usuário cadastrado com esse nome.');

        return await this.usuarioRepository
            .saveUsuarioComSenha(usuario)
            .then(async usuario => {
                return usuario;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao cadastrar usuario com senha.');
            });
    }

    // async buscarPorNome(nome) {
    //     return await this.usuarioRepository
    //         .findByNome(nome)
    //         .then(async usuario => {
    //             return usuario;
    //         })
    //         .catch(() => {
    //             return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao consultar usuario por nome.');
    //         });
    // }
}

export default UsuarioService;
