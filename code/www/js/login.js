"use strict"

// 用户名为空，或者格式不对 -》 提示错误，清空密码框，聚焦到用户名框，并全选用户名
// 用户名不存在 -》同上
// 密码错误 -》 提示错误，清空密码框，聚焦密码框
// 聚焦到密码框，全选密码
// {"_id" : ObjectId(""),"name":"","pwd":"","type":"","email":"","sex":,"age":,"regist":,"remark":""}
function login_btn() {
	var
		get_username = $("#username_login").val(),
		get_password = $("#password_login").val();
	if (get_username.length <= 0 || get_password.length <= 0) {
		alert('用户名或密码不能为空！');
		return;
	};
	// alert(get_username + "	" + get_password);
	console.log(get_username + "	" + get_password);
	// $.ajax({
	// 		url: '/public/api/login',
	// 		type: 'get',
	// 		dataType: 'json',
	// 		data: {
	// 			name: get_username,
	// 			pwd: get_password,
	// 			token: "1234567890123456",
	// 		},
	// 	})
	// 	.done(function() {
	// 		console.log("success");
	// 	})
	// 	.fail(function() {
	// 		console.log("error");
	// 	})
	// 	.always(function() {
	// 		console.log("complete");
	// 	});
	$.get('toline.oeli.pub/public/api/', {
		name: get_username,
		pwd: get_password,
		token: "1234567890123456",
	}, function(data) {
		console.log(JSON.stringify(data) + "	");
		//主界面跳转
		switch (data.code) {
			case -1:
				alert("服务器未知错误");
				break;
			case 0:
				alert("失败");
				break;
			case 1:
				alert("成功");
				break;
			case 2:
				alert("用户不存在");
				break;
			case 3:
				alert("密码错误");
				break;
			case 4:
				alert("用户名已存在");
				break;
			default:
				alert("未知错误");
				break;
				return;
		};
	});


}

function register_btn() {
	var
		get_username = $("#username").val(),
		get_password = $("#password").val(),
		get_password_confirm = $("#passwordConfirm").val(),
		get_email = $("#email").val(),
		get_age = $("#age").val(),
		get_sex = jQuery("#selectSex").val();
	if (get_username.length <= 0 || get_password.length <= 0 || get_password_confirm <= 0 || get_email <= 0 || get_age <= 0) {
		alert('输入不能为空！');
		return;
	} else if (get_password_confirm !== get_password) {
		alert('输入密码不一致！');
		return;
	};

	// 		{name:name,type:string,min-len:1,max-len:128},
	//      {name:pwd,type:string,min-len:6,max-len:128},
	//      {name:email,type:string},
	//      {name:age,type:int,range:0-150},
	//      {name:sex:,type:int,range:0-3},
	//      {name:token,type:string,length:16}

	// alert(get_username + "	" + get_password + "	" + get_password_confirm + "	" + get_email + "	" + get_age + "	" + get_sex);
	console.log(get_username + "	" + get_password + "	" + get_password_confirm + "	" + get_email + "	" + get_age + "	" + get_sex);
	$.get('toline.oeli.pub/public/api/regist', {
		name: get_username,
		pwd: get_password,
		email: get_email,
		age: get_age,
		sex: get_sex,
		token: "1234567890123456",
	}, function(data) {
		console.log(JSON.stringify(data) + "	");
		//主界面跳转
		switch (data.code) {
			case -1:
				alert("服务器未知错误");
				break;
			case 0:
				alert("失败");
				break;
			case 1:
				alert("成功");
				break;
			case 2:
				alert("用户不存在");
				break;
			case 3:
				alert("密码错误");
				break;
			case 4:
				alert("用户名已存在");
				break;
			default:
				alert("未知错误");
				break;
				return;
		};
	});
}