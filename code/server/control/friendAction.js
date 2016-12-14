/**
 * Created by oeli on 16-11-26.
 */
var soketIO = require('../control/socket');
var friend = require('../model/mfriend');
var msg = require('../model/msg');
var Validate = require('../lib/myvalidate');

function addfriend(req, res) {
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
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        soketIO.socketIO(function (io) {
            io.useridTosocketid(data.id, function (socket) {
                var d = {
                    from:req.session.user._id,
                    to:data.id,
                    type:'addfriend',
                    datetime:Date.now(),
                    msg:data.msg
                };
                if (socket) {
                    io.sockets.sockets[socket].emit('addfriend',d);
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
            })
        })
    } else {
        res.json({code:10});
    }
}

function addfriendCheck(req, res) {
    var data = req.query;
    var rule = {
        fid:{
            require:true,
            len:24
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        friend.addfriend(req.session.user._id,data.fid,function (r) {
            if (r) {
                res.json({code:1});
            } else {
                res.json({code:0});
            }
        })
    } else {
        res.json({code:10});
    }
}

function deletefriend(req, res) {
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
        }
    };
    var v = new Validate();
    v.setData(data);
    v.setRules(rule);
    if (v.isok()) {
        soketIO.socketIO(function (io) {
            io.useridTosocketid(data.id, function (socket) {
                var d = {
                    from:req.session.user._id,
                    to:data.id,
                    type:'deletefriend',
                    datetime:Date.now(),
                    msg:data.msg
                };
                if (socket) {
                    io.sockets.sockets[socket].emit('deletefriend',d);
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
                friend.deletefriend(d.from,d.to,null);
            })
        })
    } else {
        res.json({code:10});
    }
}

exports.addfriend = addfriend;
exports.addfriendcheck = addfriendCheck;
exports.deletefriend = deletefriend;