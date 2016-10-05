/**
 * Created by oeli on 16-10-3.
 */
var db = require("./mongo");
var assert = require('assert');

function loginValidate(data) {
    if (data.name == null || data.name.length > 128 || data.name.length < 1) {
        return false;
    }
    if (data.pwd == null || data.pwd.length > 128 || data.pwd.length < 1) {
        return false;
    }
    return true;
}

exports.login = function(req, res) {
    var data = req.query;
    if (loginValidate(data)) {
        db.getConnection(function (db) {
            var collection = db.collection('user');
            collection.findOne({name:data.name},function (err, doc) {
                assert.equal(err, null);
                if (doc == null) {
                    res.json({code:2})
                } else {
                    if (doc.pwd == data.pwd) {
                        res.json({code:1});
                        req.session.user = doc;
                    } else {
                        res.json({code:3});
                    }
                }
                res.end();
            });
        });
    } else {
        res.json({code:0});
        res.end();
    }
};

function registValidate(data) {
    if (data.name == null || data.name.length > 128 || data.name.length < 1) {
        return false;
    }
    if (data.pwd == null || data.pwd.length > 128 || data.pwd.length < 1) {
        return false;
    }
    if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(data.email)) {
        return false;
    }
    var age = parseInt(data.age);
    if (age < 0 || age > 150) {
        return false;
    }
    data.age = age;
    age = parseInt(data.sex);
    if (age < 0 || age > 2) {
        return false;
    }
    data.sex = age;
    return true;
}

exports.regist = function (req, res) {
    var data = req.query;
    if (registValidate(data)){
        db.getConnection(function (db) {
            var collection = db.collection("user");
            collection.findOne({name:data.name},function (err, doc) {
                assert.equal(err, null);
                if (doc == null) {
                    collection.insertOne({
                         "name":data.name,
                         "pwd":data.pwd,
                         "type":1,
                         "email":data.email,
                         "sex":data.sex,
                         "age":data.age,
                         "regist":Date.now(),
                         "remark":""
                    },
                        function (er, da) {
                        assert.equal(null, err);
                        if (da.insertedCount == 1) {
                            res.json({code:1});
                        } else {
                            res.json({code:-1});
                        }
                        res.end();
                    });
                } else {
                    res.json({code:4});
                    res.end();
                }
            });
        });
    } else {
        res.json({code:0});
        res.end();
    }
};
