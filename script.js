//Create the module
var speechlessApp = angular.module('speechlessApp', []);

//Create controller and inject Angular's $scope
speechlessApp.controller('mainController', function($scope) {
  $scope.message = "Hello, world!";
});
