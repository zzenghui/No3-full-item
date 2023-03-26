const express = require('express')
const db = require('../db')

const router = express.Router()

//添加一个班级
router.post('/addClassRoom', (req, res) => {
    let classRoomObj = req.body
    console.log(classRoomObj);
    let sql = 'select * from class where classname = ?'
    db.query(sql, classRoomObj.classname, (err, result) => {
        if (err) console.log(err.message);
        if (result.length > 0) {
            //班级名重复
            res.send({
                status: 1,
                message: '班级名称重复,请更改'
            })
        } else {
            let sql2 = 'insert into class set ?'
            db.query(sql2, classRoomObj, (err, result2) => {
                if (err) return console.log(err.message);
                //重新修改教师得班级列表
                db.query('select * from users where id = ?', classRoomObj.tid, (err, result3) => {
                    if (err) return console.log(err.message);
                    let classList = JSON.parse(result3[0].classList);
                    classList.push(classRoomObj.classname)
                    console.log(classList);
                    db.query('update users set classList = ? where id = ?', [JSON.stringify(classList), classRoomObj.tid], (err, result4) => {
                        if (err) return console.log(err.message);
                        res.send({
                            status: 0,
                            message: '添加成功'
                        })
                    })
                })

            })
        }
    })
})

//普通老师获取班级信息
router.post('/teacherGetClassInfo', (req, res) => {
    let id = req.body.tid
    let sql = 'select * from class where tid = ?'
    db.query(sql, id, (err, result) => {
        if (err) console.log(err.message);
        res.send({
            status: 0,
            data: result
        })
    })
})

//管理员获取班级信息
router.post('/adminGetClassInfo', (req, res) => {
    let sql = 'select * from class '
    db.query(sql, id, (err, result) => {
        if (err) console.log(err.message);
        res.send({
            status: 0,
            data: result
        })
    })
})

//进行查询
router.post('/searchClass', (req, res) => {
    let keyword = req.body.keyword
    keyword = "%" + keyword + "%"
    let sql = 'select * from class where classname like ?'
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
                message: "查询失败"
            })
        }
    })
})

//删除班级
router.post('/deleteClass', (req, res) => {
    let id = req.body.id
    let sql = 'delete from class where id = ?'
    db.query(sql, id, (err, result) => {
        if (err) console.log(err.message);
        if (result.affectedRows == 1) {
            res.send({
                status: 0,
                message: '删除成功'
            })
        } else {
            res.send({
                status: 1,
                message: '删除失败'
            })
        }
    })

})

//修改班级
router.post('/updateClass', (req, res) => {
    let uodateObj = req.body
    let sql = 'update class set ? where classname = ?'
    db.query(sql, [uodateObj, uodateObj.classname], (err, result) => {
        if (err) return console.log(err.message);
        if (result.affectedRows == 1) {
            res.send({
                status: 0,
                message: '修改成功'
            })
        } else {
            res.send({
                status: 1,
                message: '修改失败'
            })
        }
    })
})

//修改人数
// router.post('/changeClassNum', (req, res) => {
//     let classname = req.body.classname
//     let sql = 'select * from class where classname = ?'
//     db.query(sql, classname, (err, result) => {
//         if (err) return console.log(err.message);
//         db.query('update class set numberP = ? where classname = ?', [result[0].numberP + 1, classname], (err, result1) => {
//             if (err) return console.log(err.message);
//             res.send({
//                 status: 0,
//                 message: '修改成功'
//             })
//         })
//     })
// })


module.exports = router