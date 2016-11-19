/**
 * Created by oeli on 16-11-18.
 */
var si = require('socket.io');
var ObjectId = require('mongodb').ObjectID;

var log = require('../log');
var mongo = require('../lib/mongo');
var redis = require('../lib/redis').redis;

var msgs = {
    welcome:'你好，欢迎使用！',
    userExist:'用户信息不存在！',
    error:'服务器发生错误！'
};

exports.listen = function listen(server) {
    var io = si.listen(server);
    log.info("socket.io启动服务");
    //监听用户的连接
    io.on('connection',function (socket){
        log.debug(socket.id+' join the server!');
        systemInfoMsg(socket,msgs.welcome);
        userAuth(io, socket, function (user) {
            offlineMessage(socket, user.user._id, user.user.login);
            friendOffline(io, socket, user.user._id);
            friendOnline(io, socket, user.user._id);
            friendMessage(io, socket, user.user._id);
            groupMessage(io, socket, user.user._id);
            historymsg(socket,user.user._id);
            socket.emit('auth-s',{"code":1});
        });
    });
};


//系统发送一些提示消息
function systemInfoMsg(socket, msg) {
    socket.emit("news",{info:"info",msg:msg});
}

//系统发送一些错误消息
function systemErrorMsg(socket,msg) {
    socket.emit("news",{info:"error",msg:msg});
}

//用户请求与某个人或者群的消息在某个时间点的前面n条数据
function historymsg(socket,userid) {
    socket.on('chistory',function (data) {
        if (data.type == "group") {
            groupHsitoryMsg(socket, userid);
        } else if (data.type == "friend") {
            friendHistoryMsg(socket, userid);
        } else {
            log.debug(data);
        }
    })
}

function friendHistoryMsg(socket, userid) {
    mongo.getConnection(function (db) {
        db.collection('guser').findOne({"uid":ObjectId(userid),"gid":ObjectId(data.id)},function (err, data) {
            if (err) {
                log.error(err);
            } else {
                if (data != null) {
                    db.collection('glog').find({gid:ObjectId(data.id)}).toArray(function (err, flogs) {
                        if (err) {
                            log.error(err);
                        } else {
                            socket.emit('shistory',{form:"server",to:userid,type:"group","date":Date.now(),glogs:flogs});
                        }
                    })
                } else {
                    log.error(data);
                }
            }
        })
    })
}

function groupHsitoryMsg(socket, userid) {
    mongo.getConnection(function (db) {
        db.collection('friend').find({$or:[{myid:ObjectId(userid),frid:ObjectId(data.id)},{frid:ObjectId(userid),myid:ObjectId(data.id)}]}).toArray(function (err, user) {
            if (err) {
                log.error(err);
            } else {
                if (user != null) {
                    var uid = [];
                    for (var i = 0; i < user.length; i++) {
                        uid[i] = user[i]._id;
                    }
                    db.collection('flog').find({$or:uid}).toArray(function (err,flogs) {
                        if (err){
                            log.error(err);
                        } else {
                            socket.emit('',{"form":"server","to":userid,"type":"friend","date":Date.now(),flogs:flogs});
                        }
                    })
                } else {
                    log.debug(user);
                }
            }
        })
    })
}

function userAuth(io, socket, next) {
    socket.on('auth-c',function (data) {
        redis.get('sess:'+data.sessionid,function (err, reply) {
            if (err) {
                log.error(err);
                systemErrorMsg(socket,msgs.error);
                socket.emit('auth-s',{"code":-1});
                return false;
            }
            if (!reply) {
                log.debug(reply);
                systemInfoMsg(socket,msgs.userExist);
                socket.emit('auth-s',{"code":0});
                return false;
            }
            var user = JSON.parse(reply);
            next(user);
        })
    });
}

function offlineMessage(socket, userid, datetime) {
    socket.on('caoff',function (data) {
        if ((typeof data.from) != 'string' || data.from != userid) {
            log.info(data);
            systemInfoMsg(socket,msgs.userExist);
            return false;
        }
        userFriendOfflineLogs(userid, datetime, function (flogs) {
            userGroupOfflineLogd(userid, datetime, function (glogs) {
                socket.emit('saoff',{from:"off-line",to:userid,flogs:flogs,glogs:glogs});
            })
        })
    })
}

function userFriendOfflineLogs(userid, datetime, next) {
    mongo.getConnection(function (db) {
        var qery = {$or:[{myid:ObjectId(userid)},{frid:ObjectId(userid)}]};
        db.collection('friend').find(qery).toArray(function (err, friends) {
            if (err) {
                log.error(err);
                return false;
            }
            if (!friends || friends.length < 1) {
                log.info(friends);
                return false;
            }
            var fid = [];
            for (var i in friends) {
                fid[i] = {fid:friends[i]._id};
            }
            db.collection('flog').find({$or:fid,datetime:{$gte:datetime}}).toArray(function (err, flogs) {
                if (err) {
                    log.error(err);
                    return false;
                }
                if (!flogs) {
                    log.info(flogs);
                }
                next(flogs);
            })
        })
    })
}

