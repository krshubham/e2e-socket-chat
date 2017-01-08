/**
 * Created by ks on 08/01/17.
 */
var jwt = require('jsonwebtoken');
const secret = 'R3Dcherrylovesg@@k';
const assert = require('assert');

function init(req,res) {
    var token = req.params.token;
    try{
        assert.notEqual(token, undefined);
        var decoded = jwt.verify(token, secret);
        //TODO: the chat connection using sockets
    }
    catch(err){
        console.log(err);
        return res.render('error',{
            message: `${err}`
        });
    }


}

module.exports = {
    init: init
};