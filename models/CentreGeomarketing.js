const mongoose = require("mongoose");
const centreGeomodel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
     nom :{type:String,required:true}, 
     tel:String,
     fax:String ,
          location : { 
        longitude: Number,
        latitude: Number
      },
     Region:{type:mongoose.Schema.Types.ObjectId,ref:'region'},
  
  });
module.exports = mongoose.model('centreGeo', centreGeomodel);
