const mysql2 = require('mysql2')

const connect = mysql2.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'se_database'
})

module.exports = connect
