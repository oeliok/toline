/**
 * Created by oeli on 16-10-5.
 */
var l = require('./mylog');
exports.cyzm6 = function (req, res, next) {
    var yzm = req.session.yzm;
    req.session.yzm = null;
    var myyzm = req.query.code;
    if (yzm == null) {
        res.json({code:-1});
    } else if (myyzm != yzm) {
        res.json({code:5});
    } else {
        next();
    }
};

exports.suser = function (req, res, next) {
    if (req.session.user == null) {
        res.json({code:7});
    } else {
        next();
    }
};

exports.token = function (req, res, next) {
    if (req.query.token.length != 16) {
        res.json({code:0});
        return false;
    } else {
        next();
    }
};

exports.logConsoleget = function (req, res, next) {
    l.logs(l.INFOS,__filename,"logConsole",req.query);
    next();
};
exports.logConsolepost = function (req, res, next) {
    req.query = req.body;
    l.logs(l.INFOS,__filename,"logConsole",req.query);
    next();
};

exports.errors = function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke ! you can contact us !');
};

exports.susere = function (req,res,next) {
    if (req.session.user == null) {
        res.json({code:7})
    } else {
        var data = req.query.mailcode;
        if (data == null || req.session.mailcode != null || data != req.session.mailcode) {
            req.session.mailcode = null;
            res.json({code:10});
        } else {
            next();
        }
    }
};