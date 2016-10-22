var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    res.send('hello');
});

console.log('server listening at port 3000');
app.listen(3000);