'use strict';

require('./database');
require('./models');
require('./routes');

const server = require('./server');

server.get('/', (req, res) => {
  res.send(200, {homo: true, kissa: false});
});
