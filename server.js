//imports
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

//utils
var dbUrl = 'mongodb://teste:qualquercoisa1@ds125841.mlab.com:25841/test-chat';

//codevars
var connectedUsers = 0;

//app configs
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routing
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
});

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
        message.save((err) => {
            if(err) {
                sendStatus(500);
            }
            io.emit('message', req.body);
            res.sendStatus(200);
        })
})

//model
var Message = mongoose.model('Message',{ 
    name : String, 
    message : String
});

//connections
mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})

io.on('connection', (socket) => {
    console.log('a user is connected');
    console.log('connected users:', ++connectedUsers);

    socket.on('disconnect', function(){
        console.log('user disconnected');
        console.log('connected users:', --connectedUsers);
    });
})

var server = http.listen(80, () => {
    console.log('server running on port', server.address().port);
})