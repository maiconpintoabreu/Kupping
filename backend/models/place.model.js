const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PlaceSchema = new Schema({
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    description: {type: String, required: true},
    dateCreated: {type: Date, required: true},
    dateModified: {type: Date, required: true,unique: true,index: true},
});
module.exports =  mongoose.model("Place",PlaceSchema);