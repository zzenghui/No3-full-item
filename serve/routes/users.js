var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5')
const db = require('../db/index')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


//注册接口
router.post('/api/register', (req, res) => {
  let userInfo = req.body
  console.log(userInfo);
  let sqlSele = 'select * from users where username = ?'
  db.query(sqlSele, userInfo.username, (err, data) => {
    if (err) return
    if (data.length > 0) {
      //用户名称已经存在
      res.send({
        status: 1,
        message: '用户名已经存在'
      })
    } else {
      //用户名不存在
      userInfo.password = md5(userInfo.password)
      console.log(userInfo);
      let sqlIns = 'insert into users  set ?';
      db.query(sqlIns, userInfo, (err, dataRes) => {
        console.log(err);
        if (err) return
        res.send({
          status: 0,
          message: "注册成功"
        })
      })
    }
  })

})



//登录接口
router.post('/api/login', (req, res) => {
  let userInfo = req.body
  userInfo.password = md5(userInfo.password)
  console.log(userInfo);
  let sqlSele = 'select * from users where username = ? and password = ?'
  db.query(sqlSele, [userInfo.username, userInfo.password], (err, data) => {
    if (err) return
    //匹配到用户名和密码
    console.log(data);
    if (data.length > 0) {
      //token创建
      let username = req.body.username;
      let token = jwt.sign({ name: username }, 'tokenkey', { expiresIn: '10h' })
      res.send({
        status: 0,
        token: token
      })
    } else {
      res.send({
        status: 1,
        message: '用户名或密码错误'
      })
    }
  })
})


//获取用户信息
router.get('/api/getinfo', (req, res) => {
  console.log(req.headers);
  let token = req.headers.authorization
  console.log(token);
  jwt.verify(token, 'tokenkey', (err, data) => {
    console.log(data);
    if (err) {
      res.send({
        status: 1,
        msg: "fail"
      })
    } else {
      res.send({
        status: 0,
        data: data,
        msg: "success"
      })
    }
  })

})

module.exports = router;
