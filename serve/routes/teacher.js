const express = require('express')
const db = require('../db/index')
const md5 = require('md5')
const router = express.Router()

//查询老师得接口
router.get('/getTeacherInfo', (req, res) => {
    let sql = 'select * from users where isTeacher = 1'
    db.query(sql, (err, result) => {
        if (err) return console.log(err.message);
        console.log(result);
        res.send(result)
    })
})

//删除老师
router.post('/deleteTeacher', (req, res) => {
    let id = req.body.id
    console.log(req.body);
    console.log(id);
    let sql = 'delete from users where id = ?'
    db.query(sql, id, (err, result) => {
        if (err) console.log(err.message);
        if (result.affectedRows) {
            res.send({
                status: 0,
                message: '删除成功'
            })
        }

    })
})

//修改老师
router.post('/updateTeacher', (req, res) => {
    let updateobj = req.body
    updateobj.password = md5(updateobj.password)
    let sql = 'update users set ? where username = ?'
    db.query(sql, [updateobj, updateobj.username], (err, result) => {
        if (err) return console.log(err.message);
        if (result.affectedRows == 1) {
            res.send({
                status: 0,
                message: '修改成功'
            })
        }
    })
})

//查询老师
router.post('/searchTeacher', (req, res) => {
    let keyword = req.body.search
    console.log(keyword);
    keyword = "%" + keyword + "%"
    let sql = 'select * from users where username like ?'
    db.query(sql, [keyword], (err, result) => {
        if (err) return console.log(err.message);
        console.log(result);
        if (result.length > 0) {
            res.send({
                status: 0,
                data: result
            })
        } else {
            res.send({
                status: 1,
                message: '查询失败,未找到此用户'
            })
        }
    })

})

//修改老师得班级列表
router.post('/updateTeacherClass', (req, res) => {

})


module.exports = router