const Student = require('../models/student.model');
var mongoose = require('mongoose');
exports.getStudentes = function (req, res) {
    Student.find({}, function(err, studentes) {
        if(err){
            res.status(500).send(err.message);
        }else{
            res.status(200).send(studentes || []);
        }
     });
};
exports.getStudent = function (req, res) {
    Student.findById(req.params.id, function(err, student) {
        if(err){
            res.status(500).send(err.message);
        }else{
            res.status(200).send(student || {});
        }
     });
};
exports.insertStudent = function (req, res) {
    const student = new Student({
        name: req.body.name,
        email: req.body.email
    });
    student.save(function (err, results) {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).send(results);
      });
};
exports.deleteStudent = function (req, res) {
    Student.deleteOne({_id:req.params.id}, function(err){
        if(err){
            res.status(500).send(err.message);
        }else{
            res.status(200).send(JSON.stringify({"text":"Student Deleted"}));
        }
    });
};
exports.updateStudent = function (req, res) {
    Student.findById(req.params.id, function(err, student) {
        if(err){
            res.status(500).send(err.message);
        }else{
            if(!student){
                res.status(404).send(JSON.stringify({"text":"Student Not Found"}));
            }else{
                student.name = req.body.name;
                Student.updateOne({"_id":req.params.id},student,function(err2){
                    if(err2){
                        res.status(404).send(JSON.stringify({"text":"Student Not Found"}));
                    }
                });
                res.status(200).send(JSON.stringify({"text":"Student Updated"}));
            }
        }
     });
};