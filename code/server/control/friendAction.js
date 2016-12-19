/**
 * Created by oeli on 16-11-26.
 */
var soketIO = require('../control/socket');
var friend = require('../model/mfriend');
var Msg = require('../model/msg');
var Validate = require('../lib/myvalidate');
var log = require('../log');

function addfriend(req, res) {

    log.debug("addfriend API");
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
        log.debug(data);
        friend.checkIsfriend(req.session.user._id,data.id, function (r) {
            if(r) {
                res.json({code:11});
            } else {
                soketIO.socketIO(function (io) {
                    soketIO.useridTosocketid(data.id, function (socket) {
                        var d = {
                            from:req.session.user._id,
                            to:data.id,
                            type:'addfriend',
                            datetime:Date.now(),
                            msg:data.msg
                        };
                        if (socket) {
                            if (io.sockets.sockets[socket]){
                                io.sockets.sockets[socket].emit('addfriend',d);
                                res.json({code:1});
                            } else {
                                Msg.addAmsg(d, function (r) {
                                    if (r) {
                                        res.json({code: 1});
                                    } else {
                                        res.json({code: 0});
                                    }
                                })
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
            }
        });
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
	    friend.checkIsfriend(req.session.user._id, data.fid,function (r) {
            if (r) {
                res.json({code:11});
            } else {
                friend.addfriend(req.session.user._id,data.fid,function (r) {
                    if (r) {
                        res.json({code:1});
                        soketIO.socketIO(function (ios) {
                            soketIO.useridTosocketid(data.fid, function (socketid) {
                                var mms = {"from":req.session.user._id,"to":data.fid,"type":"addfriendcheckreply","datetime":Date.now(),"msg":"同意成为好友！"};
                                if (ios.sockets.sockets[socketid]) {
                                    ios.sockets.sockets[socketid].emit('addfriendcheckreply',mms);
                                } else {
                                    Msg.addAmsg(mms,function (r) {
                                        log.debug(r);
                                    })
                                }
                            })
                        })
                    } else {
                        res.json({code:0});
                    }
                })
            }
        });
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
        friend.deletefriend(req.session.user._id, data.id,function (r) {
            if (r) {
                soketIO.socketIO(function (io) {
                    soketIO.useridTosocketid(data.id, function (socket) {
                        var d = {
                            from:req.session.user._id,
                            to:data.id,
                            type:'deletefriend',
                            datetime:Date.now(),
                            msg:data.msg
                        };
                        if (io.sockets.sockets[socket]) {
                            io.sockets.sockets[socket].emit('deletefriend',d);
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
                res.json({code:0});
            }
        });
    } else {
        res.json({code:10});
    }
}

exports.addfriend = addfriend;
exports.addfriendcheck = addfriendCheck;
exports.deletefriend = deletefriend;