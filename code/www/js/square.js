/**
 * Created by apple on 2016/12/13.
 */

//依赖
//<script type="text/javascript" src="../base/other/jquery-3.1.1.min.js"></script>
//<script type="text/javascript" src="../base/other/angular1.5.js"></script>
//<script type="text/javascript" src="../base/other/angular-ui-router.js"></script>
//<script type="text/javascript" src="/socket.io/socket.io.js"></script>
var myApp = angular.module("myApp", ["ui.router"]);

//配置路由
myApp.config(function ($stateProvider, $urlRouterProvider) {
    //登陆后直接跳转到主界面
    $urlRouterProvider.when("", "/square");
    $stateProvider
        .state("square", {
            url: "/square",
            templateUrl: "square.html",
            controller:'squareCtrl'
        });
});
myApp.controller('squareCtrl',function($scope,$state){
    $scope.input = function (){
        inputName();
    };
    $scope.input();

});


//socket.io
var pubChat,names,news,msgs,it,person,newName;
function inputName () {
    pubChat = io.connect('toline.oeli.pub:9876');
    names = document.getElementById('pub_names');
    news = document.getElementById('pub_news');
    msgs = document.getElementById('pub_message');
    it = document.getElementById('pub_input_mess');
    //先获取本地，如果本地没有信息再由用户输入
    person = localStorage.getItem("square_userName");
    if(person == null){
        person=prompt("请输入你的名字","Harry Potter");
        pubChat.emit('name',person);
        localStorage.setItem("square_userName",person);
    }else{
        person = localStorage.getItem("square_userName");
        pubChat.emit('name',person);
        console.log("square_userName: "+person);
    }

    $('#pub_names').val(person);
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
    newName = document.getElementById('pub_names');
    var maxLength = 20;
    if (newName.value != ""){
        if(newName.value.length <=maxLength ){
            pubChat.emit('name',newName.value);
            localStorage.setItem("square_userName",newName.value);
        }
        else{
            alert("昵称不能超过"+maxLength+"个字符");
        }
    }
}
function sendmsg() {
    var maxLength = 300;
    if (it.value != ""){
        if(it.value.length <= maxLength ){
            pubChat.emit('msg', it.value);
            $('#pub_input_mess').val('');
        }
        else
            alert("内容不能超过"+maxLength+"个字符");
    }
    else
        alert("输入内容不能为空");
}