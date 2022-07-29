import { StatusCode } from 'status-code-enum';
import UsuarioService from '../../domain/service/UsuarioService';
import { ErrorHandler } from '../../core/helpers/error';

class UsuarioController {

    async todosUsuarios(request, response) {
        const usuarioService = new UsuarioService();
        const usuarios = await usuarioService.buscarTodos();
        if (usuarios)
            return response.json(usuarios);
        else
            return response
                .json(new ErrorHandler(StatusCode.ClientErrorNotFound, 'Não há usuário cadastrado.'))
                .status(StatusCode.ClientErrorNotFound);
    }
}

export default UsuarioController;