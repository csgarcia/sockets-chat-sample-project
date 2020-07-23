var params = new URLSearchParams(window.location.search);
var personName = params.get('name');
var room = params.get('room');

//references jQuery
var divUsers = $('#divUsuarios');
var sendForm = $('#sendForm');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');

// function to get and render users on nav bar
function renderUsers(people) {
    console.log(people);
    var html = '';
    //setting header
    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + room + ' </span></a>';
    html += '</li>';

    // adding users found on list
    for (var i = 0; i < people.length; i++) {
        var currentPerson = people[i];
        html += '<li>';
        html += '    <a data-id="' + currentPerson.id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"><span>' + currentPerson.name + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsers.html(html);
}

// function to show messages on screen
function renderMessages(message) {
    var html = '';
    html += '<li class="animated fadeIn">';
    html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    html += '    <div class="chat-content">';
    html += '        <h5>' + message.name + '</h5>';
    html += '        <div class="box bg-light-info">' + message.message + '</div>';
    html += '    </div>';
    html += '    <div class="chat-time">10:56 am</div>';
    html += '</li>';
    divChatbox.append(html);
}

// jQuery listeners
divUsers.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

sendForm.submit(function(event) {
    console.log('sendForm');
    event.preventDefault();
    if (txtMessage.val().trim().length === 0) {
        return;
    }
    console.log(txtMessage.val());
    // Escuchar información
    socket.emit('createMessageEvent', {
        name: name,
        message: txtMessage.val()
    }, function(message) {
        txtMessage.val('').focus();
        renderMessages(message);
    });
});