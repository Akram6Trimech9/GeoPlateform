const  router = require("express").Router(); 
const FacteurController=require('../controllers/FacteursController');
router.post("/postfacteur/:id",FacteurController.signup)
router.post("/login",FacteurController.loginFacteur)
router.get("/getall",FacteurController.getAllFacteur)
router.delete("/:id",FacteurController.deleteFacteur)
module.exports=router; 