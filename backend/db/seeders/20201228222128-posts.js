'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        userId: 2,
        locationId: 2,
        title: 'My review!',
        body: 'Good business',
        rating: 3,
      },
      {
        userId: 3,
        locationId: 3,
        title: 'I loved it!',
        body: 'Good business good doggo',
        rating: 3,
      },
      {
        userId: 2,
        locationId: 1,
        title: 'Great place',
        body: 'Good place for food and friends',
        rating: 5,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
