function chat(e) {
    e.preventDefault();
    return false;
}


var socket = io("http://52.66.166.65:3000");
var title = document.getElementsByTagName('title')[0];


socket.on("disconnect", function () {
    //alert('disconnected');
    setTitle('disconnected | Chat');    
    
});

socket.on("connect", function () {
    //alert('Hello');
    setTitle('connected | Chat');    
});

socket.on("message", function (message) {
    printMessage(message);
});

socket.on("typemsg",function(data){
    printType(data);
})
function printMessage(message) {
   var html = ' <div class="message">'+
        '<div class="card-panel black">'+
            '<div class="chip">'+
                message.time+
            '</div>'+
            '<p class="chat-p">'+message.content+'</p>'+
       '</div>'+
    '</div>';
    document.querySelector("div.messages").innerHTML += html;
}

function printType(data){
    document.getElementById("type").style.display = 'block';
}
setInterval(function(){
    document.getElementById('type').style.display = 'none';
},5000);
function chat(e){
    e.preventDefault();
    var message = null || document.getElementById('chatmsg').value;
    console.log(message);
    if(message){
        socket.emit('chat',message);
    }
    else{
        alert('Fill something in');
    }
    return false;
}
function typing(){
    socket.emit('typing');
}

function setTitle(text){
    title.innerHTML = text;
}