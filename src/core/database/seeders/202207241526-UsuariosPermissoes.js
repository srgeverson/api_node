'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios_permissoes', [
      //#region Permissões do usuário administrador
      { usuario_id: 1, permissao_id: 1, ativo: true },
      { usuario_id: 1, permissao_id: 2, ativo: true },
      { usuario_id: 1, permissao_id: 3, ativo: true },
      { usuario_id: 1, permissao_id: 4, ativo: true },
      { usuario_id: 1, permissao_id: 5, ativo: true },
      { usuario_id: 1, permissao_id: 6, ativo: true },
      //#endregion Permissões do usuário administrador
      { usuario_id: 2, permissao_id: 6, ativo: true },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('usuarios_permissoes', null, {})
  }
};
