'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OauthClients', [{
      Id: uuidv4(),
      ClientId: 'ocsen-simple',
      ClientSecret: 'ocsen-hoc-code',
      Grants: 'password, refresh_token',
      AccessTokenLifetime: 1800,
      RefreshTokenLifetime: 3600,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      Id: uuidv4(),
      ClientId: 'ocsen-with-password',
      ClientSecret: 'ocsen-hoc-code',
      Grants: 'password',
      AccessTokenLifetime: 1800,
      RefreshTokenLifetime: 3600,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('OauthClients', {
      ClientId: { [Op.in]: ['ocsen-simple', 'ocsen-with-password'] }
    });
  }
};
