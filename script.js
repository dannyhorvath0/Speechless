//Create the module
var speechlessApp = angular.module('speechlessApp', []);
//Create controller and inject Angular's $scope
speechlessApp.controller('mainController', function($scope) {
  if(annyang) {
    //List of commands
    var commands = {
      '*tag': showText
    }

    var showText = function(tag) {
      $('#text').text(tag);
    }
    //Add commands to annyang
    annyang.addCommands(commands);
    //Set language to dutch
    annyang.setLanguage("dutch");
    //Start listening
    annyang.start();
  }
});
