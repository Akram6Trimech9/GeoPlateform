const centreGeoModel = require("../models/CentreGeomarketing");
const mongoose = require("mongoose");
const RegionModel=require("../models/Regions")
exports.Createcentregeo= function(req, res) {
    const  centre = new centreGeoModel({
        _id: mongoose.Types.ObjectId(),  
        nom: req.body.nom,
        tel: req.body.tel,
        fax: req.body.fax  ,
        location:req.body.location,
        Region: req.params.idregion ,
    });      
      centre.save()
      
       .then( async  centre => {
                if (centre) {
                     const Region = await RegionModel.findByIdAndUpdate(req.params.idregion,{$push:{CentreGeo:centre}});        
                     console.log(Region)
                     if(Region){
                            return res.status(201).json({message: 'centre created successfully', centre});
                         } else { 
                            return res.status(401).json({message:'centre failed'});

                         }               
                } else {
                    return res.status(401).json({message: 'cebtre failed'});
                }
            })
            .catch(err => {
                return res.status(401).json(err);
            })
}
exports.getCentreGeo = function(req, res) {
    centreGeoModel.find()  
  .populate("Region")
        .exec()
        .then(result => {
            if (result.length > 0) {
                return res.send(result);
            } else {
                return res.status(404).json({ message: 'centre not found' });
            }
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}
exports.getcnetregeoByid=function(req,res){
    centreGeoModel.findById(req.params.id)
    .then(resultat=>{
         if(resultat){
    
            return res.status(201).json(resultat)
        }else{
            res.status(401).json({message:"there is an error"})
        }
        })
        .catch(err=>{
            res.status(500).json(err)
        })
}
exports.updateCentregeo = (req, res) => {
    centreGeoModel.findByIdAndUpdate(req.params.id, {
        nom: req.body.nom,
        tel: req.body.tel,
        fax: req.body.fax  ,
        location: req.body.location  ,
        Region: req.body.Region  ,
        }, { new: true })
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "centre not found with id " + req.params.id
                });
            }
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "centre not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating centre with id " + req.params.id
            });
        });
};

exports.DeleteCentregeo = function(req, res) {
    centreGeoModel.findByIdAndRemove(req.params.id)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "centre not found with id " + req.params.id
                });
            }
            res.send({ message: "centre  deleted successfully!" });
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
exports.getcentregeoByregion=function(req,res){
    centreGeoModel.find({Region:req.params.id})
     .then(resultat=>{
        if(resultat){
            res.status(201).json(resultat)
        }else{
            res.status(401).json({message:'there is an error '})
        }
    })
    .catch(err=>{
        res.send(err)
    })
}