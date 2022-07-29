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
                if (!usuarios)
                    return { message: 'Não há usuario cadastrado.' }
                return usuarios;
            })
            .catch(() => {
                return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro ao consultar os usuarios.');
            });
    }
}

export default UsuarioService;
