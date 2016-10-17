/**
 * Created by oeli on 16-10-5.
 */
exports.cyzm6 = function (req, res, next) {
    var data = req.query;
    var yzm = req.session.yzm6;
    if (yzm == null) {
        res.json({code:-1});
    } else if (data.code != req.session.yzm6) {
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

exports.logConsole = function (req, res, next) {
    log(req.originalUrl);
    next();
};

exports.errors = function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke ! you can contact us !');
};