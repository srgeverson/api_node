'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      descricao: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNUll: false,
        defaultValue: true
      },
      data_cadastro: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      data_operacao:{
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('permissoes')
  }
};
