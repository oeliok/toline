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
function check_login(){
	var
		get_userName = $("#userEmail_login").val(),
		get_password = $("#password_login").val();
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

	$.get('/cyzm6/public/api/login',{
		name: get_userName,
		pwd: get_password,
		token: "1234567890123456",
	},function(data){
		console.log(JSON.stringify(data) + "	");
		if(data.code == -1){
			window.location.href="../../image/index.html";
		}else{
			alert(code[data.code+1]);
		}
	});
}
function check_register(){
	var
		get_userName = $("#userEmail_register").val(),
		get_password = $("#password_register").val(),
		get_passwordConfirm = $("#password_confirm").val(),
		get_email = $("#userEmail_register").val(),
		get_age = 1,
		get_sex = 1;
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
	code[9] = "数据格式非法";
	if(get_password!=get_passwordConfirm){
		alert("两次输入密码不一致！");
		return;
	}
	$.get('/cyzm6/public/api/regist',{
		name: get_userName,
		pwd: get_password,
		email: get_email,
		age: get_age,
		sex: get_sex,
		token: "1234567890123456",
	},function(data){
		console.log(JSON.stringify(data) + "	");
		if(data.code == 1){
			window.location.href="../login/index.html";
		}else{
			alert(code[data.code+1]);
		}
	});
}
