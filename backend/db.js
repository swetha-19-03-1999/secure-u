// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',         // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'secure_u'
});

module.exports = pool.promise();
