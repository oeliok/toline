/**
 * Created by oeli on 16-11-10.
 */
var log = require('../log');
var si = require('socket.io');
var mongo = require('../lib/mongo');
var ObjectId = require('mongodb').ObjectID;
var redis = require('../lib/redis').redis;

var user = [];
/*
* 安全验证过程先验证用户是否登录，确认后向mongodb注册登录时间和登录状态，同时保存连接和注册各种事件，其他的返回错误消息并主动关闭连接
* */
exports.listen = function (server) {
    io = si.listen(server);
    log.info("socket.io启动服务");
    io.on('connection',function (client) {
        systemnews(client,{info:"info",msg:"连接到socket服务"});
        client.on('auth-c',function (data) {
            redisget(client,"sess:"+data.sessionid,function (reply) {
                if (reply != null) {
                    var session = JSON.parse(reply);
                    var userid = session.user._id;
                    mongo.getConnection(function (db) {
                        db.collection('user').updateOne({_id:ObjectId(userid)},{$set:{login:Date.now(),socket:true}},function (err, result) {
                            if (err) {
                                log.error(err);
                                client.emit('auth-s',{code:-1});
                                systemclose(client);
                            } else {
                                if (result.result.nModified > 0 && result.result.n > 0){
                                    clientclose(client,userid);
                                    offlinelog(client,userid);
                                    historylog(client,userid);
                                    online(client,userid);
                                    offline(client,userid);
                                    fmsg(client,userid);
                                    gmsg(client,userid);
                                    user[userid] = client;
                                    client.emit('auth-s',{code:1});
                                } else {
                                    client.emit('auth-s',{code:0});
                                    systemclose(client);
                                }
                            }
                        })
                    })
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
        if (data.from == userid) {
            mongo.getConnection(function (db) {
                db.collection('user').findOne({_id:ObjectId(userid)},function (err, user) {
                    if (err) {
                        log.error(err);
                    } else {
                        if (user != null) {
                            db.collection('friend').find({login:user.login,$or:[{myid:ObjectId(userid)},{frid:ObjectId(userid)}]}).toArray(function (err, friends) {
                                if (err) {
                                    log.error(err);
                                } else {
                                    var fid = [];
                                    for (i in friends) {
                                        fid[i] = {fid:ObjectId(friends[i]._id)};
                                    }
                                    db.collection('flog').find({$or:fid}).toArray(function (err, flogs) {
                                        if (err) {
                                            log.error(err);
                                        } else {
                                            db.collection('guser').find({uid:ObjectId(userid)}).toArray(function (err , gps) {
                                                if (err) {
                                                    log.error(err);
                                                } else {
                                                    var gpsid = [];
                                                    for (i in gps) {
                                                        gpsid[i] = {gid:gps[i].gid};
                                                    }
                                                    db.collection('glog').find({$or:gpsid}).toArray(function (err, glog) {
                                                        if (err) {
                                                            log.error(err);
                                                        } else {
                                                            socket.emit('saoff',{"from":"off-line","to":"your id","frinds":friends,"flogs":flogs,"glogs":glog})
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        } else {
                            systemnews(socket,{code:'info',msg:'查找不到用户'})
                        }
                    }
                });
            })
        } else {
            systemnews(socket,{code:'error',msg:"用户id错误"})
        }
    })
}

function historylog(socket, userid) {
    socket.on('chistory',function (data) {
        if (data.from != userid) {
            log.info(data+'?????');
        } else if (data.types == 'friend') {
            mongo.getConnection(function (db) {
                db.collection('friend').findOne({myid:ObjectId(userid),frid:ObjectId(data.id)},function (err, fr) {
                    if (err) {
                        log.error(err);
                    } else {
                        db.collection('flog').find({_id:fr._id,datetime:{$lt:data.date}}).toArray(function (err, flogs) {
                            if (err) {
                                log.error(err);
                            } else {
                                socket.emit('shistory',{"from":"server","to":userid,"types":"friend","date":data.date,"flogs":flogs});
                            }
                        })
                    }
                });
            })
        } else if (data.types == 'group') {
            redis.sismember('g'+data.id,userid,function (err, reply) {
                if (err) {
                    log.error(err);
                } else {
                    if (reply) {
                        mongo.getConnection(function (db) {
                            db.collection('glog').find({gid:ObjectId(data.id),datetime:{$lt:data.date}}).toArray(function (err, glogs) {
                                if (err) {
                                    log.error(err);
                                } else {
                                    socket.emit('shistory',{"from":"server","to":userid,"types":"group","date":data.date,"groups":glogs});
                                }
                            })
                        })
                    } else {
                        mongo.getConnection(function (db) {
                            db.collection('guser').findOne({uid:ObjectId(userid),gid:ObjectId(data.id)},function (err, gu) {
                                if (err) {
                                    log.error(err);
                                } else {
                                    if (gu){
                                        db.collection('glog').find({gid:ObjectId(data.id),datetime:{$lt:data.date}}).toArray(function (err, glogs) {
                                            if (err) {
                                                log.error(err);
                                            } else {
                                                socket.emit('shistory',{"from":"server","to":userid,"types":"group","date":data.date,"groups":glogs});
                                            }
                                        });
                                        redis.sadd('f'+data.id,userid,function (err, reply) {
                                            if (err) {
                                                log.error(err);
                                            } else {
                                                log.debug(reply);
                                            }
                                        });
                                    } else {
                                        log.debug(gu);
                                    }
                                }
                            })
                        })
                    }
                }
            })
        } else {
            log.info(data+'!!');
            systemnews(socket,{code:'info',msg:"获取失败"})
        }
    })
}

function fmsg(socket, userid) {
    socket.on('cfmsg',function (data) {
        redis.get(userid+data.to,function (err, reply) {
            if (err) {
                log.error(err);
            } else {
                if (reply) {
                    
                } else {

                }
            }
        })
    })
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