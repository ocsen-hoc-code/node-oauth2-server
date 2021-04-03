'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OauthorizationCodes', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      Code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ExpiresAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      RedirectUri: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Scope: {
        allowNull: true,
        type: Sequelize.STRING
      },
      UserId: {
        allowNull: false,
        type: Sequelize.UUID
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
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OauthorizationCodes');
  }
};
