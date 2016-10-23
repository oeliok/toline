/**
 * Created by oeli on 16-10-19.
 */
//开发
const DEVELOPS = 0;
//debug
const DEBUGS = 1;
//普通信息
const INFOS = 2;
//致命错误
const ERRORS = 3;

//定义日志输出级别，默认开发模式
var level = DEVELOPS;

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//debug,info,err
function logconsole(type,path,msg) {
    if (type >= level) {
        console.log(new Date().Format("yyyy-MM-dd hh:mm:ss") +"\n"+"PATH:"+path+"\n"+msg);
    }
}
function logconsoles(type,path,fn,msg) {
    if (type >= level) {
        console.log(new Date().Format("yyyy-MM-dd hh:mm:ss"));
        console.log(path);
        console.log(fn);
        console.log(msg);
    }
}
exports.DEVELOPS = DEVELOPS;
exports.DEBUGS = DEBUGS;
exports.INFOS = INFOS;
exports.ERRORS = ERRORS;

exports.log = logconsole;
exports.logs = logconsoles;