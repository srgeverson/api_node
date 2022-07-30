'use strict';
const moment = require('moment-timezone');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [
      {
        id: 1,
        nome: 'Admin',
        email: 'geversonjosedesouza@gmail.com',
        senha: '$2a$12$quPz3Wq3lHyY/0gJeCAgceNEb42fUjiuNqyWoKFNci/Cr7PGvk.yO',
        ativo: true,
        codigo_acesso: null,
        data_ultimo_acesso: null
      },
      {
        id: 2,
        nome: 'Geverson',
        email: 'geversonjosedesouza@hotmail.com',
        senha: '$2a$12$quPz3Wq3lHyY/0gJeCAgceNEb42fUjiuNqyWoKFNci/Cr7PGvk.yO',
        ativo: true,
        codigo_acesso: null,
        data_ultimo_acesso: null,
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', {}, {})
  }
};
