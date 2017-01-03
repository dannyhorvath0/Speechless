//Create the module
var speechlessApp = angular.module('speechlessApp', []);
//Create controller and inject Angular's $scope
speechlessApp.controller('mainController', function($scope) {
  if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    '*text': function(text) {
      $('#text').text(text);
    }
  };
  //Turn on debug
  annyang.debug();
  //Set language
  annyang.setLanguage("nl-NL");
  // Add our commands to annyang
  annyang.addCommands(commands);
  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start({ autoRestart: true, continuous: false });
}
});
