var app = angular.module("toline", ['ngRoute']);
app.controller('personalIfoCtrl',function($scope){
	getCurrentId();
	getSesssionId();
	socket= io.connect();
	socketMonitor();
	socketConfirm();
	if(localStorage.getItem("personIfo_"+localStorage. currentId)){
		var personIfo = localStorage.getItem("personIfo_"+localStorage. currentId);
		personIfo = JSON.parse(personIfo);
		//***对应名字，图片，提示信息
		$scope.ownerName=personIfo.name;
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
	angular.element(document).ready(function () {
		// var test=searchname("sw");
		// console.log("test"+JSON.stringify(test));

		// if(localStorage.currentId==="5812f0f77f67530755eb3837"){
		// 	var test=addFriend("58034e1c29bce15b80a8aade","asd");
		// 	console.log("添加测试"+test);
		// };
		// if(localStorage.currentId==="58034e1c29bce15b80a8aade"){
		// 	var test=addCheck("5812f0f77f67530755eb3837");
		// 	console.log("添加确认测试"+test);
		// };
		// var test=searchgroupbyname("奥特曼",0,5);
		// console.log("test"+test);
		// var test=creategroup("神东","神东是一种信仰");
		// console.log("test"+test);

	});

});
app.controller('homeCtrl',function ($scope,$location,$route) {
	var content=document.getElementById('content');
	$("#prompt").text("最近联系");
	if(sessionStorage.getItem("currentChat_"+localStorage. currentId)){
		var chatIfo = sessionStorage.getItem("currentChat_"+localStorage. currentId);
		chatIfo = JSON.parse(chatIfo);
		for (var i=0;i<chatIfo.length;i++)
		{
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
		}else {
			sessionStorage.setItem("chatOtherId",chatOtherId);
			sessionStorage.setItem("chatOtherName",chatOtherName);
			sessionStorage.setItem("friendorgroup",friendorgroup);
			console.log(" pos:"+pos+" otherid:"+chatOtherId+" othername:"+chatOtherName);
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
	for (var i=0;i<chatIfo.length;i++)
	{
		var html = template('chatList', chatIfo[i]);
		content.innerHTML += html;
	};
	$("#content a").click(function(){
		pos = $("#content a").index($(this));
		var chatOtherId=(JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId))[pos])._id;
		var chatOtherName=(JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId))[pos]).name;
		sessionStorage.setItem("chatOtherId",chatOtherId);
		sessionStorage.setItem("chatOtherName",chatOtherName);
		sessionStorage.setItem("friendorgroup","friend");
		console.log("friendList pos:"+pos+" otherid:"+chatOtherId+" othername:"+chatOtherName);
		//var pos = $(this).index();
		//双人聊天

		$location.path('/chat');
		$scope.$apply();

	});
});
app.controller('groupListCtrl',function ($scope,$location) {
	//群列表破模板[_id,name,remark]
	//***对应提示信息,群列表模板加载的div
	$("#prompt").text("聊天室");
	var content=document.getElementById('content');

	var chatIfo = localStorage.getItem("groupIfo_"+localStorage. currentId);
	console.log(chatIfo);
	chatIfo = JSON.parse(chatIfo);
	for (var i=0;i<chatIfo.length;i++)
	{
		var html = template('groupList', chatIfo[i]);
		content.innerHTML += html;
	};
	$("#content a").click(function(){
		pos = $("#content a").index($(this));
		var chatOtherId=(JSON.parse( localStorage.getItem("groupIfo_"+localStorage. currentId))[pos])._id;
		var chatOtherName=(JSON.parse( localStorage.getItem("groupIfo_"+localStorage. currentId))[pos]).name;
		sessionStorage.setItem("chatOtherId",chatOtherId);
		sessionStorage.setItem("chatOtherName",chatOtherName);
		sessionStorage.setItem("friendorgroup","group");
		console.log("groupList pos:"+pos+" otherid:"+chatOtherId+" othername:"+chatOtherName);
		//var pos = $(this).index();
		//双人聊天

		$location.path('/chat');
		$scope.$apply();

	});
});
app.controller('makefriendCtrl',function ($scope) {
	$("#prompt").text("添加好友");
	// var dialog1 = document.querySelector('#makeFriendDialog');
	// var dialog2 = document.querySelector('#confirmDialog');
	var content=document.getElementById('content');
	var dateTemp;
	var name=prompt("请输入要查找的用户名","");
	if (name!=null && name!="")
	{
		dateTemp=getIfoByName(name);
		console.log("查找结果"+JSON.stringify(dateTemp));
		if(dateTemp){
			var html = template('makeFriendList', dateTemp);
			content.innerHTML += html;
			$("#content a").click(function(){
				var msg=prompt("请输入申请好友的留言","");
				if(msg!=null && msg!=""){
					var temp=addFriend(dateTemp.id,msg);
					console.log("添加好友返回值"+temp);
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

	// dialog1.showModal();
	// dialog1.querySelector('.close1').addEventListener('click', function() {
	// 	var makeFriendInput=document.getElementById('makeFriendInput').value;
	// 	if(makeFriendInput.length<=0){
	// 		Materialize.toast('Nothing input_(:зゝ∠)_', 1500, 'rounded');
	// 	}else {
	// 		console.log("st"+makeFriendInput);
	// 		dateTemp=getIfoByName(makeFriendInput);
	// 		if(dateTemp){
	// 			console.log(dateTemp);
	// 			console.log("js"+JSON.stringify(dateTemp));
	// 			var html = template('makeFriendList', dateTemp);
	// 			content.innerHTML += html;
	// 			dialog1.close();
	// 			$("#content a").click(function(){
	// 				dialog2.showModal();
	// 			});
	// 		}else {
	// 			Materialize.toast('Nothing we find_(:зゝ∠)_', 1500, 'rounded');
	// 		}
	// 	}
	// });
	// dialog2.querySelector('.close2-1').addEventListener('click', function() {
	// 	var addFriendInput=document.getElementById('addFriendInput').value;
	// 	if(addFriendInput.length<=0){
	// 		Materialize.toast('Nothing input_(:зゝ∠)_', 1500, 'rounded');
	// 	}else {
	// 		var temp=addFriend(dateTemp.id,addFriendInput);
	// 		if(temp===1){
	// 			Materialize.toast('好友申请已发送_(:зゝ∠)_', 1500, 'rounded');
	// 		}else {
	// 			Materialize.toast('好友申请发送失败_(:зゝ∠)_:'+code[temp+1]+'', 1500, 'rounded');
	// 		}
	// 		dialog2.close();
	// 	};
	// });
	// dialog2.querySelector('.close2-2').addEventListener('click', function() {
	// 	dialog2.close();
	// });

})
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
			console.log(localStorage.getItem("friendChatIfo_"+localStorage.currentId+"_"+chatOtherId));
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
			console.log(localStorage.getItem("groupChatIfo_"+localStorage.currentId+"_"+chatOtherId));
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
			console.log("sendmsg:"+document.getElementById('msg').value);
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
})
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{templateUrl: 'home.html', controller: 'homeCtrl'})
		.when('/friendList',{templateUrl: 'friendList.html', controller: 'friendListCtrl'})
		.when('/chatRoom',{templateUrl: 'groupList.html', controller: 'groupListCtrl'})
		.when('/makeFriend',{templateUrl: 'makefriend.html', controller: 'makefriendCtrl'})
		.when('/setting',{template:'这是设置页面'})
		.when('/help',{template:'这是帮助页面'})
		.when('/chat',{templateUrl: 'chat.html', controller: 'chatCtrl'})
		.otherwise({redirectTo:'/'});
}]);
