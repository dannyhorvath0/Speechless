var express = require('express');
var router = express.Router();


var exec = require('child_process').exec;
var parser = require('xml2json');
var request = require('request');

/*
   $ALPINO_HOME/bin/Alpino -notk -veryfast user_max=20000   server_kind=parse   server_port=11211   assume_input_is_tokenized=on   debug=0   -init_dict_p   batch_command=alpino_server
*/

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index', { title: "test" });
});
/* GET from next */
router.get('/request?*', function(req, res, next) {
    request("http://"+req.query.q, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send({ "items" : makeArray(body)}); // Show the HTML for the Google homepage.
        }
        console.log(response);
        console.log(body);
        console.log(error);
    });
});

router.get('/text?*', function(req, res, next) {
    console.log(req.query.t);
    exec('echo "'+req.query.t+'" | nc 127.0.0.1 11211', function(error, stdout, stderr) {
        /*
            { woorden: [{word: "geef", pt: "WW", pos: "verb"}, {word: "alle", pt: "vnw", pos: "det"},  {word: "klanten", pt: "n", pos: "noun"}]}
        */
        var json = JSON.parse(parser.toJson(stdout));
        console.log(JSON.stringify(json, null, 4));
        res.send({ "words": makeArray(json.alpino_ds, json.alpino_ds.node.end, [])});
    });
});

function makeArray(json, nWords, resArr){
    if(json.node == undefined){
        if(json.word != undefined){
            var obj = {word: json.word, pt: json.pt, pos: json.pos, root: json.root};
            resArr.push(obj);
        }
        if(resArr.length == nWords){
            return resArr;
        }
    }else{
        if(json.node[0] != undefined){
            return loopNodeArr(json.node, nWords, resArr);
        }else{
            return makeArray(json.node, nWords, resArr);
        }
    }
}

function loopNodeArr(json, nWords, resArr){
    for(var i in json){
        makeArray(json[i], nWords, resArr);
    }
    if(resArr.length == nWords){
        return resArr;
    }
}



module.exports = router;
