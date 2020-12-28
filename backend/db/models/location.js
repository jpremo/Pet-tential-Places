'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessCategory: {
      type: DataTypes.STRING(100)
    },
    petCategory: {
      type: DataTypes.STRING(100)
    },
    coordinates: DataTypes.JSON
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsTo(models.User, { foreignKey: 'userId' });
    Location.hasMany(models.Image, { foreignKey: 'locationId' });
    Location.hasMany(models.Post, { foreignKey: 'locationId' });
  };
  return Location;
};
