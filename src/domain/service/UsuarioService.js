import { StatusCode } from 'status-code-enum';
import { ErrorHandler } from '../../core/helpers/error';
import UsuarioRepository from '../repository/UsuarioRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { enviarEmail } from '../../core/mail';

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

        const senha = await bcrypt.hash(usuario.senha, 12);

        return await this.usuarioRepository
            .saveUsuarioComSenha({
                nome: usuario.nome,
                email: usuario.email,
                senha: senha
            })
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
                await enviarEmail({
                    from: process.env.EMAIL_FROM,
                    to: [process.env.EMAIL_TO, usuario.email].join(';'),
                    subject: "API Node JS - Código de Validação/Recuperação de acesso",
                    text: `${usuarioComCodigoAcesso.nome} o código de validação de acesso é: ${usuarioComCodigoAcesso.codigoAcesso}`,
                    html: `<br />Acesse o sistema e digite o código recebido para ativar o acesso
                            <br />${usuarioComCodigoAcesso.nome} o código de validação de acesso é: ${usuarioComCodigoAcesso.codigoAcesso}`
                },
                    process.env.EMAIL_SERVICE);
                return { mensagem: "Senha enviada por email, confira e siga as intruções." }
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
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao alterar usuário o senha.');
            });
    }

    async ativarOuDesativarUsuario(usuario) {

        const usuarioEncontrado = await this.buscarPorId(usuario.id);

        if (usuarioEncontrado.statusCode)
            return usuarioEncontrado;

        if (usuario.ativo === usuarioEncontrado.ativo)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Usuário já encontrase ativado/desativado.');

        return await this.usuarioRepository
            .updateUsuarioAtivo(usuario)
            .then(async permissoesByUsuario => {
                return permissoesByUsuario;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao alterar usuário o senha.');
            });
    }

    async todasPermissoesDoUsuario(usuario) {

        const usuarioEncontrado = await this.buscarPorId(usuario.id);

        if (usuarioEncontrado.statusCode)
            return usuarioEncontrado;

        return await this.usuarioRepository
            .findPermissoesByUsuario(usuario)
            .then(async permissoesDoUsuario => {
                return permissoesDoUsuario;
            })
            .catch((err) => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao pesquisar as permissões do usuário.');
            });
    }

    async validarAcesso(usuario) {
        if (!usuario.email)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'E-mail de usuário não informado.');

        if (!usuario.senha)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Senha de usuário não informado.');

        const usuarioExistente = await this.buscarPorEmail(usuario.email);
        if (!usuarioExistente)
            return new ErrorHandler(StatusCode.ClientErrorUnauthorized, 'E-mail inválido ou usuário não existe.');

        if (!await bcrypt.compare(usuario.senha, usuarioExistente.senha))
            return new ErrorHandler(StatusCode.ClientErrorUnauthorized, 'Senha inválida.');

        const permissoesUsuario = await this.usuarioRepository.findPermissoesByEmail(usuario);
        const expiresIn = parseInt(process.env.EXPIRES_IN);
        const chave = process.env.KEY_SECRET;
        const permissoes = permissoesUsuario.permissoes.map(permissao => permissao.ativo && permissao.nome);

        await this.usuarioRepository.updateDataDeAcesso(usuario);

        return {
            id: usuarioExistente.id,
            nome: usuarioExistente.nome,
            expiresIn,
            access_token: jwt.sign(
                {
                    id: usuarioExistente.id,
                    name: usuarioExistente.nome,
                    roles: permissoes
                },
                chave,
                { expiresIn }
            ),
        }
    }
}

export default UsuarioService;
