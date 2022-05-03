const mongoose = require("mongoose");
const activitymodel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title :{type:String,required:true},
    image:{type:String,required:true},
    adresses:[{ type:mongoose.Schema.Types.ObjectId,ref:'adresses'}],
 });

module.exports = mongoose.model('activities', activitymodel);