const mongoose = require("mongoose");
const facteurModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    matricule:String,
      nom:String , 
    prenom :String,
     email:String , 
    password:String, 
     CentreDistribution:{type:mongoose.Schema.Types.ObjectId,ref:'CentreDis'},
     tournee:[{type:mongoose.Schema.Types.ObjectId,ref:'tournee'}]
 }
 , {
    versionKey: false});
module.exports = mongoose.model('facteur', facteurModel);
