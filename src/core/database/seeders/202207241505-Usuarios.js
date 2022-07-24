'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [
      {
        id: 1,
        nome: 'geversonjosedesouza@gmail.com',
        senha: '123456',
        ativo: true
      },
      {
        id: 2,
        nome: 'geversonjosedesouza@hotmail.com',
        senha: '123456',
        ativo: true
      },

    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', {}, {})
  }
};
