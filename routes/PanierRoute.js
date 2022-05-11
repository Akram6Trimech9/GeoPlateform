const route = require("express").Router()
const  PanierController=require('../controllers/panierController');
route.post("/",PanierController.postpanier) ;
route.get("/",PanierController.getall) ;
route.get("/:id",PanierController.getpanierByid)
route.delete("/:id",PanierController.DeletePanier)
route.post("/sendemail",PanierController.sendEmail)
 module.exports = route;