const User = require('../models/user.model');
var jwt = require('jsonwebtoken');
exports.getUsers = function (req, res) {
    User.find({}, function(err, Users) {
        res.status(200).send(Users || []);
     });
};
exports.login = function (req, res) {
    console.log("Login...",req.body.username);
    User.findOne({"username":req.body.username}, function(err, user) {
        if(err)
        {
            res.status(500).send(err);
        }else if(!user){
            res.status(400).send("Username or Password Invalid");
        }else{

            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err || !isMatch){ res.status(400).send("Username or Password Invalid");}else{
                const token = jwt.sign({
                    data: {id:user._id}
                }, 'maicon££santanaABwinfqubw123££££££€!!!', { expiresIn: '24h' });
                res.status(200).json({token:token});
            }
        });
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
    User.findOne({$or:[{email:user.email},{username:user.username}]}).then(resUser=>{
        if(!resUser){
            user.save(function (err, results) {
                if(err) {
                    console.log(err);
                    res.status(500).send(err);
                }else{
                    const token = jwt.sign({
                        data: {id:results._id}
                    }, 'maicon££santanaABwinfqubw123££££££€!!!', { expiresIn: '24h' });
                    res.status(200).json({token:token});
                }
            });
        }else{
            res.status(403).json({error:"User already exists"});
        }
    }).catch(errUser=>{
        res.status(500).json({error:errUser.message});
    });
};