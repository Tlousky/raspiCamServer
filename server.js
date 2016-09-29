var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var RaspiCam = require("raspicam");

var camera = new RaspiCam({ 
    "mode"   : "photo",
    "output" : "/tmp/screenshot.jpg",
    "height" : 720,
    "width"  : 1280
});

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    camera.start();
    
    camera.on("read", function(err, filename){ 
        fs.readFile('img.html', function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                    'Content-Length': data.length
            });
            res.write(data);
            res.end();
        });
        camera.stop();
    });
}

server.listen(1185);
console.log("server listening on 1185");

/*
var express  = require('express');
var RaspiCam = require("raspicam");

var app        = express();
//var http       = require('http');
//var server     = http.createServer(app);
var bodyParser = require('body-parser');
var camera     = new RaspiCam({ 
    "mode"   : "photo",
    "output" : "/tmp/screenshot.jpg"
});

app.use( bodyParser() );

app.post('/', function(req, res) {
  console.log( req.body );
  camera.start();
  camera.stop();
  res.send(200);
});

app.listen(8080);

//listen for the "read" event triggered when each new photo/video is saved
camera.on("read", function(err, filename){ 
	//do stuff
});
*/
