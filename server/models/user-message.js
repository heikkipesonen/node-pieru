'use strict';

const Sequelize = require('sequelize');
const db = require('../database');
const Message = require('./message');
const User = require('./user');

const UserMessage = db.define('userMessage', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDv4,
      primaryKey: true
    },
    read: {
      type: Sequelize.DATE
    }
  }, {
  freezeTableName: true
});

UserMessage.hasOne(User);
UserMessage.hasOne(Message);

module.exports = UserMessage;
