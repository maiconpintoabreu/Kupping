const DanceClass = require('../models/danceclass.model');
var mongoose = require('mongoose');
exports.getDanceClasses = function (req, res) {
    DanceClass.find({}, function(err, danceClasses) {
        res.status(200).send(danceClasses || []);
     });
};
exports.getPrivateDanceClasses = function (req, res) {
    DanceClass.find({}, function(err, danceClasses) {
        res.status(200).send(danceClasses || []);
     });
};
exports.insertDanceClass = function (req, res) {
    const danceClass = new DanceClass({
        user: req.body.user,
        name: req.body.name,
        place: req.body.place,
        danceStyle: req.body.danceStyle
    });
    danceClass.save(function (err, results) {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).send(results);
      });
};