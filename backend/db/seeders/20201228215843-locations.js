'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Locations', [
      {
        userId: 1,
        name: 'Business Place',
        address: '105 Place St, Baltimore MD',
        description: 'A business place for businessing!',
        businessCategory: null,
        petCategory: null,
        coordinates: JSON.stringify({lat: 34.1221, lng: 23.3322, zoom: 17})
      },
      {
        userId: 1,
        name: 'Depawsit Bank',
        address: '106 Place St, Baltimore MD',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        businessCategory: null,
        petCategory: null,
        coordinates: JSON.stringify({lat: 34.1221, lng: 23.3322, zoom: 17})
      },
      {
        userId: 1,
        name: 'Business Place II the Businessing',
        address: '107 Place St, Baltimore MD',
        description: 'A business place for businessing!',
        businessCategory: null,
        petCategory: null,
        coordinates: JSON.stringify({lat: 34.1221, lng: 23.3322, zoom: 17})
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
