import Usuario from '../model/Usuario';
import Permissao from '../model/Permissao';

const moment = require('moment-timezone');

class UsuarioRepository {

    async deleteByEmail(usuario) {
        return await Usuario.destroy({ where: { email: usuario.email } });
    }
    
    async deleteById(usuario) {
        return await Usuario.destroy({ where: { id: usuario.id } });
    }

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
    
    async findPermissaoByUsuario(usuario) {
        return await Usuario.findOne({
            attributes: [],
            include: [{
                model: Permissao,
                as: 'permissoes',
                attributes: ['id', 'nome', 'descricao', 'ativo'],
                through: {
                    attributes: ['id','ativo']
                },
                where: {
                    id: usuario.permissaoId
                }
            }],
            where: {
                id: usuario.id
            },
        });
    }

    async findPermissoesByEmail(usuario) {
        return await Usuario.findOne({
            attributes: [],
            include: [{
                model: Permissao,
                as: 'permissoes',
                attributes: ['nome', 'ativo'],
                through: {
                    attributes: []
                }
            }],
            where: {
                email: usuario.email
            },
        });
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

    async updateCodigoAcessoByEmail(usuario) {
        return await Usuario.update(
            {
                senha: null,
                codigo_acesso: usuario.codigoAcesso
            },
            {
                where: {
                    email: usuario.email
                }
            }
        );
    }

    async updateDataDeAcesso(usuario) {
        return await Usuario.update(
            { data_ultimo_acesso: moment.utc() },
            { where: { email: usuario.email } }
        );
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

    async updateSenhaByEmail(usuario) {
        return await Usuario.update(
            {
                senha: usuario.senha,
                codigo_acesso: null
            },
            {
                where: {
                    email: usuario.email
                }
            }
        );
    }

}

export default UsuarioRepository;
