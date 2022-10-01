'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('oauth_client_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      client_id: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false
      },
      resource_ids: { type: Sequelize.STRING(256) },
      client_secret: { type: Sequelize.STRING(256) },
      scope: { type: Sequelize.STRING(256) },
      authorized_grant_types: { type: Sequelize.STRING(256) },
      web_server_redirect_uri: { type: Sequelize.STRING(256) },
      authorities: { type: Sequelize.STRING(256) },
      access_token_validity: { type: Sequelize.INTEGER },
      refresh_token_validity: { type: Sequelize.INTEGER },
      additional_information: { type: Sequelize.STRING(256) },
      autoapprove: { type: Sequelize.STRING(256) },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      data_cadastro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      data_operacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('oauth_client_details')
  }
};
