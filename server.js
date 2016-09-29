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
  res.send(200);
});

app.listen(80);


//to take a snapshot, start a timelapse or video recording
camera.start( );

//to stop a timelapse or video recording
camera.stop( );

//listen for the "started" event triggered when the start method has been successfully initiated
camera.on("started", function(){ 
	//do stuff
});

//listen for the "read" event triggered when each new photo/video is saved
camera.on("read", function(err, filename){ 
	//do stuff
});