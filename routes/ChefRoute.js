const route = require("express").Router()
const chefController = require("../controllers/ChefController");
route.post("/signup",chefController.signup);
route.post("/login",chefController.login);
route.post("/update",chefController.updateInfo);
route.get("/getchef/:id",chefController.getChefs);
route.get("/getAll",chefController.getChefByid);
route.delete("/delete/:id",chefController.DeleteChefs);
module.exports = route;