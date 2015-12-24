// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
function TodoController ($scope, $location) {
}

function DetailController ($scope, MeetingService,$http) {
  $scope.detail = function () {
    var id = MeetingService.getID();
    $scope.ID = id;
    $http.get('http://railsa.mybluemix.net/api/v1/meeting_list/' + id).success(function (response) {
      $scope.proceduce = response.data;
    });
  };
}

function MeetingController ($scope, $http,$location, MeetingService) {
  $scope.init = function () {
    $http.get('http://railsa.mybluemix.net/api/v1/meeting_list').success(function(response){
      $scope.list = response.data;
    });
  };

  $scope.getDetail = function (meeting_id) {
    MeetingService.setID(meeting_id);
    $location.path("/Detail");
  };
}

function LoginController ($scope, $http, $location) {
  $scope.data = {};
  $scope.login = function() {
    var name = $scope.data.loginId;
    var pass = $scope.data.passWord;
    $http.get('http://railsa.mybluemix.net/api/v1/hanlder',{params: {name: name,pass:pass}}).success(function(response){
      $location.path("/Meeting");
    });
  };
}

function MeetingService() {
  var id;
    this.getID =  function () {
      return id;
    };
    this.setID = function(value) {
      id = value;
    };
}
function route($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
      .state('meeting', {
        url: '/Meeting',
        templateUrl: 'listmeeting.html',
        controller: 'MeetingCtrl'
      })
      .state('detail', {
        url: '/Detail',
        templateUrl: 'templates/detail.html',
        controller: 'DetailCtrl'
      })
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'LoginCtrl'
      })

}
//http://railsa.mybluemix.net/api/v1/hanlder
angular.module('starter', ['ionic'])
  .service('MeetingService', MeetingService)
  .controller('TodoCtrl', TodoController)
  .controller('LoginCtrl', LoginController)
  .controller('MeetingCtrl', MeetingController)
  .controller('DetailCtrl',DetailController)
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(route);
