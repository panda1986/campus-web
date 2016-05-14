/**
 * Created by lizhiqiang on 2016/3/9.
 *
 * 登录路由
 */

var express = require('express');
var http = require('http');
var qs = require('querystring');

var router = express.Router();

var signInAsTeacher = function (req, res) {
    console.log(req.body);
    res.json("登录成功！");
};


//尝试登录
var signInAsAdmin = function (req, res) {
    console.log(req.body);
    var apiData;
    var postData = qs.stringify(req.body);
    var apiReq = http.request({
        host: "localhost",
        port: 8081,
        method: 'POST',
        path: "/auth-center/a/sign/0",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    }, function (apiRes) {
        if (apiRes.statusCode == 200) {
            apiRes.on('data', function (data) {
                /*var jdata = JSON.parse(data);
                if (jdata.resultCode == 0) {//如果返回的结果中的编码为0，即为正常，即登录成功
                    req.session.userId = jdata.userId;
                    req.session.username = jdata.username;
                }*/
                apiData = data;
            }).on('end', function () {
                res.send(apiData);
            });
        }
        else {
            res.send(500, "error");
        }
    });
    apiReq.write(postData);
    apiReq.end();
};

/*
 var register = function (req, res) {
 var apiData;
 var postData = qs.stringify(req.body);
 var apiReq = http.request({
 host: "localhost",
 port: 8080,
 method: 'POST',
 path: "/sign/1",
 headers: {
 'Content-Type': 'application/x-www-form-urlencoded',
 'Content-Length': postData.length
 }
 }, function (apiRes) {
 if (apiRes.statusCode == 200) {
 apiRes.on('data', function (data) {
 var jdata = JSON.parse(data);
 if (jdata.resultCode == 0) {//如果返回的结果中的编码为0，即为正常，即注册成功
 req.session.userId = jdata.userId;
 req.session.username = jdata.username;
 }
 apiData = data;
 }).on('end', function () {
 res.send(apiData);
 });
 }
 else {
 res.send(500, "error");
 }
 });
 apiReq.write(postData);
 apiReq.end();
 };
 */

router.post("/0", signInAsAdmin);
router.post("/1", signInAsTeacher);

module.exports = router;
