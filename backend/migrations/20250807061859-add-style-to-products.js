module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'style', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'General', // optional default
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'style');
  },
};
