const mysql = require('mysql');

const dbConfig = {
        user: 'root',
        password: 'superPassword_',
        database: 'devDb',
        host: 'db'
}

module.exports = function () {
    try {
        console.log('Connecting');
        var con = mysql.createConnection(dbConfig);
        con.connect(function(err) {
            if (err) throw err;
            console.log('Connected!');
        });
        return con;
    } catch (ex) {
        throw ex;
    }
}