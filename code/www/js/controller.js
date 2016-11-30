/**
 * Created by kevin on 16-11-24.
 */

var app = angular.module('myApp',['ngRoute']);
app.controller('chatPubCtrl',function($scope,$route){$scope.$route = $route;});
app.controller('chatToFrCtrl',function($scope,$route){$scope.$route = $route;});
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
    $scope.friends = friends;
    console.log("friends_list：" + friends[0].name);
    console.log("friends_list：" + friends[0].remark);
    console.log(JSON.stringify($scope.friends));
});

app.config(function ($routeProvider) {
    $routeProvider.
    when('/chatPub_panel',{
        templateUrl:'chat_pub.html',
        controller:'chatPubCtrl'
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