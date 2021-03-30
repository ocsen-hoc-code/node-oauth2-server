'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      UserName: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      Salt: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      Email: {
        allowNull: true,
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
    await queryInterface.dropTable('Users');
  }
};