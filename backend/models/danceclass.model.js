const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let DanceClassSchema = new Schema({
    name: {type: String, required: true,index: true},
    place: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    danceStyle: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DanceStyle' }],
    dateCreated: {type: Date, required: true, default:new Date()},
    dateModified: {type: Date, required: true,unique: true,index: true, default:new Date()},
});
module.exports =  mongoose.model("DanceClass",DanceClassSchema);