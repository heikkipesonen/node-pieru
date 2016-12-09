'use strict';
let Sequelize = require('sequelize');

let db = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// db.sync({
//   force: process.env.DATABASE_FORCE_SYNC
// });

db.sync();

module.exports = db;
