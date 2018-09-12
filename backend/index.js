const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const danceClassController = require('./controllers/danceclass.controller');
const userController = require('./controllers/user.controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());
let port = 80;
function connect () {
    return mongoose.connect('mongodb://kuppinguserusuario:123asd123z@mongo:27017/kupping',{
        useNewUrlParser: true, 
        authSource:"admin" ,
        keepAlive: 1 
        });
}
function reconnect (){
    setTimeout(
        function() {
            connect();
        },1000);
}

connect();

mongoose.connection.on('error', console.log)
    .on('disconnected', reconnect)
    .once('open', listen);

function listen(){
    app.get('/public/danceclass', danceClassController.getDanceClasses);
    app.post('/public/user', userController.insertUser);
    
    app.get('/private/danceclass', danceClassController.getPrivateDanceClasses);
    app.post('/private/danceclass', danceClassController.insertDanceClass);
    http.createServer(app).listen(port);
    console.log("Listening port: "+port);
}