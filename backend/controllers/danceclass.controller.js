const moduleModel = require("../models/module.model");
const DanceClass = moduleModel.getDanceClassModel();
const Student = moduleModel.getStudentModel();
exports.booking = (req,res)=>{
    // TODO: add isPublic
    DanceClass.findOne({_id:req.params.danceclassid}).then(danceClass=>{
        if(danceClass){
            Student.findOne({email:req.body.email,user:danceClass.user}).then(resStudent=>{
                let studentToSave;
                if(resStudent)
                    studentToSave = danceClass.students.find(x=>x == ""+resStudent._id);
                if(studentToSave){
                    res.status(302).send("Email already Saved");
                }else{
                    studentToSave = new Student(req.body);
                    studentToSave.user = danceClass.user;
                    if(!resStudent){
                        studentToSave.save(errSaveStudent=>{
                            if(errSaveStudent){
                                console.error("Error errSaveStudent",errSaveStudent.message);
                                res.status(500).send("Booking Error");
                            }else{
                                danceClass.students.push(studentToSave._id);
                                danceClass.save(errSaveDanceClass=>{
                                    if(errSaveDanceClass){
                                        console.error("Error errSaveDanceClass",errSaveDanceClass.message);
                                        res.status(500).send("Booking Error");
                                    }else{
                                        res.status(200).send({result:"Success"});
                                    }
                                });
                            }
                        });
                    }else{
                        danceClass.students.push(resStudent._id);
                        danceClass.save(errSaveDanceClass=>{
                            if(errSaveDanceClass){
                                console.error("Error errSaveDanceClass",errSaveDanceClass.message);
                                res.status(500).send("Booking Error");
                            }else{
                                res.status(200).send({result:"Success",recurrent:true});
                            }
                        });
                    }
                }
                    
            })
        }else{
            res.status(400).send("Dance Class not found");
        }
     }).catch(errDanceClass=>{
        console.error("Error errDanceClass",errDanceClass.message);
        res.status(500).send("Booking Error");
     });
};
exports.getDanceClasses = function (req, res) {
    // TODO: add isPublic
    DanceClass.find({}, function(err, danceClasses) {
        res.status(200).send(danceClasses || []);
     }).populate("danceStyle");
};
exports.getPrivateDanceClasses = function (req, res) {
    DanceClass.find({user: req.client.id}, function(err, danceClasses) {
        res.status(200).send(danceClasses || []);
     }).populate("danceStyle");
};
exports.getPrivateDanceClass = function (req, res) {
    DanceClass.findOne({_id:req.params.id,user:req.client.id}, function(err, danceClass) {
        res.status(200).send(danceClass || {});
     }).populate("danceStyle").populate("students");
};
exports.insertDanceClass = function (req, res) {
    req.body.user = req.client.id;
    delete(req.body.students);
    const danceClass = new DanceClass(req.body);
    danceClass.save(function (err, results) {
        if(err) {
            console.error(err);
            res.status(500).send(err);
        }
        res.status(200).send(results);
    });
};
exports.deleteDanceClass = function (req, res) {
    DanceClass.deleteOne({_id:req.params.id}, function(err){
        if(err){
            res.status(500).send(err.message);
        }else{
            res.status(200).send(JSON.stringify({"text":"DanceClass Deleted"}));
        }
    });
};
exports.updateDanceClass = function (req, res) {
    DanceClass.findOne({_id:req.params.id,user:req.client.id}, function(err, danceClass) {
        if(err){
            res.status(500).send(err.message);
        }else{
            if(!danceClass){
                res.status(404).send(JSON.stringify({"text":"DanceClass Not Found"}));
            }else{
                req.body.students = danceClass.students;
                danceClass = new DanceClass(req.body);
                DanceClass.updateOne({"_id":req.params.id},danceClass,function(err2){
                    if(err2){
                        res.status(404).send(JSON.stringify({"text":"DanceClass Not Found"}));
                    }else{
                        res.status(200).send(JSON.stringify({"text":"DanceClass Updated"}));
                    }
                });
            }
        }
     });
};