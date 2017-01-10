//Create the module
var speechlessApp = angular.module('speechlessApp', []);
//Create controller and inject Angular's $scope
speechlessApp.controller('mainController', function($scope, $http) {
  var mock_response = {
    "words": [
      {
        "word": "Geef",
        "pt": "ww",
        "rel": "hd",
        "pos": "verb",
      },
      {
        "word": "alle",
        "pt": "vnw",
        "rel": "det",
        "pos": "det",
      },
      {
        "word": "klanten",
        "pt": "n",
        "rel": "hd",
        "pos": "noun",
      },
      {
        "word": "in",
        "pt": "vz",
        "rel": "hd",
        "pos": "prep",
      },
      {
        "word": "Leusden",
        "pt": "n",
        "rel": "obj1",
        "pos": "name",
      },
      {
        "word": "in",
        "pt": "vz",
        "rel": "hd",
        "pos": "prep",
      },
      {
        "word": "januari",
        "pt": "n",
        "rel": "hd",
        "pos": "noun",
      },
      {
        "word": "2017",
        "pt": "tw",
        "rel": "app",
        "pos": "num",
      }
    ]
  };

  var showSynonym = [
      'geef',
      'weergeef',
      'toon',
      'zien',
      'bekijk',
      'genereer',
      'beschrijf'
  ]

  var nextTables = [
    "klanten",
    "producten",
    "medewerkers",
    "leveranciers"
  ]

  var months = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december"
  ]

  $scope.method = ""
  $scope.table = ""
  $scope.parameters = []
  $scope.link = "dhh.whatsnext.nl/"

  $scope.init = function() {
    if (annyang) {
        var commands = {
          '*text': function(text) {
            //Hier moet je de text sturen naar je server Luuk
            $scope.parseResponse(mock_response);
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

  $scope.parseResponse = function(response) {
    console.log(response);
    $scope.parameters = [];
    var words = response.words;
    angular.forEach(words, function(value, key) {
      switch(value.pt) {
        case "ww":
          $scope.detectVerb(angular.lowercase(value.word));
          break;
        case "n":
          $scope.detectNoun(angular.lowercase(value));
          break;
        case "tw":
          $scope.parameters.push(value.word);
          break;
      }
    });
    $scope.createLink();
    if($scope.modifiedLink != $scope.link){
      $('#text').text($scope.modifiedLink);
    }
  }

  $scope.detectVerb = function(verb) {
    if($scope.isShowVerb(verb)){
      $scope.method = "SELECT";
    }
  }

  $scope.detectNoun = function(noun) {
    if($scope.isNextTable(noun.word)){
      $scope.table = noun.word;
    }
    if(noun.pos == "name") {
      $scope.parameters.push(noun.word);
    }
    if($scope.isMonth(noun.word)){
      $scope.parameters.push(noun.word);
    }
  }

  $scope.isShowVerb = function(verb) {
    if(showSynonym.indexOf(verb) > -1){
      return true;
    } else {
      return false;
    }
  }

  $scope.isNextTable = function(noun) {
    if(nextTables.indexOf(noun) > -1){
      return true;
    } else {
      return false;
    }
  }

  $scope.isMonth = function(noun) {
    if(months.indexOf(noun) > -1){
      return true;
    } else {
      return false;
    }
  }

  $scope.createLink = function() {
    $scope.modifiedLink = $scope.link + $scope.table;
    var length = $scope.parameters.length;
    if(length > 0) {
      $scope.modifiedLink = $scope.modifiedLink + "?=";
      angular.forEach($scope.parameters, function(value, index){
        if((index+1) == length){
          $scope.modifiedLink = $scope.modifiedLink + value;
        } else {
          $scope.modifiedLink = $scope.modifiedLink + value + "&";
        }
      })
    }
  }
});
