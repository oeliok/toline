/*
 * @Author: sukurax
 * @Date:   2016-10-06 14:57:51
 * @Last Modified by:   sukurax
 * @Last Modified time: 2016-10-09 14:53:19
 */
var socket = io.connect('toline.oeli.pub:8080');
function getCurrentId() {
	$.post("/suser/private/user/user/myinfo", {},
		function(data){
			console.log("当前id:"+data._id );
			localStorage. currentId=data._id;
		}, "json");

}
function getSesssionId() {
	$.get("/suser/sessionid",{}).done(function (data) {
		console.log("sessionId:"+data.id);
		localStorage.sessionId=data.id;
	})
}
function getPersonalIfo(){
	var personIfo = localStorage.getItem("personIfo_"+localStorage. currentId);
	personIfo = JSON.parse(personIfo);
	if(personIfo){
		//加载个人信息（personIfo._id,personIfo.name,personIfo.remark）

	}else{
		$.post("/suser/private/user/user/myinfo", { },
			function(pdata){
				//加载个人信息（pdata._id,pdata.name,pdata.remark）

				var temp=JSON.stringify(pdata,["_id","name","remark"]);
				console.log("个人信息:"+temp);
				localStorage.setItem("personIfo_"+pdata._id,temp);
			}, "json");
	}

}
function getIdByName(searchName) {
	var temp;
	$.get("/suser/private/friend/searchname",{name:searchName}).done(function (data) {
		console.log(data);
		temp=(data.data)[0].id;
	});
	return temp;
}
function changePeronalRemark(inputtemp) {
	var temp;
	if(inputtemp.length<=0){
		//***执行过滤测试
	}else{
		$.get("/suser/private/user/modifysign",{words:inputtemp}).done(function (data) {
			if(data.code===1){
				console.log("修改签名成功!");
			}else {
				console.log("修改签名"+code[data.code+1]);
			}
			temp=data.code;
		})

	}
	return temp;
}
function loadFriendList() {
	var chatIfo = localStorage.getItem("chatIfo_"+localStorage. currentId);
	chatIfo = JSON.parse(chatIfo);
	if(chatIfo){
		console.log("好友列表存在，长度:"+chatIfo.length);
		// for (var i=0;i<chatIfo.length;i++)
		// {
		// 	//加载好友列表chatIfo._id,chatIfo.name,chatIfo.remark
		//
		// }
	}else {
		$.post("/suser/private/friend/getlist", {},
			function (cdata) {
				var temp=JSON.stringify(cdata.data,["_id","name","remark"]);
				console.log("好友列表："+temp);
				for (var i=0;i<JSON.parse(temp).length;i++)
				{
					//加载好友列表temp._id,temp.name,temp.remark

				}
				localStorage.setItem("chatIfo_" + localStorage.currentId, temp);

			}, "json");

	}
}
function loadGroupList() {
	//***接口挂掉了
}
function makeFriend(makeFriendInput) {
	//***接口挂掉了
}
function addFriend(FriendId) {
	//***接口挂掉了

}
function deleteFriend(FriendId) {
	//***接口挂掉了
}
function getDateTime() {
	var timeTemp=new Date().getTime();
	return timeTemp;
}
function socketConfirm() {
	socket.emit('auth-c',{sessionid:localStorage.sessionId});
}
function socketGetOfflinemsgReady() {
	socket.emit('caoff',{from:localStorage.currentId,to:""});
}
function socketHistoryGet(getHistoryType,getHistoryId,getHistoryNum) {
	socket.emit('chistory',{id:getDateTime(),from:localStorage.currentId,to:getHistoryId,type:getHistoryType,date:getDateTime(),len:getHistoryNum});
}
function socketSendChatmsg(getChatId,chatMessage) {
	var sendTime=getDateTime();
	socket.emit('cfmsg',{id:sendTime,from:localStorage.currentId,to:getChatId,sendDate:getDateTime(),msg:chatMessage});
	socket.on('sfmsg',function (data) {
		//进行过滤和定时提醒。
		if(data.id===sendTime){
			var getTime=getDateTime();
			if((getTime-sendTime)<=3000){
				console.log("双人聊天信息正常发送");
			}else if((getTime-sendTime)>=3000){
				console.log("双人聊天信息发送有延迟");
			}
		}
	});

}
function socketSendGroupmsg(getGroupId,groupMessage) {
	var sendTime=getDateTime();
	socket.emit('cgmsg',{id:getDateTime(),from:localStorage.currentId,to:getGroupId,sendDate:getDateTime(),msg:groupMessage});
	socket.on('sgmsg',function (data) {
		//进行过滤和定时提醒。
		if(data.id===sendTime){
			var getTime=getDateTime();
			if((getTime-sendTime)<=3000){
				console.log("群聊天信息正常发送");
			}else if((getTime-sendTime)>=3000){
				console.log("群聊天信息发送有延迟");
			}

		}
	});
}
function socketMonitor() {
	socket.on('news',function (data) {
		console.log("系统消息："+data.info+" "+data.msg);
	});
	socket.on('auth-s',function (data) {
		console.log("登录"+code[data.code+1]);
		alert("登录"+code[data.code+1]);
	});
	socket.on('saoff',function (data) {
		console.log("离线消息获取"+JSON.stringify(data));
	});
	socket.on('shistory',function (data) {
		console.log("聊天消息获取"+JSON.stringify(data));
		if(JSON.stringify(data).length>0){
			if(data.types==="friend"){
				localStorage.removeItem("chatIfo_" + data.from+"_"+data.to);
				localStorage.setItem("chatIfo_" + data.from+"_"+data.to,JSON.stringify(data.data));
			}
			if(data.types==="group"){
				localStorage.removeItem("groupChatIfo_" + data.from+"_"+data.to);
				localStorage.setItem("groupChatIfo_" + data.from+"_"+data.to,JSON.stringify(data.data));
			}

		}

	});
	socket.on('sfmsg',function (data) {
		console.log("双人聊天信息获取"+JSON.stringify(data));
	});
	socket.on('sgmsg',function (data) {
		console.log("群聊天信息获取"+JSON.stringify(data));
	});
	socket.on('sfonline',function (data) {
		console.log("好友上线"+data);
	});
	socket.on('sfoffline',function (data) {
		console.log("好友下线"+data);
	});

}