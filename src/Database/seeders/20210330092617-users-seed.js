'use strict';
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = crypto.randomBytes(16).toString('hex');
    await queryInterface.bulkInsert('Users', [{
      Id: uuidv4(),
      UserName: 'dolambinhminh',
      Password: await crypto.scryptSync('dolambinhminh', salt, 32).toString('hex'),
      Email: 'dolambinhminh@yahoo.com',
      Salt: salt,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { UserName: 'dolambinhminh' });
  }
};
