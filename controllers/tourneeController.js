const tourneeModel = require("../models/tournee");
const mongoose = require("mongoose");
const Facteur = require("../models/Facteur");
exports.getalltourne=function(req,res){
    tourneeModel.find()
    .populate("facteur").populate("adresses")
     .then(resultat=>{
    if(resultat) {
        return   res.status(201).json(resultat)
     
        }else{
            return  res.status(401).json('there is an error there')
        }
        })
        .catch(err=>{
            res.send(err)
        })
}
 exports.Createtournee = function(req, res) {
     Facteur.findById(req.params.id) // tester si le facteur exist ou non 
     .then(facteur=>{
         console.log("facteur",facteur)
         if(facteur){ //s'il ya un facteur alors on creé le tournée 
            const tourne =new tourneeModel({
                _id: mongoose.Types.ObjectId(),    
                parite:req.body.parite,
                numDebut:req.body.numDebut,
                numFin:req.body.numFin,
                typeVoi:req.body.typeVoi,
                nomvoi:req.body.nomvoi,
                facteur:req.params.id //bech na3tiw lel facteur li mawjoud fi wost model tournée l'id 
            })
            tourne.save() // save fi wost ldatabase 
            .then( async tourne=>{ //ken tsava fi wost el database
                 if(tourne){
                     console.log("in tourne")
                      Fact= await Facteur.findByIdAndUpdate(req.params.id,{$push:{tournee:tourne}}) //yemchi yhot fi wost el table facteur el tournée li tkhoss l facteur 
                    console.log("facttable",Fact) // y'affichih fel console 
                    if(Fact){
                         res.status(201).json(tourne ) //ken lfonction t3addet w tournée t7at fi wost elcollection facteur y'affichili el tournée sous format json 
                      }
                 }else{
                     res.status(401).json({message:"there is a problem"})
                 }

            }).catch(err=>{
                res.send(err)
            })
         }else(
             res.status(404).json({message:"facteur does not exist"})
         )

     })  
            .catch(err=>{
res.send(err)
     })
    }
exports.gettournee = function(req, res) {
    tourneeModel.find() //tala3li tous les données li khassin bl tournées 
    .populate("facteur") //tala3li maa les tournées les données li khassin bel facteur
        .exec()
        .then(result => { 
            if (result.length > 0) { //ken el resultat mayech fatgha  
                return res.send(result); // tala3homli sous format json 
            } else {
                return res.status(404).json({ message: 'tournee not found' });// message d'errur 404 
            }
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}
exports.UpdateTournee =  (req, res) => { 
    tourneeModel.findByIdAndUpdate(req.params.id, { //khoudhli les données mel collection mta3 el tounrée w upadatihomli 
        parite: req.body.parite, //req.body : les données li nktbhom eni 
        numDebut: req.body.numDebut,
        numFin: req.body.numFin  ,
        type: req.body.type  ,
        nomvoi: req.body.nomvoi ,
        }, { new: true })
        .then(result => {
            if (!result) { //ken saret l'update 
                return res.status(404).send({ //raja3heli json
                    message: "Tournee not found with id " + req.params.id
                });
            }
            res.send(result);
        }).catch(err => { //sinon tala3li li famma errrr
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Tournee not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Tournee with id " + req.params.id
            });
        });
};
exports.Deletetournee = function(req, res) {
    tourneeModel.findByIdAndRemove(req.params.id) // just al9aha mel les collections li aandek w ammli el remove
        .then(result => {
            if (!result) {  
                return res.status(404).send({
                    message: "tourneeModel not found with id " + req.params.id
                });
            }
            res.send({ message: "tourneeModel deleted successfully!" });
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
exports.getTourneeByid = function(req, res) {
    tourneeModel.findById(req.params.id) //bhedhi bech ylawej 
        .exec()
        .then(result => {
            if (result) {
                return res.send(result); //ki tal9aha sous format json
            } else {
                return res.status(404).json({ message: 'tourneeModel not found' });
            }
        })
        .catch(err => { return res.status(500).json(err) });
}
exports.gettourneebyfacteur=function(req,res){
    tourneeModel.findOne({facteur:req.params.id})
     .exec()
     .then(resultat=>{
         if(resultat){
             res.status(201).json(resultat)
         }else{
             res.status(401).json({message:'error'})
         }
     }).catch(err=>{
         res.send(err)
     })
}