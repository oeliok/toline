/**
 * Created by oeli on 16-10-3.
 */
var socket = require('socket.io');
var redis = require('../lib/redis').redis;
var log = require('../lib/mylog');
var io = null;
var users = [];

exports.listen = function (server) {
    io = socket.listen(server);
    log.info("socket.io启动服务");
    io.on('connection',function (socket) {
        auth(socket);
    });
};
function auth(socket) {
    socket.on('auth-c',function (data) {
        redis.get("sess:"+data.sid,function (err, data) {
            if (err) {
                log.error(err);
                socket.emit('auth-s',{code:-1});
            } else {
                if (data == null) {
                    socket.emit('auth-s',{code:0});
                } else {
                    socket.emit('auth-s',{code:1});
                    socket.join("system");
                }
            }
        })
    })
}

function sendmsgtofriend() {

}

function sendmsgtogroup() {

}

function online() {

}

function offline() {

}