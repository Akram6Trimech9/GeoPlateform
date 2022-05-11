const mongoose=require('mongoose')
const  sendModel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    ClientEmail:String , 
    Price:String , 
    Message:String 
})
module.exports = mongoose.model('emails', sendModel); 