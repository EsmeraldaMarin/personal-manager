var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '45092611esmeM03',
    database: 'personal_manager'
})

module.exports = connection;