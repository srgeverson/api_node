import { StatusCode } from 'status-code-enum';
import UsuarioService from '../../domain/service/UsuarioService';

class UsuarioController {

    constructor() {
        this.usuarioService = new UsuarioService();
    }

    async todosUsuarios(request, response) {
        const usuarios = await this.usuarioService.buscarTodos();
        if (usuarios.statusCode)
            return response.status(usuarios.statusCode).json(usuarios);
        else
            return response.status(StatusCode.SuccessOK).json(usuarios);
    }

    async cadastrarUsuarioComSenha(request, response) {
        const { nome, email, senha } = request.body;
        const usuarioCadastrado = await this.usuarioService.cadastrarUsuarioComSenha({ nome, email, senha });
        if (usuarioCadastrado.statusCode)
            return response.status(usuarioCadastrado.statusCode).json(usuarioCadastrado);
        else
            return response.status(StatusCode.SuccessCreated).json(usuarioCadastrado);
    }

    async cadastrarUsuarioSemSenha(request, response) {
        const { nome, email } = request.body;
        const usuarioCadastrado = await this.usuarioService.cadastrarUsuarioSemSenha({ nome, email });
        if (usuarioCadastrado.statusCode)
            return response.status(usuarioCadastrado.statusCode).json(usuarioCadastrado);
        else
            return response.status(StatusCode.SuccessOK).json(usuarioCadastrado);
    }

    async buscarUsuarioPorId(request, response) {
        const { id } = request.params;
        const usuarioEncontrado = await this.usuarioService.buscarPorId(id);
        if (usuarioEncontrado.statusCode)
            return response.status(usuarioEncontrado.statusCode).json(usuarioEncontrado);
        else
            return response.status(StatusCode.SuccessOK).json(usuarioEncontrado);
    }

    async buscarUsuarioPorNome(request, response) {
        const { nome } = request.params;
        const usuarioEncontrado = await this.usuarioService.buscarPorNome(nome);
        if (usuarioEncontrado.statusCode)
            return response.status(usuarioEncontrado.statusCode).json(usuarioEncontrado);
        else
            return response.status(StatusCode.SuccessOK).json(usuarioEncontrado);
    }

    async alterarUsuario(request, response) {
        const { id } = request.params;
        const { nome, email, ativo } = request.body;
        const usuarioAlterado = await this.usuarioService.alterarUsuario({ id, nome, email, ativo });
        if (usuarioAlterado.statusCode)
            return response.status(usuarioAlterado.statusCode).json(usuarioAlterado);
        else
            return response.status(StatusCode.SuccessOK).json(usuarioAlterado);
    }

    async desativarUsuario(request, response) {
        const { id } = request.params;
        const usuarioDesativado = await this.usuarioService.ativarOuDesativarUsuario({ id, ativo: false });
        if (usuarioDesativado.statusCode)
            return response.status(usuarioDesativado.statusCode).json(usuarioDesativado);
        else
            return response.status(StatusCode.SuccessNoContent).json(usuarioDesativado);
    }

    async ativarUsuario(request, response) {
        const { id } = request.params;
        const usuarioAtivado = await this.usuarioService.ativarOuDesativarUsuario({ id, ativo: true });
        if (usuarioAtivado.statusCode)
            return response.status(usuarioAtivado.statusCode).json(usuarioAtivado);
        else
            return response.status(StatusCode.SuccessNoContent).json(usuarioAtivado);
    }

    async todasPermissoesDoUsuario(request, response) {
        const { id } = request.params;
        const permissoesDoUsuario = await this.usuarioService.todasPermissoesDoUsuario({id});
        if (permissoesDoUsuario.statusCode)
            return response.status(permissoesDoUsuario.statusCode).json(permissoesDoUsuario);
        else
            return response.status(StatusCode.SuccessOK).json(permissoesDoUsuario);
    }
}

export default UsuarioController;