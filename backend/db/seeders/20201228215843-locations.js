'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Locations', [
      {
        userId: 1,
        name: 'Business Place',
        address: '105 Place St, Baltimore MD',
        businessCategory: null,
        petCategory: null,
        coordinates: JSON.stringify({lat: 34.1221, lng: 23.3322, zoom: 17})
      },
      {
        userId: 1,
        name: 'Depawsit Bank',
        address: '106 Place St, Baltimore MD',
        businessCategory: null,
        petCategory: null,
        coordinates: JSON.stringify({lat: 34.1221, lng: 23.3322, zoom: 17})
      },
      {
        userId: 1,
        name: 'Business Place II the Businessing',
        address: '107 Place St, Baltimore MD',
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
