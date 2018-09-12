const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let StudentSchema = new Schema({
    name: {type: String, required: true,index: true},
    email: {type: String, required: true,unique: true,index: true},
    dateOfBirth: {type: Date, required: true},
    dateCreated: {type: Date, required: true, default:new Date()},
    dateModified: {type: Date, required: true,unique: true,index: true, default:new Date()},
});
module.exports =  mongoose.model("Student",StudentSchema);