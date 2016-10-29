/**
 * Created by oeli on 16-10-2.
 */
var log = require('./lib/mylog');
var assert = require("assert");
var http = require("http");
var express = require("express");
var session = require('express-session');
var user = require("./control/user");
var mware = require("./lib/middleware");
var captcha = require("./lib/captcha");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//使用mongodb作为session的存储地址
var RedisStore = require('connect-redis')(session);

//session的配置文件
app.use(session({
    secret: 'oeli is best',
    cookie: {maxAge: 1000*60*60*24},
    store: new RedisStore({port:6379,host:'toline.oeli.pub'}),
    resave: true,
    saveUninitialized: true
}));
var router = express.Router();

//指定静态文件目录
app.use(express.static(__dirname + '/../www'));
app.use(express.static(__dirname + '/../lib'));

//验证码
app.get('/public/api/cyzm6',function (req,res) {
    captcha.captcha(req,res,6);
});
app.get('/public/api/cyzm4',function (req,res) {
    captcha.captcha(req,res,4);
});

/*中间件，类似filter*/
//错误处理
app.get('/*',mware.errors);
app.post('/*',mware.errors);
//记录访问的post资源
app.post('/*',mware.logConsolepost);
//校验验证码6位
app.get('/cyzm6/*', mware.cyzm6);
app.post('/cyzm6/*', mware.cyzm6);
//校验session的user
app.get('/suser/*', mware.suser);
app.post('/suser/*', mware.suser);

//指定接口路径映射
//用户管理
app.post('/cyzm6/public/user/login',user.login);
app.post('/cyzm6/public/user/register',user.regist);
app.post('/suser/private/user/modifypwd',user.modifypwd);
app.post('/suser/private/user/user/myinfo',user.myinfo);
app.post('/suser/cyzm6/private/user/modifyemail1',user.modifyemail1);
app.post('/suser/cyzm6/private/user/modifyemail2',user.modifyemail2);
app.post('/cyzm6/public/user/findpwd1',user.findpwd1);
app.post('/smail/public/user/findpwd2',user.findpwd2);
app.get('/suser/private/user/modifysign',user.modifysign);
app.get('/suser/private/user/modifyname',user.modifyname);
app.post('/suser/private/user/uploadhead',user.uploadhead);
app.get('/suser/private/user/modifyage',user.modifyage);
app.get('/suser/private/user/modifysex',user.modifysex);
app.get('/suser/private/friend/add',user.add);
app.get('/private/friend/searchname',user.searchname);
app.get('/suser/private/friend/searchid',user.searchid);
app.get('/suser/private/friend/delete',user.deletef);
app.get('/suser/private/friend/modifyrm',user.modifyrm);
app.post('/suser/private/friend/getlist',user.getlist);

//启动服务器，并监听port端口
var port = 8080;
http.createServer(app).listen(port);
log.log(log.INFOS,"/server","启动服务器并监听" + port + "端口");