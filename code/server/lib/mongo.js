/**
 * Created by oeli on 16-10-3.
 */
var log = require('../log');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://toline:0vntu58u85tby3vr@toline.oeli.pub:27017/toline';
var mydb = null;

exports.getConnection = function(action) {
    if (mydb != null) {
        action(mydb);
    }
};
exports.getDB = getDB;

function getDB(next) {
    if (!mydb) {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            log.info("Connected successfully to mongodb");
            mydb = db;
            next(mydb);
        });
    } else {
        next(mydb);
    }
}

getDB(function (r) {
    
});