const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let DanceClassSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,index: true},
    name: {type: String, required: true,index: true},
    place: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    danceStyle: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DanceStyle' }],
    dateCreated: {type: Number, required: true},
    dateModified: {type: Number, required: true,unique: true,index: true},
});
module.exports =  mongoose.model("DanceClass",DanceClassSchema);