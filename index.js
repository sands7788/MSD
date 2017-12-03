var express = require('express');
var server = express();

server.use(express.static(__dirname));

server.get('/', function(request, response){
    response.redirect('/index.html');
})

server.listen(8000);