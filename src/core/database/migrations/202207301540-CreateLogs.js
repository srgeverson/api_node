module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('logs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tabela_nome: {
        type: Sequelize.STRING(50),
      },
      tabela_coluna: {
        type: Sequelize.STRING(100),
      },
      tabela_id: {
        type: Sequelize.INTEGER
      },
      operacao: {
        type: Sequelize.STRING(6),
      },
      data_operacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      valor_anterior: {
        type: Sequelize.TEXT,
      },
      valor_atual: {
        type: Sequelize.TEXT,
      },
      usuarios_id: {
        type: Sequelize.INTEGER
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('logs')
  }
};
