/**
 * Created by kevin on 16-10-30.
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

var
    //正则表达式
    email_reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
    password_reg = /^[a-zA-Z\d]\w{4,11}[a-zA-Z\d]$/,
    code_reg = /^\w{6}$/;
//加载页面触发事件
window.onload=load_page();
//200ms监听是否一次激活按钮
window.setInterval(active_send_btn,200);
window.setInterval(active_find_btn,200);
//提示两次密码是否一致
document.getElementById("confirm_password").onblur = function () {
    var
        get_password = $("#new_password").val(),
        get_confirm = $("#confirm_password").val();
    if(get_password != get_confirm){
        alert("两次密码不一致！");
        $('#code_to_find').src="/public/api/cyzm6?random?" + Math.random();
    }
}
//更新验证码
document.getElementById("code_img").onclick=function () {
    this.src="/public/api/cyzm6?random?" + Math.random();
};
//点击按钮触发事件
document.getElementById("send_btn").onclick= function () {
    send();
};
document.getElementById("find_btn").onclick= function () {
    find();
};


//动画
function load_page() {
    $(document).ready(function () {
        $("#content").animate({width:'100%',height:'100%'});
        $("#head1").slideDown("slow");
        $("#text1").slideDown("slow");
    });
}
//当符合正则表达式 激活发送按钮
function active_send_btn() {
    var
        get_email = $("#email").val(),
        get_code = $("#code_to_send").val();
    document.getElementById("send_btn").disabled = true;
    if (
        email_reg.test(get_email) == true &&
        code_reg.test(get_code) == true
    ){
        document.getElementById("send_btn").disabled = false;
    }
}
//当符合正则表达式 激活修改密码按钮
function active_find_btn() {
    var
        get_password = $("#new_password").val(),
        get_confirm = $("#confirm_password").val(),
        get_code = $("#code_to_find").val();
    document.getElementById("find_btn").disabled = true;
    if (
        password_reg.test(get_password) == true &&
        password_reg.test(get_confirm) == true &&
        code_reg.test(get_code) == true
    ){
        document.getElementById("find_btn").disabled = false;
    }
}
//发送修改密码请求
function send() {
    var
        get_email = $("#email").val(),
        get_code = $("#code_to_send").val();
    alert("arg");
    $.post('/cyzm6/public/user/findpwd1',{
        email:get_email,
        code:get_code
    },function (data) {
        console.log(JSON.stringify(data)+ " ");
        if(data.code === 1){
            var get_text1 = document.getElementById("text1");
            var get_text2 = document.getElementById("text2");
            get_text1.style.display='none';
            get_text2.style.visibility='visible';
            alert(code[data.code + 1]);
        }
        else{

        }
    });
}
//修改密码
function find() {
    var
        get_password = $("#new_password").val(),
        get_confirm = $("#confirm_password").val(),
        get_code = $("#code_to_find").val();
    if(get_password != get_confirm){
        alert("两次密码不一致！");
    }
    $.post('/smail/public/user/findpwd2',{
        newpwd:get_password,
        code:get_code
    },function (data) {
        console.log(JSON.stringify(data)+ " ");
        if(data.code === 1){

        }
        else{

        }
    });
}