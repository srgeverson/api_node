'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('oauth_client_details', [
      {
        client_id: 'api_node',
        client_secret: '$2a$12$quPz3Wq3lHyY/0gJeCAgceNEb42fUjiuNqyWoKFNci/Cr7PGvk.yO',
        authorized_grant_types: 'password,refresh_token',
        access_token_validity: 3600,
        refresh_token_validity: 7200,
        ativo: true
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('oauth_client_details', {}, {})
  }
};
