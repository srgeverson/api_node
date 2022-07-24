'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissoes',
      [
        {
          id: 1,
          nome: 'manager',
          descricao: 'Permissão de Gerente',
          ativo: true
        },
        {
          id: 2,
          nome: 'employee',
          descricao: 'Permissão de Funcionário',
          ativo: true
        },
      ], {})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('permissoes', {}, {})
  }
};
