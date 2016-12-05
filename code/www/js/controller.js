/**
 * Created by kevin on 16-11-24.
 */
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

// var pub_names,pub_news,pub_showMess,pub_getMess,pub_newName;
//全部好友
var myfriends ;
var indexOfFriends = 0;
var app = angular.module('myApp',['ngRoute']);

app.controller('chatPubCtrl',function($scope){
    inputName();
});
app.controller('chatToFrCtrl',function($scope,$route){$scope.$route = $route;
    getSesssionId();

    var friendIndex = indexOfFriends;
    console.log("friends-chat:"+myfriends[friendIndex].name);
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
app.controller('frListCtrl',function ($scope,$route) {
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
    $scope.index = function () {
        indexOfFriends = $(this).index();
    }

});

app.config(function ($routeProvider) {
    $routeProvider.
        //一级菜单 好友列表
    when('/friends_list',{
        templateUrl:'friends_list.html',
        controller:'frListCtrl'
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
    otherwise({
        // redirectTo: '/frListCtrl'
        templateUrl:'friends_list.html',
        controller:'frListCtrl'
    });
});
$(function () {
    $(' #friends_list #friend').click(function () {
        indexOfFriends = $(this).index();
        console.log('ul write');
    });
});

