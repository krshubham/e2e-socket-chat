var socket = io.connect('http://localhost/app');

function setTitle(text){
    var title = document.getElementsByTagName('title')[0];
    title.innerHTML = text;
}

function getMessage(e) {
    e.preventDefault();
    console.log({data: $('#chatmsg').val(),
        token: location.pathname.split('/')[2]
    });
    socket.emit('publicmsg', {
        data: $('#chatmsg').val(),
        token: location.pathname.split('/')[2]
    });
    $('#chatmsg').val('');
}

socket.on('pubmsg', function (data) {
    var html = `<div class="card white-text black">
            <h3>Message: ${data.data}</h3><br>
            <strong>By: ${data.username}</strong>            
    </div>`;
    $('div.messages').append(html);
    var messages = document.getElementsByClassName('messages')[0];
    messages.scrollTop = messages.scrollHeight;

});

socket.on("disconnect", function () {
    setTitle('disconnected | Chat');
});

socket.on("connect", function () {
    setTitle('connected | Chat');
});



