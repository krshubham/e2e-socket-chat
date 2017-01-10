/**
 * Created by ks on 09/01/17.
 */

var db = require('./helpers/dbhelper');
var jwt = require('jsonwebtoken');
const secret = 'R3Dcherrylovesg@@k';

exports = module.exports = function(io){
    var app = io.of('/app');

    app.on('connection', function (socket) {
        socket.on('publicmsg', function (data) {
            if(data.token){
                try{
                   var decoded = jwt.verify(data.token,secret);
                   if(decoded){
                       /*
                        *decoded[object Object]
                        *{ data:
                        *{ _id: 'mymongoid',
                        *username: 'something',
                        *ip: 'somecoolIP' },
                        *iat: 1484019275,
                        *exp: 1484022875 }
                        */
                       socket.emit('pubmsg',{
                           data: data.data,
                           username: decoded.data.username
                       });
                       socket.broadcast.emit('pubmsg',{
                           data: data.data,
                           username: decoded.data.username
                       });
                   }
                }
                catch(err){
                    console.log(err);
                }
            }
        });
    });

};