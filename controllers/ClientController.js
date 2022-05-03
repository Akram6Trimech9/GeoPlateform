const mongoose = require("mongoose");
const userModel = require("../models/user");
const RoleModel = require("../models/role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getClient=function(req,res){
    let  Client=[];
    RoleModel.find({type:"client"}).exec()
    .then( async roles=>{
        if(roles.length>0){
            for(var i =0;i<roles.length;i++){
                const client= await userModel.findById(roles[i].user).populate('role');
                Client.push(client)

            }    
         
            return res.status(200).json(Client)

        }
        else  {
            return res.status(200).json({message:"there is no Clients"})
        }
    })
}

exports.DeleteClient=function(req,res){
    userModel.findByIdAndDelete(req.params.id,(err,result)=>{
        if(result){
            return res.status(200).json({message:'Client deleted'});
        }
        
        if(err){
            return res.status(500).json(err);
        }

        else {
            return res.status(404).json({message:'Client not found '});
        }
        

    })
}

exports.getClientByid=function(req,res){
    userModel.findById(req.params.id).exec()
    .then(Client=>{
        if(Client){
            return res.status(200).json(Client);
        }
        else {
            return res.status(404).json({message:'Client not found'})
        }
    })
    .catch(err=>{
        return res.status(404).json(err);
    })
    
    }
    
    exports.updateInfo = function(req, res) {
        userModel.findById(req.params.id)
            .exec()
            .then(async Client => {
                if (Client) {
                    if(req.body.password){
                     const  encrypted = await  bcrypt.hash(req.body.password, 10);
                     Client.password=encrypted;
                }

                Object.keys(req.body).forEach(element=>{
                    if(element.toString() !== "password"){
                        Client[element]=req.body[element]
                    }
                })
                
                Client.save().then(result=>{
                    if(result){
                        return res.status(200).json({message:'update done ',Client})
                       }
                       else {
                           return res.status(400).json({message:'update failed'});
                       }
                }).catch(err=>{
                    return res.status(500).json(err);
                })
            }
            else {
                return res.status(404).json({message:'Client not found'});
    
            }
        })    
    
            
            .catch(err => {
                return res.status(500).json(err)
            })
    } 
    exports.login = function (req,res){
        userModel.findOne({ email: req.body.email })
            .exec()
            .then( async  Client => {
                    
                if (Client) {
                    const role =  await RoleModel.findById(Client.role);  
                    if(role.type!="client"){
                        return res.status(403).json({message:'you are not Client'});
                    }   
                    bcrypt.compare(req.body.password, Client.password,  (err, same) => {
                        if (err) {
                            return new Error("comparing failed");
                        }
                        if (same) {
                        
                            const token = jwt.sign({Client_id:Client._id ,role:role.type}, "Secret", { expiresIn: 60 * 60 * 60 })
                            const id=Client._id
                            return res.status(200).json({ message: 'login successfully', token,id});
                        } 
                        else
                        {
                            return res.status(401).json({ message: 'mot de passe incorrect' });
                        }
                    })
                }  
                else {
                    return res.send("email incorrect")
                } 
            })
            .catch(err => {
                return res.staus(500).json(err);
            });
    }
    
    
    exports.signup =function (req,res){
        userModel.findOne({ email: req.body.email })
        .exec()
        .then(Client => {
            if (Client) {
                return res.status(401).json({ message: 'email exists try another one' });
            } else {
                bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                    if (err) {
                        return new Error("crypting error");
                    }
                    if (encrypted) {
    
                        const role = new RoleModel({
                            _id:new mongoose.Types.ObjectId(),
                            type:"client",
                            user:null
                        })
                        const Client = new userModel({
                            _id: new mongoose.Types.ObjectId(),
                            nom: req.body.nom,
                            prenom: req.body.prenom,
                            password: encrypted,
                            email: req.body.email,
                            role: role,
                            roleType:role.type
                        })
                        console.log(Client)
                        Client.save()
                            .then(  Client => {
                                if (Client) {      
                                   role.user=Client._id;
                                    role.save().then(roleSaved=>{                          
                                    return res.status(201).json({ message: 'Client created', Client });
                                }).catch(err=>{
                                    return res.status(500).json(err);
                                })
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
    
    }
    
    