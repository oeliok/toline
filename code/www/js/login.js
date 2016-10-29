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
			alert(code[data.code+1]);
            document.getElementById('login_form').submit();
//			var cookie = new CookieStorage(999999,"");
//			cookie.setItem("email",get_email_login);
//			alert(cookie.getItem("email"));
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


function CookieStorage(maxAge, path) {
// 两个参数分别代表储存有效期和作用域
	// 获取一个储存全部cookies的对象
	var cookies = (function() {
		// 类型之前介绍的getCookies函数
		var cookies = {};
		// 该对象最终会返回
		var all = document.cookie;
		// 以大字符串的形式获取所有cookies的信息
		if (all === "")
		// 如果该属性为空白符
			return cookies;
		// 返回一个空对象
		var list = all.split("; ");
		// 分离出名/值对
		for(var i = 0; i < list.length; i++) {
			// 遍历每个cookie
			var cookie = list[i];
			var p = cookie.indexOf("=");
			// 找到第一个“=”符号
			var name = cookie.substring(0,p);
			// 获取cookie的名字
			var value = cookie.substring(p+1);
			// 获取cookie对应的值
			value = decodeURIComponent(value);
			// 对其值进行解码
			cookies[name] = value;
			// 将名值对存储到对象中
		}
		return cookies;
	});
	// 将所有cookie的名字存储到一个数组中
	var keys = [];
	for(var key in cookies) keys.push(key);
	// 现在定义储存API公共的属性和方法
	// 储存的cookies的个数
	this.length = keys.length;
	// 返回第n个cookie的名字，如果n越界则返回null
	this.key = function(n) {
		if (n < 0 || n >= keys.length) return null;
		return keys[n];
	};
	// 返回指定名字的cookie值，如果不存在则返回null
	this.getItem = function(name){
		return cookies[name] || null;
	};
	// 储存cookie值
	this.setItem = function(key, value) {
		if (!(key in cookies)) {
			// 如果要促成的cookie还不存在
			keys.push(key);
			// 将指定的名字加入到储存所有cookie名的数组中
			this.length++;
			// cookies个数加一
		}
		// 将该名/值对数据存储到cookie对象中.
		cookies[key] = value;
		// 开始正式设置cookie.
		// 首先将要储存的cookie的值进行编码
		// 同时创建一个“名称=编码后的值”形式的字符串
		var cookie = key + "=" + encodeURIComponent(value);
		// 将cookie的属性也加入到该字符串中
		if (maxAge) cookie += "; max-age=" + maxAge;
		if (path) cookie += "; path=" + path;
		// 通过document.cookie属性来设置cookie
		document.cookie = cookie;
	};
	// 删除指定的cookie
	this.removeItem = function(key) {
		if (!(key in cookies)) return;
		// 如果cookie不存在，则什么也不做
		// 从内部维护的cookies组删除指定的cookie
		delete cookies[key];
		// 同时将cookie中的名字也在内部的数组中删除.
		// 如果使用ES5定义的数组indexOf()方法会更加简单.
		for(var i = 0; i < keys.length; i++) {
			// 遍历所有的名字
			if (keys[i] === key) {
				// 当我们找到了要找的那个
				keys.splice(i,1);
				// 将它从数组中删除.
				break;
			}
		}
		this.length--;
		// cookies个数减一
		// 最终通过将该cookie的值设置为空字符串
		//以及将有效期设置为0来删除指定的cookie.
		document.cookie = key + "=; max-age=0";
	};
	// 删除所有的cookies
	this.clear = function() {
		// 循环所有的cookies的名字，并将cookies删除
		for(var i = 0; i < keys.length; i++)
			document.cookie = keys[i] + "=; max-age=0";
		// 重置所有的内部状态
		cookies = {};
		keys = [];
		this.length = 0;
	};
}

