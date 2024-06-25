const mysql = require('mysql');
const util = require('util');

const dbConfig = {
  host: 'localhost',
  user: 'osorio',
  password: '123456',
  database: 'estacionapp'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    throw err;
  }
});

connection.query = util.promisify(connection.query);

module.exports = connection;
