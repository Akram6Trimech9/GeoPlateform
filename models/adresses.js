const mongoose = require("mongoose");
const adressmodel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
     title :String ,
     location:{longitude:Number,latitude:Number} , 
     building:{floor:Number,apartNumber:Number}, 
     activity:{type:mongoose.Schema.Types.ObjectId,ref:'activities'},
     tournee :{ type:mongoose.Schema.Types.ObjectId,ref:'tournee'},
     region:{type:mongoose.Schema.Types.ObjectId,ref:'region'}
 });
module.exports = mongoose.model('adresses', adressmodel);
