import Sequelize, { Model } from 'sequelize';

class Usuario extends Model {

    static init(sequelize) {
        super.init(
            {
                id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, },
                nome: { type: Sequelize.STRING(100), allowNull: false, unique: true },
                descricao: { type: Sequelize.STRING(100), allowNull: false },
                ativo: { type: Sequelize.BOOLEAN, allowNUll: false, defaultValue: true }
            },
            {
                sequelize,
                tableName: 'permissoes'
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Usuario, {
            through: 'usuarios_permissoes',
            foreignKey: 'usuarioId',
            as: 'usuarios'
        });
    }
}

export default Usuario
