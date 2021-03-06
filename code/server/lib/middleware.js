/**
 * Created by oeli on 16-10-5.
 */
var log = require('../log');
exports.cyzm6 = function (req, res, next) {
    var yzm = req.session.yzm;
    log.debug(yzm);
    if ((typeof yzm) != 'string' || yzm == null) {
        res.json({code:0});
        return false;
    }
    req.session.yzm = null;
    var myyzm = req.query.code;
    log.debug(myyzm);
    if ((typeof myyzm) != 'string' || myyzm == null) {
        res.json({code:0});
        return false;
    }
    myyzm = myyzm.toUpperCase();
    if (myyzm != yzm) {
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
    /*log.info(req.query);*/
    next();
};
exports.logConsolepost = function (req, res, next) {
    req.query = req.body;
    /*log.debug(req.query)
    log.debug(req.session.id);*/
    next();
};

exports.errors = function(err, req, res, next) {
    log.error(err);
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