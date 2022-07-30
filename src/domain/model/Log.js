import Sequelize, { Model } from 'sequelize';

class Log extends Model {

    static init(sequelize) {
        super.init(
            {
                id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
                tabela_nome: { type: Sequelize.STRING(50) },
                tabela_coluna: { type: Sequelize.STRING(100) },
                tabela_id: { type: Sequelize.INTEGER },
                operacao: { type: Sequelize.STRING(6) },
                data_operacao: { type: "TIMESTAMP", defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
                valor_anterior: { type: Sequelize.STRING(10) },
                valor_atual: { type: Sequelize.TEXT },
                usuarios_id: { type: Sequelize.TEXT }
            },
            {
                sequelize,
                tableName: 'logs'
            }
        );

        return this;
    }
}

export default Log
