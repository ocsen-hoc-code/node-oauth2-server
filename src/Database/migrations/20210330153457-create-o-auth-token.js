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
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      AccessTokenExpireAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      RefreshToken: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      RefreshTokenExpireAt: {
        allowNull: true,
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