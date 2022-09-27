import UsuarioPermissao from '../model/UsuarioPermissao';
const moment = require('moment-timezone');

class UsuarioPermissaoRepository {

    async findByIdOfUsuarioAndPermissao(usuarioPermissao) {
        const { usuarioId, permissaoId } = usuarioPermissao;
        return await UsuarioPermissao.findOne({
            where: { usuario_id: usuarioId, permissao_id: permissaoId }
        });
    }

    async saveUsuarioAndPermissao(usuarioPermissao) {
        const { usuarioId, permissaoId } = usuarioPermissao;
        return await UsuarioPermissao.create({
            usuario_id: usuarioId,
            permissao_id: permissaoId,
            ativo: false,
            data_cadastro: moment.utc(),
            data_operacao: moment.utc()
        });
    }

    async updateAtivoByIdOfUsuarioAndPermissao(usuarioPermissao) {
        const { usuarioId, permissaoId, ativo } = usuarioPermissao;
        return await UsuarioPermissao.update({
            ativo: ativo ? true : false,
            data_operacao: moment.utc()
        }, {
            where: {
                usuario_id: usuarioId,
                permissao_id: permissaoId,
            }
        });
    }
}

export default UsuarioPermissaoRepository;
