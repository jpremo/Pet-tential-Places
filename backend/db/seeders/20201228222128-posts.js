'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        userId: 2,
        locationId: 2,
        title: 'My review!',
        body: 'Good business'
      },
      {
        userId: 3,
        locationId: 3,
        title: 'I loved it!',
        body: 'Good business good doggo'
      },
      {
        userId: 2,
        locationId: 1,
        title: 'Great place',
        body: 'Good place for food and friends'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
