'use strict';
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var todo = sequelize.define('todo', {
    task: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return todo;
};