var socket = io.connect('http://localhost/app');

function setTitle(text){
    var title = document.getElementsByTagName('title')[0];
    title.innerHTML = text;
}

socket.on("disconnect", function () {
    setTitle('disconnected | Chat');
});

socket.on("connect", function () {
    setTitle('connected | Chat');
});



