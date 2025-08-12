'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      Wishlist.belongsTo(models.User);
      Wishlist.belongsTo(models.Product);
    }
  }

  Wishlist.init(
    {
      // No additional fields needed for now
    },
    {
      sequelize,
      modelName: 'Wishlist',
    }
  );

  return Wishlist;
};
