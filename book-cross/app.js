var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var bodyParser = require('body-parser');
var ejs = require('ejs');

var app = express();

//视图解析引擎配置
app.set('views', path.join(__dirname, 'views'));//__dirname是当前文件所在的完整绝对路径
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
// 设置 Session
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret: 'keyboard cat'
}));
app.use('/public', express.static('public'));

var index = require('./routes/index');
var sign = require('./routes/sign');
var cross = require('./routes/cross');
var setting = require('./routes/setting');
var base = require('./routes/base');

app.use('/', index);
app.use('/sign', sign);
app.use('/cross', cross);
app.use('/setting', setting);
app.use('/base',base);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
