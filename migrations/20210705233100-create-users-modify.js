'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    });


  }
};