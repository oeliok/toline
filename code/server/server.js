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
var RedisStore = require('connect-redis')(session);

//session的配置文件
app.use(session({
    secret: 'oeli is best',
    cookie: {maxAge: 1000*60*60*24},
    store: new RedisStore({port:6379,host:'127.0.0.1'}),
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

/*中间件，类似filter*/
//错误处理
app.get('/*',mware.errors);
app.post('/*',mware.errors);
//记录访问的post资源
app.post('/*',mware.logConsole);
//校验验证码6位
app.get('/cyzm6/*', mware.cyzm6);
app.post('/cyzm6/*', mware.cyzm6);
//校验session的user
app.get('/suser/*', mware.suser);
app.post('/suser/*', mware.suser);

//指定静态文件目录
app.use(express.static(__dirname + '/../www'));
app.use(express.static(__dirname + '/../lib'));

//指定撸起路径映射
//用户管理
app.post('/public/user/login',user.login);
app.post('/public/user/regist',user.regist);
app.post('/private/user/modifypwd',user.modifypwd);
app.post('/private/user/modifyemail1',user.modifyemail1);
app.post('/private/user/modifyemail12',user.modifyemail2);
app.post('/public/user/findpwd1',user.findpwd1);
app.post('/public/user/findpwd2',user.findpwd2);
app.get('/private/user/modifysign',user.modifysign);
app.get('/private/user/modifyname',user.modifyname);
app.post('/private/user/uploadhead',user.uploadhead);
app.get('/private/user/modifyage',user.modifyage);
app.get('/private/user/modifysex',user.modifysex);
app.get('/private/friend/add',user.add);
app.get('/private/friend/searchname',user.searchname);
app.get('/private/friend/searchid',user.searchid);
app.get('/private/friend/delete',user.deletef);
app.get('/private/friend/modifyrm',user.modifyrm);
app.post('/private/friend/getlist',user.getlist);

//启动服务器，并监听port端口
var port = 8080;
http.createServer(app).listen(port);
log("启动服务器并监听" + port + "端口");