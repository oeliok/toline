/**
 * Created by oeli on 16-10-26.
 */
var log = require('../log');
var redis = require("redis");
var client = redis.createClient(6379,"toline.oeli.pub");

client.on("error", function (err) {
    log.error(err);
});
log.info('collect to redis!');
exports.redis = client;