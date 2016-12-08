$(document).ready(function(){
	$.ajaxSetup({
		async : false
	});

	// var tempReturn;
	// getCurrentId();
	// getPersonalIfo();
	// loadFriendList();
	// getSesssionId();
	// // loadGroupList();
	//
	// // makeFriend("10282368061@qq.com");
	// // addFriend("58204df795f9a612dc5e53b3");
	// // deleteFriend("5816dd2835531141d39ad12e");
	// socket= io.connect();
	// socketMonitor();
	// socketConfirm();
	// // console.log("test"+socketSendChatmsg("58034e1c29bce15b80a8aade","聊天信息"));
	// // socketSendGroupmsg("58206c55f46687a6f73763c2","group聊天test");
	// //
	// // socketGetOfflinemsgReady();
	// // socketHistoryGet("friend","58034e1c29bce15b80a8aade",10);
	// // socketHistoryGet("group","58206c55f46687a6f73763c2",10);
	// // changePeronalRemark("修改个性签名aa成功");
	//
	// // console.log("searchid"+getIdByName("sw"));
});
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
	});
	getPersonalIfo();
	loadFriendList();
	loadGroupList();
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
function getNameById(searchId) {
	var temp;
	$.get("/suser/private/friend/searchid",{id:searchId}).done(function (data) {
		console.log(data);
		temp=(data.data)[0].name;
	});
	return temp;
}
function changePeronalRemark(inputtemp) {
	var temp;
	if(inputtemp.length<=0){
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
	}else {
		$.post("/suser/private/friend/getlist", {},
			function (cdata) {
				if(JSON.stringify(cdata.data).length>0){
					var temp=JSON.stringify(cdata.data,["_id","name","remark"]);
					// console.log("好友列表："+temp);
					localStorage.setItem("chatIfo_" + localStorage.currentId, temp);
				}

			}, "json");

	}
}
function loadGroupList() {
	var groupIfo = localStorage.getItem("groupIfo_"+localStorage. currentId);
	groupIfo = JSON.parse(groupIfo);
	if(groupIfo){
		console.log("群列表存在，长度:"+groupIfo.length);
	}else {
		console.log("currentId:"+localStorage.currentId);
		$.post("/suser/private/group/getgroups", {id:localStorage.currentId},
			function (data) {
				console.log("群列表："+JSON.stringify(data));
				// if(JSON.stringify(data).data.length>0){
				// 	var temp=JSON.stringify(data.data,["_id","name","remark"]);
				// 	console.log("群列表："+temp);
				// 	localStorage.setItem("groupIfo_" + localStorage.currentId, temp);
				// }
			}, "json");


	}

}
function makeFriend(makeFriendInput) {
	$.get("/suser/private/friend/searchname",{name:makeFriendInput}).done(function (data) {
		console.log("makeFriend结果:"+JSON.stringify(data.data));
		if(data.data.length<=0){
			//查询为空提示
		}else {

		}
	});
}
function addFriend(FriendId) {
	$.get("/suser/private/friend/add",{fid:FriendId}).done(function (data) {
		console.log("addFriend结果"+data);
	})

}
function deleteFriend(FriendId) {
	$.get("/suser/private/friend/delete",{id:FriendId}).done(function (data) {
		console.log("deleteFriend结果"+data);
	})
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
		Materialize.toast("登录"+code[data.code+1], 2500, 'rounded');
		if(data.code!=1){
			location.reload(true);
		}
	});
	socket.on('saoff',function (data) {
		console.log("离线消息获取"+JSON.stringify(data));
	});
	socket.on('shistory',function (data) {
		console.log("聊天消息获取"+JSON.stringify(data));
		if(data.data.length>0){
			if(data.types==="friend"){
				//对data.data进行处理，发送人id，发送人名字，发送消息
				for(var i=0;i<data.data.length;i++){
					for(var j=0;j<data.fid.length;j++){
						if(data.data[i].fid===data.fid[j]._id){
							data.data[i].sendId=data.fid[j].myid;
						}
					}
				}
				console.log("聊天消息处理后获取"+JSON.stringify(data));
				localStorage.setItem("chatIfo_" + data.to+"_"+data.from,JSON.stringify(data.data));
			}
			if(data.types==="group"){
				localStorage.setItem("groupChatIfo_" + data.to+"_"+data.from,JSON.stringify(data.data));
			}

		}

	});
	socket.on('sfmsg',function (data) {
		//***contentInput为聊天界面模板加载的div
		var contentInput=document.getElementById('contentInput');
		var chatOtherId=sessionStorage.getItem("chatOtherId");
		var chatOtherName=sessionStorage.getItem("chatOtherName");
		console.log("双人聊天信息获取"+JSON.stringify(data));
		if (data.from === localStorage.currentId) {
			var dataTemp=data;
			var personIfo = localStorage.getItem("personIfo_"+localStorage. currentId);
			personIfo = JSON.parse(personIfo);
			dataTemp.name=personIfo.name;
			var date = new Date(data.sendDate);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes();
			// var s = date.getSeconds();
			dataTemp.date=Y+M+D+h+m;
			var html = template('mysay',dataTemp);
			if(data.to===chatOtherId){
				contentInput.innerHTML += html;
				contentInput.scrollTop = contentInput.scrollHeight;
			};
			if(localStorage.getItem("chatIfo_"+localStorage.currentId+"_"+data.to)){
				localStorage.removeItem("chatIfo_"+localStorage.currentId+"_"+data.to);
				socketHistoryGet("friend",data.to,100);
			};
		} else {
			var dataTemp=data;
			dataTemp.name=chatOtherName;
			var date = new Date(data.sendDate);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes();
			// var s = date.getSeconds();
			dataTemp.date=Y+M+D+h+m;
			var html = template('othersay',dataTemp);
			if(data.to===chatOtherId){
				contentInput.innerHTML += html;
				contentInput.scrollTop = contentInput.scrollHeight;
			};
			if(localStorage.getItem("chatIfo_"+localStorage.currentId+"_"+data.from)){
				localStorage.removeItem("chatIfo_"+localStorage.currentId+"_"+data.from);
				socketHistoryGet("friend",data.from,100);
			};
		};
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