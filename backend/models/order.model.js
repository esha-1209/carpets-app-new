'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User);
      Order.hasMany(models.OrderItem);
    }
  }

  Order.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cash', // or 'stripe'
      },
      paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unpaid', // or 'paid'
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );

  return Order;
};
