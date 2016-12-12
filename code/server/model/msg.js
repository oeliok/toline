/**
 * Created by oeli on 16-12-5.
 */
var mongo = require('../lib/mongo');
var log = require('../log');
var msg = {
    name:'msg'
};

function addAmsg(m,next) {
    mongo.getDB(function (db) {
        db.collection(msg.name).insertOne(m,function (err, r) {
            if (err) {
                log.error(err);
                next(0);
            } else {
                next(r.insertedCount);
            }
        })
    })
}

function deleteAmsg(q, next) {
    mongo.getConnection(function (db) {
        db.collection(msg.name).deleteOne(q,function (err, r) {
            if (err) {
                log.error(err);
                next(0);
            } else {
                next(r.deletedCount);
            }
        })
    })
}

function updateAmsg(q, u, next) {
    mongo.getConnection(function (db) {
        db.collection(msg.name).updateOne(q, u, function (err, r) {
            if (err) {
                log.error(err);
                next(0);
            } else {
                next(r.upsertedCount);
            }
        })
    })
}

function selectAmsg(q, next) {
    mongo.getConnection(function (db) {
        db.collection(msg.name).findOne(q, function (err, r) {
            if (err) {
                log.error(err);
                next(null);
            } else {
                next(r);
            }
        })
    })
}

exports.addAmsg = addAmsg;
exports.deleteAmsg = deleteAmsg;
exports.findAmsg = selectAmsg;
exports.updateAmsg = updateAmsg;