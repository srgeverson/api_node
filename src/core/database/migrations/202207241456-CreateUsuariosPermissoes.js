'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios_permissoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      permissaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'permissoes',
          key: 'id'
        }
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('usuarios_permissoes')
  }
};
