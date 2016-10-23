var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var path = require('path');
var mustacheExpress = require('mustache-express');
var io = require('socket.io')(server);
var moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

io.on('connection', function (socket) {
    console.log(socket.handshake);

    socket.on('chat', function (data) {
        var time = new Date().getTime();
        var content = data;
        var reply = {
            time: moment().from(time),
            content: content
        };
        socket.emit('message',reply);        
        socket.broadcast.emit('message',reply);
    });
    socket.on('typing',function(){
        socket.emit('typemsg');
    });
});


app.get('/', function (req, res) {
    console.log('request for index page');
    res.render('index', {
        title: 'Welcome'
    });
});


console.log('server listening at port 3000');
server.listen(3000);
