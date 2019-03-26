const DanceClass = require('../models/danceclass.model');
exports.getDanceClasses = function (req, res) {
    // TODO: add isPublic
    DanceClass.find({}, function(err, danceClasses) {
        res.status(200).send(danceClasses || []);
     }).populate("danceStyle");
};
exports.getPrivateDanceClasses = function (req, res) {
    DanceClass.find({user: req.client.id}, function(err, danceClasses) {
        res.status(200).send(danceClasses || []);
     });
};
exports.getPrivateDanceClass = function (req, res) {
    DanceClass.findOne({_id:req.params.id,user:req.client.id}, function(err, danceClass) {
        res.status(200).send(danceClass || {});
     });
};
exports.insertDanceClass = function (req, res) {
    const danceClass = new DanceClass({
        user: req.body.user,
        name: req.body.name,
        place: {description:req.body.place,city:req.body.city,country:req.body.country},
        danceStyle: req.body.danceStyle,
        user: req.client.id,
    });
    danceClass.save(function (err, results) {
        if(err) {
            console.log(err);
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
    DanceClass.findById(req.params.id, function(err, danceClass) {
        if(err){
            res.status(500).send(err.message);
        }else{
            if(!danceClass){
                res.status(404).send(JSON.stringify({"text":"DanceClass Not Found"}));
            }else{
                danceClass.name = req.body.name;
                danceClass.place = {description:req.body.place,city:req.body.city,country:req.body.country};
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