"use strict";
//说明：
// 用户名为空，或者格式不对 -》 提示错误，清空密码框，聚焦到用户名框，并全选用户名
// 用户名不存在 -》同上
// 密码错误 -》 提示错误，清空密码框，聚焦密码框
// 聚焦到密码框，全选密码
// {"_id" : ObjectId(""),"name":"","pwd":"","type":"","email":"","sex":,"age":,"regist":,"remark":""}

//依赖：base／jquery-3.1.1.min.js && reg_exp.js

//监听注册／登录的输入是否符合规则(设置开始 按钮为未激活状态)



function about_login(){
	//监听登录输入 激活登录按钮
	$('#email_login,#password_login,#code_login').keyup(function () {
		console.log("re");

		var active_login = new active_epc_btn("email_login","password_login","code_login","check_login_btn");
		console.log("re");

		active_login.active();
	});
	//点击刷新验证码图片--登录
	$("#code_img_login").click(function(){
		this.src="/public/api/cyzm6?random?" + Math.random();
	});
	//点击按钮 执行登录行为
	$("#check_login_btn").click(function () {
		check_login();
	});
}
function about_register(){
	//监听注册输入 激活注册按钮事件
	$('#email_register,#password_register,#confirm_register,#code_register').keyup(function () {
		var active_register = new active_eppc_btn("email_register","password_register","confirm_register","code_register","check_register_btn");
		console.log("re");
		active_register.active();
	});

//点击刷新验证码图片--注册
	$("#code_img_register").click(function(){
		this.src="/public/api/cyzm6?random?" + Math.random();
	});

//点击按钮 执行注册行为
	$("#check_register_btn").click (function () {
		check_register();
	});
}
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
			alert(code[data.code+1]);
            document.getElementById('login_form').submit();
		}else{
			alert(code[data.code+1]);
			var codeImg_login = document.getElementById("code_img_login");
		}
		codeImg_login.src="/public/api/cyzm6?random?" + Math.random();
	});
}

//验证注册
function check_register(){
	var
		//参数--注册
		get_name_register = $("#email_register").val(),
		get_email_register = $("#email_register").val(),
		get_password_register = $("#password_register").val(),
		get_confirm_register = $("#confirm_register").val(),
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
		}
		var codeImg_register = document.getElementById("code_img_register");
		codeImg_register.src="/public/api/cyzm6?random?" + Math.random();
	});
}