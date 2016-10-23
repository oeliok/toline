/**
 * Created by oeli on 16-10-19.
 */
var multer = require('multer');

var saveavter = multer.diskStorage({
    destination:function (req,file,next) {
        next(null,__dirname+'/../../www/avator');
    },
    filename:function (req,file,next) {
        next(null,req.session.user._id);
    }
});

function avter() {
    return multer({
        storage:saveavter,
        limits:{
            files:1,
            fileSize:1024*256
        },
        fileFilter:function (req, file, cb) {
            console.log(JSON.stringify(file));
            if (/image/.test(file.mimetype)) {
                cb(null, true);
            } else {
                cb({code:-1},false);
            }
        }
    });
}

var saveimg = multer.diskStorage({
    destination:function (req,file,next) {
        next(null,__dirname+'/../../www/img');
    },
    filename:function (req,file,next) {
        next(null,file.fieldname + '-' + Date.now());
    }
});

function img() {
    return multer({
        storage:saveimg,
        limits:{
            fileSize:1024*256
        },
        fileFilter:function (req,file,next) {
            if (/image/.test(file.mimetype)) {
                next(null,true);
            } else {
                next({code:-1},false);
            }
        }
    });
}
function eavter(req, res, name) {
    var upload = avter().single(name);
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.json({code:1})
        } else  {
            console.log(JSON.stringify(req.file));
            res.json({code:1});
        }
    });
}

function eimg(req, res, name) {
    var upload = img().single(name);
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.json({code:1})
        } else  {
            console.log(JSON.stringify(req.file));
            res.json({code:1});
        }
    });
}
exports.uploadavter = eavter;
exports.uploadimg = eimg;