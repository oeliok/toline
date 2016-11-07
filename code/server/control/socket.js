/**
 * Created by oeli on 16-10-3.
 */
var socket = require('socket.io');
var redis = require('../lib/redis').redis;
var log = require('../lib/mylog');
var mongo = require('../lib/mongo');
var ObjectId = require('mongodb').ObjectID;
var users = [];

exports.listen = function (server) {
    var io = socket.listen(server);
    log.info("socket.io启动服务");
    io.on('connection',function (socket) {
        whenconnect(socket);
        whenclose(socket);
    });
};

//当用户连接到系统的时候
function whenconnect(socket) {
    log.debug(socket+" join the server !");
    socket.on('auth-c',function (data) {
        redis.get("sess:"+data.sessionid,function (err, data) {
            if (err) {
                log.error(err);
                socket.emit('auth-s',{code:-1});
                serverclose(socket);
            } else {
                log.trace(data);
                if (data == null) {
                    socket.emit('auth-s',{code:0});
                    serverclose(socket);
                } else {
                    socket.emit('auth-s',{code:1});
                    //激活，提供用户各项功能，发送离线消息，并且在数据库注册登录信息
                    var user = JSON.parse(data);
                    login(socket,user._id);
                }
            }
        });
    });
}

//当用户登录之后离开系统的时候，删除各种资源
function whenclose(socket,userid) {
    socket.on('disconnect', function () {
        log.trace(socket.id + " left room !");
        //除去各种资源
        friendoffline(socket,userid);
        users[userid] = null;
    });
}

//服务器主动关闭连接
function serverclose(socket) {
    log.debug("server colose the connection " + socket.id);
    socket.disconnect(true,function (err) {
        log.error(err);
    });
}

//发送系统的各种消息
function whenerror(socket, msg) {
    socket.emit('serror',{code:0,msg:msg});
}

