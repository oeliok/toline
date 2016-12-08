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
		//遍历好友列表，获取好友聊天信息
		var chatIfo = localStorage.getItem("chatIfo_"+localStorage. currentId);
		chatIfo = JSON.parse(chatIfo);
		for (var i=0;i<chatIfo.length;i++)
		{
			socketHistoryGet("friend",chatIfo[i]._id,100);
		};
	};
});
app.controller('friendListCtrl',function ($scope,$location) {
	//好友模板[_id,name,remark]
	//***对应提示信息,好友列表模板加载的div
	$("#prompt").text("好友");
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
		console.log("FriendList pos:"+pos+" otherid:"+chatOtherId+" othername:"+chatOtherName);
		//var pos = $(this).index();
		//双人聊天

		$location.path('/chat');
		$scope.$apply();

	});
})
app.controller('chatCtrl',function ($scope) {
	//聊天模板[from,name,date,msg]
	//***聊天界面模板加载的div
	var contentInput=document.getElementById('contentInput');
	var chatOtherId=sessionStorage.getItem("chatOtherId");
	var chatOtherName=sessionStorage.getItem("chatOtherName");
	$("#prompt").text(chatOtherName);
	if(localStorage.getItem("chatIfo_"+localStorage.currentId+"_"+chatOtherId)){
		var data=JSON.parse(localStorage.getItem("chatIfo_"+localStorage.currentId+"_"+chatOtherId));
		console.log(localStorage.getItem("chatIfo_"+localStorage.currentId+"_"+chatOtherId));
		$("#contentInput").text="";
		for(var i=0;i<data.length;i++){
			if (data[i].sendId === localStorage.currentId) {
				var dataTemp={
					from:"",
					name:"",
					date:"",
					msg:""
				};
				var personIfo = localStorage.getItem("personIfo_"+localStorage. currentId);
				personIfo = JSON.parse(personIfo);
				dataTemp.name=personIfo.name;
				dataTemp.from=personIfo._id;
				var date = new Date(data[i].datetime);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes()+" ";
				// var s = date.getSeconds();
				dataTemp.date=Y+M+D+h+m;
				dataTemp.msg=data[i].msg;
				var html = template('mysay',dataTemp);
				contentInput.innerHTML += html;
			} else {
				var dataTemp={
					from:"",
					name:"",
					date:"",
					msg:""
				};
				dataTemp.name=chatOtherName;
				dataTemp.from=chatOtherId;
				var date = new Date(data[i].datetime);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes();
				// var s = date.getSeconds();
				dataTemp.date=Y+M+D+h+m;
				dataTemp.msg=data[i].msg;
				var html = template('othersay',dataTemp);
				contentInput.innerHTML += html;
			}
		}
		contentInput.scrollTop = contentInput.scrollHeight;
	};

	$scope.say=function () {
		if (document.getElementById('msg').value != ''){
			console.log("sendmsg:"+document.getElementById('msg').value);
			socketSendChatmsg(chatOtherId,document.getElementById('msg').value);
		} else
			Materialize.toast('Nothing input,QAQ', 2500, 'rounded');
	}
})
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{template:'这是首页页面'})
		.when('/friendList',{templateUrl: 'friendList.html', controller: 'friendListCtrl'})
		.when('/chatRoom',{template:'这是聊天室页面'})
		.when('/makeFriend',{template:'这是添加好友页面'})
		.when('/setting',{template:'这是设置页面'})
		.when('/help',{template:'这是帮助页面'})
		.when('/chat',{templateUrl: 'chat.html', controller: 'chatCtrl'})
		.otherwise({redirectTo:'/'});
}]);
