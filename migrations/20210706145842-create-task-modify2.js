'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    queryInterface.addConstraint('tasks', {
      fields: ['status_id'],
      type: 'foreign key',
      name: 'status_Foreign_Key',
      references: { //Required field
        table: 'statuses',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });



}
}