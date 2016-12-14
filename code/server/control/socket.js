/**
 * Created by oeli on 16-11-18.
 */
var si = require('socket.io');
var ObjectId = require('mongodb').ObjectID;

var log = require('../log');
var mongo = require('../lib/mongo');
var redis = require('../lib/redis').redis;

var msgs = {
    welcome: '你好，欢迎使用！',
    userExist: '用户信息不存在！',
    error: '服务器发生错误！'
};

var IO = null;

exports.listen = function listen(server) {
    IO = si.listen(server);
    log.info("socket.io启动服务");
    //监听用户的连接
    IO.on('connection', function(socket) {
        log.debug(socket.id + ' join the server!');
        systemInfoMsg(socket, msgs.welcome);
        userAuth(IO, socket, function(user) {
            offlineMessage(socket, user.user._id, user.user.login);
            friendOffline(IO, socket, user.user._id);
            friendOnline(IO, socket, user.user._id);
            friendMessage(IO, socket, user.user._id);
            groupMessage(IO, socket, user.user._id);
            historymsg(socket, user.user._id);
            sendmsg(socket, user.user._id);
            socket.emit('auth-s', {
                "code": 1
            });
        });
    });
};

exports.socketIO = function (next) {
    if (IO) {
        next(IO);
    } else {
        log.info('IO is null');
    }
};

//系统发送一些提示消息
function systemInfoMsg(socket, msg) {
    socket.emit("news", {
        info: "info",
        msg: msg
    });
}

//系统发送一些错误消息
function systemErrorMsg(socket, msg) {
    socket.emit("news", {
        info: "error",
        msg: msg
    });
}

