'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

const users = require('../../utils/seed-data.js').userSeeder

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'demo_user',
        hashedPassword: bcrypt.hashSync('demoUserPass'),
      },
      {
        email: 'mainOwner@place.com',
        username: 'mainOwner',
        hashedPassword: bcrypt.hashSync('password'),
      },
      ...users
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
