//Create the module
var speechlessApp = angular.module('speechlessApp', ['ngRoute']);

speechlessApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : 'pages/home.html',
    controller : 'mainController'
  })
});
//Create controller and inject Angular's $scope
speechlessApp.controller('mainController', function($scope) {
});
