/**
 * Created by oeli on 16-10-3.
 */
var Ios = require("socket.io");
var io = null;

exports.setServer = function (server) {
    io = new Ios(server);
};

