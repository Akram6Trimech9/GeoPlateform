const PanierModel=require('../models/panier')
const mongoose=require('mongoose')
const SendModel=require('../models/Send')
const mailer = require("nodemailer");
exports.postpanier=(req,res)=>{
   const panier = new PanierModel({
    _id: mongoose.Types.ObjectId(),  
    region: req.body.region, 
    Centre:  req.body.Centre,
    Activity:  req.body.Activity, 
    nom: req.body.nom, 
    prenom:  req.body.prenom , 
    email: req.body.email 
   })
   panier.save()
   .then(resultat=>{
        if(resultat){
           return   res.status(201).json(resultat)
        }else{
            res.status(401).json({message:"there is an error "})
        }
   })
   .catch(err=>{
       res.send(err)
   })
}
exports.getall=(req,res)=>{
    PanierModel.find()
    .populate("region").populate("Centre").populate("Activity")
    .then(resultat=>{
        if(resultat){
            res.status(201).json(resultat)
        }else{
            res.status(401).json({message:"there is an error"})
        }

    })
    .catch(err=>{
        res.send(err)
    })
}

exports.DeletePanier=function(req,res){
    PanierModel.findByIdAndRemove(req.params.id)
    .then(result => {
       if (!result) {
           return res.status(404).send({
               message: "panier not found with id " + req.params.id
           });
       }
       res.send({ message: "panier deleted successfully!" });
   }).catch(err => {
       if (err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "panier not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Could not delete note with id " + req.params.id
       });
   });

}
exports.getpanierByid = function(req, res) {
    PanierModel.findById(req.params.id) 
        .exec()
        .then(result => {
            if (result) {
                return res.send(result);  
            } else {
                return res.status(404).json({ message: 'Panier not found' });
            }
        })
        .catch(err => { return res.status(500).json(err) });
}
exports.sendEmail=(req,res)=>{
      const send=new SendModel({
          _id:mongoose.Types.ObjectId(),
          ClientEmail:req.body.ClientEmail , 
          Price:req.body.Price , 
           Message:req.body.Message 
      })
      send.save()
      .then(result=>{
          if(result){

            let body ={
                from: "ezzdinayed@gmail.com",
                to: result.ClientEmail,
                subject: "Geolocalisation Data",
                html: '<div style="background-color: grey; color:white; box-shadow: 10px 5px 5px red; "><h3 style="margin-top: 50px;">Hello :'+result.ClientEmail+'<h3><br><img  width="100%" src="https://previews.123rf.com/images/denisxize/denisxize1706/denisxize170600472/81003084-carte-de-localisation-isométrique-avec-des-points-de-la-carte-sur-le-vecteur-de-fond-blanc.jpg"><h2 style="color:white; background-color:black;height:"80px";">' +result.Message +'</h2><br> <h1>and our price for this information :' +result.Price+'</h1> </div>'
                 /* //</br>text:req.body.description */}
                 const transporter =   mailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth:{
                        user: "ezzdinayed@gmail.com",
                        pass : "Gaming1997."
                    }
                   })
                   
                   transporter.verify(function(error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Server is ready to take our messages");
                    }
                });
                transporter.sendMail(body,(err, result) =>{
                    if (err) {
                        console.log(err);
                        return false
                    }
                    res.status(200).send()
        
                })
         }
         

     
      }).catch(err=>{
        return res.status(401).json(err);
    })
}
