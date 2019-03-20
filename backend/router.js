var jwt = require('jsonwebtoken');
const router = require("express").Router();
const userController = require('./controllers/user.controller');
const studentControler = require('./controllers/student.controller');
const danceClassController = require('./controllers/danceclass.controller');
const danceStyleController = require('./controllers/dancestyle.controller');

router.get('/public/danceclass', danceClassController.getDanceClasses);
router.post('/public/user', checkLogin, userController.insertUser);

router.get('/private/danceclass', checkLogin, danceClassController.getPrivateDanceClasses);
router.get('/private/danceclass/:id', checkLogin, danceClassController.getPrivateDanceClass);
router.put('/private/danceclass/:id', checkLogin, danceClassController.updateDanceClass);
router.delete('/private/danceclass/:id', checkLogin, danceClassController.deleteDanceClass);
router.get('/private/dancestyle', checkLogin, danceStyleController.getPrivateDanceStyles);
router.post('/private/danceclass', checkLogin, danceClassController.insertDanceClass);
router.post('/private/student', checkLogin, studentControler.insertStudent);
router.get('/private/student', checkLogin, studentControler.getStudentes);
router.get('/private/student/:id', checkLogin, studentControler.getStudent);
router.put('/private/student/:id', checkLogin, studentControler.updateStudent);
router.delete('/private/student/:id', checkLogin, studentControler.deleteStudent);
danceStyleController.start();

module.exports = router;

function checkLogin(req,res,next) {
    if(req.headers.authorization){
        jwt.verify(req.headers.authorization.replace("Bearer ",""), 'maiconsantana', function(err, decoded) {
            console.log(decoded);
            if(err){
                res.status(401).send(err);
            }else{
                req.client = decoded;
                return next();
            }
        });
    }else{
        res.status(400).send("Token Required");
    }
}