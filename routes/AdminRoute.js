const route = require("express").Router()
const AdminController = require("../controllers/AdminController");
route.post("/signup",AdminController.signup);
route.post("/login",AdminController.login);
route.post("/:id",AdminController.updateInfo);
route.get("/:id",AdminController.getAdmin);
module.exports=route;
