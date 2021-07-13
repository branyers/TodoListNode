'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('statuses', 'status')
  }
};