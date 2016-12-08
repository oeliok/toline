/**
 * Created by oeli on 16-12-5.
 */
var mongo = require('../lib/mongo');
var log = require('../log');
var ObjectId = require('mongodb').ObjectID;

var fuser = {
    name:'fuser'
};

function addAmember(gid, uid, next) {
    var gu = {
        uid:ObjectId(uid),
        gid:ObjectId(gid),
        datetime:Date.now(),
        remark:''
    };
    mongo.getConnection(function (db) {
        db.insertOne(gu, function (err, r) {
            if (err) {
                log.error(err);
                next(0);
            } else {
                next(r.insertedCount);
            }
        })
    })
}

function deleteAmember(gid, uid, next) {
    mongo.getConnection(function (db) {
        var fu = db.collection(fuser.name);
        fu.deleteOne({uid:ObjectId(uid),gid:ObjectId(gid)},function (err, r) {
            if(err) {
                log.error(err);
                next(0);
            } else {
                next(r.deletedCount);
            }
        })
    })
}

exports.addAmember = addAmember;
exports.deleteAmember = deleteAmember;