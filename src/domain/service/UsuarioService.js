import { StatusCode } from 'status-code-enum';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { ErrorHandler } from '../../core/helpers/error';
import UsuarioRepository from '../repository/UsuarioRepository';
import { enviarEmail } from '../../core/mail';
import { validateEmail } from '../../core/helpers/utils';
import PermissaoService from '../service/PermissaoService';
import UsuarioPermissaoService from '../service/UsuarioPermissaoService';

class UsuarioService {

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
        this.permissaoService = new PermissaoService();
        this.usuarioPermissaoService = new UsuarioPermissaoService();
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

    async alterarFotoUsuario(usuario) {

        if (!usuario.foto)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Foto inválida ou não informada.');

        const id = usuario.id;
        console.log(usuario);
        const usuarioEncontrado = await this.buscarPorId(id);
        if (usuarioEncontrado.statusCode)
            return usuarioEncontrado;

        const nomeFoto = usuario.foto.filename;

        const fotoAntiga = usuario.foto.destination + "/" + nomeFoto;

        fs.access(fotoAntiga, (err) => {
            if (!err)
                fs.unlink(fotoAntiga, () => console.log('Imagem excluida sucesso'));
        });

        return await this.usuarioRepository
            .updateUsuario(usuario)
            .then(async id => {
                return this.buscarPorId(id);
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao alterar usuário o senha.');
            });
    }

    async buscarPorEmail(email) {
        if (!email)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'E-mail de usuário não informado.');

