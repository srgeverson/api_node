module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING(80),
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.STRING(255),
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      codigo_acesso: {
        type: Sequelize.STRING(10),
      },
      data_cadastro: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      data_operacao:{
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      data_ultimo_acesso: {
        type: "TIMESTAMP"
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('usuarios')
  }
};
