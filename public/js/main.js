var socket = io.connect('http://35.154.38.81:9876/app');
// var socket = io.connect('http://localhost:9876/app');

function setTitle(text){
    var title = document.getElementsByTagName('title')[0];
    title.innerHTML = text;
}

function getMessage(e) {
    e.preventDefault();
    socket.emit('publicmsg', {
        data: $('#chatmsg').val(),
        token: location.pathname.split('/')[2]
    });
    $('#chatmsg').val('');
}

function printMessage(data){
    var html = `<div class="card white-text black">
            <h3>Message: ${data.data}</h3><br>
            <strong>By: ${data.username}</strong>            
    </div>`;
    $('div.messages').append(html);
    var messages = document.getElementsByClassName('messages')[0];
    messages.scrollTop = messages.scrollHeight;
}
socket.on('pubmsg', function (data) {
    printMessage(data);
});

socket.on("disconnect", function () {
    setTitle('disconnected | Chat');
});

socket.on("connect", function () {
    setTitle('connected | Chat');
    socket.emit('getMessages',{
        token: location.pathname.split('/')[2]
    });
});

socket.on('printLastSession', function(result){
    var messages = result.data;
    if(messages.length){
        messages.forEach(function(message){
            printMessage(message);
        });
    }
});



