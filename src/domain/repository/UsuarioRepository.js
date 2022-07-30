import Usuario from '../model/Usuario';

class UsuarioRepository {

    async findAll() {
        return await Usuario.findAll({
            attributes: ['id', 'nome', 'ativo']
        });
    }

    async findByNome(nome) {
        return await Usuario.findOne({
            where: {
                nome
            }
        });
    }

    async saveUsuarioComSenha(usuario) {
        return await Usuario.create({ nome: usuario.nome, senha: usuario.senha, ativo: true });
    }
}

export default UsuarioRepository;
