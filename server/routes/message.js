'use strict';

const User = require('../models/user');
const Message = require('../models/message');
const server = require('../server');

server.post('/message', (req, res) => {
  // let email = req.params && req.params.text ? req.params.text.split('|')[1].replace('>', '') : false;
  Message.create({
    author_id: req.params.user_id,
    text: req.params.text,
    title: req.params.text.substring(0, 50) + '...'
  }).then((model) => {
    res.send(200, model);
  }, (error) => {
    res.send(500, error);
  });
});

server.get('/message', (req, res) => {
  Message.findAll({
    attributes: ['id', 'title', 'text', 'createdAt'],
    include: [
      {
        model: User,
        as: 'author'
      }
    ]
  }).then((messages) => {
    res.send(200, messages);
  });
});
