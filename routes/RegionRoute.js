const route = require("express").Router()
const  RegionController=require('../controllers/RegionController');
route.post("/",RegionController.postRegion) ;
route.get("/",RegionController.getregions)
route.patch("/:id",RegionController.UpdateRegion)
route.delete("/:id",RegionController.deleteRegion)
module.exports = route;