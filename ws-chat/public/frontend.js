$(function () {
    var message = $('#message');

    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if (!window.WebSocket) {
        console.log("No support for WebSockets");
        return;
    }

    const connection = new WebSocket("ws://localhost:8080/");

    connection.onopen = function () {
        console.log("Connection established..");
    };

    $('form').submit(function() {
        const name = $('#name').val() ? $('#name').val() : 'Anonymous';
        const message = $('#message').val();
        $('#name-div').hide();
        $('#welcome').text('Hello ' + name);

        //send message via web-socket connection
        //TODO: Write code here to send message to socket.
        

        $('#message').focus();
        $('#message').val('');
        return false;
    });

    //Handle incoming push message from server
    //TODO: Write code to handle incoming message from web-socket
    

    connection.onerror = function(evt) {
        $('#messages').append($('<li>').text('<span style="color: red;">ERROR:</span> ' + evt.data));
    };
});