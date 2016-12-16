var app = angular.module("toline", ['ngRoute']);
app.controller('personalIfoCtrl',function($scope,$location){
	getCurrentId();
	getSesssionId();
	socket= io.connect();
	socketMonitor();
	socketConfirm();
	if(localStorage.getItem("personIfo_"+localStorage. currentId)){
		var personIfo = localStorage.getItem("personIfo_"+localStorage. currentId);
		personIfo = JSON.parse(personIfo);
		//***对应名字，图片，提示信息
		$('#ownerName').text(personIfo.name);
		$scope.owenerPic=personIfo._id;
		$scope.promptText="主界面";
		if(localStorage.getItem("chatIfo_"+localStorage. currentId)){
			//遍历好友列表，获取好友聊天信息
			var chatIfo = localStorage.getItem("chatIfo_"+localStorage. currentId);
			chatIfo = JSON.parse(chatIfo);
			for (var i=0;i<chatIfo.length;i++)
			{
				socketHistoryGet("friend",chatIfo[i]._id,100);
			};
		};
		if(localStorage.getItem("groupIfo_"+localStorage. currentId)){
			//遍历群列表，获取群聊天信息
			var groupChatIfo = localStorage.getItem("groupIfo_"+localStorage. currentId);
			groupChatIfo = JSON.parse(groupChatIfo);
			for (var i=0;i<groupChatIfo.length;i++)
			{
				socketHistoryGet("group",groupChatIfo[i]._id,100);
			};
		};
	};
	$scope.toPersonalIfo=function () {
		$location.path('/personal');
		$scope.$apply();
	};

});
app.controller('homeCtrl',function ($scope,$location,$route) {
	var content=document.getElementById('content');
	$("#prompt").text("最近联系");
	if(sessionStorage.getItem("currentChat_"+localStorage. currentId)){
		var chatIfo = sessionStorage.getItem("currentChat_"+localStorage. currentId);
		chatIfo = JSON.parse(chatIfo);
		for (var i=0;i<chatIfo.length;i++)
		{
			if(chatIfo[i].type==="friend"||chatIfo[i].type==="addfriend"){
				chatIfo[i].from="avator/"+chatIfo[i].from;
			};
			if(chatIfo[i].type==="group"||chatIfo[i].type==="addgroup"){
				chatIfo[i].from="gavator/"+chatIfo[i].from;
			};
			var date = new Date(chatIfo[i].sendDate);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes();
			chatIfo[i].date=Y+M+D+h+m;
			var html = template('homeList', chatIfo[i]);
			content.innerHTML += html;
		};
	};
	$("#content a").click(function(){
		pos = $("#content a").index($(this));
		if(sessionStorage.getItem("currentChat_"+localStorage.currentId)){
			var currentChats=JSON.parse(sessionStorage.getItem("currentChat_"+localStorage.currentId));
		};
		var chatOtherId=currentChats[pos].from;
		var chatOtherName=currentChats[pos].name;
		var friendorgroup=currentChats[pos].type;
		var msg=currentChats[pos].msg;
		if(friendorgroup==="addfriend"){
			var r=confirm("确认添加"+chatOtherName+"为好友？");
			if (r==true){
				var temp=addCheck(chatOtherId);
				if(temp===1){
					loadFriendList();
					Materialize.toast("已添加"+chatOtherName+"为好友", 1500, 'rounded');
					currentChats.splice(pos,1);
					sessionStorage.setItem("currentChat_"+localStorage.currentId,JSON.stringify(currentChats));
					$route.reload();
				}else {
					Materialize.toast("添加"+chatOtherName+"失败_(:зゝ∠)_:"+code[temp+1], 1500, 'rounded');
				};
			};
		}else if(friendorgroup==="addgroup"){
			var addgroupId=currentChats[pos].addgroupId;
			var r=confirm(msg+"，是否同意");
			if (r==true){
				consoleTemp("chatOtherId:"+chatOtherId+",addgroupId:"+addgroupId);
				var temp=applygroupcheck(chatOtherId,addgroupId);
				if(temp===1){
					loadGroupList();
					Materialize.toast(msg+"，申请通过", 1500, 'rounded');
					currentChats.splice(pos,1);
					sessionStorage.setItem("currentChat_"+localStorage.currentId,JSON.stringify(currentChats));
					$route.reload();
				}else {
					Materialize.toast(msg+",申请失败_(:зゝ∠)_:"+code[temp+1], 1500, 'rounded');
				};
			};
		} else {
			sessionStorage.setItem("chatOtherId",chatOtherId);
			sessionStorage.setItem("chatOtherName",chatOtherName);
			sessionStorage.setItem("friendorgroup",friendorgroup);
			consoleTemp(" pos:"+pos+" otherid:"+chatOtherId+" othername:"+chatOtherName);
			$location.path('/chat');
			$scope.$apply();
		}

	});

});
app.controller('friendListCtrl',function ($scope,$location) {
	//好友模板[_id,name,remark]
	//***对应提示信息,好友列表模板加载的div
	$("#prompt").text("好友列表");
	var content=document.getElementById('content');

	var chatIfo = localStorage.getItem("chatIfo_"+localStorage. currentId);
	chatIfo = JSON.parse(chatIfo);
	if(chatIfo){
		for (var i=0;i<chatIfo.length;i++)
		{
			var html = template('chatList', chatIfo[i]);
			content.innerHTML += html;
		};
	};
	$("#content a").click(function(){
		pos = $("#content a").index($(this));
		var chatOtherId=(JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId))[pos])._id;
		var chatOtherName=(JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId))[pos]).name;
		sessionStorage.setItem("chatOtherId",chatOtherId);
		sessionStorage.setItem("chatOtherName",chatOtherName);
		sessionStorage.setItem("friendorgroup","friend");
		consoleTemp("friendList pos:"+pos+" otherid:"+chatOtherId+" othername:"+chatOtherName);
		//var pos = $(this).index();
		//双人聊天

		$location.path('/chat');
		$scope.$apply();

	});
});
app.controller('groupListCtrl',function ($scope,$location) {
	//群列表破模板[_id,name,remark]
	//***对应提示信息,群列表模板加载的div
	$("#prompt").text("群聊");
	var content=document.getElementById('content');

	var chatIfo = localStorage.getItem("groupIfo_"+localStorage. currentId);
	consoleTemp(chatIfo);
	chatIfo = JSON.parse(chatIfo);
	if(chatIfo){
		for (var i=0;i<chatIfo.length;i++)
		{
			var html = template('groupList', chatIfo[i]);
			content.innerHTML += html;
		};
	};
	$("#content a").click(function(){
		pos = $("#content a").index($(this));
		var chatOtherId=(JSON.parse( localStorage.getItem("groupIfo_"+localStorage. currentId))[pos])._id;
		var chatOtherName=(JSON.parse( localStorage.getItem("groupIfo_"+localStorage. currentId))[pos]).name;
		sessionStorage.setItem("chatOtherId",chatOtherId);
		sessionStorage.setItem("chatOtherName",chatOtherName);
		sessionStorage.setItem("friendorgroup","group");
		consoleTemp("groupList pos:"+pos+" otherid:"+chatOtherId+" othername:"+chatOtherName);
		//var pos = $(this).index();
		//双人聊天

		$location.path('/chat');
		$scope.$apply();

	});
});

