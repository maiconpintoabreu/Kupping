const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
    email: {type: String, required: true,unique: true,index: true},
    username: {type: String, required: true,unique: true,index: true},
    password: {type: String, required: true},
    company: {type: String, required: true},
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
    danceClass: [{type: mongoose.Schema.Types.ObjectId, ref: 'DanceClass', index: true}],
    dateCreated: {type: Date, required: true, default:new Date()},
    dateModified: {type: Date, required: true,unique: true,index: true, default:new Date()},
});
module.exports =  mongoose.model("User",UserSchema);