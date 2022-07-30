module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      codigo_acesso: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      data_cadastro: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true
      },
      data_ultimo_acesso: {
        type: 'TIMESTAMP',
        defaultValue: null,
        allowNull: true
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('usuarios')
  }
};
