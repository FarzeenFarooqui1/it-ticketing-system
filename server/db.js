const { Pool } = require('pg');

const pool = new Pool({
  user: 'farzeent.farooqui', // Your exact Mac username
  host: 'localhost',
  database: 'ticketing_db',
  password: '',             
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};