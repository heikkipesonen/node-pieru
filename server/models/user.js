'use strict';

let Sequelize = require('sequelize');
let db = require('../database');

let User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  slackId: {
    type: Sequelize.STRING,
    field: 'slack_id',
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    set: function (value) {
      this.setDataValue('email', value.toString().toLowerCase());
    },
    validate: {
      validEmail: (value) => {
        if (value.indexOf('@') < 1) {
          throw new Error('Invalid email address');
        }
      }
    }
  }
}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = User;
