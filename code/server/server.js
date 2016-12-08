/**
 * Created by oeli on 16-10-2.
 */
var fs = require('fs');

fs.writeFile('/tmp/toline.pid', process.pid,  function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log("pid写入文件");
    }
});

console.log("PID:"+process.pid);

var log = require('./log');
var assert = require('assert');
var http = require('http');
var express = require("express");
var session = require('express-session');
var user = require("./control/user");
var mware = require("./lib/middleware");
var captcha = require("./lib/captcha");
var bodyParser = require('body-parser');
var io = require('./control/socket');
var group = require('./control/groupAction');
var friend = require('./control/friendAction');
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

//头像上传
app.post('/suser/private/user/uploadhead',user.uploadhead);
app.post('/suser/private/group/setgrouphead', group.setgrouphead);

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
app.get('/*',mware.logConsoleget);
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
app.get('/suser/private/friend/searchname',user.searchname);
app.get('/suser/private/friend/searchid',user.searchid);
app.get('/suser/private/friend/delete',user.deletef);
app.get('/suser/private/friend/modifyrm',user.modifyrm);
app.post('/suser/private/friend/getlist',user.getlist);
app.get('/suser/sessionid',user.getSessionid);
app.post('/suser/private/group/groupinfo',user.getgroupinfobyid);
//好友操作
app.get('/suser/private/friend/add', friend.addfriend);
app.post('/suser/private/friend/delete', friend.deletefriend);
app.post('/suser/private/friend/addcheck', friend.addfriendcheck);
//群组操作
app.post('/suser/private/group/getgroups',group.getgroups);
app.post('/suser/private/group/creategroup',group.creategroup);
app.post('/suser/private/group/deletegroup', group.deletegroup);
app.post('/suser/private/group/searchgroupbyid', group.searchgroupbyid);
app.post('/suser/private/group/searchgroupbyname', group.searchgroupbyname);
app.post('/suser/private/group/setgroupname', group.setgroupname);
app.post('/suser/private/group/setgroupremark', group.setgroupremark);
app.post('/suser/private/group/setgrouphead', group.setgrouphead);
app.post('/suser/private/group/getgroupmembers', group.getgroupmembers);
app.post('/suser/private/group/applygroup', group.applygroup);
app.post('/suser/private/group/applygroupcheck',group.applygroupcheck);
app.post('/suser/private/group/exitgroup', group.exitgroup);

//启动服务器，并监听port端口
var port = 8080;
var server = http.createServer(app).listen(port);
io.listen(server);
log.info("启动服务器并监听" + port + "端口");