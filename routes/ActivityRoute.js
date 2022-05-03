const route = require("express").Router()
const multer_image=require('../config/multer_image')
const ActivityController = require("../controllers/ActivitiesController");
route.post("/:id",multer_image.single('image'),ActivityController.CreateActivity);
route.get("/",ActivityController.GetActivity);
route.patch("/:id",ActivityController.Updateactivity)
route.delete("/:id",ActivityController.DeletetActivity)
route.get("/:id",ActivityController.GetActivityByid)
module.exports=route;