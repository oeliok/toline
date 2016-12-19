$(document).ready(function(){
	$.ajaxSetup({
		async : false
	});
});
var sendState;
var myVideo=document.getElementById("sound");
function consoleTemp(msg) {
	// console.log(msg);
}
function getSortFun(order, sortBy) {
	var ordAlpah = (order == 'asc') ? '>' : '<';
	var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
	return sortFun;
}
function getCurrentId() {
	$.post("/suser/private/user/user/myinfo", {},
		function(data){
			consoleTemp("当前id:"+data._id );
			localStorage. currentId=data._id;
		}, "json");
	getPersonalIfo();
	loadFriendList();
	loadGroupList();
}
function getSesssionId() {
	$.get("/suser/sessionid",{}).done(function (data) {
		consoleTemp("sessionId:"+data.id);
		localStorage.sessionId=data.id;
	});
}
function getPersonalIfo(){
	var personIfo = localStorage.getItem("personIfo_"+localStorage. currentId);
	personIfo = JSON.parse(personIfo);
	if(personIfo){
		localStorage.removeItem("personIfo_"+localStorage. currentId);
	};
	$.post("/suser/private/user/user/myinfo", { },
		function(pdata){
			//加载个人信息（pdata._id,pdata.name,pdata.remark）

			var temp=JSON.stringify(pdata,["_id","name","remark"]);
			consoleTemp("个人信息:"+temp);
			localStorage.setItem("personIfo_"+pdata._id,temp);
		}, "json");
}

