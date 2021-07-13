'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    firstname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },

    lastname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
   
    active: DataTypes.BOOLEAN,

    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },

  }, {
    sequelize,
    modelName: 'users',
  });

  users.beforeCreate(async (user) => {
    try {
      let hash = await bcrypt.hash(user.password, 8)
      user.password = hash
      return user.password
    } catch (e) {
      throw new Error('No se puedo encriptar la contrasena')
    }
  })
  return users;
};