function getSortFun(order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    return (new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1'));
}

//用户请求与某个人或者群的消息在某个时间点的前面n条数据
function historymsg(socket, userid) {
    socket.on('chistory', function(data) {
        if (data.type == "group") {
            groupHistoryMsg(socket, userid, data.to, data.date, data.len, data.id);
        } else if (data.type == "friend") {
            friendHsitoryMsg(socket, userid, data.to, data.date, data.len, data.id);
        } else {
            log.debug(data);
        }
    })
}

function groupHistoryMsg(socket, userid, grid, datetime, limit, id) {
    mongo.getConnection(function(db) {
        db.collection('guser').find({
            uid: ObjectId(userid),
            gid: ObjectId(grid)
        }).toArray(function(err, data) {
            if (err) {
                log.error(err);
                return false;
            }
            if (!data) {
                log.debug(data);
                return false;
            }
            db.collection('glog').find({
                "gid": ObjectId(grid),
                datetime: {
                    $lt: datetime
                }
            }).sort({datetime:-1}).limit(limit).toArray(function(err, glogs) {
                if (err) {
                    log.error(err);
                    return false;
                }
                glogs.sort(getSortFun('asc','datetime'));
                socket.emit('shistory', {
                    id: id,
                    from: grid,
                    to: userid,
                    types: 'group',
                    sendDate: Date.now(),
                    data: glogs
                });
            })
        })
    })
}

function friendHsitoryMsg(socket, userid, frid, datetime, limit, id) {
    mongo.getConnection(function(db) {
        var query = {
            $or: [{
                myid: ObjectId(userid),
                frid: ObjectId(frid)
            }, {
                myid: ObjectId(frid),
                frid: ObjectId(userid)
            }]
        };
        db.collection('friend').find(query).limit(limit).toArray(function(err, friends) {
            var fid = [];
            for (var i in friends) {
                fid[i] = {
                    fid: friends[i]._id
                };
            }
            db.collection('flog').find({
                $or: fid,
                datetime: {
                    $lt: datetime
                }
            }).sort({datetime:-1}).limit(limit).toArray(function(err, flogs) {
                if (err) {
                    log.error(err);
                    return false;
                }
                flogs.sort(getSortFun('asc','datetime'));
                socket.emit('shistory', {
                    id: id,
                    from: frid,
                    to: userid,
                    types: 'friend',
                    sendDate: Date.now(),
                    fid:friends,
                    data: flogs
                });
            })
        })
    })
}


function userAuth(io, socket, next) {
    socket.on('auth-c', function(data) {
        redis.get('sess:' + data.sessionid, function(err, reply) {
            if (err) {
                log.error(err);
                systemErrorMsg(socket, msgs.error);
                socket.emit('auth-s', {
                    "code": -1
                });
                return false;
            }
            if (!reply) {
                log.debug(reply);
                systemInfoMsg(socket, msgs.userExist);
                socket.emit('auth-s', {
                    "code": 0
                });
                return false;
            }
            var user = JSON.parse(reply);
            next(user);
        })
    });
}

function offlineMessage(socket, userid, datetime) {
    socket.on('caoff', function(data) {
        if ((typeof data.from) != 'string' || data.from != userid) {
            log.info(data);
            systemInfoMsg(socket, msgs.userExist);
            return false;
        }
        userFriendOfflineLogs(userid, datetime, function(flogs) {
            userGroupOfflineLogd(userid, datetime, function(glogs) {
                socket.emit('saoff', {
                    from: "off-line",
                    to: userid,
                    flogs: flogs,
                    glogs: glogs
                });
            })
        })
    })
}

function userFriendOfflineLogs(userid, datetime, next) {
    mongo.getConnection(function(db) {
        var qery = {
            $or: [{
                myid: ObjectId(userid)
            }, {
                frid: ObjectId(userid)
            }]
        };
        db.collection('friend').find(qery).toArray(function(err, friends) {
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
                fid[i] = {
                    fid: friends[i]._id
                };
            }
            db.collection('flog').find({
                $or: fid,
                datetime: {
                    $gte: datetime
                }
            }).toArray(function(err, flogs) {
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
    mongo.getConnection(function(db) {
        db.collection('guser').find({
            uid: ObjectId(userid)
        }).toArray(function(err, groups) {
            if (err) {
                log.error(err);
                return false;
            }
            if (!groups || groups.length < 1) {
                log.info(groups);
                return false;
            }
            var gid = [];
            for (var i in groups) {
                gid[i] = {
                    gid: groups[i].gid
                };
            }
            db.collection('glog').find({
                $or: gid,
                datetime: {
                    $gte: datetime
                }
            }).toArray(function(err, glogs) {
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
    userGetFriends(userid, function(friends) {
        for (var i in friends) {
            useridToSocketid(friends[i]._id, function(userID) {
                try {
                    io.sockets.sockets[reply].emit('sfonline', {
                        "Date": Date.now(),
                        "id": userid
                    })
                } catch (e) {
                    log.fatal(e);
                }
            })
        }
    });
    redis.set('f' + userid, socket.id, function(err, info) {
        if (err) {
            log.error(err);
        } else {
            log.debug(info);
        }
    });
    mongo.getConnection(function(db) {
        db.collection('user').updateOne({
            _id: ObjectId(userid)
        }, {
            $set: {
                socket: true
            }
        }, function(err, info) {
            if (err) {
                log.error(err);
            } else {
                log.debug(JSON.stringify(info.result));
            }
        });
    })
}

function userGetFriends(userid, next) {
    mongo.getConnection(function(db) {
        db.collection('friend').find({
            frid: ObjectId(userid)
        }).toArray(function(err, friend) {
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
                fid[i] = {
                    _id: friend[i].myid
                };
            }
            db.collection('user').find({
                $or: fid,
                login: true
            }).toArray(function(err, users) {
                if (err) {
                    log.error(err);
                    return false;
                }
                if (!users || users.length < 1) {
                    log.info(users);
                    return false;
                }
                next(users);
            });
        })
    })
}

exports.useridTosocketid = useridToSocketid;

function useridToSocketid(userid, next) {
    redis.get('f' + userid, function(err, reply) {
        if (err) {
            log.error(err);
            return false;
        }
        next(reply);
    })
}

function friendOffline(io, socket, userid) {
    socket.on('disconnect', function() {
        log.debug(socket.id + " left room !");
        userGetFriends(userid, function(friends) {
            for (var i in friends) {
                useridToSocketid(friends[i]._id, function(userID) {
                    try {
                        io.sockets.sockets[reply].emit('sfoffline', {
                            "Date": Date.now(),
                            "id": userid
                        })
                    } catch (e) {
                        log.fatal(e);
                    }
                })
            }
        });
        redis.del('f' + userid, socket.id, function(err, info) {
            if (err) {
                log.error(err);
            } else {
                log.debug(info);
            }
        });
        mongo.getConnection(function(db) {
            db.collection('user').updateOne({
                _id: ObjectId(userid)
            }, {
                $set: {
                    socket: false
                }
            }, function(err, info) {
                if (err) {
                    log.error(err);
                } else {
                    log.debug(JSON.stringify(info.result));
                }
            });
        })
    });
}

function friendMessage(io, socket, userid) {
    socket.on('cfmsg', function(data) {
        if ((typeof data.from) != 'string' || data.from != userid) {
            log.info(data);
            return false;
        }
        if ((typeof data.to) != 'string' || data.to.length != 24) {
            log.info(data);
            return;
        }
        data.sendDate = Date.now();
        useridToSocketid(data.to, function(reply) {
            if (reply && io.sockets.sockets[reply]) {
                io.sockets.sockets[reply].emit('sfmsg', data);
            }
            socket.emit('sfmsg', data);
        });
        mongo.getConnection(function(db) {
            db.collection('friend').findOne({
                myid: ObjectId(userid),
                frid: ObjectId(data.to)
            }, function(err, friend) {
                if (err) {
                    log.error(err);
                    return false;
                }
                if (friend) {
                    db.collection('flog').insertOne({
                        fid: friend._id,
                        msg: data.msg,
                        datetime: data.sendDate
                    }, function(err, reply) {
                        if (err) {
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
    socket.on('cgmsg', function(data) {
        if ((typeof data.from) != 'string' || data.from != userid) {
            log.debug(data);
            return false;
        }
        if (data.to) {
            data.sendDate = Date.now();
            checkGroupMenber(userid, data.to, function(gusers) {
                savegroupLogs(userid, data.to, data.msg, data.sendDate);
                for (var i in gusers) {
                    useridToSocketid(gusers[i], function(socketid) {
                        if (io.sockets.sockets[socketid]) {
                            io.sockets.sockets[socketid].emit('sgmsg', data);
                        }
                    })
                }
            });
        }
    })
}

function savegroupLogs(userid, groupid, msg, datetime) {
    mongo.getConnection(function(db) {
        db.collection('glog').insertOne({
            uid: ObjectId(userid),
            gid: ObjectId(groupid),
            msg: msg,
            datetime: datetime
        });
    })
}

function checkGroupMenber(userid, groupid, next) {
    redis.sismember('g' + groupid, userid, function(err, reply) {
        if (err) {
            log.error(err);
            return false;
        }
        if (reply) {
            redis.smembers('g' + groupid, function(err, gusers) {
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
        mongo.getConnection(function(db) {
            db.collection('guser').findOne({
                uid: ObjectId(userid),
                gid: ObjectId(groupid)
            }, function(err, guser) {
                if (err) {
                    log.error(err);
                    return false;
                }
                if (guser) {
                    db.collection('guser').find({
                        gid: ObjectId(groupid)
                    }).toArray(function(err, gusers) {
                        if (err) {
                            log.error(err);
                            return false;
                        }
                        if (gusers) {
                            var gid = [];
                            for (var i in gusers) {
                                gid[i] = gusers[i].uid + '';
                            }
                            redis.sadd('g' + groupid, gid, function(err, reply) {
                                if (err) {
                                    log.error(err);
                                } else {
                                    log.debug(reply);
                                }
                            });
                            next(gid);
                        }
                    })
                } else {
                    log.debug(guser);
                }
            });
        })
    })
}

function sendmsg(socket, userid) {
    mongo.getConnection(function (db) {
        var msg = db.collection('msg');
        msg.find({to:ObjectId(userid)}).toArray(function (err, r) {
            if (err) {
                log.error(err);
                return false;
            }
            for (var i in  r) {
                socket.emit(r[i].type,r[i]);
            }
            msg.deleteMany({to:ObjectId(userid)});
        })
    })
}