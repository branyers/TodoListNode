'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        validate :{
          notEmpty: true,
          notNull: true
        }
      },
      description: {
        type: Sequelize.STRING,
        validate :{
          notEmpty: true,
          notNull: true
        }

      },
      due_date: {
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.INTEGER,
        references : {
          model: 'users',
          key: 'id'
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        references : {
          model: 'categories',
          key: 'id'
        }
      },
      status_id: {
        type: Sequelize.INTEGER,
        references : {
          model: 'statuses',
          key: 'id'
        }
        
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tasks');
  }
};