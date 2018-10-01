var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

var dbUrl = 'mongodb://teste:qualquercoisa1@ds125841.mlab.com:25841/test-chat';

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Message = mongoose.model('Message',{ 
    name : String, 
    message : String
});

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})

var server = app.listen(3000, () => {
    console.log('server running on port', server.address().port);
})