/**
 * Created by oeli on 16-10-3.
 */
var db = require("./mongo");
var vertify = require("./lib/validate.js");
var assert = require('assert');

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
function modifypwd(req, res) {
    var data = req.query;
    var user = req.session.user;
    db.getConnection('user').update({_id:user._id},{$set:{pwd:data.pwd}},function (err,user) {
        assert(null,err);
    });
}
function modifyemail1(req, res) {

}
function modifyemail2(req, res) {

}
function findpwd1(req, res) {

}
function findpwd2(req, res) {

}
function modifysign(req, res) {

}
function modifyname(req, res) {

}
function uploadhead(req, res) {

}
function modifyage(req, res) {

}
function modifysex(req, res) {

}
function add(req, res) {

}
function searchname(req, res) {

}
function searchid(req, res) {

}
function deletef(req, res) {

}
function modifyrm(req, res) {

}
function getlist(req, res) {

}
/*
 * 开放接口
 *
 * */
exports.login = login;
exports.regist = regist;
exports.modifypwd = modifypwd;
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