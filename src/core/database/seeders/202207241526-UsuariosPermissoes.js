'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('genre_movie', [
      {
        usuarioId: 1,
        permissaoId: 1,
        ativo: true
      },
      {
        usuarioId: 1,
        permissaoId: 2,
        ativo: true
      },
      {
        usuarioId: 2,
        permissaoId: 2,
        ativo: true
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('genre_movie', null, {})
  }
};
