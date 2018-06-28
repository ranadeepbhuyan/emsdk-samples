$(function () {
    var message = $('#message');

    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if (!window.WebSocket) {
        console.log("No support for WebSockets");
        return;
    }

    //TODO 1: Open a WebSocket connection and write open handler

    $('form').submit(function() {
        const name = $('#name').val() ? $('#name').val() : 'Anonymous';
        const message = $('#message').val();
        $('#name-div').hide();
        $('#welcome').text('Hello ' + name);

        //send message via web-socket connection
        //TODO 2: Write code here to send message to socket.


        $('#message').focus();
        $('#message').val('');
        return false;
    });

    //Handle incoming push message from server
    //TODO 3: Write code to handle incoming message from web-socket


    socket.addEventListener('error', function (event) {
        $('#messages').append($('<li>').text('<span style="color: red;">ERROR:</span> ' + evt.data));
    });
});