const req = require('express/lib/request')
const mongoose=require('mongoose')
const RegionModel=require('../models/Regions')

exports.postRegion=function(req,res){
     const region = new RegionModel({
        _id: mongoose.Types.ObjectId(),    
        Libelle: req.body.Libelle,
        location : req.body.location
    })
    region.save()
     .then(doc=>{
        doc &&   res.status(201).json({message: 'Region created successfully', doc});
        
    })
    .catch(err => {
        return res.status(400).json(err);
    })
}

exports.getregions = function(req, res) {
    RegionModel.find()  
     .populate('Centres')
         .exec()
        .then(result => {
            if (result.length > 0) {
                return res.send(result);
            } else {
                return res.status(404).json({ message: 'regions not found' });
            }
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}
exports.UpdateRegion = (req, res) => {
    RegionModel.findByIdAndUpdate(req.params.id, {
        Libelle: req.body.Libelle,
        location: req.body.location,
        }, { new: true })
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Region not found with id " + req.params.id
                });
            }
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Region not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Tournee with id " + req.params.id
            });
        });
};
exports.deleteRegion=function(req,res){
     RegionModel.findByIdAndRemove(req.params.id)
     .then(result => {
        if (!result) {
            return res.status(404).send({
                message: "Region not found with id " + req.params.id
            });
        }
        res.send({ message: "Region deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Region not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });

}