'use strict';
import Sequelize, { Model } from 'sequelize';

class OAuthClientDetails extends Model {

  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
        client_id: { type: Sequelize.STRING(255), allowNull: false, unique: true },
        resource_ids: { type: Sequelize.STRING(256) },
        client_secret: { type: Sequelize.STRING(255) },
        scope: { type: Sequelize.STRING(256) },
        authorized_grant_types: { type: Sequelize.STRING(256) },
        web_server_redirect_uri: { type: Sequelize.STRING(256) },
        authorities: { type: Sequelize.STRING(256) },
        access_token_validity: { type: Sequelize.INTEGER },
        refresh_token_validity: { type: Sequelize.INTEGER },
        additional_information: { type: Sequelize.STRING(256) },
        autoapprove: { type: Sequelize.STRING(256) },
        authorities: { type: Sequelize.STRING(256) },
        ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        data_cadastro: { type: Sequelize.DATE },
        data_operacao: { type: Sequelize.DATE },
      },
      {
        sequelize,
        tableName: 'oauth_client_details'
      }
    );

    return this
  }
}

export default OAuthClientDetails;