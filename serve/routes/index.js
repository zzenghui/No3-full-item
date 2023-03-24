var express = require('express');
var router = express.Router();
const multer = require('multer')
const fs = require('fs')

let file = multer({
  dest: __dirname,
  limits: { fileSize: 1000000, files: 1 }
})
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//上传图片
router.post('/api/upload', file.single("fileName"), function (req, res) {
  let file = req.file
  fs.renameSync(file.path, './public/uploads/' + file.originalname)
  // console.log(file);
  res.send({
    status: 0,
    data: 'http://localhost:3000/uploads/' + file.originalname
  })
})

module.exports = router;
