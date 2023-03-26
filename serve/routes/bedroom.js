const express = require('express')
const db = require('../db/index')
const router = express.Router()

//获取超级管理员数据
router.get('/getBedroom', (req, res) => {
    let sql = 'select * from bedroom'
    db.query(sql, (err, result) => {
        if (err) console.log(err.message);
        res.send({
            status: 0,
            data: result
        })
    })
})

//获取普通管理员数据
router.post('/getAdminBedroom', (req, res) => {
    let id = req.body.id
    let sql = 'select * from bedroom where tid = ?'
    db.query(sql, id, (err, result) => {
        if (err) return console.log(err.message);
        res.send({
            status: 0,
            data: result
        })
    })
})


//添加数据
router.post('/addBedroom', (req, res) => {
    let data = req.body
    db.query('select * from bedroom where bedroomname = ?', data.bedroomname, (err, result) => {
        if (err) return console.log(err.message);
        if (result.length > 0) {
            //名字已经存在
            res.send({
                status: 1,
                message: '该宿舍已经创建'
            })
        } else {
            let sql = 'insert into bedroom set ?'
            db.query(sql, data, (err, result) => {
                if (err) return console.log(err.message);
                res.send({
                    status: 0,
                    message: '创建成功'
                })
            })
        }
    })
})

//删除数据
router.post('/deleteBedroom', (req, res) => {
    let id = req.body.bid
    console.log(req.body);
    console.log(id);
    let sql = 'delete from bedroom where id = ?'
    db.query(sql, id, (err, result) => {
        if (err) return console.log(err.message);
        res.send({
            status: 0,
            message: '删除成功'
        })
    })
})

//查询数据
router.post('/searchBedroom', (req, res) => {
    let keyword = req.body.keyword
    keyword = "%" + keyword + "%"
    let sql = 'select * from bedroom where bedroomname like ?';
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
                message: "未找到匹配的值"
            })
        }

    })
})

//修改宿舍人数
// router.post('/changenum', (req, res) => {
//     let bedname = req.body.bedName
//     let sql = 'select * from bedroom where bedroomname = ?'
//     db.query(sql, bedname, (err, result) => {
//         if (err) return console.log(err.message);
//         if (result[0].num >= result[0].max) {
//             console.log('人数已满');
//             res.send({
//                 status: 1,
//                 message: '该宿舍人数已满'
//             })
//         } else {
//             let nowNum = result[0].num + 1
//             console.log(nowNum);
//             db.query('update bedroom set num = ? where bedroomname = ?', [nowNum, bedname], (err, result1) => {
//                 if (err) return console.log(err.message);
//                 console.log(result1);
//                 res.send({
//                     status: 0,
//                     message: "添加成功"
//                 })
//             })
//         }
//     })
// })


module.exports = router