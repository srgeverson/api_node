'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios_permissoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id'},
        onDelete: 'CASCADE'
      },
      permissao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'permissoes', key: 'id' },
        onDelete: 'CASCADE'
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      data_cadastro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      data_operacao:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('usuarios_permissoes')
  }
};
