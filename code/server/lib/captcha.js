/**
 * Created by oeli on 16-10-17.
 */
var Canvas = require('canvas');
var log = require('../log');

function yzm(req, res, len) {
    var strs = randomtxt(len);
    log.debug(strs);
    req.session.yzm = strs;
    var canvas = new Canvas(100, 40);
    var ctx = canvas.getContext('2d');
    ctx.rect(0,0,100,40);
    ctx.fillStyle="#FFFFFF";
    ctx.fill();
    ctx.fillStyle="#000000";
    ctx.font = '30px Impact';
    ctx.fillText(strs, 0,30);
    var str = canvas.toDataURL().split(',');
    var buf = new Buffer(str[1], 'base64');
    res.send(buf);
}

function randomtxt(len){//Custom the function to generate captcha text
    var str = '1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p';
    var text = "";
    for (var i = 0; i < len; i++) {
        text += str[parseInt(Math.random()*100%36)];
    }
    return text;//return the captcha text
}

exports.captcha = yzm;