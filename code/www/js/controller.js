/**
 * Created by kevin on 16-11-24.
 */
var app = angular.module('myApp',['ngRoute']);
app.controller('home',function($scope,$route){$scope.$route = $route;});
app.controller('person',function($scope,$route){$scope.$route = $route;});
app.controller('group',function($scope,$route){$scope.$route = $route;});
app.controller('search',function($scope,$route){$scope.$route = $route;});
app.controller('settings',function($scope,$route){$scope.$route = $route;});
app.controller('friends-list',function ($scope) {
    // 获取好友列表
    getCurrentId();
    getPersonalIfo();
    loadFriendList();
    var friends = JSON.parse( localStorage.getItem("chatIfo_"+localStorage. currentId) );
    $scope.friends = friends;
    console.log(friends[0].name);
    console.log(friends[0].remark);
});
app.config(function ($routeProvider) {
    $routeProvider.
    when('/home',{
        templateUrl:'left.html',
        controller:'home'
    }).
    when('/person',{
        templateUrl:'person.html',
        controller:'person'
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
    });

});