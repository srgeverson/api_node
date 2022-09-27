import Sequelize, { Model } from 'sequelize';

class UsuarioPermissao extends Model {

    static init(sequelize) {
        super.init(
            {
                id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
                usuario_id: { type: Sequelize.INTEGER },
                permissao_id: { type: Sequelize.INTEGER },
                ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
                data_cadastro: { type: Sequelize.DATE },
                data_operacao: { type: Sequelize.DATE },
            },
            {
                sequelize,
                tableName: 'usuarios_permissoes'
            }
        );

        return this
    }

    static associate(models) {
        this.belongsToMany(models.Usuario, {
            through: 'usuarios_permissoes',
            foreignKey: 'usuario_id',
            as: 'usuarios'
        });
        this.belongsToMany(models.Permissao, {
            through: 'usuarios_permissoes',
            foreignKey: 'permissao_id',
            as: 'permissoes'
        });
    }
}

export default UsuarioPermissao
