var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mustacheExpress = require('mustache-express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.engine('html',mustacheExpress());
app.set('view engine','html');
app.set('views',path.join(__dirname,'views'));


app.get('/',function(req,res){
    console.log('request for index page');
    res.render('index',{
        title: 'Welcome'
    });
});

console.log('server listening at port 3000');
app.listen(3000);