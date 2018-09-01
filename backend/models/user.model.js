const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
    email: {type: String, required: true,unique: true,index: true},
    username: {type: String, required: true,unique: true,index: true},
    password: {type: String, required: true},
    company: {type: String, required: true},
    dateCreated: {type: Date, required: true},
    dateModified: {type: Date, required: true,unique: true,index: true},
});
module.exports =  mongoose.model("User",UserSchema);