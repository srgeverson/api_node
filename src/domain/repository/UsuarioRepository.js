import Usuario from '../model/Usuario';

const moment = require('moment-timezone');

class UsuarioRepository {

    async findAll() {
        return await Usuario.findAll({
            attributes: ['id', 'nome', 'email', 'ativo', 'data_cadastro', 'data_ultimo_acesso']
        });
    }

    async findByEmail(email) {
        return await Usuario.findOne({
            where: {
                email
            }
        });
    }

    async findById(id) {
        return await Usuario.findOne({
            where: {
                id
            }
        });
    }

    async saveUsuarioComSenha(usuario) {
        return await Usuario.create({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            ativo: true,
            data_cadastro: moment.utc().format('YYYY-MM-DD HH:mm:ss')
        });
    }
}

export default UsuarioRepository;