        if (!validateEmail(email))
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'E-mail informado não é válido.');

        return await this.usuarioRepository
            .findByEmail(email)
            .then(async usuario => {
                return usuario;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao consultar usuario por email.');
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

    async cadastrarSenhaComCodigo(usuario) {

        if (!usuario.senha)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Senha de usuário não informado.');

        const usuarioExistente = await this.buscarPorEmail(usuario.email);
        if (!usuarioExistente)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Não existe usuário cadastrado com e-mail informado.');

        if (!usuarioExistente.codigo_acesso)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Usuário não possue código de acesso, reenvie seu cadastro ou solicite a recuperação de senha.');

        if (usuario.codigoAcesso !== usuarioExistente.codigo_acesso)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Código de acesso não é valido ou está errado.');

        if (usuario.senha.length < 6)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Senha tem que possuir pelo menos 6 caracteres.');

        const senhaEncriptada = await bcrypt.hash(usuario.senha, 12);

        return await this.usuarioRepository.updateSenhaByEmail({ email: usuario.email, senha: senhaEncriptada }).then(async () => {
            return {
                id: usuarioExistente.id,
                nome: usuarioExistente.nome,
                email: usuarioExistente.email,
                ativo: usuarioExistente.ativo
            }
        })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao validar o acesso do usuário.');
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

    async enviarCodigoAcessoParaEmail(usuario) {

        const usuarioExistente = await this.buscarPorEmail(usuario.email);
        if (!usuarioExistente)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Usuário não encontrado com o e-mail informado.');

        const codigoAcesso = Math.random().toString(36).substr(3, 10);

        return await this.usuarioRepository
            .updateCodigoAcessoByEmail({ email: usuario.email, codigoAcesso })
            .then(async () => {
                await enviarEmail({
                    from: process.env.EMAIL_FROM,
                    to: [process.env.EMAIL_TO, usuarioExistente.email].join(';'),
                    subject: "API Node JS - Código de Validação/Recuperação de acesso",
                    text: `${usuarioExistente.nome} o código de validação de acesso é: ${codigoAcesso}`,
                    html: `<br />Acesse o sistema e digite o código recebido para ativar o acesso
                            <br />${usuarioExistente.nome} o código de validação de acesso é: ${codigoAcesso}`
                },
                    process.env.EMAIL_SERVICE);
                return { mensagem: "Senha enviada por email, confira e siga as intruções." }
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao recuperar a senha.');
            });
    }

    async incluirPermissaoAoUsuario(usuario) {
        const usuarioEncontrado = await this.buscarPorId(usuario.id);

        if (usuarioEncontrado.statusCode)
            return usuarioEncontrado;

        if (!usuarioEncontrado.ativo)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Usuário informado não está ativo.');

        const permissao = await this.permissaoService.buscarPorId(usuario.idPermissao);
        if (permissao.statusCode)
            return permissao;

        const permissaoParaCadastro = { usuarioId: usuario.id, permissaoId: usuario.idPermissao };
        const usuariosPermissoes = await this.usuarioPermissaoService
            .buscarPorIdDeUsuarioEPermissao(permissaoParaCadastro);
        if (usuariosPermissoes) {
            console.log('isEquivalent')
            if (usuariosPermissoes.ativo === true)
                return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Usuário já possui a permissão e a mesma está ativa.');
            else {
                return this.usuarioPermissaoService.ativarOuDesativarPermissaoDoUsuario({ ...permissaoParaCadastro, ativo: true });
            }
        } else 
            return this.usuarioPermissaoService.salvarUsuarioEPermissao({ usuarioId: usuarioEncontrado.id, permissaoId: usuario.idPermissao });
    }

    async incluirPermissoesAoUsuario(usuario) {

        const usuarioEncontrado = await this.buscarPorId(usuario.id);

        if (usuarioEncontrado.statusCode)
            return usuarioEncontrado;

        if (!usuarioEncontrado.ativo)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Usuário informado não está ativo.');

        let permissoesOk = [];
        let permissoesNaoOk = [];
        const validarPermissoes = new Promise((resolve, reject) => {
            usuario.permissoes.forEach(async (value, index, array) => {
                await this.usuarioRepository
                    .findPermissaoByUsuario({ id: usuario.id, permissaoId: value })
                    .then(permissaoEncontrada => {
                        const { permissoes } = permissaoEncontrada;
                        if (permissoes) {
                            console.log(permissoes[0].ativo)
                            if (permissoes[0].ativo === false)
                                permissoesNaoOk.push({ id: value, mensagem: 'Usuário já possui esta permissão, porém a mesma não está ativa.' });
                            else if (!permissoes[0].usuarios_permissoes.ativo)
                                permissoesNaoOk.push({ id: value, mensagem: 'Usuário já possui esta permissão, porém a mesma está desativada para este usuário.' });
                            else if (permissoes[0].ativo && permissoes[0].usuarios_permissoes.ativo)
                                permissoesNaoOk.push({ id: value, mensagem: 'Usuário já possui esta permissão.' });
                        }
                        if (index === array.length - 1)
                            resolve();
                    }).catch(async () => {
                        await this.permissaoService.buscarPorId(value)
                            .then((permissao) => {
                                if (permissao.statusCode)
                                    permissoesNaoOk.push({ id: value, mensagem: 'Não existe permissão cadastrada com este id.' })
                                else if (permissao.ativo)
                                    permissoesOk.push({ id: value, mensagem: null });
                                else if (!permissao.ativo)
                                    permissoesNaoOk.push({ id: value, mensagem: 'Permissão não está ativa.' });
                            }).catch(() => {
                                permissoesNaoOk.push({ id: value, mensagem: 'Falha ao validar permissão.' })
                            }
                            );
                        if (index === array.length - 1)
                            resolve();
                    });
            });
        });

        //Adicionando as permissões
        //usuarioEncontrado.setPermissoes([7,8,9]);

        return await validarPermissoes.then(() => {
            return { id: usuario.id, permissoes: permissoesOk.concat(permissoesNaoOk) };
        }).catch(() => {
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Falha durante o processo de validação de permissão.');
        });
    }

    async removerPermissaoDoUsuario(usuario) {
        const usuarioEncontrado = await this.buscarPorId(usuario.id);
        if (usuarioEncontrado.statusCode)
            return usuarioEncontrado;

        if (!usuarioEncontrado.ativo)
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'Usuário informado não está ativo.');

        const permissao = await this.permissaoService.buscarPorId(usuario.idPermissao);
        if (permissao.statusCode)
            return permissao;

        const permissaoParaCadastro = { usuarioId: usuario.id, permissaoId: usuario.idPermissao };

        const usuariosPermissoes = await this.usuarioPermissaoService.buscarPorIdDeUsuarioEPermissao(permissaoParaCadastro);
        if (usuariosPermissoes) {
            if (usuariosPermissoes.ativo === true)
                return this.usuarioPermissaoService.ativarOuDesativarPermissaoDoUsuario({ ...permissaoParaCadastro, ativo: false });
            else {
                return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'A permissão informada já encontra-se desativada.');
            }
        } else {
            return new ErrorHandler(StatusCode.ClientErrorBadRequest, 'A permissão informada não foi encontrada para o usuário informado.');
        }
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

        if (!usuarioExistente.senha)
            return new ErrorHandler(StatusCode.ClientErrorUnauthorized, 'Usuário não possui senha cadastrada.');

        if (!await bcrypt.compare(usuario.senha, usuarioExistente.senha))
            return new ErrorHandler(StatusCode.ClientErrorUnauthorized, 'Senha inválida.');

        const permissoesUsuario = await this.usuarioRepository.findPermissoesByEmail(usuario);
        const expiresIn = parseInt(process.env.EXPIRES_IN);
        const chave = process.env.KEY_SECRET;
        const permissoes = permissoesUsuario.permissoes.map(permissao => permissao.ativo && permissao.nome);
        console.log("--------------------------------------------------------------------------------------------------");
        return await this.usuarioRepository
            .updateDataDeAcesso(usuario)
            .then(async () => {
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
            })
            .catch((err) => {
                console.log(err);
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao gerer o token de acesso.');
            });
    }

}

export default UsuarioService;
