const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var helmet = require('helmet');


const danceClassController = require('./controllers/danceclass.controller');
const danceStyleController = require('./controllers/dancestyle.controller');
const userController = require('./controllers/user.controller');
const studentControler = require('./controllers/student.controller');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8082;
const mongoUrl = process.env.MONGO || "localhost";
const authValue = process.env.AUTH || "";
function connect () {
    return mongoose.connect('mongodb://'+authValue+mongoUrl+':27017/kupping',{
    //return mongoose.connect('mongodb://localhost:27017/kupping',{
        useNewUrlParser: true, 
        authSource:"admin" ,
        keepAlive: 1 
        });
}
function reconnect (){
    setTimeout(
        function() {
            connect();
        },10000);
}

connect();

mongoose.connection.on('error', console.log)
    .on('disconnected', reconnect)
    .once('open', listen);

function listen(){

    app.get('/public/danceclass', danceClassController.getDanceClasses);
    app.post('/public/user', userController.insertUser);
    
    app.get('/private/danceclass', danceClassController.getPrivateDanceClasses);
    app.get('/private/dancestyle', danceStyleController.getPrivateDanceStyles);
    app.post('/private/danceclass', danceClassController.insertDanceClass);
    app.post('/private/student', studentControler.insertStudent);
    app.get('/private/student', studentControler.getStudentes);
    app.get('/private/student/:id', studentControler.getStudent);
    app.put('/private/student/:id', studentControler.updateStudent);
    app.delete('/private/student/:id', studentControler.deleteStudent);
    http.createServer(app).listen(port);
    console.log("Listening port: "+port);
}