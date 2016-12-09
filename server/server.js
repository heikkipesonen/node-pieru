'use strict';

const restify = require('restify');
const server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.CORS());
server.use(
  function crossOrigin (req,res,next) {
    res.charSet('utf-8');
    return next();
  }
);

server.listen(process.env.PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
