import Sequelize, { Model, DataType, DataTypes } from 'sequelize';

class Usuario extends Model {

    static init(sequelize) {
        super.init(
            {
                id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
                nome: { type: Sequelize.STRING(80) },
                email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
                senha: { type: Sequelize.STRING(255) },
                ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
                codigo_acesso: { type: Sequelize.STRING(10) },
                data_cadastro: { type: Sequelize.DATE },
                data_operacao: { type: Sequelize.DATE },
                data_ultimo_acesso: { type: Sequelize.DATE },
            },
            {
                sequelize,
                tableName: 'usuarios'
            }
        );

        return this
    }

    static associate(models) {
        this.belongsToMany(models.Permissao, {
            through: 'usuarios_permissoes',
            foreignKey: 'usuario_id',
            as: 'permissoes'
        });
    }
}

export default Usuario
