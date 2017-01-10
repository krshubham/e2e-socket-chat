/**
 * Created by ks on 09/01/17.
 */

var db = require('./helpers/dbhelper');
var maindb = require('../db');
var jwt = require('jsonwebtoken');
const secret = 'R3Dcherrylovesg@@k';
const assert = require('assert');

exports = module.exports = function(io){
    var app = io.of('/app');

    app.on('connection', function (socket) {
        socket.on('publicmsg', function (data) {
            if(data.token){
                try{
                   var decoded = jwt.verify(data.token,secret);
                   if(decoded){
                       /*
                        * decoded[object Object]
                        * { data:
                        *   { _id: 'mymongoid',
                        *   username: 'something',
                        *   ip: 'somecoolIP' },
                        * iat: 1484019275,
                        * exp: 1484022875 
                        * }
                        */
                        var messages = maindb.get().collection('messages');
                        messages.insertOne({data: data.data,username: decoded.data.username}).then(function(data){
                            console.log(data);
                            assert.notEqual(data, null);
                        })
                        .catch(function(err){
                            console.log(err);
                        });
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

        socket.on('getMessages', function(data){
            if(data.token){
                try{
                    var decoded = jwt.verify(data.token,secret);
                    if(decoded){
                        var messages = maindb.get().collection('messages');
                        messages.find({}).toArray(function(err,docs){
                            assert.equal(err,null);
                            socket.emit('printLastSession',{
                                data: docs
                            });
                        }); 
                    }
                }
                catch(err){
                    console.log('line 60 main-app err with jwt verify');
                    console.log(err);
                }
            }
            else{
                return;
            }
        })

    });

};