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
                dbs.collection('user').findOne({}, function (err, user) {
                    assert.equal(null, err);
                    if (user == null) {
                        res.end({code:2});
                    } else {
                        if (user.password == data.pwd) {
                            req.session.user = user;
                            res.end({code:1});
                        } else {
                            res.end({code:3});
                        }
                    }
                })
            });
        } else {
            res.end({code:9});
        }
    } else {
        res.end({code:0});
    }
}
function regist(req, res) {

}
function modifypwd(req, res) {

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