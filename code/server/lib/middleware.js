/**
 * Created by oeli on 16-10-5.
 */
exports.yzm = function (req, res, next) {
    
    next();
};

exports.validateUser = function (req, res, next) {
    if (req.session.user == null) {
        res.json({code:0});
        return false;
    } else {
        next();
    }
    return true;
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

    next();
};

exports.errors = function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};