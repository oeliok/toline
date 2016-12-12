/**
 * Created by kevin on 16-11-24.
 */

// var pub_names,pub_news,pub_showMess,pub_getMess,pub_newName;
//全部好友
var myfriends ;
var indexOfFriends = 0;
var app = angular.module('myApp',['ngRoute',"ui.router"]);
//var app = angular.module('myApp',['ui.router']);
socket= io.connect();
app.controller('chatPubCtrl',function($scope){
    inputName();
});

app.controller('chatToFrCtrl',function($scope,$route){
    $scope.$route = $route;

    $scope.back = function(){
      history.back();
    };
    var contentInput=document.getElementById('contentInput');
    var chatOtherId=sessionStorage.getItem("chatOtherId");
    var chatOtherName=sessionStorage.getItem("chatOtherName");
    var friendorgroup = sessionStorage.getItem("friendorgroup");
    var dataTemp={
        from:"",
        name:"",
        date:"",
        msg:""
    };
    $scope.list_name = chatOtherName;
    var personIfo = localStorage.getItem("personIfo_"+localStorage. currentId);
    personIfo = JSON.parse(personIfo);
    if("friend"===friendorgroup){
        if(localStorage.getItem("friendChatIfo_"+localStorage.currentId+"_"+chatOtherId)){
            var data=JSON.parse(localStorage.getItem("friendChatIfo_"+localStorage.currentId+"_"+chatOtherId));
            console.log(localStorage.getItem("friendChatIfo_"+localStorage.currentId+"_"+chatOtherId));
            $("#contentInput").text="";
            for(var i=0;i<data.length;i++){
                if (data[i].sendId === localStorage.currentId) {
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
        }
    }
    if("group"===friendorgroup){
        if(localStorage.getItem("groupChatIfo_"+localStorage.currentId+"_"+chatOtherId)){
            var data=JSON.parse(localStorage.getItem("groupChatIfo_"+localStorage.currentId+"_"+chatOtherId));
            console.log(localStorage.getItem("groupChatIfo_"+localStorage.currentId+"_"+chatOtherId));
            $("#contentInput").text="";
            for(var i=0;i<data.length;i++){
                if (data[i].uid === localStorage.currentId) {
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
                    dataTemp.name=data[i].name;
                    dataTemp.from=data[i].uid;
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
        }
    }
    contentInput.scrollTop = contentInput.scrollHeight;

    $scope.say=function () {
        if (document.getElementById('msg').value != ''){
            console.log("sendmsg:"+document.getElementById('msg').value);
            if("friend"===friendorgroup){
                socketSendChatmsg(chatOtherId,document.getElementById('msg').value);
            }
            if("group"===friendorgroup){
                socketSendGroupmsg(chatOtherId,document.getElementById('msg').value);
            }
        } else
            Materialize.toast('Nothing input,QAQ', 2500, 'rounded');
    }

});
app.controller('dialogCtrl',function($scope,$route){
    $scope.$route = $route;
    getCurrentId();
    getSesssionId();

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
            }
        }
        if(localStorage.getItem("groupIfo_"+localStorage. currentId)){
            //遍历群列表，获取群聊天信息
            var groupChatIfo = localStorage.getItem("groupIfo_"+localStorage. currentId);
            groupChatIfo = JSON.parse(groupChatIfo);
            for (var i=0;i<groupChatIfo.length;i++)
            {
                socketHistoryGet("group",groupChatIfo[i]._id,100);
            }
        }
    }
});
app.controller('person_info',function($scope){
    getCurrentId();
    getPersonalIfo();
    $scope.myInfo = JSON.parse(localStorage.getItem("personIfo_" + localStorage.currentId));
    console.log(JSON.stringify($scope.myInfo));
});
app.controller('group',function($scope,$route){
    $scope.$route = $route;
    $scope.list_name = "群列表";
    var group = localStorage.getItem("groupIfo_"+localStorage. currentId);
    console.log(group);
    $scope.list = JSON.parse(group);
    $scope.index = function (x) {
        sessionStorage.setItem("chatOtherId",group[x]._id);
        sessionStorage.setItem("chatOtherName",group[x].name);
        sessionStorage.setItem("friendorgroup","group");
        console.log("当前groupList"+ x +"："+" otherid:"+group[x]._id+" othername:"+group[x].name);
        $scope.$apply();
    };
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
    var friends = JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId) );
    myfriends = friends;
    $scope.list = friends;
    console.log(JSON.stringify(friends));
    //记录当前聊天好友的li值
    $scope.index = function (x) {
        indexOfFriends = x;
        sessionStorage.setItem("chatOtherId",myfriends[x]._id);
        sessionStorage.setItem("chatOtherName",myfriends[x].name);
        sessionStorage.setItem("friendorgroup","friend");
        console.log("当前聊天对象："+" otherid:"+myfriends[x]._id+" othername:"+myfriends[x].name);
        $scope.$apply();
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
    //})
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

