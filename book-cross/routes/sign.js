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
                var jdata = JSON.parse(data);
                jdata  = {"code":0,"message":"查询成功","result":{"gradeName":"六年级","gradeId":"f34a218a-ff84-11e5-97c4-23197fb65e8a","classId":"99f5cb16-ff8e-11e5-af74-ef10df040c95","className":"四班","personId":"7db7ce78-016f-4eea-b0a1-d5068f0e417e","userId":"bc3eb410-60d0-4dbe-8e5d-9b559a74929b"}};
                apiData = jdata;
                var sess = req.session;
                sess.userinfo =jdata;
                console.log("测试用户返回后设置session数据："+ JSON.stringify(sess.userinfo));
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

                var jdata = JSON.parse(data);
                //测试数据
                jdata =  {"code":0,"message":"查询成功","result":{"teacherName":"王淼"}};
                apiData = jdata;
                var sess = req.session;
                sess.userinfo =jdata;
                console.log("测试用户返回后设置session数据："+ JSON.stringify(sess.userinfo));
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
