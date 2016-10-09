/**
 * Created by oeli on 16-10-2.
 */
var assert = require("assert");
var http = require("http");
var express = require("express");
var session = require('express-session');
var user = require("./user");
var mware = require("./lib/middleware");
var app = express();
//使用mongodb作为session的存储地址
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({uri: 'mongodb://toline:0vntu58u85tby3vr@toline.oeli.pub:27017/toline',collection: 'sessions'});
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
});
//session的配置文件
app.use(session({
    secret: 'oeli is best',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));
var router = express.Router();
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var log = function (msg) {
    console.log(new Date().Format("yyyy-MM-dd hh:mm:ss") +":"+msg);
};

//中间件，类似filter
app.get('/public/api/*',function (req, res, next) {
    log(req.originalUrl);
    next();
});
app.get('/public/api/*',mware.token);


//指定静态文件目录
app.use(express.static(__dirname + '/../www'));
app.use(express.static(__dirname + '/../lib'));

//指定撸起路径映射
app.get('/public/api/login',user.login);
app.get('/public/api/regist',user.regist);

//启动服务器，并监听port端口
var port = 8080;
http.createServer(app).listen(port);
log("启动服务器并监听" + port + "端口");