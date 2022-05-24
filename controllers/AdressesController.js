const AdressModel = require("../models/adresses");
const mongoose = require("mongoose");
 const tourneeModel=require("../models/tournee") 
 const RegionModel=require("../models/Regions")
exports.CreateAdresse = function(req, res) {
     tourneeModel.findById(req.params.id)
   .then(tourne=>{
       if(tourne){
        // bcrypt.hash(req.body.password, 10, (err, encrypted) => {
        //     if (err) {
        //         return new Error("crypting error");
        //     }
        //     if (encrypted) {        
        //         const Facteur = new facteurModel({
        const Adresse = new AdressModel({        
            _id: mongoose.Types.ObjectId(),    
            title:req.body.title,
            location:req.body.location , 
            building:req.body.building,
            tournee:req.params.id ,
            region:req.params.idregion 
         });      
        Adresse.save()    
           .then( async result => {
                    if (result) {

                         const tournee =await tourneeModel.findByIdAndUpdate(req.params.id,{$push:{adresses:result}})
                         const Region=await RegionModel.findByIdAndUpdate(req.params.idregion,{$push:{address:result}})
 
                        return res.status(201).json(result);
                  
                    } else {
                        return res.status(401).json({message: 'Adresse failed'});
                    }
                })
                .catch(err => {
                    return res.status(401).json(err);
                })
       }else{
           return res.status(401).json({message:"Activity failed"})
       }
   }).catch(err=>{
       return res.send(err)
   })
 }
exports.getadressByActivity=function(req ,res){
     AdressModel.find({activity:req.params.id})
       .exec()
       .then(resultat=>{
           if(resultat){
               return res.status(201).json(resultat)
           }else{
               return res.status(401).json(resultat)
           }
       }).catch(err=>{
           return res.send(err)
       })
}
exports.GetAdresse = function(req, res) {
    AdressModel.find()
    .populate("tournee")
       .populate("activity")
         .then(result => {
            if (result) {
                return res.status(201).json(result);
            } else {
                return res.status(404).json({ message: 'Adresse not found' });
            }
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}
exports.UpdateAdress = (req, res) => {
    AdressModel.findByIdAndUpdate(req.params.id, {
        title:req.body.title,
        location:req.body.location , 
        building:req.body.building
            }, { new: true })
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Adresse not found with id " + req.params.id
                });
            }
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Adresse not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Tournee with id " + req.params.id
            });
        });
};
exports.DeleteAdress = function(req, res) {
    AdressModel.findByIdAndRemove(req.params.id)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Adresse not found with id " + req.params.id
                });
            }
            res.send({ message: "Adresse deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "partner not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.id
            });
        });

}
exports.GetAdressById = function(req, res) {
    AdressModel.findById(req.params.id)
        .exec()
        .then(result => {
            if (result) {
                return res.send(result);
            } else {
                return res.status(404).json({ message: 'Adresse not found' });
            }
        })
        .catch(err => { return res.status(500).json(err) });
}
exports.getAdressByregion= async (req,res)=>{
 try{
   const address= await AdressModel.find({region:req.params.id})
   address && address && res.status(201).json(address) ; 
   !address && res.status(404).json("adress not found")
} 
    catch(err){
        return  res.status(500).json(err)
    }
}