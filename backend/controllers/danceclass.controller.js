const DanceClass = require('../models/danceclass.model');
var mongoose = require('mongoose');
exports.getDanceClasses = function (req, res) {
    DanceClass.find({}, function(err, danceClasses) {
        res.status(200).send(danceClasses || []);
     });
};
exports.insertDanceClass = function (req, res) {
    const danceClass = new DanceClass({
        user: "test",
        name: "test",
        place: "test",
        students: ["test"],
        danceStyle: "test",
        dateCreated: new Date().getDate(),
        dateModified: new Date().getDate(),
    });
    danceClass.save(function (err, results) {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).send(results);
      });
};