//用户登录验证
function login(socket,userid) {
    mongo.getConnection(function (db) {
        db.collection('user').updateOne({_id:ObjectId(userid)},{$set:{socket:socket.id}},function (err, result) {
            if (err) {
                log.error(err);
                whenerror(socket,"通讯系统登录失败，请刷新界面");
            } else {
                if (result.result.n > 0) {
                    users[userid] = socket;
                    offlinemsg(socket,userid);
                    historymsg(socket,userid);
                    friendMsg(socket,userid);
                    groupMsg(socket,userid);
                    friendonline(socket,userid);
                    whenclose(socket,userid);
                } else {
                    whenerror(socket,"数据库更新socket失败");
                }
            }
        })
    })
}
function user(socket,next) {

}
//会读取这个人上次离线时间，然后把所有数据都发送到这个那里
function offlinemsg(socket,userid) {
    socket.on('caoff', function (data) {
        mongo.getConnection(function (db) {
            db.collection('user').find({_id:ObjectId(userid)},function (err, user) {
                if (err) {
                    log.error(err);
                    whenerror(socket,"离线消息读取失败");
                } else {
                    if (user != null) {
                        db.collection('friend').find({$or:[{myid:ObjectId(userid)},{frid:ObjectId(userid)}]}).toArray(function (err, friends) {
                            if (err) {
                                log.error(err);
                                whenerror(socket,"离线消息读取失败");
                            } else {
                                if (friends != null) {
                                    var fid = [];
                                    for (var i = 0; i < friends.length; i++) {
                                        fid[i] = {fid:friends[i]._id};
                                    }
                                    if (user.login == null) {
                                        user.login = 0;
                                    }
                                } else {
                                    log.debug(friends);
                                    whenerror(socket,"好友不存在")
                                }
                                db.collection('flog').find({datetime:user.login,$or:fid}).toArray(function (err, flogs) {
                                    if (err) {
                                        log.error(err);
                                        whenerror(socket,"获取好友信息失败");
                                    } else {
                                        db.collection('guser').find({uid:ObjectId(userid)}).toArray(function (err, groups) {
                                            if (err) {
                                                log.error(err);
                                                whenerror(socket,"获取群列表失败");
                                            } else {
                                                if (groups != null) {
                                                    var gid = [];
                                                    for (var  i = 0; i < groups.length; i++) {
                                                        gid[i] = {gid:groups[i].gid};
                                                    }
                                                    db.collection('glog').find({$or:gid}).toArray(function (err, glogs) {
                                                        if (err){
                                                            log.error(err);
                                                            whenerror(socket,"获取用户群聊天记录失败")
                                                        } else {
                                                            if (glogs != null) {
                                                                socket.emit("saoff",{form:"off-line",to:userid,flogs:flogs,glogs:glogs});
                                                            } else {
                                                                log.debug(glogs);
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        log.debug(user);
                        whenerror(socket,"用户不存在")
                    }
                }
            })
        })
    })
}

//用户请求与某个人或者群的消息在某个时间点的前面n条数据
function historymsg(socket,userid) {
    socket.on('chistory',function (data) {
        if (data.type == "group") {
            mongo.getConnection(function (db) {
                db.collection('friend').find({$or:[{myid:ObjectId(userid),frid:ObjectId(data.id)},{frid:ObjectId(userid),myid:ObjectId(data.id)}]}).toArray(function (err, user) {
                    if (err) {
                        log.error(err);
                        whenerror(socket,"查找好友失败");
                    } else {
                        if (user != null) {
                            var uid = [];
                            for (var i = 0; i < user.length; i++) {
                                uid[i] = user[i]._id;
                            }
                            db.collection('flog').find({$or:uid}).toArray(function (err,flogs) {
                                if (err){
                                    log.error(err);
                                    whenerror(socket,"获取好友消息发生错误")
                                } else {
                                    socket.emit('',{"form":"server","to":userid,"type":"friend","date":Date.now(),flogs:flogs});
                                }
                            })
                        } else {
                            log.debug(user);
                            whenerror(socket,"好友列表为空");
                        }
                    }
                })
            })
        } else if (data.type == "friend") {
            mongo.getConnection(function (db) {
                db.collection('guser').findOne({"uid":ObjectId(userid),"gid":ObjectId(data.id)},function (err, data) {
                    if (err) {
                        log.error(err);
                        whenerror(socket,"获取群信息失败");
                    } else {
                        if (data != null) {
                            db.collection('glog').find({gid:ObjectId(data.id)}).toArray(function (err, flogs) {
                                if (err) {
                                    log.error(err);
                                    whenerror(socket,"获取群聊天记录发生错误");
                                } else {
                                    socket.emit('shistory',{form:"server",to:userid,type:"group","date":Date.now(),glogs:flogs});
                                }
                            })
                        } else {
                            log.error(data);
                            whenerror(socket,"你并不在这个群里面！")
                        }
                    }
                })
            })
        } else {
            log.debug(data);
            whenerror(socket,"获取历史消息的数据类型有问题！");
        }
    })
}

//监听这个用户发送到好友的消息
//发送别的用户发送的消息
function friendMsg(socket,userid) {
    socket.on('cfmsg',function (data) {
        var time = Date.now();
        redis.get(userid+data.to,function (err, friend) {
            if (err) {
                log.error(err);
            } else {
                if (friend != null) {
                    users[data.to].emit('sfmsg',{"type":0,"form":userid,"to":data.to,"sendDate":time,"msg":data.msg});
                    mongo.getConnection(function (db) {
                        db.collection('flog').insertOne({"fid":ObjectId(friend),"msg":data.msg,"datetime":time},function (err,result) {
                            if (err) {
                                log.error(err);
                            }
                            log.debug(result);
                        });
                    })
                } else {
                    mongo.getConnection(function (db) {
                        db.collection('friend').findOne({myid:ObjectId(userid),frid:ObjectId(data.to)},function (err, friend) {
                            if (err) {
                                log.error(err);
                            } else {
                                if (friend != null) {
                                    users[data.to].emit('sfmsg',{type:1,sendDate:time,code:0});
                                    redis.set(userid+data.to,friend._id+'',function (err,result) {
                                        if (err) {
                                            log.error(error);
                                        } else {
                                            log.debug(result);
                                        }
                                    });
                                    db.collection('flog').insertOne({"fid":ObjectId(friend),"msg":data.msg,"datetime":time},function (err,result) {
                                        if (err) {
                                            log.error(err);
                                        }
                                        log.debug(result);
                                    });
                                } else {
                                    users[data.to].emit('sfmsg',{type:1,sendDate:time,code:0});
                                }
                            }
                        })
                    })
                }
            }
        })
    })
}

//当服务器认证成功一个用户后，会把这个消息发送到用户的在线好友那里
function friendonline(socket,userid) {
    mongo.getConnection(function (db) {
        db.collection('friend').find({myid:ObjectId(userid)}).toArray(function (err, friends) {
            if (err) {
                log.error(err);
            } else {
                for (var i = 0; i < friends.length; i++) {
                    users[friends._id+''].emit('sfonline',{"Date":Date.now(),"id":userid});
                }
            }
        })
    })
}

//当服务器监听到某个用户下线了，会把这个消息发送到他的在线好友那里
function friendoffline(socket, userid) {
    mongo.getConnection(function (db) {
        db.collection('friend').find({myid:ObjectId(userid)}).toArray(function (err, friends) {
            if (err) {
                log.error(err);
            } else {
                for (var i = 0; i < friends.length; i++) {
                    users[friends._id+''].emit('sfoffline',{"Date":Date.now(),"id":userid});
                }
            }
        })
    })
}

//监听用户向某个群发送的消息
//转发用户想要发送的消息
function groupMsg(socket,userid) {
    socket.on('cgmsg',function (data) {
        var time = Date.now();
        redis.sismember(data.to,userid,function (err, reply) {
            if (err) {
                log.error(err);
            } else {
                if (reply){

                }
            }
        })
    })
}
redis.get(data.to,function (err,result) {
    if (err) {
        log.error(err);
    } else {
        if (result) {

        } else {

        }
        mongo.getConnection(function (db) {
            db.collection('glog').insertOne({"gid":ObjectId(userid),"uid":ObjectId(data.to),"comment":data.msg,date:time},function (err, res) {
                if (err) {
                    log.error(err);
                } else {
                    log.debug(res);
                }
            })
        })
    }
})