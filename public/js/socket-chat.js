var socket = io();
var params = new URLSearchParams(window.location.search);
if (!params.has('name')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesario');
}

if (!params.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesario');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    // first: add person to a chat
    socket.emit('enterChatEvent', user, function(response) {
        // console.log('Users connected: ', response);
        renderUsers(response); // this function is declared on socket-chat-jquery
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Escuchar información
socket.on('createMessageEvent', function(message) {
    // console.log('Servidor:', message);
    renderMessages(message);
});

// Listen user changes
// listen when users connected array has changes on connect or disconnect
socket.on('peopleListEvent', function(message) {
    // console.log(mensaje);
    renderUsers(message); // this function is declared on socket-chat-jquery
});

// private messages
socket.on('privateMessageEvent', function(message) {
    console.log('Mensaje privado', message);
});