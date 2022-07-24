import Sequelize, { Model } from 'sequelize';

class Usuario extends Model {

    static init(sequelize) {
        super.init(
            {
                id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
                nome: { type: Sequelize.STRING(255), allowNull: false, unique: true },
                senha: { type: Sequelize.STRING(255), allowNull: false },
                ativo: { type: Sequelize.BOOLEAN, allowNUll: false, defaultValue: true }
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
