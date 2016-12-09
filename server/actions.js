'use strict';

const User = require('./models/user');
const Message = require('./models/message');

const actions = {

  join: (req, res, next) => {
    let data = req.params;
    let email = data.text.split('|')[1].replace('>', '');
  },

  sukupuoli: (req, res, next) => {
      let data = req.params;
      console.log(data);
      res.send(200, {text: JSON.stringify(data)});
  },

  TIEDOTE: (req, res, next) => {
    let message = {
      text: req.params.text.replace('TIEDOTE', ''),
      user: req.params.user_id,
      user_name: req.params.user_name,
      timeStamp: Date.now()
    };
  }
};

module.exports = actions;
