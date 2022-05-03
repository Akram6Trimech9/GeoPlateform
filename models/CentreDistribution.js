const mongoose = require("mongoose");
const CentreDisModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
     nom :{type:String,required:true}, 
     tel:{type:String,required:true}, 
     fax :{type:String,required:true},
     location : { 
        longitude: Number,
        latitude: Number
    },
     Region:{type:mongoose.Schema.Types.ObjectId,ref:'region'},
     facteur:[{type:mongoose.Schema.Types.ObjectId,ref:'facteur'}]
 });
module.exports = mongoose.model('CentreDis', CentreDisModel);
