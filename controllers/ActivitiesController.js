const mongoose = require("mongoose");
const ActivityModel = require("../models/activities");
const tourneeModel=require("../models/tournee");
const  addresseModel = require("../models/adresses")

 exports.CreateActivity = function(req, res) {
           const  activity=new ActivityModel({
                _id: mongoose.Types.ObjectId(),
                title:req.body.title , 
                image:req.file.path,
           }) 
           activity.save()
           .then(  resultat=>{
            if(resultat){
                resultat.image = resultat.image.split('\\')[1];
                return   res.status(201).json({message:"Activity Created",resultat})

            }else{
                res.status(400).json({message:"activity not created"})
            }
           })
           .catch(err=>{
           return res.send(err)
        })
                  
         
    
    }
exports.GetActivity = function(req, res) {
    ActivityModel.find()
    .populate("adresses")
        .exec()
        .then(result => {
            if (result.length > 0) {
                result = result.map(activity => {
                    if(activity.image){
                        activity.image= "http://localhost:3001/" + activity.image.split("\\")[0]+ "/"+ activity.image.split("\\")[1] ;
                    }
                    return activity;
                    
                })
                
                return res.send(result);
            } else {
                return res.status(404).json({ message: 'activity not found' });
            }
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}
exports.Updateactivity = (req, res) => {
    ActivityModel.findByIdAndUpdate(req.params.id, {
        title:req.body.title
        }, { new: true })
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "activity not found with id " + req.params.id
                });
            }
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "activity not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Tournee with id " + req.params.id
            });
        });
};
exports.DeletetActivity = function(req, res) {
    ActivityModel.findByIdAndRemove(req.params.id)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "activity not found with id " + req.params.id
                });
            }
            res.send({ message: "activity deleted successfully!" });
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
exports.GetActivityByid = function(req, res) {
    ActivityModel.findById(req.params.id)
        .exec()
        .then(result => {
            if (result) {
                return res.send(result);
            } else {
                return res.status(404).json({ message: 'activity not found' });
            }
        })
        .catch(err => { return res.status(500).json(err) });
}
