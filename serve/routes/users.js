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
        token: token,
        data: data[0]
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
      let username = data.name
      db.query('select * from users where username = ?', username, (errsql, datasql) => {
        if (errsql) return
        console.log(datasql[0]);
        res.send({
          status: 0,
          data: datasql[0],
          msg: "success"
        })
      })
    }
  })

})


//添加学生信息
router.post('/addStudent', (req, res) => {
  let bedname = req.body.dormitoryname
  let sql = 'select * from bedroom where bedroomname = ?'
  db.query(sql, bedname, (err, result) => {
    if (err) return console.log(err.message);
    if (result[0].num >= result[0].max) {
      console.log('人数已满');
      res.send({
        status: 1,
        message: '该宿舍人数已满'
      })
    } else {
      // let nowNum = result[0].num + 1
      // console.log(nowNum);
      // db.query('update bedroom set num = ? where bedroomname = ?', [nowNum, bedname], (err, result1) => {
      //   if (err) return console.log(err.message);
      //   console.log(result1);
      let classname = req.body.classname
      let sql = 'select * from class where classname = ?'
      db.query(sql, classname, (err, result2) => {
        if (err) return console.log(err.message);
        // db.query('update class set numberP = ? where classname = ?', [result2[0].numberP + 1, classname], (err, result3) => {
        //   if (err) return console.log(err.message);
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
            let nowNum = result[0].num + 1
            console.log(nowNum);
            db.query('update bedroom set num = ? where bedroomname = ?', [nowNum, bedname], (err, result1) => {
              if (err) return console.log(err.message);
              console.log(result1);
            })
            db.query('update class set numberP = ? where classname = ?', [result2[0].numberP + 1, classname], (err, result3) => {
              if (err) return console.log(err.message);
            })
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

        // })
      })
      // })
    }
  })
})

//获取学生信息
router.post('/getStudent', (req, res) => {
  let id = req.body.id
  if (id == 1) {
    let sql = 'select * from users where isStudent = 1'
    db.query(sql, (err, result) => {
      if (err) return console.log(err.message);
      console.log(result);
      res.send({
        status: 0,
        data: result
      })
    })
  } else {
    let sql = 'select * from users where tid = ?'
    db.query(sql, id, (err, result) => {
      if (err) return console.log(err.message);
      console.log(result);
      res.send({
        status: 0,
        data: result
      })
    })
  }

})

//查询学生
router.post('/searchStu', (req, res) => {
  let keyword = req.body.keyword
  let id = req.body.id
  keyword = '%' + keyword + '%'
  if (id == 1) {
    let sql = 'select * from users where username like ? and isStudent = 1 '
    db.query(sql, keyword, (err, result) => {
      if (err) return console.log(err.message);
      if (result.length > 0) {
        res.send({
          status: 0,
          data: result
        })
      } else {
        res.send({
          status: 1,
          message: '没有查到匹配的'
        })
      }
    })
  } else {

    let sql = 'select * from users where username like ? and tid = ?'
    db.query(sql, [keyword, id], (err, result) => {
      if (err) return console.log(err.message);
      if (result.length > 0) {
        res.send({
          status: 0,
          data: result
        })
      } else {
        res.send({
          status: 1,
          message: '没有查到匹配的'
        })
      }
    })
  }


})

// 删除一个学生
router.post('/deleteStu', (req, res) => {
  let data = req.body
  //删除学生
  db.query('delete from users where id = ?', data.id, (err, result) => {
    if (err) return console.log(err.message);
    //删除成功,修改寝室信息
    db.query('select * from bedroom where bedroomname = ?', data.dormitoryname, (err, result1) => {
      if (err) return console.log(err.message);
      //查询成功
      db.query('update bedroom set num = ? where bedroomname = ?', [result1[0].num - 1, data.dormitoryname], (err, result2) => {
        if (err) return console.log(err.message);
        //修改班级信息
        db.query('select * from class where classname = ?', data.classname, (err, result3) => {
          if (err) return console.log(err.message);
          db.query('update class set numberP = ? where classname = ?', [result3[0].numberP - 1, data.classname], (err, result4) => {
            if (err) return console.log(err.message);
            res.send({
              status: 0,
              message: '删除成功'
            })
          })
        })
      })
    })
  })
})

//修改学生出勤情况
router.post('/changeStuState', (req, res) => {
  let uName = req.body.uname
  let state = req.body.state
  let sql = 'update users set state = ? where username = ?'
  db.query(sql, [state, uName], (err, result) => {
    if (err) return console.log(err.message);
    console.log(result);
    if (result.affectedRows == 1) {
      res.send({
        status: 0,
        message: "修改成功"
      })
    }
  })
})



module.exports = router;
