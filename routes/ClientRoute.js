const route = require("express").Router()
const ClientController = require("../controllers/ClientController");
route.post("/registr",ClientController.signup);
route.post("/login",ClientController.login);
route.post("/update",ClientController.updateInfo);
route.get("/getClient/:id",ClientController.getClientByid);
route.get("/",ClientController.getClient);
route.delete("/delete/:id",ClientController.DeleteClient);
module.exports = route;