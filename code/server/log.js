/**
 * Created by oeli on 16-10-29.
 */
var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'myapp',
    streams: [
        {
            level: 'trace',
            stream: process.stdout            // log INFO and above to stdout
        },
        {
            level: 'error',
            path: __dirname+'/logs/error.log'  // log ERROR and above to a file
        }
    ],
    src:true
});
log.info('log moudule is starting!');

module.exports = log;