/**
 * Created by oeli on 16-12-3.
 */
var log = require('../log');
var mongo = require('../lib/mongo');
var ObjectId = require('mongodb').ObjectID;
var dbt = {
    name:'groups',
    guser:'guser'
};

function insertAgroup(gp, next) {
    mongo.getConnection(function (db) {
        var group = db.collection(dbt.name);
        group.insertOne(gp,function (err, r) {
            if (err){
                log.error(err);
                next(false);
                return false;
            }
            if (1 == r.insertedCount){
                next(true);
            } else {
                next(false);
            }
        })
    })
}

function findAgroup(gp, next) {
    mongo.getConnection(function (db) {
        var group = db.collection(dbt.name);
        group.findOne(gp, function (err, r) {
            if (err){
                log.error(err);
                next(false);
                return false;
            }
            next(r);
        })
    })
}

function deleteAgroup(gp, next) {
    mongo.getConnection(function (db) {
        var group = db.collection(dbt.name);
        group.deleteOne(gp, function (err, r) {
            if (err){
                log.error(err);
                next(false);
                return false;
            }
            if (r.result.n){
                next(true);
            } else {
                next(false);
            }
        })
    })
}

function findgroupbyregex(gp, next) {
    mongo.getConnection(function (db) {
        var group = db.collection(dbt.name);
        group.find({name:{$regex:gp.keyword}}).skip(parseInt(gp.page)*parseInt(gp.size)).limit(parseInt(gp.size)).toArray(function (err, gps) {
            if (err) {
                console.log(err);
                next(false);
                return false;
            }
            next(gps);
        })
    })
}

function updategname(gp, next) {
    mongo.getConnection(function (db) {
        var group = db.collection(dbt.name);
        group.updateOne({_id:ObjectId(gp._id)},{$set:{name:gp.gname}},function (err, r) {
            if (err) {
                log.error(err);
                next(false);
                return false;
            }
            if (r.result.n == 1){
                next(true);
            } else {
                next(false);
            }
        })
    })
}

function updateAfield(q, s, next) {
    mongo.getConnection(function (db) {
        var group = db.collection(dbt.name);
        group.updateOne(q, s, function (err, r) {
            if (err) {
                log.error(err);
                next(false);
                return false;
            }
            if (r.result.n == 1){
                next(true);
            } else {
                next(false);
            }
        })
    })
}

function findgmembers(q, next) {
    mongo.getConnection(function (db) {
        var group = db.collection(dbt.guser);
        group.find(q).toArray(function (err, r) {
            if (err) {
                log.error(err);
                next(false);
                return false;
            } else {
                next(r);
            }
        })
    })
}

function findgroups(q, next) {
    mongo.getConnection(function (db) {
        var group = db.collection(dbt.name);
        group.find(q).toArray(function (err, gs) {
            if (err) {
                log.error(err);
                next([]);
            } else {
                next(gs);
            }
        })
    })
}

function findgroupin(q,next) {
    mongo.getConnection(function (db) {
        var group = db.collection(dbt.guser);
        group.find(q).toArray(function (err, gs) {
            if(err) {
                log.error(err);
                next(false);
            } else {
                next(gs);
            }
        })
    })
}

function checkUserinGroup(gid, uid, next) {
    mongo.getConnection(function (db) {
        var group = db.collection(dbt.name);
        group.findOne({gid:ObjectId(gid),uid:ObjectId(uid)}, function (err, r) {
            if (err) {
                log.error(err);
                next(true);
            } else {
                if (r){
                    next(true);
                } else {
                    next(false);
                }
            }
        })
    })
}

exports.insertagroup = insertAgroup;
exports.findAgroup = findAgroup;
exports.deleteAgroup = deleteAgroup;
exports.findgroupbyregex = findgroupbyregex;
exports.updategname = updategname;
exports.findgmembers = findgmembers;
exports.findgroupin = findgroupin;
exports.findgroups = findgroups;
exports.updateAfield = updateAfield;
exports.checkUserinGroup = checkUserinGroup;