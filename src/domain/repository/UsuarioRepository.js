import Usuario from '../model/Usuario';
import Permissao from '../model/Permissao';

const moment = require('moment-timezone');

class UsuarioRepository {

    /** 
     * @deprecated Adicionar a permissão está sendo realizado pela classe UsuarioPermissaoRepository
     */
    async adicionarPermissaoAoUsuario(usuario) {
        const { usuarioId, permissaoId } = usuario;
        const usuarioParaNovaPermissao = await this.findById(usuarioId);
        const permissaoNova = await Permissao.findOne({ where: { id: permissaoId } });
        return await usuarioParaNovaPermissao.addPermissoes(permissaoNova);
    }

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

    /** 
     * @deprecated Este método foi depreciado, pois houve nececidade de obter mais parâmetros da Classe UsuarioPermissao
     */
    async findPermissaoByUsuario(usuario) {
        const { id, permissaoId } = usuario;
        return await Usuario.findOne({
            attributes: [],
            include: [{
                model: Permissao,
                as: 'permissoes',
                attributes: ['id', 'nome', 'descricao', 'ativo'],
                through: { attributes: ['id', 'ativo'] },
                where: { id: permissaoId }
            }],
            where: { id }
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

    async findPermissoesByEmailAndAtivo(usuario) {
        const { email, ativo } = usuario;
        return await Usuario.findOne({
            attributes: [],
            include: [{
                model: Permissao,
                as: 'permissoes',
                attributes: ['nome', 'ativo'],
                through: {
                    attributes: [],
                    where: { ativo: ativo === true ? true : false }
                }
            }],
            where: { email }
        });
    }

    async findPermissoesByUsuario(usuario) {
        return await Usuario.findOne({
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

    async findPermissoesByUsuarioAndAtivo(usuario) {
        const { id, ativo } = usuario;
        return await Usuario.findAll({
            attributes: ['id', 'nome', 'email'],
            include: [{
                model: Permissao,
                as: 'permissoes',
                attributes: ['id', 'nome', 'descricao'],
                through: {
                    attributes: [],
                    where: { ativo: ativo === true ? true : false }
                }
            }],
            where: { id }
        });
    }

    async saveUsuarioComSenha(usuario) {
        return await Usuario.create({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            ativo: true,
            data_cadastro: moment.utc(),
            data_operacao: moment.utc()
        });
    }

    async saveUsuarioSemSenha(usuario) {
        return await Usuario.create({
            nome: usuario.nome,
            email: usuario.email,
            codigo_acesso: usuario.codigoAcesso,
            ativo: true,
            data_cadastro: moment.utc(),
            data_operacao: moment.utc()
        });
    }

    async updateCodigoAcessoByEmail(usuario) {
        return await Usuario.update(
            {
                senha: null,
                codigo_acesso: usuario.codigoAcesso,
                data_ultimo_acesso: moment.utc(),
                data_operacao: moment.utc()
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
                ativo: usuario.ativo,
                data_operacao: moment.utc()
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
                ativo: usuario.ativo,
                data_operacao: moment.utc()
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
                codigo_acesso: null,
                data_operacao: moment.utc()
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
