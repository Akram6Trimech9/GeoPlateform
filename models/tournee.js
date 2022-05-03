const mongoose = require("mongoose");
const tourneeModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    parite: { type: String, required: true },
    numDebut: Number,
    numFin: Number  ,
    typeVoi: { 
      codetype: String,
      npmtype: String
  },  
    nomvoi: String  ,
    activity:[{type:mongoose.Schema.Types.ObjectId,ref:'activities'}],
    facteur:{type:mongoose.Schema.Types.ObjectId,ref:'facteur'}
  }, {
    versionKey: false
});
module.exports = mongoose.model('tournee', tourneeModel);
