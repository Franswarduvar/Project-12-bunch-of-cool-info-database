const mysql2 = require('mysql2');
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Delicon1234%',
    database: 'coolThings_db'
})

module.exports= db;
