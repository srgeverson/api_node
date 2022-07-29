import Usuario from '../model/Usuario';

class UsuarioRepository {
    
    async findAll() {
        return await Usuario.findAll({
            attributes: ['id', 'nome', 'ativo']
        });
    }
}

export default UsuarioRepository;
