var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    WebSocket = require('ws');
    wss = new WebSocket.Server({
        port: 8080
    });

app.use(express.static('public'));

//app.use('/client', express.static('client'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


wss.on('connection', (ws) =>  {
    console.log((new Date()) + ' Connection from origin ' + ws + '.');

    //TODO 4: Write handler to receive message from client
    //TODO: Write code to braodcast message to all clients

    // user disconnected
    wss.on('close', function(connection) {
        console.log('disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on port 3000');
});
