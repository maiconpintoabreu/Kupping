const User = require('../models/user.model');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
exports.getUsers = function (req, res) {
    User.find({}, function(err, Users) {
        res.status(200).send(Users || []);
     });
};
exports.login = function (req, res) {
    User.findOne({"username":req.body.username}, function(err, user) {
        if(err)
        {
            res.status(500).send(err);
        }else if(!user){
            res.status(404).send("Username not found");
        }else{
            if(user.password === req.body.password && req.body.password.length > 3){
                const token = jwt.sign({
                    data: user
                }, 'maiconsantana', { expiresIn: '24h' });
                res.status(200).send(token);
            }else{
                res.status(401).send("Username or Password Invalid");
            }
        }
     });
};
exports.insertUser = function (req, res) {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        company: req.body.company,
        dateCreated: new Date(),
        dateModified: new Date(),
    });
    user.save(function (err, results) {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        }else{
            const token = jwt.sign({
                data: results
            }, 'maiconsantana', { expiresIn: '24h' });
            res.status(200).send(token);
        }
    });
};