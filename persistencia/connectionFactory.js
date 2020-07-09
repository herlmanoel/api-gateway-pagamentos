const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'payfast'
});

connection.connect((err) => {
    if (err) return console.log(err);
    console.log('conectou!');
})

module.exports = connection;