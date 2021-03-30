'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OAuthTokens', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      AccessToken: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      AccessTokenExpireAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      RefreshToken: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      RefreshTokenExpireAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        allowNull: false,
        type: Sequelize.UUID,
        unique: true
      },
      ClientId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OAuthTokens');
  }
};