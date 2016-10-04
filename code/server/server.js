/**
 * Created by oeli on 16-10-2.
 */
var http = require("http");
var express = require("express");
var app = express();
var router = express.Router();
var log = function (msg) {
    console.log(Date.parse(new Date()) +":"+msg);
};

app.use(express.static(__dirname + '/../www'));


//启动服务器，并监听？端口
http.createServer(app).listen(8080);
log("启动服务器并监听8080端口");