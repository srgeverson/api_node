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
        const { nome, senha } = request.body;
        const usuarioCadastrado = await this.usuarioService.cadastrarUsuarioComSenha({ nome, senha });
        if (usuarioCadastrado.statusCode)
            return response.status(usuarioCadastrado.statusCode).json(usuarioCadastrado);
        else
            return response.status(StatusCode.SuccessCreated).json(usuarioCadastrado);
    }
}

export default UsuarioController;