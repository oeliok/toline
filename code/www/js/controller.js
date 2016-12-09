/**
 * Created by kevin on 16-11-24.
 */

// var pub_names,pub_news,pub_showMess,pub_getMess,pub_newName;
//全部好友
var myfriends ;
var indexOfFriends = 0;
var app = angular.module('myApp',['ngRoute']);
//var app = angular.module('myApp',['ui.router']);

app.controller('chatPubCtrl',function($scope){
    inputName();
});

app.controller('chatToFrCtrl',function($scope,$route){
    $scope.$route = $route;
    $scope.list_name = myfriends[indexOfFriends].name;
    $scoope.back = function(){
      history.back();
    };
    var chatOtherId = myfriends[indexOfFriends]._id;
    var chatOtherName = myfriends[indexOfFriends].name;
    if(localStorage.getItem("chatIfo_"+localStorage.currentId+"_"+chatOtherId)){
        var data=JSON.parse(localStorage.getItem("chatIfo_"+localStorage.currentId+"_"+chatOtherId));
        console.log(localStorage.getItem("chatIfo_"+localStorage.currentId+"_"+chatOtherId));
        $scope.dialog_content = "";
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
                //var html = template('mysay',dataTemp);
                //contentInput.innerHTML += html;

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
                //var html = template('othersay',dataTemp);
                //contentInput.innerHTML += html;
                $scope.chat_content = dataTemp ;
            }
        }
        //contentInput.scrollTop = contentInput.scrollHeight;
        $scope.chat_content.scrollTop = $scope.chat_content.scrollHeight;

    }

    $scope.say=function () {
        if ($scope.dialog_content != ''){
            console.log("sendmsg:" + $scope.dialog_content);
            socketSendChatmsg(chatOtherId,$scope.dialog_content);
        } else
            Materialize.toast('Nothing input,QAQ', 2500, 'rounded');
    }

});
app.controller('dialogCtrl',function($scope,$route){
    $scope.$route = $route;
});
app.controller('person_info',function($scope){
    getCurrentId();
    getPersonalIfo();
    $scope.myInfo = JSON.parse(localStorage.getItem("personIfo_" + localStorage.currentId));
    console.log(JSON.stringify($scope.myInfo));
});
app.controller('group',function($scope,$route){
    $scope.$route = $route;
    $scope.back = function (){
        //location.href = "frlistCtrl";
        history.back();
    };
    $scope.list = [
        {name:"康德软件"},
        {name:"青马"}
    ];
});
app.controller('search',function($scope,$route){
    $scope.$route = $route;
    $scope.list = [
        {name:"找人"},
        {name:"找群"}
    ];
});
app.controller('settings',function($scope,$route){
    $scope.$route = $route;
    $scope.list = [
        {name:"铃声"},
        {name:"振动"}
    ];
});
app.controller('frListCtrl',function ($scope,$route) {
    // 获取好友列表
    $scope.$route = $route;
    $scope.list_name = "好友列表";
    //初始化
    getCurrentId();
    getSesssionId();
    socket= io.connect();
    socketMonitor();
    socketConfirm();
    //if(localStorage.getItem("personIfo_"+localStorage. currentId)){
    //    var personIfo = localStorage.getItem("personIfo_"+localStorage. currentId);
    //    personIfo = JSON.parse(personIfo);
    //    //***对应名字，图片，提示信息
    //    $scope.ownerName=personIfo.name;
    //    $scope.owenerPic=personIfo._id;
    //    $scope.promptText="主界面";
    //    //遍历好友列表，获取好友聊天信息
    //    var chatIfo = localStorage.getItem("chatIfo_"+localStorage. currentId);
    //    chatIfo = JSON.parse(chatIfo);
    //    for (var i=0;i<chatIfo.length;i++)
    //    {
    //        socketHistoryGet("friend",chatIfo[i]._id,100);
    //    }
    //}


    //var content=document.getElementById('content');
    //
    //var chatIfo = localStorage.getItem("chatIfo_"+localStorage. currentId);
    //chatIfo = JSON.parse(chatIfo);
    //for (var i=0;i<chatIfo.length;i++)
    //{
    //    var html = template('chatList', chatIfo[i]);
    //    content.innerHTML += html;
    //};
    //$("#content a").click(function(){
    //    pos = $("#content a").index($(this));
    //    var chatOtherId=(JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId))[pos])._id;
    //    var chatOtherName=(JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId))[pos]).name;
    //    sessionStorage.setItem("chatOtherId",chatOtherId);
    //    sessionStorage.setItem("chatOtherName",chatOtherName);
    //    console.log("FriendList pos:"+pos+" otherid:"+chatOtherId+" othername:"+chatOtherName);
    //    //var pos = $(this).index();
    //    //双人聊天
    //
    //    $location.path('/chat');
    //    $scope.$apply();
    //
    //});


    getCurrentId();
    loadFriendList();
    var friends = JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId) );
    myfriends = friends;
    $scope.list = friends;
    console.log("friends_list：" + friends[0].name);
    console.log("friends_list：" + friends[0].remark);
    console.log(JSON.stringify(friends));
    //记录当前聊天好友的li值
    $scope.index = function (x) {
        indexOfFriends = x;
    };



});
app.controller('previousCtrl',function ($scope,$route){
   $scope.$route = $route;
    window.history.back();
});
app.config(function ($routeProvider) {
    $routeProvider.
        //一级菜单 好友列表
    //when('/friends_list',{
    //    templateUrl:'friends_list.html',
    //    controller:'frListCtrl'
    //}).
        //好友列表子菜单 好友聊天界面
    when('/dialog',{
        templateUrl:'dialog_panel.html',
        controller:'dialogCtrl'
    }).
    when('/friends_list',{
        templateUrl:'friends_list.html',
        controller:'frListCtrl'
    }).
    when('/friends_list/chatToFr_panel',{
        templateUrl:'chat_panel.html',
        controller:'chatToFrCtrl'
    }).
    when('/person',{
        templateUrl:'person_info.html',
        controller:'person_info'
    }).
    when('/group',{
        templateUrl:'group.html',
        controller:'group'
    }).
    when('/search',{
        templateUrl:'search.html',
        controller:'search'
    }).
    when('/settings',{
        templateUrl:'setting.html',
        controller:'settings'
    }).
    when('/back',{
        controller:'previousCtrl'
    }).
    otherwise({
        // redirectTo: '/frListCtrl'
        templateUrl:'dialog_panel.html',
        controller:'dialogCtrl'
    });

    //$stateProvider
    //    .state("friends_list",{
    //        url:'/friends_list',
    //        templateUrl:"friends_list.html"
    //    });
});

