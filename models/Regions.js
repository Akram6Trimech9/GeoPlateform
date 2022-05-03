const mongoose = require("mongoose");
const RegionModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
       Libelle:{type:String,required:true},
       location : { 
           longitude: Number,
           latitude: Number
       },
     Centres:[{type:mongoose.Schema.Types.ObjectId,ref:'CentreDis'}],
     CentreGeo:[{type:mongoose.Schema.Types.ObjectId,ref:'centreGeo'}]
 } 
 , {
    versionKey: false});
module.exports = mongoose.model('region', RegionModel);
