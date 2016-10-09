/*
 * @Author: sukurax
 * @Date:   2016-10-06 14:57:51
 * @Last Modified by:   sukurax
 * @Last Modified time: 2016-10-09 14:53:19
 */

function paperBtn() {
	alert("点击了paper");
	return;
}

function settingBtn() {
	alert("点击了setting");
	return;
}

function msgSend() {
	if (event.keyCode == 13) //回车键的键值为13
		document.getElementById("msgSendBtn").click(); //调用登录按钮的登录事件
}