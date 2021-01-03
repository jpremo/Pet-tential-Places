'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      businessCategory: {
        type: Sequelize.STRING(100)
      },
      petCategory: {
        type: Sequelize.STRING(100)
      },
      coordinates: {
        type: Sequelize.JSONB
      },
      reviewNumber: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      averageRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(2000),
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Locations');
  }
};
