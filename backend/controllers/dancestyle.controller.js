const DanceStyle = require('../models/dancestyle.model');
var mongoose = require('mongoose');
exports.getPrivateDanceStyles = function (req, res) {
    DanceStyle.find({}, function(err, danceStyle) {
        res.status(200).send(danceStyle || []);
     });
};
// exports.insertDanceStyle = function (req, res) {
//     const danceStyle = new DanceStyle({
//         id: req.body.id
//     });
//     danceStyle.save(function (err, results) {
//         if(err) {
//             console.log(err);
//             res.status(500).send(err);
//         }
//         res.status(200).send(results);
//       });
// };