function getNameById(searchId) {
	var temp;
	$.get("/suser/private/friend/searchid",{id:searchId}).done(function (data) {
		// consoleTemp("getNameById"+JSON.stringify(data));
		if(data.data){
			temp=data.data.name;
			consoleTemp(temp);
		};
	});
	return temp;
}
function getIfoByName(searchName) {
	var temp;
	$.get("/suser/private/friend/searchname",{keyword:searchName,page:0,size:10}).done(function (data) {
		consoleTemp("getIfoByName"+JSON.stringify(data));
		if(data.data){
			temp=data.data;
		}
	});
	return temp;
}
function changePeronalRemark(inputtemp) {
	var temp;
	if(inputtemp.length<=0){
	}else{
		$.get("/suser/private/user/modifysign",{words:inputtemp}).done(function (data) {
			if(data.code===1){
				consoleTemp("修改签名成功!");
			}else {
				consoleTemp("修改签名"+code[data.code+1]);
			}
			temp=data.code;
		})

	}
	return temp;
}
function loadFriendList() {
	$.post("/suser/private/friend/getlist", {},
		function (cdata) {
			if(cdata.data){
				if(JSON.stringify(cdata.data).length>0){
					var temp=JSON.stringify(cdata.data,["_id","name","remark"]);
					// consoleTemp("好友列表："+temp);
					localStorage.setItem("chatIfo_" + localStorage.currentId, temp);
				}
			}
		}, "json");
}
function loadGroupList() {
	$.post("/suser/private/group/getgroups",
		function (data) {
			consoleTemp("群列表："+JSON.stringify(data));
			if(data.groups){
				if(JSON.stringify(data.groups).length>0){
					var temp=JSON.stringify(data.groups,["_id","name","remark"]);
					consoleTemp("群列表："+temp);
					localStorage.setItem("groupIfo_" + localStorage.currentId, temp);
				}
			}
		}, "json");
}
//searchname,{code:1,data:[{id:"",name:"","remark":""}]}
function searchname(name) {
	var temp;
	$.get("/suser/private/friend/searchname",{name:name}).done(function (data) {
		consoleTemp("searchname:"+JSON.stringify(data.data));
		temp=data.data;
	});
	return temp;
}
function addFriend(friendId,msg) {
	var temp;
	$.get("/suser/private/friend/add",{id:friendId,msg:msg}).done(function (data) {
		consoleTemp("addFriend发送结果"+JSON.stringify(data));
		temp=data.code;
	});
	return temp;
}
function addCheck(friendId) {
	var temp;
	$.post("/suser/private/friend/addcheck", {fid:friendId},
		function (data) {
			consoleTemp("addCheck"+JSON.stringify(data));
			temp=data.code;
		}, "json");
	return temp;
}
function deleteFriend(friendId,msg) {
	var temp;
	$.get("/suser/private/friend/delete",{id:friendId,msg:msg}).done(function (data) {
		consoleTemp("deleteFriend"+JSON.stringify(data));
		return temp=data.code;
	})
	return temp;
}
function creategroup(name,remark) {
	var temp;
	$.post("/suser/private/group/creategroup", {name:name,remark:remark},
		function (data) {
			consoleTemp("creategroup"+JSON.stringify(data));
			temp=data.code;
		}, "json");
	return temp;
}
function deletegroup(_id) {
	$.post("/suser/private/group/deletegroup", {_id:_id},
		function (data) {
			consoleTemp("deletegroup"+data);
		}, "json");
}
function searchgroupbyid(gid) {
	var temp;
	$.post("/suser/private/group/searchgroupbyid", {gid:gid},
		function (data) {
			if(data.code===1){
				consoleTemp("searchgroupbyid"+JSON.stringify(data));
				temp=data;
			};
		}, "json");
	return temp;
}
function searchgroupbyname(keyword,page,size) {
	var temp;
	$.post("/suser/private/group/searchgroupbyname", {keyword:keyword,page:page,size:size},
		function (data) {
			consoleTemp("searchgroupbyname"+JSON.stringify(data));
			if(data){
				temp=data;
			};
		}, "json");
	return temp;
}
function setgroupname(gid,gname) {
	var temp;
	$.post("/suser/private/group/setgroupname", {gid:gid,gname:gname},
		function (data) {
			consoleTemp("setgroupname"+data);
			temp=data.code;
		}, "json");
	return temp;
}
function setgroupremark(gid,gremark) {
	var temp;
	$.post("/suser/private/group/setgroupremark", {gid:gid,gremark:gremark},
		function (data) {
			consoleTemp("setgroupremark"+data);
			temp=data.code;
		}, "json");
	return temp;
}
//base64,string
function setgrouphead(head,gid) {
	$.post("/suser/private/group/setgrouphead", {head:head,gid:gid},
		function (data) {
			consoleTemp("setgrouphead"+data);
		}, "json");
}
function applygroup(id,gid,msg) {
	var temp;
	$.post("/suser/private/group/applygroup", {id:id,gid:gid,msg:msg},
		function (data) {
			consoleTemp("applygroup"+JSON.stringify(data));
			temp=data.code;
		}, "json");
	return temp;
}
function applygroupcheck(gid,uid) {
	var temp;
	$.post("/suser/private/group/applygroupcheck", {gid:gid,uid:uid},
		function (data) {
			consoleTemp("applygroupcheck"+JSON.stringify(data));
			temp=data.code;
		}, "json");
	return temp;
}
function exitgroup(id,gid,msg) {
	$.post("/suser/private/group/exitgroup", {id:id,gid:gid,msg:msg},
		function (data) {
			consoleTemp("exitgroup"+data);
		}, "json");
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
				consoleTemp("双人聊天信息正常发送");
			}else if((getTime-sendTime)>=3000){
				consoleTemp("双人聊天信息发送有延迟");
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
				consoleTemp("群聊天信息正常发送");
			}else if((getTime-sendTime)>=3000){
				consoleTemp("群聊天信息发送有延迟");
			}

		}
	});
}
function socketMonitor() {
	if(sessionStorage.getItem('count')){
		var count=sessionStorage.getItem('count');
	};
	socket.on('news',function (data) {
		consoleTemp("系统消息："+data.info+" "+data.msg);
	});
	socket.on('auth-s',function (data) {
		consoleTemp("登录"+code[data.code+1]);
		if(data.code===1){
			Materialize.toast("登录"+code[data.code+1], 1500, 'rounded');
		}else {
			if(count<=2){
				location.reload(true);
				count++;
				sessionStorage.setItem('count',count);
			}else {
				alert("登录失败次数过多，请重新登录_(:зゝ∠)_");
				location.href="login.html";
			};
		};
	});
	socket.on('saoff',function (data) {
		consoleTemp("离线消息获取"+JSON.stringify(data));
	});
	socket.on('shistory',function (data) {
		// consoleTemp("聊天消息获取"+JSON.stringify(data));
		if(data.data.length>0){
			if(data.types==="group"){
				for(var i=0;i<data.data.length;i++){
					data.data[i].name=getNameById(data.data[i].uid);
				};
				// data.data.sort(getSortFun('desc', 'datatime'));
				localStorage.setItem("groupChatIfo_" + data.to+"_"+data.from,JSON.stringify(data.data));
			};
			if(data.types==="friend"){
				//对data.data进行处理，发送人id，发送人名字，发送消息
				for(var i=0;i<data.data.length;i++){
					for(var j=0;j<data.fid.length;j++){
						if(data.data[i].fid===data.fid[j]._id){
							data.data[i].sendId=data.fid[j].myid;
						}
					}
				};
				// data.data.sort(getSortFun('desc', 'datatime'));
				// consoleTemp("聊天消息处理后获取"+JSON.stringify(data));
				localStorage.setItem("friendChatIfo_" + data.to+"_"+data.from,JSON.stringify(data.data));
			};
		}

	});
	socket.on('sfmsg',function (data) {
		//***contentInput为聊天界面模板加载的div
		var contentInput=document.getElementById('contentInput');
		var chatOtherId=sessionStorage.getItem("chatOtherId");
		var chatOtherName=sessionStorage.getItem("chatOtherName");
		if(sessionStorage.getItem("currentChat_"+localStorage.currentId)){
			var currentChats=JSON.parse(sessionStorage.getItem("currentChat_"+localStorage.currentId));
		}else {
			var currentChats=[];
		};
		var currentChat = {};
		consoleTemp("双人聊天信息当前获取"+JSON.stringify(data));
		myVideo.play();
		clearTimeout(sendState);
		if (data.from === localStorage.currentId) {
			if((data.to===chatOtherId)&&contentInput){
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
				contentInput.innerHTML += html;
				contentInput.scrollTop = contentInput.scrollHeight;
			};
			//插入最近联系人
			for (var i=0;i<currentChats.length;i++){
				if(currentChats[i].from===data.to){
					currentChats.splice(i,1);
				};
			};
			currentChat.from=data.to;
			currentChat.name=getNameById(data.to);
			currentChat.msg=data.msg;
			currentChat.sendDate=data.sendDate;
			currentChat.type="friend";
			currentChats.unshift(currentChat);
			sessionStorage.setItem("currentChat_"+localStorage.currentId,JSON.stringify(currentChats));
			socketHistoryGet("friend",data.to,100);
		} else if(data.to===localStorage.currentId){
			if((data.from===chatOtherId)&&contentInput){
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
				contentInput.innerHTML += html;
				contentInput.scrollTop = contentInput.scrollHeight;
			}else {
				Materialize.toast(getNameById(data.from)+":"+data.msg, 1500, 'rounded');
			};
			//插入最近联系人
			for (var i=0;i<currentChats.length;i++){
				if(currentChats[i].from===data.from){
					currentChats.splice(i,1);
				};
			};
			currentChat.from=data.from;
			currentChat.name=getNameById(data.from);
			currentChat.msg=data.msg;
			currentChat.sendDate=data.sendDate;
			currentChat.type="friend";
			currentChats.unshift(currentChat);
			sessionStorage.setItem("currentChat_"+localStorage.currentId,JSON.stringify(currentChats));
			socketHistoryGet("friend",data.from,100);
		};
	});
	socket.on('sgmsg',function (data) {
		consoleTemp("群聊天信息当前获取"+JSON.stringify(data));
		myVideo.play();
		var contentInput=document.getElementById('contentInput');
		var chatOtherId=sessionStorage.getItem("chatOtherId");
		var chatOtherName=sessionStorage.getItem("chatOtherName");
		clearTimeout(sendState);
		if(sessionStorage.getItem("currentChat_"+localStorage.currentId)){
			var currentChats=JSON.parse(sessionStorage.getItem("currentChat_"+localStorage.currentId));
		}else {
			var currentChats=[];
		};
		var currentChat = {};
		if (data.from === localStorage.currentId) {
			if((data.to===chatOtherId)&&contentInput) {
				var dataTemp=data;
				var personIfo = localStorage.getItem("personIfo_"+localStorage. currentId);
				personIfo = JSON.parse(personIfo);
				dataTemp.name=personIfo.name;
				dataTemp.from=personIfo._id;
				var date = new Date(data.sendDate);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes();
				// var s = date.getSeconds();
				dataTemp.date=Y+M+D+h+m;
				var html = template('mysay',dataTemp);
				contentInput.innerHTML += html;
				contentInput.scrollTop = contentInput.scrollHeight;
			};
			//插入最近联系人
			for (var i=0;i<currentChats.length;i++){
				if(currentChats[i].from===data.to){
					currentChats.splice(i,1);
				};
			};
			currentChat.from=data.to;
			currentChat.name=searchgroupbyid(data.to).name;
			currentChat.msg=getNameById(data.from)+":"+data.msg;
			currentChat.sendDate=data.sendDate;
			currentChat.type="group";
			currentChats.unshift(currentChat);
			sessionStorage.setItem("currentChat_"+localStorage.currentId,JSON.stringify(currentChats));
			socketHistoryGet("group",data.to,100);
		} else{
			if((data.to===chatOtherId)&&contentInput){
				var dataTemp=data;
				dataTemp.name=getNameById(data.from);
				var date = new Date(data.sendDate);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes();
				// var s = date.getSeconds();
				dataTemp.date=Y+M+D+h+m;
				var html = template('othersay',dataTemp);
				contentInput.innerHTML += html;
				contentInput.scrollTop = contentInput.scrollHeight;
			}else {
				Materialize.toast(getNameById(data.from)+":"+data.msg, 1500, 'rounded');
			};
			for (var i=0;i<currentChats.length;i++){
				if(currentChats[i].from===data.to){
					currentChats.splice(i,1);
				};
			};
			currentChat.from=data.to;
			currentChat.name=searchgroupbyid(data.to).name;
			currentChat.msg=getNameById(data.from)+":"+data.msg;
			currentChat.sendDate=data.sendDate;
			currentChat.type="group";
			currentChats.unshift(currentChat);
			sessionStorage.setItem("currentChat_"+localStorage.currentId,JSON.stringify(currentChats));
			socketHistoryGet("group",data.to,100);

		};
	});
	socket.on('sfonline',function (data) {
		consoleTemp("好友上线"+JSON.stringify(data));
	});
	socket.on('sfoffline',function (data) {
		consoleTemp("好友下线"+JSON.stringify(data));
	});
	socket.on('addfriend',function (data) {
		consoleTemp("别人请求添加好友"+JSON.stringify(data));
		myVideo.play();
		if(sessionStorage.getItem("currentChat_"+localStorage.currentId)){
			var currentChats=JSON.parse(sessionStorage.getItem("currentChat_"+localStorage.currentId));
		}else {
			var currentChats=[];
		};
		var currentChat = {};
		currentChat.from=data.from;
		currentChat.name=getNameById(data.from);
		currentChat.msg="请求添加你为好友:"+data.msg;
		currentChat.sendDate=data.datetime;
		currentChat.type="addfriend";
		currentChats.unshift(currentChat);
		Materialize.toast(currentChat.name+"请求添加你为好友", 1500, 'rounded');
		sessionStorage.setItem("currentChat_"+localStorage.currentId,JSON.stringify(currentChats));
	});
	socket.on('deletefriend',function (data) {
		consoleTemp("删除好友"+JSON.stringify(data));
		myVideo.play();
		Materialize.toast(data.msg, 1500, 'rounded');
		getCurrentId();
	});
	socket.on('addfriendcheckreply',function (data) {
		consoleTemp("已添加好友确认"+JSON.stringify(data));
		myVideo.play();
		Materialize.toast(data.msg, 1500, 'rounded');
		loadFriendList();
	});
	socket.on('exitgroup',function (data) {
		consoleTemp("群员退出群组"+JSON.stringify(data));
	});
	socket.on('joingroup',function (data) {
		consoleTemp("用户申请加入群组"+JSON.stringify(data));
		myVideo.play();
		if(sessionStorage.getItem("currentChat_"+localStorage.currentId)){
			var currentChats=JSON.parse(sessionStorage.getItem("currentChat_"+localStorage.currentId));
		}else {
			var currentChats=[];
		};
		var currentChat = {};
		currentChat.from=data.gid;
		currentChat.addgroupId=data.from;
		currentChat.name=searchgroupbyid(data.gid).name;
		currentChat.msg=getNameById(data.from)+"请求加群"+currentChat.name+":"+data.msg;
		currentChat.sendDate=data.datetime;
		currentChat.type="addgroup";
		currentChats.unshift(currentChat);
		Materialize.toast(currentChat.msg, 1500, 'rounded');
		sessionStorage.setItem("currentChat_"+localStorage.currentId,JSON.stringify(currentChats));
	});
	socket.on('joingroupcheckreply',function (data) {
		consoleTemp("已添加群确认"+JSON.stringify(data));
		myVideo.play();
		Materialize.toast(data.msg, 1500, 'rounded');
		loadGroupList();
	});
	socket.on('disconnect', function(){
		console.log('disconnect');
		socket.socket.reconnect();
	});

}
function check_input(input,max){
	var maxLength = max;
	if (input != "" && input != null){
		if(input.length <=maxLength ){
			return true;
		}
		else{
			Materialize.toast("输入不能超过"+maxLength+"个字符", 1500, 'rounded');
			return false;
		}
	}
	else if(input!=null){
		Materialize.toast("输入不能为空", 1500, 'rounded');
		return false;
	}
}

