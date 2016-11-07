/**
 * Created by kevin on 16-10-31.
 */

//提示信息
var	code = new Array();
code[0] = "服务器未知错误";
code[1] = "失败";
code[2] = "成功";
code[3] = "用户不存在";
code[4] = "密码错误";
code[5] = "用户名已存在";
code[6] = "验证码错误";
code[7] = "邮箱不存在";
code[8] = "用户未登录";
code[9] = "不存在";
code[10] = "数据格式非法";

//正则表达式
var
    email_reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
    password_reg = /^[a-zA-Z\d]\w{4,11}[a-zA-Z\d]$/,
    code_reg = /^\w{6}$/;

//active_e_btn (a_id,btn_id) 表示 <input id="a_id" …… > <button id="btn_id"> 若 a_id的值符合email表达式则激活btn_id 元素
//active_e_btn 中的 e 表示email 方便记忆
var active_e_btn = function (email_id,btn_id) {
    this.active = function() {
        document.getElementById(btn_id).disabled = true ;
        if(check_email_reg(email_id)){
            document.getElementById(btn_id).disabled = false ;
            return true ;
        }
        else {
            return false ;
        }
    }
};
//通过输入密码来激活按钮
var active_p_btn = function (password_id,btn_id) {
    this.active = function() {
        document.getElementById(btn_id).disabled = true ;
        if(check_password_reg(password_id)){
            document.getElementById(btn_id).disabled = false ;
            return true ;
        }
        else {
            return false ;
        }
    }
};
//通过输入邮箱+六位数的验证码 激活按钮
var active_ec_btn =function (email_id,code6_id,btn_id) {
    this.active = function() {
        document.getElementById(btn_id).disabled = true ;
        if(check_email_reg(email_id) && check_code6_reg(code6_id) ){
            document.getElementById(btn_id).disabled = false ;
            return true ;
        }
        else {
            return false ;
        }
    }

};
//输入密码+六位数的验证码激活按钮
var active_pc_btn =function (password_id,code6_id,btn_id) {
    this.active = function() {
        document.getElementById(btn_id).disabled = true ;
        if(check_password_reg(password_id) && check_code6_reg(code6_id)){
            document.getElementById(btn_id).disabled = false ;
            return true ;
        }
        else {
            return false ;
        }
    }
};
//输入邮箱—+密码+验证码激活按钮
var active_epc_btn =function (email_id,password_id,code6_id,btn_id) {
    this.active = function() {
        document.getElementById(btn_id).disabled = true ;
        if(check_email_reg(email_id) && check_password_reg(password_id) && check_code6_reg(code6_id) ){
            document.getElementById(btn_id).disabled = false ;
            return true ;
        }
        else {
            return false ;
        }
    }
};
//输入邮箱—+密码+确认密码+验证码激活按钮
var active_eppc_btn =function (email_id,password_id,confirm_id,code6_id,btn_id) {
    this.active = function() {
        document.getElementById(btn_id).disabled = true ;
        if(check_email_reg(email_id) && check_password_reg(password_id) && check_password_reg(confirm_id) && check_code6_reg(code6_id) ){
            document.getElementById(btn_id).disabled = false ;
            return true ;
        }
        else {
            return false ;
        }
    }
};

//验证正则表达式
function check_email_reg(email_id) {
    var get_email = $("#" + email_id).val();
    return email_reg.test(get_email);
}
//验证密码
function check_password_reg(password_id) {
    var get_password = $("#" + password_id).val();
    return password_reg.test(get_password);
}
//验证6个字符的验证码
function check_code6_reg(code6_id) {
    var get_code = $("#" + code6_id).val();
    return (code_reg.test(get_code) == true);
}
