const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var helmet = require('helmet');
const authRouter = require("./auth-route");
const router = require("./router");



const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8082;
const mongoUrl = process.env.MONGO || "localhost";
const authValue = process.env.AUTH || "kuppinguserusuario:123asd123z@";
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
    app.use(authRouter);
    app.use(router);
    http.createServer(app).listen(port);
    console.log("Listening port: "+port);
}