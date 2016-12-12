/**
 * Created by oeli on 16-10-17.
 */
var Canvas = require('canvas');
var log = require('../log');

var colors = ["#00FFFF","#000000","#0000FF","#7FFF00","#FFF8DC","#006400","#9932CC","#00BFFF","#FFD700","#7CFC00","#B0C4DE","#FF4500","#2E8B57","#EE82EE","#FFFF00","#9ACD32"];
var rstr = "qazwsxedcrfvtgbyhnujmikolp1QAZ2WSX3EDC4RFV5TGB6YHN7UJM8IK9OL0P";

function yzm(req, res, len) {
    var w = 28 *len;
    var canvas = new Canvas(w, 40);
    var ctx = canvas.getContext('2d');
    var grd=ctx.createLinearGradient(0,0,w,40);
    for (var i = 0; i < 5; i++) {
        grd.addColorStop(i*0.2,colors[Math.floor(Math.random()*colors.length)]);
    }
    // Fill with gradient
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,w,40);
    var rtxt = "";
    var tc = "";
    for (var i = 0; i < len; i++) {
        ctx.fillStyle=colors[Math.floor(Math.random()*colors.length)];
        ctx.font = '30px Impact';
        ctx.shadowBlur=4;
        ctx.shadowColor=colors[Math.floor(Math.random()*colors.length)];
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