import Usuario from '../model/Usuario';
import Permissao from '../model/Permissao';

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
                ativo: usuario.ativo
            },
            {
                where: {
                    id: usuario.id
                }
            }
        );
    }

    async updateUsuarioAtivo(usuario) {
        return await Usuario.update(
            {
                ativo: usuario.ativo
            },
            {
                where: {
                    id: usuario.id
                }
            }
        );
    }

    async findPermissoesByUsuario(usuario) {
        return await Usuario.findAll({
            attributes: ['id', 'nome', 'email'],
            include: [{
                model: Permissao,
                as: 'permissoes',
                attributes: ['id', 'nome', 'descricao'],
                through: {
                    attributes: []
                }
            }],
            where: {
                id: usuario.id
            },
        });
    }
}

export default UsuarioRepository;
