/**
 * Created by oeli on 16-10-17.
 */
var Canvas = require('canvas');
var log = require('../log');

var light = ["#F0F8FF","#F0FFFF","#FFF8DC","#DCDCDC","#E0FFFF","#87CEEB","#E6E6FA"];
var deep = ["#000000","#A52A2A","#D2691E","#1E90FF","#008000","#4B0082","#3CB371","#800080"];

var rstr = "qazwsxedcrfvtgbyhnujmikolp1QAZ2WSX3EDC4RFV5TGB6YHN7UJM8IK9OL0P";

function yzm(req, res, len) {
    var w = 28 *len;
    var canvas = new Canvas(w, 40);
    var ctx = canvas.getContext('2d');
    var grd=ctx.createLinearGradient(0,0,w,40);
    for (var i = 0; i <= 2; i++) {
        grd.addColorStop(i*0.5,light[Math.floor(Math.random()*light.length)]);
    }
    // Fill with gradient
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,w,40);
    var rtxt = "";
    var tc = "";
    for (var i = 0; i < len; i++) {
        ctx.fillStyle=light[Math.floor(Math.random()*light.length)];
        ctx.font = '30px Impact';
        ctx.shadowBlur=4;
        ctx.shadowColor=deep[Math.floor(Math.random()*deep.length)];
        tc = randomchar();
        ctx.fillText(tc, 28*i, 30);
        rtxt += tc;
    }
    log.debug(rtxt);
    req.session.yzm = rtxt.toUpperCase();
    var str = canvas.toDataURL().split(',');
    var buf = new Buffer(str[1], 'base64');
    res.send(buf);
    res.end();
}

function randomchar() {
    return rstr[Math.floor(Math.random()*rstr.length)];
}

exports.captcha = yzm;