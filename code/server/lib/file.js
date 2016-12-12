/**
 * Created by oeli on 16-12-12.
 */
function cp(source, dest) {
    fs.stat(source,function (err, stats) {
        if (err){
            console.log(err);
        } else {
            if (stats.isFile()){
                fs.readFile(source,function (err, from) {
                    if (err) {
                        log.error(err);
                    } else {
                        fs.writeFile(dest, from, function (err) {
                            if (err) {
                                log.error(err);
                            } else {
                                log.debug('write file successfully');
                            }
                        })
                    }
                })
            } else {
                log.info(source+' is not a file!');
            }
        }
    });
}

exports.cp = cp;