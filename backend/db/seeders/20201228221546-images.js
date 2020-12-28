'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        locationId: 2,
        title: 'Cute doggo pic',
        url: 'https://images.dog.ceo/breeds/retriever-flatcoated/n02099267_3948.jpg',
        profileImage: false
      },
      {
        userId: 1,
        locationId: 3,
        title: 'Doggo be doggin!',
        url: 'https://images.dog.ceo/breeds/terrier-australian/n02096294_4492.jpg',
        profileImage: false
      },
      {
        userId: 1,
        locationId: 1,
        title: 'Little pupper',
        url: 'https://images.dog.ceo/breeds/shihtzu/n02086240_6131.jpg',
        profileImage: false
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
