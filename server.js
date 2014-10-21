// This is the node server running from the server side.

'use strict';
var express = require('express');
var app = express();

// serve static content from the public folder
app.use("/", express.static(__dirname + '/'));

// listen on port 4000
var port = 4000;
app.listen(port, function() {
    console.log("server is listening on port " + port);
});
