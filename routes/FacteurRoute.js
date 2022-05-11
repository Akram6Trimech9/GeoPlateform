const  router = require("express").Router(); 
const FacteurController=require('../controllers/FacteursController');
router.post("/postfacteur/:id",FacteurController.signup)
router.post("/login",FacteurController.loginFacteur)
router.get("/getall",FacteurController.getAllFacteur)
router.delete("/:id",FacteurController.deleteFacteur)
router.patch("/:id",FacteurController.update)
router.get("/:id",FacteurController.getfacteurbyid)
module.exports=router; 