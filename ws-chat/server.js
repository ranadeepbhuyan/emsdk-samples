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

    ws.on('message', (msg) =>  {
        console.log(msg);
        data = JSON.parse(msg);
        if (data.message) {
            //Broadcast to all.
            //TODO: Write code to braodcast message to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send('<strong>' + data.name + '</strong>: ' + data.message);
                }
            });
        } 
    });

    // user disconnected
    wss.on('close', function(connection) {
        console.log('disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on port 3000');
});
