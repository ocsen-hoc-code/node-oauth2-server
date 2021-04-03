'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OauthClients', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      ClientId: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      SecretKey: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UserId: {
        allowNull: true,
        type: Sequelize.UUID
      },
      RedirectUris: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Scope: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Grants: {
        allowNull: false,
        type: Sequelize.STRING
      },
      AccessTokenLifetime: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      RefreshTokenLifetime: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OauthClients');
  }
};
