/**
 * Created by oeli on 16-10-2.
 */
var http = require("http");
var express = require("express");
var user = require("./user");
var app = express();
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

//指定静态文件目录
app.use(express.static(__dirname + '/../www'));

//指定撸起路径映射
app.get('/public/api/login',user.login);
app.get('/public/api/regist',user.regist);


//启动服务器，并监听？端口
http.createServer(app).listen(8080);
log("启动服务器并监听8080端口");