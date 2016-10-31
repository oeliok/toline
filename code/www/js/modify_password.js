/**
 * Created by kevin on 16-10-30.
 */
document.write("<script language='JavaScript' src='../base/other/reg_exp.js'></script>");
document.write("<script language='JavaScript' src='../base/other/template.js'></script>");
window.onload=load_page();

//200ms监听是否一次激活按钮
var active_send =new active_ec_btn("email","code_to_send","send_btn");
window.setInterval(active_send.active,200);
var active_find = new active_pc_btn("new_password","code_find","find_btn");
window.setInterval(active_find.active,200);

//提示两次密码是否一致
document.getElementById("confirm_password").onblur = function () {
    var
        get_password = $("#new_password").val(),
        get_confirm = $("#confirm_password").val();
    if(get_password != get_confirm){
        alert("两次密码不一致！");
        $('#code_to_find').src="/public/api/cyzm6?random?" + Math.random();
    }
};
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
//发送修改密码请求
function send() {
    var
        get_email = $("#email").val(),
        get_code = $("#code_to_send").val();
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
        }
        else{

        }
        alert(code[data.code + 1]);
        document.getElementById("code_img").src="/public/api/cyzm6?random?" + Math.random();
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
        alert(code[data.code + 1]);
    });
}