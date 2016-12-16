/**
 * Created by oeli on 16-11-25.
 */
var log = require('../log');
var mongo = require('../lib/mongo');
var ObjectId = require('mongodb').ObjectID;

function addFriend(myid, frid, next) {
    var record = [
        {myid:ObjectId(myid),frid:ObjectId(frid),datetime:Date.now(),remark:""},
        {myid:ObjectId(frid),frid:ObjectId(myid),datetime:Date.now(),remark:""}
    ];
    mongo.getConnection(function (db) {
        db.collection('friend').insertMany(record, function (err, r) {
            if (err) {
                log.error(err);
                next(false);
            } else if (2 == r.insertedCount) {
                next(true);
            } else {
                next(false);
                log.info(JSON.stringify(r));
            }
        })
    })
}

function deleteFriend(myid, frid, next) {
    var my = {myid:ObjectId(myid),frid:ObjectId(frid)};
    var you = {myid:ObjectId(frid),frid:ObjectId(myid)};

    mongo.getConnection(function (db) {
        var friend = db.collection('friend');
        friend.removeOne(my,{w:1}).then(function (r) {
            if (r.result.n == 1){
                friend.removeOne(my,{w:1}).then(function (r) {
                    if (r.result.n == 1){
                        next(true);
                    } else {
                        next(false);
                    }
                });
            } else {
                next(false);
            }
        });
    })
}

function checkIsfriend(myid, frid, next) {
    var record = {myid:ObjectId(myid),frid:ObjectId(frid)};
    mongo.getConnection(function (db) {
        var friend = db.collection('friend');
        friend.findOne(record,function (err, r) {
            if (err) {
                log.error(err);
                next(true);
            } else {
                if (r) {
                    next(true);
                } else {
                    next(false);
                }
            }
        })
    })
}

function findFriend(myid, next) {
    mongo.getConnection(function (db) {
        var friend = db.collection('friend');

    })
}

exports.deletefriend = deleteFriend;
exports.addfriend = addFriend;
exports.checkIsfriend = checkIsfriend;