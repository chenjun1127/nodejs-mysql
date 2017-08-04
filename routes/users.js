var express = require('express');
var router = express.Router();
var db = require('../db.js');
// 添加
router.get('/user/add', (req, res) => {
    res.render('update', {
        title: '添加用户',
        user: [{
            name: '',
            male: '',
            age: '',
            work: '',
            address: ''
        }]
    })
});
// 保存或更新
router.post('/user/list', (req, res) => {
    const id = req.body.userId;
    const name = req.body.userName;
    const male = req.body.userMale;
    const age = req.body.userAge;
    const address = req.body.userAddress;
    const work = req.body.userWork;
    if (id) {
        db.query("update users set name='" + name + "',male='" + male + "',address='" + address + "',age='" + age + "',work='" + work + "',time=now() where id=" + id + "", (err, rows) => {
            if (err) res.send("更新失败：" + err)
            res.redirect('/');
        })
    } else {
        db.query("insert into users(id,name,time,male,address,age,work) values(0,'" + name + "',now(),'" + male + "','" + address + "','" + age + "','" + work + "')", (err, rows) => {
            if (err) res.send("新增失败：" + err)
            res.redirect('/');
        })
    }
});
router.get('/user/update/:id', (req, res) => {
    var id = req.params.id;
    db.query("select * from users where id=" + id + "", (err, rows) => {
        if (err) res.send(err)
        res.render('update', {
            title: '更新用户',
            user: rows,
            id: id,
        })
    })

});
// 删除
router.post('/user/del', (req, res) => {
    var id = req.query.id;
    if (id) {
        db.query("delete from users where id=" + id + "", function(err, rows) {
            if (err) {
                res.end('删除失败：' + err)
            } else {
                res.json({
                    success: 1,
                })
            }
        });
    }
})
module.exports = router;
