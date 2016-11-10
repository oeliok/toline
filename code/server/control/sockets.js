/**
 * Created by oeli on 16-11-10.
 */
var log = require('../log');
var si = require('socket.io');
var mongo = require('../lib/mongo');
var ObjectId = require('mongodb').ObjectID;
var redis = require('../lib/redis').redis;

var user = [];

exports.listen = function (server) {
    io = si.listen(server);
    log.info("socket.io启动服务");
    io.on('connection',function (client) {
        systemnews(client,{info:"error",msg:""});
        client.on('auth-c',function (data) {
            redisget(client,"sess:"+data.sessionid,function (reply) {
                if (reply != null) {
                    var session = JSON.parse(reply);
                    var userid = session.user._id;
                    clientclose(client,userid);
                    offlinelog(client,userid);
                    historylog(client,userid);
                    online(client,userid);
                    offline(client,userid);
                    fmsg(client,userid);
                    gmsg(client,userid);
                    client.emit('auth-s',{code:1});
                } else {
                    client.emit('auth-s',{code:0});
                    systemclose(client);
                }
            })
        });
    })
};

function offlinelog(socket, userid) {
    socket.on('caoff',function (data) {
        mongo.getConnection(function (db) {
            db.collection('friend').find({myid:ObjectId(userid)}).toArray(function (err, friends) {
                if (err) {
                    log.error(err);
                } else {
                    if (friends != null) {

                    }
                }
            })
        })
    })
}

function historylog(socket, userid) {

}

function fmsg(socket, userid) {
    
}

function gmsg(socket, userid) {
    
}

function online(socket, userid) {

}

function offline(socket, userid) {

}

function systemclose(socket, userid) {

}

function clientclose(socket, userid) {
    
}

function systemnews(socket,msg) {
    log.trace(msg);
    socket.emit('serror',msg);
}

function redisget(socket,key,action) {
    redis.get(key,function (err, reply) {
        if (err) {
            log.error(err);
            systemnews(socket,"redis访问时发生错误！");
        } else {
            log.debug(reply);
            action(reply);
        }
    })
}