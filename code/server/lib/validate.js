/**
 * Created by oeli on 16-10-14.
 */
//data,reg=[min,max]
function mnum(data, reg) {
    if (data == null || data == ""){
        return false;
    } else {
        if (data < reg[0] || data > reg[1]) {
            return false;
        } else {
            return true;
        }
    }
}
//reg=[min,max]
function mstring(data, reg) {
    if (data == null || data.length < reg[0] || data.length > reg[1]) {
        return false;
    } else {
        return true;
    }
}
//
function mmail(data) {
    var regs = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return regs.test(data);
}
function mpassword(data,reg) {
    var regs = /^[x00-x7f]+$/;
    if (! regs.test(str)){
        return false;
    }
    if (data.length < reg[0] || data.length > reg[1]){
        return false;
    }
    return true;
}
function mphone(data,len) {
    var regs=/^([0-9]|[\-])+$/g;
    if(data.length != len){
        return false;
    } else {
        return regs.test(data);
    }
}
exports.mnum = mnum;
exports.mstring = mstring;
exports.mmail = mmail;
exports.mpassword = mpassword;
exports.mphone = mphone;