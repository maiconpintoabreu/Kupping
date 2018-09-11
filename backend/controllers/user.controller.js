const User = require('../models/user.model');
var mongoose = require('mongoose');
exports.getUsers = function (req, res) {
    User.find({}, function(err, Users) {
        res.status(200).send(Users || []);
     });
};
exports.insertUser = function (req, res) {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        company: req.body.company,
        dateCreated: new Date().getDate(),
        dateModified: new Date().getDate(),
    });
    user.save(function (err, results) {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).send(results);
      });
};