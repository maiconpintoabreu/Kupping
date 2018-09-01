const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const danceClassController = require('./controllers/danceclass.controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());
let port = 80;
function connect () {
    return mongoose.connect('mongodb://mongo:27017/kupping');
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
    app.post('/private/danceclass', danceClassController.insertDanceClass);
    http.createServer(app).listen(port);
    console.log("Listening port: "+port);
}