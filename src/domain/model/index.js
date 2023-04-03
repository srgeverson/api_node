import Sequelize from 'sequelize';
import database from '../../core/database';
import Permissao from './Permissao';
import Usuario from './Usuario';
import Log from './Log';
import UsuarioPermissao from './UsuarioPermissao';
import OAuthClientDetails from './OAuthClientDetails';

const models = [Log, OAuthClientDetails, Permissao, Usuario, UsuarioPermissao];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(database);
    models.map((model) => model.init(this.connection))
      .map((model) => {
        if (model.associate) {
          model.associate(this.connection.models)
        }

        return model;
      });
  }
}

export default new Database()
