/**
 * Created by lizhiqiang on 2016/5/7.
 */
var express = require('express');
var router = express.Router();
var signInAsAdmin = function (req, res) {
    //console.log("user路由测试session数据"+JSON.stringify(req.session.userinfo));
    res.send(req.session.userinfo);
};

var queryTermInfo = function (req,res) {

    console.log("获取学期列表");
    var apiData;
    var apiReq = http.request({
        host: "localhost",
        port: 8081,
        method: 'GET',
        path: "/book-cross/a/sign/0",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }, function (apiRes) {
        if (apiRes.statusCode == 200) {
            apiRes.on('data', function (data) {

                var jdata = JSON.parse(data);
                //测试数据
                jdata  = {"code":0,"message":"查询成功","result":[{"id":"8e5a35ac-195c-11e6-8c7f-af2dac49c70e","gradeId":"f34a218a-ff84-11e5-97c4-23197fb65e8a","gradeName":"六年级","termId":"b7fb1d38-1946-11e6-8980-23643916c639","termName":"测试2016年度春季学期","name":"测试流程","expectedSteps":12,"startWeekDay":2,"enumState":1,"managerId":"6aab6400-ff94-11e5-90f3-bfd7b36b8b16","configId":null}]};
                apiData = jdata;
                var sess = req.session;
                sess.processInfo =jdata;
                console.log("测试漂流进程配置数据查询，结果："+ JSON.stringify(sess.processInfo));
            }).on('end', function () {
                res.send(apiData);
            });
        }
        else {
            res.send(500, "error");
        }
    });
    apiReq.end();

}




/* GET home page. */
router.get('/info', signInAsAdmin);
router.get('/term',queryTermInfo);
module.exports = router;
