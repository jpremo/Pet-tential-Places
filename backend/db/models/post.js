'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
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
    body: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.belongsTo(models.Location, { foreignKey: 'locationId' });
  };
  return Post;
};