app.controller('chatCtrl',function ($scope) {
	//聊天模板[from,name,date,msg]
	//***聊天界面模板加载的div
	var contentInput=document.getElementById('contentInput');
	var chatOtherId=sessionStorage.getItem("chatOtherId");
	var chatOtherName=sessionStorage.getItem("chatOtherName");
	var friendorgroup=sessionStorage.getItem("friendorgroup");
	$("#prompt").text(chatOtherName);
	var dataTemp={
		from:"",
		name:"",
		date:"",
		msg:""
	};
	var personIfo = localStorage.getItem("personIfo_"+localStorage. currentId);
	personIfo = JSON.parse(personIfo);
	if("friend"===friendorgroup){
		if(localStorage.getItem("friendChatIfo_"+localStorage.currentId+"_"+chatOtherId)){
			var data=JSON.parse(localStorage.getItem("friendChatIfo_"+localStorage.currentId+"_"+chatOtherId));
			consoleTemp(localStorage.getItem("friendChatIfo_"+localStorage.currentId+"_"+chatOtherId));
			$("#contentInput").text="";
			for(var i=0;i<data.length;i++){
				var date = new Date(data[i].datetime);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes();
				// var s = date.getSeconds();
				if (data[i].sendId === localStorage.currentId) {
					dataTemp.name=personIfo.name;
					dataTemp.from=personIfo._id;
					dataTemp.date=Y+M+D+h+m;
					dataTemp.msg=data[i].msg;
					var html = template('mysay',dataTemp);
					contentInput.innerHTML += html;
				} else {
					dataTemp.name=chatOtherName;
					dataTemp.from=chatOtherId;
					dataTemp.date=Y+M+D+h+m;
					dataTemp.msg=data[i].msg;
					var html = template('othersay',dataTemp);
					contentInput.innerHTML += html;
				}
			}
		};
	};
	if("group"===friendorgroup){
		if(localStorage.getItem("groupChatIfo_"+localStorage.currentId+"_"+chatOtherId)){
			var data=JSON.parse(localStorage.getItem("groupChatIfo_"+localStorage.currentId+"_"+chatOtherId));
			consoleTemp(localStorage.getItem("groupChatIfo_"+localStorage.currentId+"_"+chatOtherId));
			$("#contentInput").text="";
			for(var i=0;i<data.length;i++){
				var date = new Date(data[i].datetime);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes()+" ";
				// var s = date.getSeconds();
				if (data[i].uid === localStorage.currentId) {
					dataTemp.name=personIfo.name;
					dataTemp.from=personIfo._id;
					dataTemp.date=Y+M+D+h+m;
					dataTemp.msg=data[i].msg;
					var html = template('mysay',dataTemp);
					contentInput.innerHTML += html;
				} else {
					dataTemp.name=data[i].name;
					dataTemp.from=data[i].uid;
					dataTemp.date=Y+M+D+h+m;
					dataTemp.msg=data[i].msg;
					var html = template('othersay',dataTemp);
					contentInput.innerHTML += html;
				}
			}
		};
	}
	contentInput.scrollTop = contentInput.scrollHeight;

	$scope.say=function () {
		if (document.getElementById('msg').value != ''){
			sendState=setTimeout("Materialize.toast('发送失败,请检查网络并刷新试试_(:зゝ∠)_', 1500, 'rounded')",3000);
			consoleTemp("sendmsg:"+document.getElementById('msg').value);
			if("friend"===friendorgroup){
				socketSendChatmsg(chatOtherId,document.getElementById('msg').value);
			};
			if("group"===friendorgroup){
				socketSendGroupmsg(chatOtherId,document.getElementById('msg').value);
			};
			document.getElementById('msg').value="";
		} else
			Materialize.toast('Nothing input,QAQ', 1500, 'rounded');
	}
});
app.controller('makefriendCtrl',function ($scope) {
	$("#prompt").text("添加好友");
	var content=document.getElementById('content');
	var dateTemp;
	var name=prompt("请输入要查找的用户名","");
	if (name!=null && name!="")
	{
		dateTemp=getIfoByName(name);
		consoleTemp("查找结果"+JSON.stringify(dateTemp));
		if(dateTemp){
			for(var i=0;i<dateTemp.length;i++){
				var html = template('makeFriendList', dateTemp[i]);
				content.innerHTML += html;
			};
			$("#content a").click(function(){
				pos = $("#content a").index($(this));
				var msg=prompt("请输入申请好友的留言","");
				if(msg!=null && msg!=""){
					consoleTemp("添加"+JSON.stringify(dateTemp[pos]));
					var temp=addFriend(dateTemp[pos].id,msg);
					consoleTemp("添加好友返回值"+temp);
					if(temp===1){
						Materialize.toast('好友申请已发送_(:зゝ∠)_', 1500, 'rounded');
					}else {
						Materialize.toast('好友申请发送失败_(:зゝ∠)_:'+code[temp+1]+'', 1500, 'rounded');
					}
				}else{
					Materialize.toast('Nothing input_(:зゝ∠)_', 1500, 'rounded');
				};
			});
		}else {
			Materialize.toast('Nothing we find_(:зゝ∠)_', 1500, 'rounded');
		}
	}else {
		Materialize.toast('Nothing input_(:зゝ∠)_', 1500, 'rounded');
	};
});
app.controller('makeGroupCtrl',function ($scope) {
	$("#prompt").text("添加群");
	var content=document.getElementById('content');
	var dateTemp;
	var name=prompt("请输入要查找的群名","");
	if (name!=null && name!="")
	{
		dateTemp=searchgroupbyname(name,0,5);
		consoleTemp("查找结果"+JSON.stringify(dateTemp));
		if(dateTemp){
			for(var i=0;i<dateTemp.length;i++){
				var html = template('makeGroupList', dateTemp[i]);
				content.innerHTML += html;
			};
			$("#content a").click(function(){
				pos = $("#content a").index($(this));
				consoleTemp(dateTemp[pos]);
				var msg=prompt("请输入申请群的留言","");
				if(msg!=null && msg!=""){
					consoleTemp("添加"+JSON.stringify(dateTemp[pos]));
					var temp=applygroup(searchgroupbyid(dateTemp[pos]._id).owner,dateTemp[pos]._id,msg);
					consoleTemp("添加群返回值"+temp);
					if(temp===1){
						Materialize.toast('群申请已发送_(:зゝ∠)_', 1500, 'rounded');
					}else {
						Materialize.toast('群申请发送失败_(:зゝ∠)_:'+code[temp+1]+'', 1500, 'rounded');
					};
				}else{
					Materialize.toast('Nothing input_(:зゝ∠)_', 1500, 'rounded');
				};
			});
		}else {
			Materialize.toast('Nothing we find_(:зゝ∠)_', 1500, 'rounded');
		}
	}else {
		Materialize.toast('Nothing input_(:зゝ∠)_', 1500, 'rounded');
	};
})
app.controller('createGroupCtrl',function ($scope) {
	$("#prompt").text("创建群");
	var name=prompt("请输入创建的群名","");
	if (name!=null && name!=""){
		var remark=prompt("请输入创建群的签名","");
		if(remark!=null&&remark!=""){
			consoleTemp(name+":"+remark);
			var temp=creategroup(name,remark);
			if(temp===1){
				Materialize.toast(name+"群创建成功", 1500, 'rounded');
			}else{
				Materialize.toast("群创建失败_(:зゝ∠)_"+code[temp+1], 1500, 'rounded');
			};
		}else {
			Materialize.toast('Nothing input_(:зゝ∠)_', 1500, 'rounded');
		};
	}else {
		Materialize.toast('Nothing input_(:зゝ∠)_', 1500, 'rounded');
	};

})
app.controller('personalCtrl',function ($scope,$route,$location) {
	$("#prompt").text("个人信息");
	$scope.getPersonInfo = function (){
		$.post('/suser/private/user/user/myinfo',{},function (data) {
			consoleTemp(JSON.stringify(data));
			localStorage.setItem("my_allInfo_"+localStorage. currentId ,JSON.stringify(data));
		});
	};

	$scope.getPersonInfo();
	$scope.personal = JSON.parse(localStorage.getItem("my_allInfo_"+localStorage. currentId));
	consoleTemp(JSON.stringify($scope.personal));
	$scope.changeName = function (){
		var newInfo = prompt("请输入新的名称",$scope.personal.name);
		if(check_input(newInfo,20)){
			$.get("/suser/private/user/modifyname",{
				name: newInfo
			},function (data) {
				$('#ownerName').text(newInfo);
				consoleTemp(JSON.stringify(data));
				Materialize.toast(code[data.code + 1], 1500, 'rounded');
				getPersonalIfo();
				$scope.getPersonInfo();
				$route.reload();
			});
		}
	};
	$scope.changeSign = function (){
		var newInfo = prompt("请输入新的签名",$scope.personal.remark);
		if(check_input(newInfo,100)){
			$.get("/suser/private/user/modifysign",{
				words:newInfo
			},function (data) {
				consoleTemp(JSON.stringify(data));
				Materialize.toast(code[data.code + 1], 1500, 'rounded');
				$scope.getPersonInfo();
				$route.reload();
			});
		}
	};
	$scope.changeAge = function (){
		var newInfo = prompt("请输入年龄",$scope.personal.age);
		if(check_input(newInfo,3)){
			$.get("/suser/private/user/modifyage",{
				age:newInfo
			},function (data) {
				consoleTemp(JSON.stringify(data));
				Materialize.toast(code[data.code + 1], 1500, 'rounded');
				$scope.getPersonInfo();
				$route.reload();
			});
		}
	};
});
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{templateUrl: 'home.html', controller: 'homeCtrl'})
		.when('/friendList',{templateUrl: 'friendList.html', controller: 'friendListCtrl'})
		.when('/chatRoom',{templateUrl: 'groupList.html', controller: 'groupListCtrl'})
		.when('/makeFriend',{templateUrl: 'makefriend.html', controller: 'makefriendCtrl'})
		.when('/makeGroup',{templateUrl: 'makegroup.html', controller: 'makeGroupCtrl'})
		.when('/createGroup',{templateUrl: 'createGroup.html', controller: 'createGroupCtrl'})
		.when('/chat',{templateUrl: 'chat.html', controller: 'chatCtrl'})
		.when('/personal',{templateUrl: 'personalIfo.html', controller: 'personalCtrl'})
		.otherwise({redirectTo:'/'});
}]);
