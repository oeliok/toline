"use strict"
//说明：
// login_btn():	登录验证
// register():	注册验证
//
// 用户名为空，或者格式不对 -》 提示错误，清空密码框，聚焦到用户名框，并全选用户名
// 用户名不存在 -》同上
// 密码错误 -》 提示错误，清空密码框，聚焦密码框
// 聚焦到密码框，全选密码
// {"_id" : ObjectId(""),"name":"","pwd":"","type":"","email":"","sex":,"age":,"regist":,"remark":""}

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
document.getElementById("codeImg_login").onclick = function(){
	this.src="/public/api/cyzm6?random?" + Math.random();
};
document.getElementById("codeImg_register").onclick = function(){
	this.src="/public/api/cyzm6?random?" + Math.random();
};
document.getElementById("checkLogin_btn").onclick = function () {
	check_login();
};
document.getElementById("checkRegister_btn").onclick = function () {
	check_register();
};
function check_login(){
	var
		get_userName = $("#userEmail_login").val(),
		get_password = $("#password_login").val(),
		get_code = $("#code_login").val();

	$.post('/cyzm6/public/user/login',{
		email: get_userName,
		pwd: get_password,
		code: get_code,
		token: "1234567890123456",
	},function(data){
		console.log(JSON.stringify(data) + "	");
		if(data.code == 1){
            document.getElementById('login_form').submit();
		}else{
			alert(code[data.code+1]);
			var codeImg_login = document.getElementById("codeImg_login");
			codeImg_login.src="/public/api/cyzm6?random?" + Math.random();
		}
	});
}
function check_register(){
	var
		get_userName = $("#userEmail_register").val(),
		get_password = $("#password_register").val(),
		get_passwordConfirm = $("#password_confirm").val(),
		get_email = $("#userEmail_register").val(),
		get_code = $("#code_register"),
		get_age = 1,
		get_sex = 1;
	if(get_password != get_passwordConfirm){
		alert("两次输入密码不一致！");
		return;
	}
	$.post('/cyzm6/public/user/register',{
		name: get_userName,
		pwd: get_password,
		email: get_email,
		code: get_code,
		age: get_age,
		sex: get_sex,
		token: "1234567890123456",
	},function(data){
		console.log(JSON.stringify(data) + "	");
		if(data.code == 1){
			alert(code[data.code + 1]);
			//document.getElementById("register_form").submit();
		}else{
			alert(code[data.code + 1]);
			var codeImg_register = document.getElementById("codeImg_register");
			codeImg_register.src="/public/api/cyzm6?random?" + Math.random();
		}
	});
}


