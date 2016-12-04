/**
 * Created by kevin on 16-11-24.
 */
//socket.io
var pubChat = io.connect('toline.oeli.pub:9876');
var names = document.getElementById('pub_names');
var news = document.getElementById('pub_news');
var msgs = document.getElementById('pub_message');
var it = document.getElementById('pub_input_mess');

window.onload = function () {
    var person=prompt("请输入你的名字","Harry Potter");
    pubChat.emit('name',person);
    addevent();
};
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
    if (it.value != "")
        pubChat.emit('msg', it.value);
    else
        alert("输入内容不能为空");
}
function scroll() {
    msgs.scrollTop = msgs.scrollHeight;
}

// var pub_names,pub_news,pub_showMess,pub_getMess,pub_newName;
//全部好友
var myfriends ;
var indexOfFriends = 0;
var app = angular.module('myApp',['ngRoute']);

app.controller('chatPub_parentCtrl',function($scope,$route){
    $scope.$route = $route;

    // var pubChat = io.connect('toline.oeli.pub:9876');
    // var pub_names = document.getElementById('pub_names');
    // var pub_news = document.getElementById('pub_news');
    // var pub_message = document.getElementById('pub_message');
    // inputName();
    // function inputName() {
    //     var person=prompt("请输入你的名字","Harry Potter");
    //     pubChat.emit('name',person);
    //     addevent();
    // }
    // function addevent() {
    //     pubChat.on('users',function (data) {
    //         console.log(JSON.stringify(data));
    //         var html = "";
    //         for (var i in data) {
    //             html += '['+data[i]+']';
    //         }
    //         pub_names.innerHTML = html;
    //     });
    //     pubChat.on('namejoin',function (data) {
    //         pub_news.innerHTML += '<p>'+data+'</p>';
    //     });
    //     pubChat.on('newmsg',function (data) {
    //         pub_message.innerHTML += '<p>'+data+'</p>';
    //     });
    // }
    // function changeName() {
    //     if (pub_newName.value != "")
    //         pubChat.emit('name',pub_newName.value);
    //     else
    //         alert("输入名字不能为空");
    // }
    // $scope.pub_sendMess = function (message) {
    //     if (message != "")
    //         pubChat.emit('msg', message);
    //     else
    //         alert("输入内容不能为空");
    // }
});
app.controller('chatPub_childCtrl',function($scope,$route){
    $scope.$route = $route;
    $scope.pub_showMess = '';
    $scope.pub_getMess = '';
    $scope.pub_names = '';
    $scope.pub_news = '';
    $scope.pub_newName = '';
});
app.controller('chatToFrCtrl',function($scope,$route){$scope.$route = $route;
    getSesssionId();
    console.log("friends-chat:"+myfriends[indexOfFriends].name);
    indexOfFriends = 0;
    $scope.$on('to-child',function (event,data) {
        console.log('chatToFrCtrl' + data + "parent->child");
    })
});
app.controller('person_info',function($scope){
    getCurrentId();
    getPersonalIfo();
    $scope.myInfo = JSON.parse(localStorage.getItem("personIfo_" + localStorage.currentId));
    console.log(JSON.stringify($scope.myInfo));
});
app.controller('group',function($scope,$route){$scope.$route = $route;});
app.controller('search',function($scope,$route){$scope.$route = $route;});
app.controller('settings',function($scope,$route){$scope.$route = $route;});
app.controller('friends_list',function ($scope,$route) {
    // 获取好友列表
    $scope.$route = $route;
    getCurrentId();
    loadFriendList();
    var friends = JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId) );
    myfriends = friends;
    $scope.friends = friends;
    console.log("friends_list：" + friends[0].name);
    console.log("friends_list：" + friends[0].remark);
    console.log(JSON.stringify($scope.friends));
    $scope.handleMess = function () {
        $scope.$broadcast('to-child', 'child');
        $scope.$emit('to-parent', 'parent');
    }
});

app.config(function ($routeProvider) {
    $routeProvider.
    when('/chatPub_panel',{
        templateUrl:'chat_pub.html',
        controller:'chatPub_parentCtrl'
    }).
        //一级菜单 好友列表
    when('/friends_list',{
        templateUrl:'friends_list.html',
        controller:'friends_list'
    }).
        //好友列表子菜单 好友聊天界面
    when('/friends_list/chatToFr_panel',{
        templateUrl:'chat_panel.html',
        controller:'chatToFrCtrl'
    }).
    when('/person',{
        templateUrl:'person_info.html',
        controller:'person_info'
    }).
    when('/group',{
        templateUrl:'home.html',
        controller:'group'
    }).
    when('/search',{
        templateUrl:'header.html',
        controller:'search'
    }).
    when('/settings',{
        templateUrl:'right.html',
        controller:'settings'
    }).
    otherwise({
        redirectTo: '/chatPub_panel'
    });
});
$(function () {
    $(' li a').onclick= function () {
        console.log('ul write');
        indexOfFriends = $(this).index();
        console.log('ul write');
    }
});

function index() {
    indexOfFriends++;
    console.log(indexOfFriends);
    $('li a').removeEventListener('click',index);
}
