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
    adresses:[{type:mongoose.Schema.Types.ObjectId,ref:'adresses'}],
    facteur:{type:mongoose.Schema.Types.ObjectId,ref:'facteur'}
  }, {
    versionKey: false
});
module.exports = mongoose.model('tournee', tourneeModel); // emchy aamlli tableau fel database b'esm tournee w khoudhou mel tourneeModel 
