const mongoose=require('mongoose')
const PanierModel= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId ,
    region:{type:mongoose.Schema.Types.ObjectId,ref:'region'},
    Centre:{type:mongoose.Schema.Types.ObjectId,ref:'CentreDis'}, 
    Activity:{type:mongoose.Schema.Types.ObjectId,ref:'activities'}, 
    nom:{type:String,required:true} , 
    prenom: {type:String,required:true},  
    email: {type:String,required:true}
})
module.exports = mongoose.model('panier', PanierModel);
