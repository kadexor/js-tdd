var express = require('express');
var http = require('http');
var request = require('good-guy-http')();
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json()); // it means that we're getting application/json content type

var server = http.createServer(app);

app.get('/', function (req, res) {
    res.status(200).json({hello: 'world'});
});

fs.readFile('symbols', 'utf8', function (err,data) {
    var symbols = data.split("\n");
    for(var i in symbols){
        console.log(symbols[i]);
        request('http://ichart.finance.yahoo.com/table.csv?s='+symbols[i], function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var values = response.body;
                var lines = values.split("\n");
                var vs = lines[1].split(',');
                console.log(vs[1]);
            }
        });
    }
});

server.listen(3000, function () {
    console.log("http://localhost:3000");
});