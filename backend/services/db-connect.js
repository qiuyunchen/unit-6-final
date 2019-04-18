const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/tvwatchlistapp');
module.exports = db;
