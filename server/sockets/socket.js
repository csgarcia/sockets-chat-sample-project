const { io } = require('../server');
const Users = require('../classes/users');
const users = new Users();
const { createMessage } = require('../utils/utils');

io.on('connection', (client) => {

    console.log('Usuario conectado');
    client.on('enterChatEvent', (data, callback) => {
        console.log(data);
        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'Name/Room is required to connect'
            });
        }

        // adding user to his room
        client.join(data.room);

        let clientSocketId = client.id;
        users.addPerson(clientSocketId, data.name, data.room);
        // return all users when a single person enters in the chat
        client.broadcast
            .to(data.room) //only users on the same room
            .emit('peopleListEvent', users.getPeopleConnectedByRoom(data.room));
        callback(users.getPeopleConnectedByRoom(data.room));
    });

    client.on('createMessageEvent', (data) => {
        let clientSocketId = client.id;
        let person = users.getPerson(clientSocketId);
        let message = createMessage(person.name, data.message);
        // reply message to al users pending on this event
        client.broadcast
            .to(person.room) //only users on the same room
            .emit('createMessageEvent', message);
    });

    client.on('disconnect', () => {
        let clientSocketId = client.id;
        let personDeleted = users.deletePerson(clientSocketId);
        client.broadcast
            .to(personDeleted.room) //only users on the same room
            .emit('createMessageEvent', createMessage('Admin', `${personDeleted.name} abandonó el chat`));
        // return all users when a single person leaves in the chat
        client.broadcast
            .to(personDeleted.room) //only users on the same room
            .emit('peopleListEvent', users.getPeopleConnectedByRoom(personDeleted.room));
    });

    //private messages
    client.on('privateMessageEvent', (data) => {
        let person = users.getPerson(client.id);
        let messageToSend = createMessage(person.name, data.message);
        client.broadcast
            .to(data.send_to) //only users on the same room
            .emit('privateMessageEvent', messageToSend);
    });

});