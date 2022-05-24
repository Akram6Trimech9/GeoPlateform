const mongoose = require("mongoose");
const userModel = require("../models/user");
const RoleModel = require("../models/role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.getChefs=function(req,res){
    let  Chef=[];
    RoleModel.find({type:"chef"}).exec()
    .then( async roles=>{
        if(roles.length>0){
            for(var i =0;i<roles.length;i++){
                const chef= await userModel.findById(roles[i].user).populate('role');
                console.log(chef)
                Chef.push(chef)

            }    
            return res.status(200).json(Chef)
        }
        else  {
            return res.status(200).json({message:"there is no chef"})
        }
    })
}

exports.DeleteChefs=function(req,res){
    userModel.findByIdAndDelete(req.params.id,(err,result)=>{
        if(result){
            return res.status(200).json({message:'chef deleted'});
        }
        
        if(err){
            return res.status(500).json(err);
        }

        else {
            return res.status(404).json({message:'chef not found '});
        }
        

    })
}

exports.getChefByid=function(req,res){
    userModel.findById(req.params.id).exec()
    .then(chef=>{
        if(chef){
            return res.status(200).json(chef);
        }
        else {
            return res.status(404).json({message:'chef not found'})
        }
    })
    .catch(err=>{
        return res.status(404).json(err);
    })
    
    }
    
    exports.updateInfo = function(req, res) {
        userModel.findById(req.params.id)
            .exec()
            .then(async chef => {
                if (chef) {
                    if(req.body.password){
                     const  encrypted = await  bcrypt.hash(req.body.password, 10);
                     chef.password=encrypted;
                }

                Object.keys(req.body).forEach(element=>{
                    if(element.toString() !== "password"){
                        chef[element]=req.body[element]
                    }
                })
                
                chef.save().then(result=>{
                    if(result){
                        return res.status(200).json({message:'update done ',chef})
                       }
                       else {
                           return res.status(400).json({message:'update failed'});
                       }
                }).catch(err=>{
                    return res.status(500).json(err);
                })
            }
            else {
                return res.status(404).json({message:'chef not found'});
    
            }
        })    
    
            
            .catch(err => {
                return res.status(500).json(err)
            })
    }
    
    
    
    
    exports.login = function (req,res){
        userModel.findOne({ email: req.body.email })
            .exec()
            .then( async  chef => {
                    
                if (chef) {
                    const role =  await RoleModel.findById(chef.role);  
                    if(role.type!="chef"){
                        return res.status(403).json({message:'you are not chef'});
                    }
                    
                    bcrypt.compare(req.body.password, chef.password,  (err, same) => {
                        if (err) {
                            return new Error("comparing failed");
                        }
                        if (same) {
                        
                            const token = jwt.sign({chef_id:chef._id ,role:role.type}, "Secret", { expiresIn: 60 * 60 * 60 })
                            return res.status(200).json({ message: 'login successfully', token });
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
        console.log()
        userModel.findOne({ email: req.body.email })
        .exec()
        .then(chef => {
        
            if (chef) {
                return res.status(401).json({ message: 'email exists try another one' });
            } else {
                bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                    if (err) {
                        return new Error("crypting error");
                    }
                    if (encrypted) {
    
                        const role = new RoleModel({
                            _id:new mongoose.Types.ObjectId(),
                            type:"chef",
                            user:null
                        })
                        const chef = new userModel({
                            _id: new mongoose.Types.ObjectId(),
                            nom: req.body.nom,
                            prenom: req.body.prenom,
                            password: encrypted,
                            email: req.body.email,
                            role: role,
                            roleType:role.type
                        })
                        chef.save()
                            .then(  chef => {
                                if (chef) {      
                                   role.user=chef._id;
                                    role.save().then(roleSaved=>{                          
                                    return res.status(201).json({ message: 'chef created', chef });
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
    
    