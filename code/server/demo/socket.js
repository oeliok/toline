/**
 * Created by oeli on 16-10-3.
 */
var http = require('http');
var express = require('express');
var session = require('express-session');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
//session的配置文件
app.use(session({
    secret: 'oeli is best',
    resave: true,
    saveUninitialized: true
}));
app.get('/*', function(req, res, next) {
    next();
});

app.use(express.static(__dirname + "/../../www/"));

io.on('connection', function(socket) {
    socket.emit('sendid', {
        id: socket.id
    });
    socket.on('say', function(data) {
        io.emit('sayall', {
            user: socket.id,
            msg: data.msg,
            date: Date.now()
        });
    });
    socket.on('getname', function(data) {
        io.emit('welcome', {
            msg: socket.id
        });
    });
});
server.listen(8080);