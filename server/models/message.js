'use strict';

const Sequelize = require('sequelize');
const db = require('../database');
const User = require('./user');

const Message = db.define('message', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    text: {
      type: Sequelize.TEXT
    },
    title: {
      type: Sequelize.STRING
    }
  }, {
  timestamps: true,
  freezeTableName: true
});

Message.beforeCreate(function (message) {
  return User.find({
    where: {
      slackId: message.author_id
    }
  }).then((user) => {
    if (user) {
      message.author_id = user.id;
      return message;
    } else {
      throw new Error('no user found');
    }
  }, () => {
    throw new Error('no user found');
  });
});

Message.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
Message.belongsToMany(User, { through: 'userMessage' });

module.exports = Message;
