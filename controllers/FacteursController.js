const mongoose=require("mongoose")
  const facteurModel=require("../models/Facteur")
  const CentreModel=require("../models/CentreDistribution")
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
const tournee = require("../models/tournee");
  
exports.getAllFacteur=function(req,res){
 facteurModel.find()
 .populate( "CentreDistribution" ).populate("tournee")
 .exec()
 .then(resultat=>{
       if(resultat){
           res.status(201).json(resultat)
       }else{
           res.status(401).json({message:"there is no facteur"})
       }

 })
 .catch(err=>{
     res.send(err)
 })
} 

  exports.signup =function (req,res){
  CentreModel.findById(req.params.id)
   .exec()
     .then(centre=>{
          if(centre){
            facteurModel.findOne({ email: req.body.email })
            .exec()
            .then(Facteur => {
                if (Facteur) {
                    return res.status(401).json({ message: 'email exists try another one' });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                        if (err) {
                            return new Error("crypting error");
                        }
                        if (encrypted) {        
                            const Facteur = new facteurModel({
                                _id: new mongoose.Types.ObjectId(),
                                nom: req.body.nom,
                                prenom: req.body.prenom,
                                password: encrypted,
                               email: req.body.email,
                               matricule:req.body.matricule ,  
                               CentreDistribution: req.params.id 
                            })
                            console.log(Facteur)
                            Facteur.save()
                                .then(  async Facteur => {
                                    if (Facteur) {
                                           centre=await CentreModel.findByIdAndUpdate(req.params.id,{$push:{facteur:Facteur}})      
                                        console.log(centre)
                                         return res.status(201).json({ message: 'Facteur created', Facteur });
                                    }
                                })
                                .catch(err => {
                                    return res.status(500).json(err);
                                })
                        }
                    })
                }
            })
            .catch(err => {
                return res.status(500).json(err);
        
            })
          }else{
              res.status(404).json({message:"Centre ID n'existe pas "})
          }
     })
 
   }

exports.loginFacteur=function(req,res){
     facteurModel.find({email:req.body.email})
     .exec()
     .then(Facteur=>{
          if(Facteur){
            bcrypt.compare(req.body.password, Facteur.password,  (err, same) => {
          
                if (err) {
                    return new Error("comparing failed");
                }
                if (same) {
                
                    const token = jwt.sign({Facteur_id:Facteur._id}, "Secret", { expiresIn: 60 * 60 * 60 })
                    return res.status(200).json({ message: 'login successfully', token });
                } 
                else
                {
                    return res.status(401).json({ message: 'mot de passe incorrect' });
                }
              })
          }           else {
            return res.send("email incorrect")
        } 
    })
    .catch(err => {
        return res.staus(500).json(err);
    });

}
exports.deleteFacteur=function(req,res){
    facteurModel.findByIdAndRemove(req.params.id)
    .exec().
      then(async resultat=>{
        if(resultat){
            console.log("wiou",resultat)
             const Centre= await  CentreModel.findByIdAndUpdate(resultat.CentreDistribution,{$pull:{facteur:resultat._id}})
             const tourne=await tournee.deleteMany({facteur:resultat._id}) 
             console.log(Centre)
             if(tourne){
             return  res.status(201).json({message:"deleted succesfuly"})
             }
             else{
                return  res.status(401).json({message:"there is an error "})
             }
           } 
        else{
            return  res.status(401).json({message:"there is an error "})
        }
    })
    .catch(err=>{
        res.send(err
            )
    })
}
