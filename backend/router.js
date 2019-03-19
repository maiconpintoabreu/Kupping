var jwt = require('jsonwebtoken');
const router = require("express").Router();
const userController = require('./controllers/user.controller');
const studentControler = require('./controllers/student.controller');
const danceClassController = require('./controllers/danceclass.controller');
const danceStyleController = require('./controllers/dancestyle.controller');

app.get('/public/danceclass', danceClassController.getDanceClasses);
app.post('/public/user', checkLogin, userController.insertUser);

app.get('/private/danceclass', checkLogin, danceClassController.getPrivateDanceClasses);
app.get('/private/danceclass/:id', checkLogin, danceClassController.getPrivateDanceClass);
app.put('/private/danceclass/:id', checkLogin, danceClassController.updateDanceClass);
app.delete('/private/danceclass/:id', checkLogin, danceClassController.deleteDanceClass);
app.get('/private/dancestyle', checkLogin, danceStyleController.getPrivateDanceStyles);
app.post('/private/danceclass', checkLogin, danceClassController.insertDanceClass);
app.post('/private/student', checkLogin, studentControler.insertStudent);
app.get('/private/student', checkLogin, studentControler.getStudentes);
app.get('/private/student/:id', checkLogin, studentControler.getStudent);
app.put('/private/student/:id', checkLogin, studentControler.updateStudent);
app.delete('/private/student/:id', checkLogin, studentControler.deleteStudent);
danceStyleController.start();

module.exports = router;

function checkLogin(req,res,next) {
    jwt.verify(token, 'maiconsantana', function(err, decoded) {
        if(err){
            res.status(401).send(err);
        }else{
            req.client = decoded;
            return next();
        }
      });
}