/**
 * Created by ks on 09/01/17.
 */

var db = require('./helpers/dbhelper');


exports = module.exports = function(io){
    var app = io.of('/app');
    app.on('connection', function (socket) {
        console.log('user connected');
        console.log(socket.handshake);
        db.findUserByIp(socket.handshake.address).then(function (data) {
            socket.user = {};
            socket.user.username = data.username;
        })
            .catch(function (err) {
                console.log(err);
            });
    });
};