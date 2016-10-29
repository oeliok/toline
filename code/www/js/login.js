"use strict";
//说明：
// login_btn():	登录验证
// register():	注册验证
//
// 用户名为空，或者格式不对 -》 提示错误，清空密码框，聚焦到用户名框，并全选用户名
// 用户名不存在 -》同上
// 密码错误 -》 提示错误，清空密码框，聚焦密码框
// 聚焦到密码框，全选密码
// {"_id" : ObjectId(""),"name":"","pwd":"","type":"","email":"","sex":,"age":,"regist":,"remark":""}


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
	//参数--登录
	get_email_login = $("#email_login").val(),
	get_password_login = $("#password_login").val(),
	get_code_login = $("#code_login").val(),
	//注册--注册
	get_name_register = $("#email_register").val(),
	get_email_register = $("#email_register").val(),
	get_password_register = $("#password_register").val(),
	get_confirm_register = $("#password_register").val(),
	get_code_register = $("#code_register").val(),
	get_age_register = 1,
	get_sex_register = 1,

	//正则表达式
 	email_reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
	password_reg = /^[a-zA-Z\d]\w{4,11}[a-zA-Z\d]$/,
	code_reg = /^\w{6}$/;

//设置每隔200ms 监听一次 激活登录按钮事件
window.setInterval(active_login_btn,200);
//设置每隔200ms 监听一次 激活注册按钮事件
window.setInterval(active_register_btn,200);

//激活登录按钮
function active_login_btn() {
	var
		get_email_login = $("#email_login").val(),
		get_password_login = $("#password_login").val(),
		get_code_login = $("#code_login").val();
	document.getElementById("check_login_btn").disabled = true;
	if (
		email_reg.test(get_email_login) == true &&
		password_reg.test(get_password_login) == true &&
		code_reg.test(get_code_login) == true
	){
		document.getElementById("check_login_btn").disabled = false;
	}
}

//激活注册按钮
function active_register_btn() {
	var
		get_email_register = $("#email_register").val(),
		get_password_register = $("#password_register").val(),
		get_confirm_register = $("#confirm_register").val(),
		get_code_register = $("#code_register").val();
	document.getElementById("check_register_btn").disabled = true;
	if(email_reg.test(get_email_register) == true &&
		password_reg.test(get_password_register) == true &&
		password_reg.test(get_confirm_register) == true &&
		code_reg.test(get_code_register) == true)
	{
		document.getElementById("check_register_btn").disabled = false;
	}
}



//点击刷新验证码图片--登录
document.getElementById("code_img_login").onclick = function(){
	this.src="/public/api/cyzm6?random?" + Math.random();
};
//点击刷新验证码图片--注册
document.getElementById("code_img_register").onclick = function(){
	this.src="/public/api/cyzm6?random?" + Math.random();
};
//点击 执行 验证登录行为
document.getElementById("check_login_btn").onclick = function () {
	check_login();
};
//点击 执行 验证注册行为
document.getElementById("check_register_btn").onclick = function () {
	check_register();
};

// 验证登录
function check_login(){
	var
		//参数--登录
		get_email_login = $("#email_login").val(),
		get_password_login = $("#password_login").val(),
		get_code_login = $("#code_login").val();

	$.post('/cyzm6/public/user/login',{
		email: get_email_login,
		pwd: get_password_login,
		code: get_code_login
	},function(data){
		console.log(JSON.stringify(data) + "	");
		if(data.code == 1){
		//	window.="index.html";
			alert(code[data.code+1]);
            document.getElementById('login_form').submit();
		}else{
			alert(code[data.code+1]);
			var codeImg_login = document.getElementById("code_img_login");
			codeImg_login.src="/public/api/cyzm6?random?" + Math.random();
		}
	});
}
//验证注册
function check_register(){
	var
		//参数--注册
		get_name_register = $("#email_register").val(),
		get_email_register = $("#email_register").val(),
		get_password_register = $("#password_register").val(),
		get_confirm_register = $("#password_register").val(),
		get_code_register = $("#code_register").val(),
		get_age_register = 1,
		get_sex_register = 1;
	if(get_password_register != get_confirm_register){
		alert("两次输入密码不一致！");
		return;
	}
	$.post('/cyzm6/public/user/register',{
		name: get_name_register,
		pwd: get_password_register,
		email: get_email_register,
		code: get_code_register,
		age: get_age_register,
		sex: get_sex_register
	},function(data){
		console.log(JSON.stringify(data) + "	");
		if(data.code == 1){
			alert("您的账号:"+get_email_register+"已经注册成功！");
			setTimeout(window.location.href="login.html",3000);
		}else{
			alert(code[data.code + 1]);
			var codeImg_register = document.getElementById("code_img_register");
			codeImg_register.src="/public/api/cyzm6?random?" + Math.random();
		}
	});
}


