'use strict';

const User = require('../models/user');
const Message = require('../models/message');
const server = require('../server');

server.get('/user', (req, res) => {
  User.findAndCountAll({
    limit: 10,
    offset: parseInt(req.params.offset) || 0
  }).then((result) => {
    res.send(200, result);
  });
});

server.post('/login', (req, res) => {
  console.log(req.body);
  User.find({
    where: {
      slackId: req.body.id
    }
  }).then((model) => {
    if (model) {
      res.send(200, model);
    } else {
      res.send(401, {login: false});
    }
  });
});

server.post('/join', (req, res) => {
  let email = req.params.text;

  if (req.params.text) {
    User.findOrCreate({
      where: {
        slackId: req.params.user_id
      },
      defaults: {
        name: req.params.user_name,
        email
      }
    }).spread((user) => {
      res.send(200, user.get({plain: true}));
    });
  } else {
    res.send(500, req.params);
  }
});

server.get('/user/:id', (req, res) => {
  User.find({
    where: {
      id: req.params.id
    }
  }).then((result) => {
    res.send(200, result);
  });
});

server.get('/user/:id/messages', (req, res) => {
  Message.findAndCountAll({
    order: [
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: User,
        as: 'author'
      }
    ],
    limit: 10,
    offset: parseInt(req.params.offset) || 0
  }).then((result) => {
    res.send(200, result);
  });
});
