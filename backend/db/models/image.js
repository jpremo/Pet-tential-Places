'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
  }, {});
  Image.associate = function (models) {
    Image.belongsTo(models.User, { foreignKey: 'userId' });
    Image.belongsTo(models.Location, { foreignKey: 'locationId' });
  };
  return Image;
};
