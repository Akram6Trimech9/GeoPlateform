const mongoose = require("mongoose");
const user = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    password:  { type: String, required: true },
    email:{type:String,required:true},
    role:{type:mongoose.Schema.Types.ObjectId,ref:'role'},
    roleType:String , 
}, {
    versionKey: false
});
module.exports = mongoose.model('user', user);
