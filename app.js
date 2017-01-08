var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var path = require('path');
var mustacheExpress = require('mustache-express');
var io = require('socket.io')(server);
var moment = require('moment');
var auth = require('./routes/auth');
var morgan = require('morgan');
var db = require('./db');
var chat = require('./routes/chat');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//db connection
const url = 'mongodb://localhost:27017/fun';
db.connect(url, function (err) {
    if(err){
        console.log(err);
    }
    console.log('db conn active');
});

// io.on('connection', function (socket) {
//     console.log(socket.handshake);

//     socket.on('chat', function (data) {
//         var time = new Date().getTime();
//         var content = data;
//         var reply = {
//             time: moment().from(time),
//             content: content
//         };
//         socket.emit('message',reply);        
//         socket.broadcast.emit('message',reply);
//     });
//     socket.on('typing',function(){
//         socket.emit('typemsg');
//     });
// });


app.get('/', function (req, res) {
    res.render('index', {
        title: 'Welcome'
    });
});

app.post('/auth/login',auth.login);
app.get('/chat/:token', chat.init);
console.log('server listening at port 3000');
server.listen(80);
