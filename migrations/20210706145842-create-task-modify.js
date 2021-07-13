'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    queryInterface.addConstraint('tasks', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'category_Foreign_Key',
      references: { //Required field
        table: 'categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });



}
}