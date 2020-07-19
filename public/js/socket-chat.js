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
        console.log('Users connected: ', response);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Send message
// socket.emit('createMessageEvent', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMessageEvent', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Listen user changes
// listen when users connected array has changes on connect or disconnect
socket.on('peopleListEvent', function(mensaje) {
    console.log(mensaje);
});

// private messages
socket.on('privateMessageEvent', function(message) {
    console.log('Mensaje privado', message);
});