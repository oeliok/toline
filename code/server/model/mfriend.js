/**
 * Created by oeli on 16-11-25.
 */
var log = require('../log');
var mongo = require('../lib/mongo');
var ObjectId = require('mongodb').ObjectID;

function addFriend(myid, frid, next) {
    var record = [
        {myid:ObjectId(myid),frid:ObjectId(frid)},
        {myid:ObjectId(frid),frid:ObjectId(myid)}
    ];
    mongo.getConnection(function (db) {
        db.collection('friend').insertMany(record).then(function (r) {
            if (2 == r.insertedCount) {
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

function findFriend(myid, next) {
    mongo.getConnection(function (db) {
        var friend = db.collection('friend');

    })
}