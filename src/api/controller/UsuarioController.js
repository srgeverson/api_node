import { StatusCode } from 'status-code-enum';
import { validateRoles, validateToken } from '../../core/auth';
import UsuarioService from '../../domain/service/UsuarioService';

class UsuarioController {

    constructor() {
        this.usuarioService = new UsuarioService();
    }

    async alterarUsuario(request, response) {
        const permissoesValidadas = await validateRoles(['editar_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { id } = request.params;
            const { nome, email, ativo } = request.body;
            const usuarioAlterado = await this.usuarioService.alterarUsuario({ id, nome, email, ativo });
            if (usuarioAlterado.statusCode)
                return response.status(usuarioAlterado.statusCode).json(usuarioAlterado);
            else
                return response.status(StatusCode.SuccessOK).json(usuarioAlterado);
        }
    }

    async alterarFotoUsuario(request, response) {
        const permissoesValidadas = await validateRoles(['proprio_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { id } = request.body;
            const foto = request.file;
            const usuarioFotoAlterada = await this.usuarioService.alterarFotoUsuario({ id, foto });
            if (usuarioFotoAlterada.statusCode)
                return response.status(usuarioFotoAlterada.statusCode).json(usuarioFotoAlterada);
            else
                return response.status(StatusCode.SuccessOK).json(usuarioFotoAlterada);
        }
    }

    async ativarUsuario(request, response) {
        const permissoesValidadas = await validateRoles(['editar_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { id } = request.params;
            const usuarioAtivado = await this.usuarioService.ativarOuDesativarUsuario({ id, ativo: true });
            if (usuarioAtivado.statusCode)
                return response.status(usuarioAtivado.statusCode).json(usuarioAtivado);
            else
                return response.status(StatusCode.SuccessNoContent).json(usuarioAtivado);
        }
    }

    async buscarUsuarioPorId(request, response) {
        const permissoesValidadas = await validateRoles(['listar_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { id } = request.params;
            const usuarioEncontrado = await this.usuarioService.buscarPorId(id);
            if (usuarioEncontrado.statusCode)
                return response.status(usuarioEncontrado.statusCode).json(usuarioEncontrado);
            else
                return response.status(StatusCode.SuccessOK).json(usuarioEncontrado);
        }
    }

    async buscarUsuarioPorNome(request, response) {
        const permissoesValidadas = await validateRoles(['listar_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { nome } = request.params;
            const usuarioEncontrado = await this.usuarioService.buscarPorNome(nome);
            if (usuarioEncontrado.statusCode)
                return response.status(usuarioEncontrado.statusCode).json(usuarioEncontrado);
            else
                return response.status(StatusCode.SuccessOK).json(usuarioEncontrado);
        }
    }

    async cadastrarSenhaComCodigo(request, response) {
        const { email, senha, codigoAcesso } = request.body;
        const usuarioAutorizado = await this.usuarioService.cadastrarSenhaComCodigo({ email, senha, codigoAcesso });
        if (usuarioAutorizado.statusCode)
            return response.status(usuarioAutorizado.statusCode).json(usuarioAutorizado);
        else
            return response.status(StatusCode.SuccessOK).json(usuarioAutorizado);
    }

    async cadastrarUsuarioComSenha(request, response) {
        const permissoesValidadas = await validateRoles(['cadastrar_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { nome, email, senha } = request.body;
            const usuarioCadastrado = await this.usuarioService.cadastrarUsuarioComSenha({ nome, email, senha });
            if (usuarioCadastrado.statusCode)
                return response.status(usuarioCadastrado.statusCode).json(usuarioCadastrado);
            else
                return response.status(StatusCode.SuccessCreated).json(usuarioCadastrado);
        }
    }

    async cadastrarUsuarioSemSenha(request, response) {
        const { nome, email } = request.body;
        const usuarioCadastrado = await this.usuarioService.cadastrarUsuarioSemSenha({ nome, email });
        if (usuarioCadastrado.statusCode)
            return response.status(usuarioCadastrado.statusCode).json(usuarioCadastrado);
        else
            return response.status(StatusCode.SuccessOK).json(usuarioCadastrado);
    }

    async desativarUsuario(request, response) {
        const permissoesValidadas = await validateRoles(['excluir_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { id } = request.params;
            const usuarioDesativado = await this.usuarioService.ativarOuDesativarUsuario({ id, ativo: false });
            if (usuarioDesativado.statusCode)
                return response.status(usuarioDesativado.statusCode).json(usuarioDesativado);
            else
                return response.status(StatusCode.SuccessNoContent).json(usuarioDesativado);
        }
    }

    async enviarCodigoAcessoParaEmail(request, response) {
        const { email } = request.body;
        const usuarioAutorizado = await this.usuarioService.enviarCodigoAcessoParaEmail({ email });
        if (usuarioAutorizado.statusCode)
            return response.status(usuarioAutorizado.statusCode).json(usuarioAutorizado);
        else
            return response.status(StatusCode.SuccessOK).json(usuarioAutorizado);
    }

    async incluirPermissaoAoUsuario(request, response) {
        const permissoesValidadas = await validateRoles(['editar_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { id, idPermissao } = request.params;
            const permissaoVinculada = await this.usuarioService.incluirPermissaoAoUsuario({ id, idPermissao });
            if (permissaoVinculada.statusCode)
                return response.status(permissaoVinculada.statusCode).json(permissaoVinculada);
            else
                return response.status(StatusCode.SuccessNoContent).json(permissaoVinculada);
        }
    }

    async incluirPermissoesAoUsuario(request, response) {
        const permissoesValidadas = await validateRoles(['editar_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { id } = request.params;
            const permissoes = request.body;
            console.log(permissoes);
            const usuarioAutorizado = await this.usuarioService.incluirPermissoesAoUsuario({ id, permissoes });
            if (usuarioAutorizado.statusCode)
                return response.status(usuarioAutorizado.statusCode).json(usuarioAutorizado);
            else
                return response.status(StatusCode.SuccessOK).json(usuarioAutorizado);
        }
    }

    async login(request, response) {
        let usuarioAutorizado = null;
        const { grant_type, username, password, email, senha, refresh_token } = request.body;
        switch (grant_type) {
            case 'password':
                usuarioAutorizado = await this.usuarioService.validarAcesso({ email: username, senha: password });
                break;
            case 'refresh_token':
                const refreshToken = await validateToken(refresh_token);
                if (refreshToken.statusCode)
                    usuarioAutorizado = refreshToken;
                else
                    usuarioAutorizado = await this.usuarioService.revalidarAcesso({ email: refreshToken.email });
                break;
            default:
                usuarioAutorizado = await this.usuarioService.validarAcesso({ email, senha });
                break;
        }
        if (usuarioAutorizado.statusCode)
            return response.status(usuarioAutorizado.statusCode).json(usuarioAutorizado);
        else
            return response.status(StatusCode.SuccessOK).json(usuarioAutorizado);
    }

    async perfil(request, response) {
        const permissoesValidadas = await validateRoles(['proprio_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            //const { id } = request.usuarioAutenticadoId;
            return response.status(StatusCode.ClientErrorLocked).json({ statusCode: StatusCode.ClientErrorLocked, message: "O recurso sendo acessado está travado." });
        }
    }

    async removerPermissaoDoUsuario(request, response) {
        const permissoesValidadas = await validateRoles(['excluir_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { id, idPermissao } = request.params;
            const permissaoVinculada = await this.usuarioService.removerPermissaoDoUsuario({ id, idPermissao });
            if (permissaoVinculada.statusCode)
                return response.status(permissaoVinculada.statusCode).json(permissaoVinculada);
            else
                return response.status(StatusCode.SuccessNoContent).json(permissaoVinculada);
        }
    }

    async todasPermissoesDoUsuario(request, response) {
        const permissoesValidadas = await validateRoles(['listar_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { id } = request.params;
            const permissoesDoUsuario = await this.usuarioService.todasPermissoesDoUsuario({ id });
            if (permissoesDoUsuario.statusCode)
                return response.status(permissoesDoUsuario.statusCode).json(permissoesDoUsuario);
            else
                return response.status(StatusCode.SuccessOK).json(permissoesDoUsuario);
        }
    }

    async todasPermissoesDoUsuarioPorAtivo(request, response) {
        const permissoesValidadas = await validateRoles(['listar_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const { id, ativo } = request.params;
            const permissoesDoUsuario = await this.usuarioService.todasPermissoesDoUsuarioPorAtivo({ id, ativo });
            if (permissoesDoUsuario.statusCode)
                return response.status(permissoesDoUsuario.statusCode).json(permissoesDoUsuario);
            else
                return response.status(StatusCode.SuccessOK).json(permissoesDoUsuario);
        }
    }

    async todosUsuarios(request, response) {
        const permissoesValidadas = await validateRoles(['listar_usuario'], request.usuarioAutenticadoRoles);
        if (permissoesValidadas && permissoesValidadas.statusCode)
            return response.status(permissoesValidadas.statusCode).json(permissoesValidadas);
        else {
            const usuarios = await this.usuarioService.buscarTodos();
            if (usuarios.statusCode)
                return response.status(usuarios.statusCode).json(usuarios);
            else
                return response.status(StatusCode.SuccessOK).json(usuarios);
        }
    }

}

export default UsuarioController;