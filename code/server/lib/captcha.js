/**
 * Created by oeli on 16-10-17.
 */
var ccap = require('ccap');

function captcha(req,res,len) {
    var cc = ccap({
        width:25*len,//set width,default is 256
        height:32,//set height,default is 60
        offset:20,//set text spacing,default is 40
        quality:80,//set pic quality,default is 50
        fontsize:30,//set font size,default is 57
        generate:function(){//Custom the function to generate captcha text
            var str = '1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p';
            var text = "";
            for (var i = 0; i < len; i++) {
                text += str[parseInt(Math.random()*100%36)];
            }
            return text;//return the captcha text
        }
    });
    var ary = cc.get();
    var txt = ary[0];
    var buf = ary[1];
    req.session.yzm = txt;
    console.log(txt);
    res.end(buf);
}
exports.captcha = captcha;