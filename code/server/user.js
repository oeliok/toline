/**
 * Created by oeli on 16-10-3.
 */
var l = require('./lib/mylog');
var db = require("./mongo");
var vertify = require("./lib/validate.js");
var email = require('./lib/mail');
var assert = require('assert');
var upload = require('./lib/multerupload');

function login(req, res) {
    var data = req.query;
    if (data != null) {
        if (vertify.mmail(data.email) && vertify.mstring(data.pwd,[6,128])) {
            db.getConnection(function (dbs) {
                dbs.collection('user').findOne({"email":data.email}, function (err, user) {
                    assert.equal(null, err);
                    if (user == null) {
                        res.json({code:2});
                    } else {
                        if (user.password == data.pwd) {
                            req.session.user = user;
                            res.json({code:1});
                        } else {
                            res.json({code:3});
                        }
                    }
                })
            });
        } else {
            res.json({code:9});
        }
    } else {
        res.json({code:0});
    }
}

function regist(req, res) {
    var data = req.query;
    if (vertify.mmail(data.email)) {
        if (vertify.mstring(data.name,[1,128]) && vertify.mstring(data.pwd,[6,128]) && vertify.mnum(data.age,[0,150]) && vertify.mnum(data.sex,[0,4])) {
            db.getConnection(function (dbs) {
                dbs.collection('user').insertOne({"name":data.name,"pwd":data.pwd,"type":1,"email":data.email,"sex":data.sex,"age":data.age,"regist":Data.now(),"remark":"","login":0,"socket":""},function (err, user) {
                    assert(null,err);
                    console.log(user);
                    res.json({code:1});
                })
            });
        } else {
            res.json({code:0});
        }
    } else {
        res.json({code:4});
    }
}
function myinfo(req, res) {
    db.getConnection(function (dbs) {
        dbs.collection('user').findOne({_id:req.session.user._id},function (err, result) {
            if (err) {
                l.logs(l.ERRORS,__filename,"getlist",err);
                res.json({code:-1})
            } else {
                result.pwd = null;
                res.json(result);
            }
        })
    })
}
function modifypwd(req, res) {
    var data = req.query;
    var user = req.session.user;
    db.getConnection('user').update({_id:user._id,pwd:data.oldpwd},{$set:{pwd:data.newpwd}},function (err,user) {
        if (err) {
            res.json({code:-1});
            throw err;
        } else {
            console.log(user);
            res.json({code:1});
        }
    });
}
function modifyemail1(req, res) {
    var string = '1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p';
    var code = '';
    for (var i = 0; i < 6; i++) {
        code += string[parseInt(Math.random()*100%36)];
    }
    req.session.email = code;
    email.sendmail(req.session.user.email,'密码更换','你的更换密码是<b>'+code+'</b>',res);
}
function modifyemail2(req, res) {
    if (req.query.email == null || req.session.email == null || req.query.mailcode != req.session.email) {
        res.json({code:10});
    } else {
        db.getConnection(function (dbs) {
            dbs.collection('user').updateOne({_id:req.session.user._id},{$set:{email:req.query.email}},function (err, result) {
                if (err) {
                    res.json({code:-1});
                } else {
                    l.log(l.DEVELOPS,"/lib/user:modifyemail2",result);
                    res.json({code:1});
                }
            });
        });
    }
}
function findpwd1(req, res) {
    db.getConnection(function (dbs) {
        dbs.collection('user').findOne({email:req.query.email},function (err, user) {
            if (err) {
                console.log(err);
                res.json({code:-1});
            } else {
                if (user == null) {
                    res.json({code:6});
                } else {
                    var string = '1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p';
                    var code = '';
                    for (var i = 0; i < 6; i++) {
                        code += string[parseInt(Math.random()*100%36)];
                    }
                    req.session.findemail = {email:req.query.email,code:code};
                    email.sendmail(req.query.email,'密码找回','你的找回密码的验证码是<b>'+code+'</b>',res);
                }
            }
        })
    });
}
function findpwd2(req, res) {
    if (req.session.findemail == null || req.query.code == null || req.session.findemail !=req.query.code || vertify.mpassword(req.query.newpwd,[6,128])) {
        res.json({code:10});
    } else {
        db.getConnection(function (dbs) {
            dbs.collection('user').updateOne({email:req.session.findemail.email},{$set:{pwd:req.query.newpwd}},function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({code:-1});
                } else {
                    l.log(l.DEVELOPS,"/lib/user:findpwd2",result);
                    res.json({coed:1});
                }
            })
        })
    }
}
function modifysign(req, res) {
    db.getConnection(function (dbs) {
        dbs.collection('user').updateOne({_id:req.session._id},{$set:{remark:req.query.words}},function (err,result) {
            if (err) {
                console.log(err);
                res.json({code:-1});
            } else {
                l.log(l.DEVELOPS,"/lib/user:findpwd2",result);
                res.json({coed:1});
            }
        });
    });
}
function modifyname(req, res) {
    db.getConnection(function (dbs) {
        dbs.collection('user').updateOne({_id:req.session.user._id},{$set:{name:req.query.name}},function (err,result) {
            if (err) {
                console.log(err);
                res.json({code:-1});
            } else {
                l.log(l.DEVELOPS,"/lib/user:modifyname",result);
                res.json({coed:1});
            }
        });
    });
}
function uploadhead(req, res) {
    upload.uploadavter(req, res, 'tx');
}
function modifyage(req, res) {
    db.getConnection(function (dbs) {
        dbs.collection('user').updateOne({_id:req.session.user._id},{$set:{age:req.query.age}},function (err,result) {
            if (err) {
                console.log(err);
                res.json({code:-1});
            } else {
                l.log(l.DEVELOPS,"/lib/user:modifyage",result);
                res.json({coed:1});
            }
        });
    });
}
function modifysex(req, res) {
    db.getConnection(function (dbs) {
        dbs.collection('user').updateOne({_id:req.session.user._id},{$set:{sex:req.query.sex}},function (err,result) {
            if (err) {
                console.log(err);
                res.json({code:-1});
            } else {
                l.log(l.DEVELOPS,"/lib/user:modifysex",result);
                res.json({coed:1});
            }
        });
    });
}
function add(req, res) {
    if (req.query.fid == null) {
        db.getConnection(function (dbs) {
            var user = dbs.collection('user');
            user.find({_id:req.query.fid},function (err,result) {
                if (err) {
                    console.log("/lib/user.add1\n" + err);
                    res.json({code:-1});
                } else {
                    if (result == null){
                        res.json({code:2});
                    } else {
                        dbs.collection('friend').findOne({},function (errs,results) {
                            if (err) {
                                console.log("/lib/user.add2\n" + errs);
                                res.json({code:-1});
                            } else {
                                if (results == null) {
                                    dbs.collection('friend').insertOne({"myid":ObjectId(req.session.user._id),"frid":ObjectId(req.query.fid),"datetime":"","remark":""},function (err, resultss) {
                                        if (err) {
                                            console.log("/lib/user.add3\n" + err);
                                            res.json({code:-1});
                                        } else {
                                            l.log(l.DEVELOPS,"/lib/user:add",resultss);
                                            res.json({coed:1});
                                        }
                                    })
                                } else {
                                    res.json({code:11});
                                }
                            }
                        })
                    }
                }
            })
        })
    } else {
        res.json({code:0});
    }
}
function searchname(req, res) {
    db.getConnection(function (dbs) {
        dbs.collection('user').find({name:req.query.name,_id:{$ne:req.session.user._id}}).toArray(function (err, result) {
            if (err) {
                l.logs(l.ERRORS,__filename,arguments.callee,err);
                res.json({code:-1});
            } else {
                l.logs(l.DEVELOPS,__filename,arguments.callee,result);
                var data = new Array(result.length);
                for (var i = 0; i < result.length; i++) {
                    data[i] = {id:result[i]._id,name:result[i].name,remark:result[i].remark};
                }
                res.json({code:1,data:data});
            }
        })
    })
}
function searchid(req, res) {
    if (req.query.id == null) {
        res.json({code:10});
    }else {
        db.getConnection(function (dbs) {
            dbs.collection('user').find({_id:req.query.id}).toArray(function (err, result) {
                if (err) {
                    l.logs(l.ERRORS,__filename,arguments.callee,err);
                    res.json({code:-1});
                } else {
                    l.logs(l.DEVELOPS,__filename,arguments.callee,result);
                    var data = new Array(result.length);
                    for (var i = 0; i < result.length; i++) {
                        data[i] = {id:result[i]._id,name:result[i].name,remark:result[i].remark};
                    }
                    res.json({code:1,data:data});
                }
            })
        })
    }
}
function deletef(req, res) {
    if (req.query.id == null) {
        res.json({code:10});
    } else {
        db.getConnection(function (dbs) {
            dbs.collection('friend').deleteOne({},function (err,result) {
                if (err) {
                    l.logs(l.ERRORS,__filename,"deletef",err);
                    res.json({code:-1})
                } else {
                    l.logs(l.DEBUGS,__filename,"deletef",result.result);
                    res.json({code:1});
                }
            })
        })
    }
}
function modifyrm(req, res) {
    if (req.query.fid == null || req.query.nickname == null) {
        res.json({code:10});
    } else {
        db.getConnection(function (dbs) {
            dbs.collection('friend').updateOne({myid:req.session.user._id},{$set:{remark:nickname}},function (err, result) {
                if (err) {
                    l.logs(l.ERRORS,__filename,"modifyrm",err);
                    res.json({code:-1})
                } else {
                    l.logs(l.DEBUGS,__filename,"modifyrm",result.result);
                    res.json({code:1});
                }
            })
        })
    }
}
function getlist(req, res) {
    if (req.query.time == null) {
        res.json({code:10});
    } else {
        db.getConnection(function (dbs) {
            dbs.collection('friend').find({myid:req.session.user._id}).toArray(function (err, result) {
                if (err) {
                    l.logs(l.ERRORS,__filename,"getlist",err);
                    res.json({code:-1})
                } else {
                    l.logs(l.DEBUGS,__filename,"getlist",result);
                    if (result.length > 0) {
                        var data = new Array(result.length);
                        for (var i = 0; i < result.length; i++) {
                            data[i] = {_id:result.frid};
                        }
                        dbs.collection('user').find({$or:data}).toArray(function (errs, results) {
                            if (errs) {
                                l.logs(l.ERRORS,__filename,"getlist",errs);
                                res.json({code:-1})
                            } else {
                                data = new Array(results.length);
                                for (var i = 0; i < results.length; i++) {
                                    data[i] = {_id:results.frid};
                                }
                                res.json({code:1,data:data});
                            }
                        });
                    } else {
                        res.json({code:1})
                    }
                }
            })
        });
    }
}
/*
 * 开放接口
 *
 * */
exports.login = login;
exports.regist = regist;
exports.modifypwd = modifypwd;
exports.myinfo = myinfo;
exports.modifyemail1 = modifyemail1;
exports.modifyemail2 = modifyemail2;
exports.findpwd1 = findpwd1;
exports.findpwd2 = findpwd2;
exports.modifysign = modifysign;
exports.modifyname = modifyname;
exports.uploadhead = uploadhead;
exports.modifyage = modifyage;
exports.modifysex = modifysex;
exports.add = add;
exports.searchname = searchname;
exports.searchid = searchid;
exports.deletef = deletef;
exports.modifyrm = modifyrm;
exports.getlist = getlist;