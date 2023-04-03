'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissoes',
      [
        {
          id: 1,
          nome: 'listar_permissao',
          descricao: 'Permite visualizar todas as permissões.',
          ativo: true
        },
        {
          id: 2,
          nome: 'listar_usuario',
          descricao: 'Permite visualizar todos os usuários.',
          ativo: true
        },
        {
          id: 3,
          nome: 'editar_usuario',
          descricao: 'Permite editar usuário.',
          ativo: true
        },
        {
          id: 4,
          nome: 'cadastrar_usuario',
          descricao: 'Permite cadastrar usuário.',
          ativo: true
        },
        {
          id: 5,
          nome: 'excluir_usuario',
          descricao: 'Permite excluir usuário.',
          ativo: true
        },
        {
          id: 6,
          nome: 'proprio_usuario',
          descricao: 'Permite acesso aos recursos apenas do perfil do próprio usuário.',
          ativo: true
        },
        {
          id: 7,
          nome: 'editar_permissao',
          descricao: 'Permite editar todas as permissões.',
          ativo: true
        }
      ], {})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('permissoes', {}, {})
  }
};
