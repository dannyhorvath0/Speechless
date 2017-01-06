//Create the module
var speechlessApp = angular.module('speechlessApp', []);
//Create controller and inject Angular's $scope
speechlessApp.controller('mainController', function($scope, $http) {
  var url = "http://127.0.0.1:11200/json"
  $scope.init = function() {
    if (annyang) {
        // Let's define our first command. First the text we expect, and then the function it should call
        var commands = {
          '*text': function(text) {
            $scope.createParseRequest(text);
          }
        };
        //Turn on debug
        annyang.debug();
        //Set language
        annyang.setLanguage("nl-NL");
        // Add our commands to annyang
        annyang.addCommands(commands);
        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start({ autoRestart: false, paused: true, continuous: false });
    }
  };

  $scope.recordSpeech = function() {
    if (annyang) {
        if(annyang.isListening()) {
          annyang.pause();
        } else {
          annyang.resume();
        }
    }
  }

  $scope.createParseRequest = function(text) {
    $http.post(url, {
      headers:{'request': 'parse', 'data_type': 'text'},
      data: JSON.stringify({text:text}),
    }).then(function(response) {
      console.log(response);
    }).catch(function (response) {
      console.log(response);
    });
  }
});
