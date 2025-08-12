// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Review extends Model {
//     static associate(models) {
//       Review.belongsTo(models.User);
//       Review.belongsTo(models.Product);
//     }
//   }

//   Review.init(
//     {
//       rating: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: { min: 1, max: 5 },
//       },
//       comment: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'Review',
//     }
//   );

//   return Review;
// };


'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User);
      Review.belongsTo(models.Product);
    }
  }

  Review.init(
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );

  return Review;
};
