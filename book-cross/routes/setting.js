/**
 * Created by lizhiqiang on 2016/5/7.
 */
var express = require('express');//引入express
var agent = require('superagent');//引入superagent包，封装http代理功能
var path = require('path');//url操作
var fs = require('fs');//上传文件后删除临时文件
var multer = require("multer");//引入multer，处理文件上传

var storage = multer.diskStorage({
    'destination': function (req, file, cb) {
        if (!fs.existsSync('temp')) {
            fs.mkdirSync('temp');
        }
        cb(null, 'temp');
    },
    'filename': function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

//创建路由
var router = express.Router();

//进入管理页面
var init = function (req, res) {
    res.render('setting', {title: '管理页面'});
};

//取出所有书籍信息
var findAllBook = function (req, res) {
    agent.get("http://localhost:8080/m/cross/book/r/0")
        .on('error', function (error) {
            res.send(error);
        })
        .end(function (err, apiRes) {
            res.json(apiRes.body);
        });
};

//新增书籍
var addBook = function (req, res) {
    agent.post('http://localhost:8080/m/test/post')
        .send(req.body)
        .type("form")//必须有这行代码设置请求头，否则java后台接不到参数，
        .on('error', function (error) {
            res.send(error);
        })
        .end(function (err, apiRes) {
            res.json(apiRes.body);
        });
};

//导入书籍
var importBook = function (req, res) {
    console.log(req.file.path);
    var path = req.file.path;
    agent.post("http://localhost:8080/book-cross/m/cross/excel/book/upload")
        //.field("test2", 'bbbbbb')//普通字段和上传文件同时有的情况
        .attach('excelFile', path)
        .end(function (err, apiRes) {
            //fs.unlinkSync(req.file.path);
            fs.unlink(path, function () {
                console.log('删除成功:' + path);
            });
            res.json(apiRes.body);
        });
};

router.get('/', init);
router.get('/book', findAllBook);
router.post('/book/1', addBook);
router.post('/book/2', upload.single('file'), importBook);

module.exports = router;

