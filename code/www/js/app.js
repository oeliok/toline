/**
 * Created by apple on 2016/12/11.
 */
/**
 * Created by apple on 2016/12/11.
 */
var homePath_app = '^.home', gofriends = '^.frends';
var loginApp = angular.module("loginApp", ["ui.router"]);
var myApp = angular.module("myApp", ["ui.router"]);
//配置路由
loginApp.config(function ($stateProvider, $urlRouterProvider) {
    //登陆后直接跳转到主界面
    $urlRouterProvider.when("", "/login");
    $urlRouterProvider.when("login", "/login");
    $urlRouterProvider.when("register", "/register");
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "login.html",
            controller: 'loginCtrl'
        })
        .state("register", {
            url: "/register",
            templateUrl: "register.html",
            controller: 'registerCtrl'
        })
});
myApp.config(function ($stateProvider, $urlRouterProvider) {
    //登陆后直接跳转到主界面
    $urlRouterProvider.when("", "/home");
    $stateProvider
        //主界面{菜单栏}
        .state("home", {
            url: "/home",
            templateUrl: "home.html",
            controller:'homeCtrl'
        })
        //好友列表
        .state("friends", {
            url:"/friends",
            templateUrl: "friends.html",
            controller:'friendsCtrl'
        })
        //群列表
        .state("groups", {
            url:"/groups",
            templateUrl: "friends.html",
            controller:'groupsCtrl'
        })
        //个人信息
        .state("personal", {
            url:"/personal",
            templateUrl: "personal.html",
            controller:'personalCtrl'
        })
        //查找[好友／群]
        .state("search", {
            url:"/search",
            templateUrl: "friends.html",
            controller:'searchCtrl'
        })
        //个人设置
        .state("settings", {
            url:"/settings",
            templateUrl: "friends.html",
            controller:'setCtrl'
        })
        .state("chat", {
            url:"/chat",
            templateUrl: "chat.html",
            controller:'chatCtrl'
        })

});
//
loginApp.controller('loginCtrl',function($scope,$state){
    $scope.toLogin = function(){
        $state.go('^.login');
    };
    $scope.toRegister = function(){
        $state.go('^.register');
    };
    about_login();
});
//
loginApp.controller('registerCtrl',function($scope,$state){
    $scope.toLogin = function(){
        $state.go('^.login');
    };
    $scope.toRegister = function(){
        $state.go('^.register');
    };
    about_register();
});
//主界面
myApp.controller('homeCtrl',function($scope){
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
                socketHistoryGet("friend",chatIfo[i]._id,10);
            }
            console.log("获取好友聊天信息成功");
        }
        if(localStorage.getItem("groupIfo_"+localStorage. currentId)){
            //遍历群列表，获取群聊天信息
            var groupChatIfo = localStorage.getItem("groupIfo_"+localStorage. currentId);
            groupChatIfo = JSON.parse(groupChatIfo);
            for (var i=0;i<groupChatIfo.length;i++)
            {
                socketHistoryGet("group",groupChatIfo[i]._id,10);
            }
            console.log("获取群聊天信息成功");
        }
    }
    //此处的icon值为用户id
    //$scope.personal = {icon:'7',r:'personal'};
    //$scope.list = [
    //    {icon:'message',rout:'personal'},
    //    {icon:'favorite',rout:'friends'},
    //    {icon:'group',rout:'groups'},
    //    {icon:'search',rout:'search'},
    //    {icon:'settings',rout:'settings'}
    //];
});

