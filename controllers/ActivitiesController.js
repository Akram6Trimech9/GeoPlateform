const mongoose = require("mongoose");
const ActivityModel = require("../models/activities");
const adresses = require("../models/adresses");
 const  addresseModel = require("../models/adresses");
 exports.CreateActivity = function(req, res) {
     addresseModel.findById(req.params.id)
       .then(adress=>{
           if(adress){
               let adr=[]; 
                adr.push(req.params.id)
              const  activity=new ActivityModel({
                _id: mongoose.Types.ObjectId(),
                title:req.body.title , 
                image:req.file.path,
                adresses:adr
           }) 
           activity.save()

           .then(async resultat=>{
                  if(resultat){
                    console.log("resultat",resultat)

                  const  adress = await  addresseModel.findByIdAndUpdate(req.params.id,{activity:resultat})
                  console.log("hello",adress)

                  res.status(201).json(adress) 
                }else{
                    res.status(401).json({message:"error with activity"})
                }})
            .catch(err=>{
                req.send(err)
            })
        
           }else{
               res.status(404).json({message:"there is no adress"})
           }
          
        })
        .catch(err=>{
            res.send(err)
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
