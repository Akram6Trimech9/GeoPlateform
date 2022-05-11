const route = require("express").Router()
const AdresseController = require("../controllers/AdressesController");
//const authentication = require("../middelwares/authentication");
route.post("/:id",AdresseController.CreateAdresse);
route.get("/",AdresseController.GetAdresse);
route.patch("/:id",AdresseController.UpdateAdress)
route.delete("/:id",AdresseController.DeleteAdress)
route.get("/:id",AdresseController.GetAdressById)
route.get("/getbyactivity/:id",AdresseController.getadressByActivity)
module.exports=route;