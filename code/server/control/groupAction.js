/**
 * Created by oeli on 16-12-3.
 */
var group = require('../model/group');
var Validate = require('../lib/myvalidate');
var ObjectId = require('mongodb').ObjectID;
var fuser = require('../model/fuser');
var io = require('../control/socket');
var Msg = require('../model/msg');
var fs = require("fs");
var log = require('../log');
var FS = require('../lib/file');


function creategroup(req, res) {
    var data = req.query;
    var rule = {
        name:{
            require:true,
            minlen:1,
            maxlen:36,
            msg:'群名字'
        },
        remark:{
            require:true,
            minlen:1,
            maxlen:128,
            msg:'群备注'
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()){
        data.datetime = Date.now();
        data.owner    = ObjectId(req.session.user._id);
        group.insertagroup(data,function (s) {
            if (s){
                group.findAgroup(data,function (r) {
                    r.code = 1;
                    res.json(r);
                    var j = JSON.parse(JSON.stringify(r));
                    fuser.addAmember(r._id,req.session.user._id,function (rr) {
                        log.debug(rr);
                    });
                    FS.cp(__dirname+'/../../www/gavator/moren.jpg',__dirname+'/../../www/gavator/'+j._id);
                })
            } else {
                res.json({code:0});
            }
        });
    } else {
        res.json({code:10});
    }
}

function deletegroup(req, res) {
    var data = req.query;
    var rule = {
        _id:{
            require:true,
            len:24,
            msg:'ID'
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        group.findAgroup({_id:ObjectId(data._id),owner:ObjectId(req.session.user_id)}, function (r) {
            if (r){
                group.deleteAgroup({_id:ObjectId(data._id)},function (r) {
                    if (r) {
                        res.json({code:1});
                    } else {
                        res.json({code:0});
                    }
                })
            } else {
                res.json({code:10});
            }
        })
    } else {
        res.json({code:10});
    }
}

function searchgroupbyid(req, res) {
    var data = req.query;
    var rule = {
        gid:{
            require:true,
            len:24,
            msg:'ID'
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        group.findAgroup({_id:ObjectId(data.gid)}, function (r) {
            if (r) {
                r.code = 1;
                res.json(r);
            } else {
                res.json({code:0});
            }
        })
    } else {
        res.json({code:10});
    }
}

function searchgroupbyname(req, res) {
    var data = req.query;
    var rule = {
        keyword:{
            require:true,
            minlen:1,
            maxlen:10
        },
        page:{
            require:true,
            min:0
        },
        size:{
            require:true,
            min:5
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()){
        group.findgroupbyregex(data, function (r) {
            r.code = 1;
            res.json(r)
        })
    } else {
        res.json({code:10});
    }
}

function setgroupname(req, res) {
    var data = req.query;
    var rule = {
        gid:{
            require:true,
            len:24,
            msg:'ID'
        },
        gname:{
            require:true,
            minlen:1,
            maxlen:36
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        var q = {_id:ObjectId(data.gid)},
            s = {$set:{name:data.gname}};
        group.updateAfield(q, s, function (r) {
            if (r){
                res.json({code:1});
            } else {
                res.json({code:0});
            }
        })
    } else {
        res.json({code:10});
    }
}

function setgroupremark() {
    var data = req.query;
    var rule = {
        gid:{
            require:true,
            len:24,
            msg:'ID'
        },
        gremark:{
            require:true,
            minlen:1,
            maxlen:128
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        var q = {_id:ObjectId(data.gid)},
            s = {$set:{remark:data.gname}};
        group.updateAfield(q, s, function (r) {
            if (r){
                res.json({code:1});
            } else {
                res.json({code:0});
            }
        })
    } else {
        res.json({code:10});
    }
}

function getgroupmembers(req, res) {
    var data = req.query;
    var rule = {
        id:{
            require:true,
            len:24
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        var q = {
            gid:ObjectId(data.id)
        };
        group.findgmembers(q,function (r) {
            r.code = 1;
            res.json(r);
        })
    } else {
        res.json({code:10});
    }
}

function setgrouphead(req, res) {
    var data = req.body;
    var rule = {
        gid:{
            require:true,
            len:24
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        var blob = new Buffer(req.body.head, 'base64');
        fs.writeFile('../../www/groupavator/'+req.body.gid,blob,function (err) {
            if (err) {
                log.error(err);
                res.json({code:0});
            } else {
                res.json({code:1});
            }
        })
    } else {
        res.json({code:10});
    }
}

function applygroup(req, res) {
    var data = req.query;
    var rule = {
        id:{
            require:true,
            len:24
        },
        msg:{
            require:true,
            minlen:1,
            maxlen:128
        },
        gid:{
            require:true,
            len:24
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        io.socketIO(function (ios) {
            io.useridTosocketid(data.id, function (socket) {
                var d = {
                    from:req.session.user._id,
                    to:data.id,
                    gid:data.gid,
                    type:'joingroup',
                    datetime:Date.now(),
                    msg:data.msg
                };
                if (socket) {
                    if (ios.sockets.sockets[socket]){
                        ios.sockets.sockets[socket].emit('joingroup',d);
                        res.json({code:1});
                    } else {
                        Msg.addAmsg(d,function (r) {
                            if (r) {
                                res.json({code:1});
                            } else {
                                res.json({code:0});
                            }
                        });
                    }
                } else {
                    Msg.addAmsg(d,function (r) {
                        if (r) {
                            res.json({code:1});
                        } else {
                            res.json({code:0});
                        }
                    })
                }
            })
        })
    } else {
        res.json({code:10});
    }
}

function applyGroupcheck(req, res) {
    var data = req.query;
    var rule = {
        uid:{
            require:true,
            len:24
        },
        gid:{
            require:true,
            len:24
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        group.findAgroup({_id:ObjectId(data.gid)},function (g) {
            if (g && (('' + g.owner) == data.uid)) {
                fuser.addAmember(data.gid,data.uid,function (r) {
                    if (r) {
                        res.json({code:1});
                    } else {
                        res.json({code:0});
                    }
                });
            } else {
                res.json({code:10});
            }
        })
    } else {
        res.json({code:10});
    }
}

function exitgroup(req, res) {
    var data = req.query;
    var rule = {
        id:{
            require:true,
            len:24
        },
        msg:{
            require:true,
            minlen:1,
            maxlen:128
        },
        gid:{
            require:true,
            len:24
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        io.socketIO(function (ios) {
            io.useridTosocketid(data.id, function (socket) {
                var d = {
                    from:req.session.user._id,
                    to:data.id,
                    type:'exitgroup',
                    datetime:Date.now(),
                    msg:data.msg
                };
                if (socket) {
                    ios.sockets.sockets[socket].emit('exitgroup',d);
                    res.json({code:1});
                } else {
                    Msg.addAmsg(d,function (r) {
                        if (r) {
                            res.json({code:1});
                        } else {
                            res.json({code:0});
                        }
                    })
                }
                fuser.deleteAmember(data.gid,d.from,null);
            })
        })
    } else {
        res.json({code:10});
    }
}

function getgroups(req, res) {
    var uid = req.session.user._id;
    group.findgroupin({uid:ObjectId(uid)}, function (gids) {
        if (gids){
            var q = [];
            for (var i in gids) {
                q[i] = {_id:gids[i].gid};
            }
            group.findgroups({$or:q},function (gs) {
                res.json({code:1,groups:gs});
            })
        } else {
            res.json({code:1,groups:[]})
        }
    })
}

exports.creategroup = creategroup;
exports.deletegroup = deletegroup;
exports.searchgroupbyid = searchgroupbyid;
exports.searchgroupbyname = searchgroupbyname;
exports.setgroupname = setgroupname;
exports.setgroupremark = setgroupremark;
exports.getgroupmembers = getgroupmembers;
exports.setgrouphead = setgrouphead;
exports.applygroup = applygroup;
exports.applygroupcheck = applyGroupcheck;
exports.exitgroup = exitgroup;
exports.getgroups = getgroups;