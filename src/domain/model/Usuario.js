import Sequelize, { Model, DataType, DataTypes } from 'sequelize';

class Usuario extends Model {

    static init(sequelize) {
        super.init(
            {
                id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
                nome: { type: Sequelize.STRING(80), allowNull: true },
                email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
                senha: { type: Sequelize.STRING(255), allowNull: false },
                ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
                codigo_acesso: { type: Sequelize.STRING(10), allowNull: true },
                data_cadastro: { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
                data_ultimo_acesso: { type: 'TIMESTAMP', allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
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
            foreignKey: 'usuarioId',
            as: 'permissoes'
        });
    }
}

export default Usuario
