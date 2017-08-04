var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'chenjun',
    password: 'cj123456',
    database: 'test_db'
});

function query(sql, callback) {
    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query(sql, function(err, rows) {
            callback(err, rows);
            connection.release(); //释放链接
        });
    });
}
exports.query = query;