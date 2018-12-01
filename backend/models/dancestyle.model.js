const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let DanceStyleSchema = new Schema({
    id: {type: String, required: true,index: true}
});
module.exports =  mongoose.model("DanceStyle",DanceStyleSchema);