import Usuario from '../model/Usuario';

const moment = require('moment-timezone');

class UsuarioRepository {

    async findAll() {
        return await Usuario.findAll({
            attributes: ['id', 'nome', 'email', 'ativo']
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
            ativo: true
        });
    }

    async saveUsuarioSemSenha(usuario) {
        return await Usuario.create({
            nome: usuario.nome,
            email: usuario.email,
            codigo_acesso: usuario.codigoAcesso,
            ativo: true
        });
    }

    async updateUsuario(usuario) {
        return await Usuario.update(
            {
                nome: usuario.nome,
                email: usuario.email,
                data_ultimo_acesso: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                ativo: true
            },
            {
                where: {
                    id: usuario.id
                }
            }
        );
    }
}

export default UsuarioRepository;
