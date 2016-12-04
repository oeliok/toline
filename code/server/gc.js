/**
 * Created by oeli on 16-12-2.
 */
var io = require('socket.io')();
var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'myapp',
    streams: [
        {
            level: 'trace',
            stream: process.stdout
        }
    ],
    src:true
});

log.info('log moudule is starting!');

var users = {};

io.on('connection', function (socket) {
    console.log('JOIN:'+socket.id);
    socket.on('name', function (name) {
        if (users[socket.id]){
            io.emit('namejoin',users[socket.id] + " 更名为 " + name);
        } else {
            io.emit('namejoin',name+" 加入房间");
        }
        socket.emit('nameresult','你的名字是:'+name);
        users[socket.id] = name;
        io.emit('users', users);
    });
    socket.on('msg',function (msg) {
        io.emit('newmsg',users[socket.id]+':'+msg);
    });
    socket.emit('users', users);
    socket.on('disconnect',function () {
        console.log('LEFT:'+socket.id);
        delete users[socket.id];
        io.emit('users', users);
    })
});

io.listen(9876);

log.info('Start socket.io server !');