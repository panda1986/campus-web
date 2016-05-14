/**
 * Created by lizhiqiang on 2016/5/7.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('cross', {title: '教师页面'});
});

module.exports = router;
