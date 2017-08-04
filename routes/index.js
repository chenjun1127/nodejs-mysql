var express = require('express');
var router = express.Router();
var db = require('../db.js');

// index 查询
router.get('/', (req, res, next) => {
    db.query('SELECT * FROM users', (err, rows) => {
        console.log(rows);
        if (err) {
            res.send('获取数据失败！')
        } else {
            res.render('index', {
                title: 'Express-Nodejs for MySql',
                users: rows
            });
        }

    })

});

module.exports = router;
