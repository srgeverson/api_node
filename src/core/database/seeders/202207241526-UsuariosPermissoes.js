'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios_permissoes', [
      //#region Permissões do usuário administrador
      { usuarioId: 1, permissaoId: 1, ativo: true },
      { usuarioId: 1, permissaoId: 2, ativo: true },
      { usuarioId: 1, permissaoId: 3, ativo: true },
      { usuarioId: 1, permissaoId: 4, ativo: true },
      { usuarioId: 1, permissaoId: 5, ativo: true },
      { usuarioId: 1, permissaoId: 6, ativo: true },
      //#endregion Permissões do usuário administrador
      { usuarioId: 2, permissaoId: 6, ativo: true },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('usuarios_permissoes', null, {})
  }
};
