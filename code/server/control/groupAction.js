/**
 * Created by oeli on 16-12-3.
 */
var group = require('../model/group');
var Validate = require('../lib/myvalidate');
var ObjectId = require('mongodb').ObjectID;
var io = require('../control/socket');

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
                })
            } else {
                res.json({code:0});
            }
        })
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
            r.code = 1;
            res.json(r);
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
        data._id = req.session.user._id;
        group.updategname(data, function (r) {
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
        var q = {_id:ObjectId(req.session.user._id)},
            s = {$set:{remark:data.gremark}};
        group.updategname(q, s, function (r) {
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
    
}

function applygroup(req, res) {
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
        io.socketIO(function (ios) {
            io.useridTosocketid(req.session.user._id, function (socket) {
                var d = {
                    from:req.session.user._id,
                    to:data.id,
                    type:'addfriend',
                    datetime:Date.now(),
                    msg:data.msg
                };
                if (socket) {
                    ios.sockets.sockets[socket].emit('addfrend',d);
                    res.json({code:1});
                } else {
                    res.json({code:0});
                }
            })
        })
    } else {
        res.json({code:10});
    }
}

function exitgroup(req, res) {

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
exports.exitgroup = exitgroup;