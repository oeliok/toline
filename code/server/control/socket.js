/**
 * Created by oeli on 16-10-3.
 */
var socket = require('socket.io');
var io = null;

exports.listen = function (server) {
    io = socket.listen(server);
    var system = io.of('/system');
    system.on('connection',function (socket) {
        system.emit('login',{msg:'A user is login !'});
    });
};