function userGroupOfflineLogd(userid, datetime, next) {
    mongo.getConnection(function (db) {
        db.collection('guser').find({uid:ObjectId(userid)}).toArray(function (err, groups) {
            if (err) {
                log.error(err);
                return false;
            }
            if (!groups || groups.length < 1) {
                log.info(groups);
                return false;
            }
            var gid = [];
            for (var i in  groups) {
                gid[i] = {gid:groups[i].gid};
            }
            db.collection('glog').find({$or:gid,datetime:{$gte:datetime}}).toArray(function (err, glogs) {
                if (err) {
                    log.error(err);
                    return false;
                }
                if (!glogs) {
                    log.info(glogs);
                }
                next(glogs);
            })
        })
    })
}

function friendOnline(io, socket, userid) {
    userGetFriends(userid, function (friends) {
        for (var i in friends) {
            useridToSocketid(friends[i]._d, function (userID) {
                try {
                    io.sockets.sockets[reply].emit('sfonline',{"Date":Date.now(),"id":userid})
                } catch (e) {
                    log.fatal(e);
                }
            })
        }
    });
    redis.set('f'+userid, socket.id, function (err, info) {
        if (err) {
            log.error(err);
        } else {
            log.debug(info);
        }
    });
    mongo.getConnection(function (db) {
        db.collection('user').updateOne({_id:ObjectId(userid)},{$set:{socket:true}}, function (err, info) {
            if (err) {
                log.error(err);
            } else {
                log.debug(info);
            }
        });
    })
}

function userGetFriends(userid, next) {
    mongo.getConnection(function (db) {
        db.collection('friend').find({frid:ObjectId(userid)}).toArray(function (err, friend) {
            if (err) {
                log.error(err);
                return false;
            }
            if (!friend || friend.length < 1) {
                log.info(friend);
                return false;
            }
            var fid = [];
            for (var i in friend) {
                fid[i] = {_id:friend[i].myid};
            }
            db.collection('user').find({$or:fid,login:true}).toArray(function (err, users) {
                if (err) {
                    log.error(err);
                    return false;
                }
                if (!user || user.length < 1) {
                    log.info(users);
                    return false;
                }
                next(users);
            });
        })
    })
}

function useridToSocketid(userid,next) {
    redis.get('f'+userid, function (err , reply) {
        if (err) {
            log.error(err);
            return false;
        }
        next(reply);
    })
}

function friendOffline(io, socket, userid) {
    socket.on('disconnect', function () {
        log.debug(socket.id + " left room !");
        userGetFriends(userid, function (friends) {
            for (var i in friends) {
                useridToSocketid(friends[i]._d, function (userID) {
                    try {
                        io.sockets.sockets[reply].emit('sfoffline',{"Date":Date.now(),"id":userid})
                    } catch (e) {
                        log.fatal(e);
                    }
                })
            }
        });
        redis.del('f'+userid, socket.id, function (err, info) {
            if (err) {
                log.error(err);
            } else {
                log.debug(info);
            }
        });
        mongo.getConnection(function (db) {
            db.collection('user').updateOne({_id:ObjectId(userid)},{$set:{socket:false}}, function (err, info) {
                if (err) {
                    log.error(err);
                } else {
                    log.debug(info);
                }
            });
        })
    });
}

function friendMessage(io, socket, userid) {
    socket.on('cfmsg',function (data) {
        if ((typeof data.from) != 'string' || data.from != userid) {
            log.info(data);
            return false;
        }
        if ((typeof data.to) != 'string' || data.to.length != 24) {
            log.info(data);
            return;
        }
        data.sendDate = Date.now();
        useridToSocketid(data.to,function (reply) {
            if (reply) {
                io.sockets.sockets[reply].emit('sfmsg',data);
            }
            socket.emit('sfmsg',data);
        });
        mongo.getConnection(function (db) {
            db.collection('friend').findOne({myid:ObjectId(userid),frid:ObjectId(data.to)},function (err, friend) {
                if (err){
                    log.error(err);
                    return false;
                }
                if (friend) {
                    db.collection('flog').insertOne({fid:friend_id,msg:data.msg,datetime:data.sendDate}, function (err, reply) {
                        if (err){
                            log.error(err);
                        } else {
                            log.debug(reply);
                        }
                    })
                }
            })
        })

    })
}

function groupMessage(io, socket, userid) {
    socket.on('cgmsg',function (data) {
        if ((typeof data.from) != 'string' || data.from != userid) {
            log.debug(data);
            return false;
        }
        if (data.to) {
            data.sendDate = Date.now();
            checkGroupMenber(userid, data.to,function (gusers) {
                for (var i in gusers) {
                    useridToSocketid(gusers[i], function (socketid) {
                        if (io.sockets.sockets[socketid]) {
                            io.sockets.sockets[socketid].emit('sgmsg',data);
                        }
                    })
                }
            });
        }
    })
}

function checkGroupMenber(userid, groupid, next) {
    redis.sismember('g'+groupid,userid, function (err, reply) {
        if (err) {
            log.error(err);
            return false;
        }
        if (reply) {
            redis.smembers('g'+groupid,function (err, gusers) {
                if (err) {
                    log.error(err);
                    return false;
                }
                if (gusers) {
                    next(gusers);
                }
            });
            return false;
        }
        mongo.getConnection(function (db) {
            db.collection('guser').find({gid:ObjectId(groupid)}).toArray(function (err, gusers) {
                if (err) {
                    log.error(err);
                    return false;
                }
                if (gusers) {
                    var gid = [];
                    for (var i in gusers) {
                        gid[i] = gusers[i].gid + '';
                    }
                    next(gid);
                }
            })
        })
    })
}