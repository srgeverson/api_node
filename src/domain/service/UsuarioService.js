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

        if (!usuario.email)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'E-mail de usuário não informado.');

        if (!usuario.senha)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Senha de usuário não informado.');

        const usuarioExistente = await this.usuarioRepository.findByEmail(usuario.email);
        if (usuarioExistente)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Já existe um usuário cadastrado com esse email.');

        return await this.usuarioRepository
            .saveUsuarioComSenha(usuario)
            .then(async usuario => {
                return {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    ativo: usuario.ativo
                }
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao cadastrar usuario com senha.');
            });
    }

    async cadastrarUsuarioSemSenha(usuario) {
        if (!usuario.nome)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Nome de usuário não informado.');

        if (!usuario.email)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'E-mail de usuário não informado.');

        const usuarioExistente = await this.usuarioRepository.findByEmail(usuario.email);
        if (usuarioExistente)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Já existe um usuário cadastrado com esse email.');

        let usuarioComCodigoAcesso = { ...usuario, ...{ codigoAcesso: Math.random().toString(36).substr(3, 10) } };
        return await this.usuarioRepository
            .saveUsuarioSemSenha(usuarioComCodigoAcesso)
            .then(async () => {
                return {
                    mensagem: "Senha enviada por email, confira e siga as intruções."
                }
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao cadastrar usuario com senha.');
            });
    }

    async buscarPorId(id) {

        if (isNaN(id))
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Id de usuário não é válido.');

        const usuario = await this.usuarioRepository
            .findById(id)
            .then(async usuario => {
                return usuario;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao consultar usuario por id.');
            });
        if (usuario)
            return {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                ativo: usuario.ativo
            }
        else
            return new ErrorHandler(StatusCode.ClientErrorNotFound, `Não foi encontrado usuário com o id = ${id}.`);
    }

    async buscarPorEmail(email) {
        return await this.usuarioRepository
            .findByEmail(email)
            .then(async usuario => {
                return usuario;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao consultar usuario por email.');
            });
    }

    async alterarUsuario(usuario) {

        const usuarioEncontrado = await this.buscarPorId(usuario.id);
        
        if (usuarioEncontrado.statusCode)
            return usuarioEncontrado;

        if (!usuario.email)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Nome de usuário não informado.');

        const usuarioExistente = await this.buscarPorEmail(usuario.email);
        if (usuarioExistente)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Já existe um usuário cadastrado com esse email.');

        return await this.usuarioRepository
            .updateUsuario(usuario)
            .then(async id => {
                return this.buscarPorId(id);
            })
            .catch((err) => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao alterar usuário o senha.');
            });
    }
}

export default UsuarioService;
