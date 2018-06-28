$(function () {
    var message = $('#message');

    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if (!window.WebSocket) {
        console.log("No support for WebSockets");
        return;
    }

    const socket = new WebSocket("ws://localhost:8080/");

    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({
            msg: 'Hello Server!'
        }));
    });

    $('form').submit(function() {
        const name = $('#name').val() ? $('#name').val() : 'Anonymous';
        const message = $('#message').val();
        $('#name-div').hide();
        $('#welcome').text('Hello ' + name);

        //send message via web-socket connection
        //TODO: Write code here to send message to socket.
        socket.send(JSON.stringify({
                name: name,
                message: message
            }));

        $('#message').focus();
        $('#message').val('');
        return false;
    });

    //Handle incoming push message from server
    //TODO: Write code to handle incoming message from web-socket
    socket.addEventListener('message', function (event) {
        console.log(event);
        $('#messages').append($('<li>').html(event.data));
    });

    socket.addEventListener('error', function (event) {
        $('#messages').append($('<li>').text('<span style="color: red;">ERROR:</span> ' + evt.data));
    });
});