/**
 * Created by oeli on 16-10-26.
 */
var redis = require("redis");
var client = redis.createClient(6379,"toline.oeli.pub");

client.on("error", function (err) {
    console.log("Error " + err);
});

exports.redis = client;