//socket.io
var pubChat = io.connect('toline.oeli.pub:9876');
var names = document.getElementById('pub_names');
var news = document.getElementById('pub_news');
var msgs = document.getElementById('pub_message');
var it = document.getElementById('pub_input_mess');

function inputName () {
    var person=prompt("请输入你的名字","Harry Potter");
    pubChat.emit('name',person);
    addevent();
}
function addevent() {
    pubChat.on('users',function (data) {
        console.log(JSON.stringify(data));
        var html = "";
        for (var i in data) {
            html += '['+data[i]+']';
        }
        names.innerHTML = html;
        scroll();
    });
    pubChat.on('namejoin',function (data) {
        msgs.innerHTML += '<code>'+data+'</code>';
        scroll();
    });
    pubChat.on('newmsg',function (data) {
        msgs.innerHTML += '<p>'+data+'</p>';
        scroll();
    });
}
function changeName() {
    var nn = document.getElementById('pub_names');
    if (nn.value != "")
        pubChat.emit('name',nn.value);
    else
        alert("输入名字不能为空");
}
function sendmsg() {
    if (it.value != ""){
        pubChat.emit('msg', it.value);
        $('#pub_input_mess').val('');
    }
    else
        alert("输入内容不能为空");
}
function scroll() {
    msgs.scrollTop = msgs.scrollHeight;
}

//获取上一级页面
function previous_page(){
    history.back();
}
//获取浏览器信息
var clientWidth;