//个人信息
myApp.controller('personalCtrl',function($scope,$state){
    //路由引擎
    //返回键
    $scope.back = function(){
        $state.go('^.home');
    };
    //标题
    $scope.list_name = "个人信息";
    $scope.getPersonInfo = function (){
        $.post('/suser/private/user/user/myinfo',{},function (data) {
            console.log(JSON.stringify(data));
            localStorage.setItem("my_allInfo_"+localStorage. currentId ,JSON.stringify(data));
        });
    };
    $scope.getPersonInfo();
    $scope.personal = JSON.parse(localStorage.getItem("my_allInfo_"+localStorage. currentId));
    console.log(JSON.stringify($scope.personal));
    $scope.changeName = function (){
        var newInfo = prompt("请输入新的名称",$scope.personal.name);
        if(check_input(newInfo,20)){
            $.get("/suser/private/user/modifyname",{
                name: newInfo
            },function (data) {
                console.log(JSON.stringify(data));
                alert(code[data.code + 1]);
                $scope.getPersonInfo();
                $state.reload();
            });
        }
    };
    $scope.changeSign = function (){
        var newInfo = prompt("请输入新的签名",$scope.personal.remark);
        if(check_input(newInfo,100)){
            $.get("/suser/private/user/modifysign",{
                words:newInfo
            },function (data) {
                console.log(JSON.stringify(data));
                alert(code[data.code + 1]);
                $scope.getPersonInfo();
                $state.reload();
            });
        }
    };
    $scope.changeAge = function (){
        var newInfo = prompt("请输入年龄",$scope.personal.age);
        if(check_input(newInfo,3)){
            $.get("/suser/private/user/modifyage",{
                age:newInfo
            },function (data) {
                console.log(JSON.stringify(data));
                alert(code[data.code + 1]);
                $scope.getPersonInfo();
                $state.reload();
            });
        }
    };
    $scope.changeSex = function (){
        //var newInfo = prompt("请选择性别",$scope.personal.sex);
        var sex = document.getElementById('sex');

        $("#sex").blur(function(){
            var newInfo = sex.value;
            $.get("/suser/private/user/modifysex",{
                sex:newInfo
            },function (data) {
                console.log(JSON.stringify(data));
                alert(code[data.code + 1]);
                $scope.getPersonInfo();
                $state.reload();
            });
        });

    };
});
myApp.controller('friendsCtrl',function($scope,$state){
    //路由引擎
    $scope.back = function(){
        $state.go(homePath_app);
    };
    $scope.list_name = "好友列表";
    var friends = JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId) );
    $scope.list = friends;
    console.log(JSON.stringify(friends));
    //记录当前聊天好友的li值
    $scope.index = function (x) {
        indexOfFriends = x;
        sessionStorage.setItem("chatOtherId",friends[x]._id);
        sessionStorage.setItem("chatOtherName",friends[x].name);
        sessionStorage.setItem("friendorgroup","friend");
        console.log("当前聊天对象："+" otherid:"+friends[x]._id+" othername:"+friends[x].name);
    };
});

//群
myApp.controller('groupsCtrl',function($scope,$state){
    //路由引擎
    $scope.back = function(){
        $state.go(homePath_app);
    };
    $scope.list_name = "群列表";

    var group = JSON.parse(localStorage.getItem("groupIfo_"+localStorage. currentId));
    $scope.list = group;
    $scope.index = function (x) {
        sessionStorage.setItem("chatOtherId",group[x]._id);
        sessionStorage.setItem("chatOtherName",group[x].name);
        sessionStorage.setItem("friendorgroup","group");
        console.log("当前groupList"+ x +"："+" otherid:"+group[x]._id+" othername:"+group[x].name);
    };
});


//聊天
myApp.controller('chatCtrl',function($scope,$state){
    //路由引擎
    $scope.back = function(){
        $state.go(homePath_app);
    };
    $scope.scroll = scroll();
    var contentInput=document.getElementById('contentInput');
    var chatOtherId=sessionStorage.getItem("chatOtherId");
    var chatOtherName=sessionStorage.getItem("chatOtherName");
    var friendorgroup = sessionStorage.getItem("friendorgroup");
    console.log("current position:" + friendorgroup);
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
    scroll();
    $scope.say = function () {
        if (document.getElementById('msg').value != ''){
            console.log("sendmsg:"+document.getElementById('msg').value);
            if("friend"===friendorgroup){
                console.log("chatid:"+chatOtherId);
                var mess = document.getElementById('msg').value;
                socketSendChatmsg(chatOtherId,mess);
                console.log("sendmsg to "+chatOtherName+":"+document.getElementById('msg').value);
            }
            if("group"===friendorgroup){
                socketSendGroupmsg(chatOtherId,document.getElementById('msg').value);
            }
        } else{
            console.log("sendmess fail");
            //Materialize.toast('Nothing input,QAQ', 2500, 'rounded');
        }
         }
});
//查找好友／群
myApp.controller('searchCtrl',function($scope,$state){
    $scope.show_search = 0;
    $scope.back = function(){
        $state.go('^.home');
    };
    $scope.list_name = "查找好友／群";
    $scope.list = [
        {_id:"5804b31ce9431c0fd2937400",name:"找人"},
        {_id:"5804b31ce9431c0fd2937400",name:"找群"}
    ];
});
myApp.controller('setCtrl',function($scope,$state){
    console.log("你已经来到设置面板");
    $scope.back = function(){
        $state.go('^.home');
    };
    $scope.list_name = "个人设置";
    $scope.list = [
        {_id:"5804b31ce9431c0fd2937400",name:"铃声"},
        {_id:"5804b31ce9431c0fd2937400",name:"振动"}
    ];
});
function scroll(){
    var scrol = document.getElementById("b");
    scrol.scrollTop = scrol.scrollHeight;
    console.log( scrol.scrollTop+":"+ scrol.scrollHeight);
}
function check_input(input,max){
    var maxLength = max;
    if (input != "" && input != null){
        if(input.length <=maxLength ){
            return true;
        }
        else{
            alert("输入不能超过"+maxLength+"个字符");
            return false;
        }
    }
    else{
        alert("输入不能为空");
        return false;
    }
}




