const route = require("express").Router()
const centregeoController = require("../controllers/CentreGeoController");
 route.post("/:idregion",centregeoController.Createcentregeo);
route.get("/",centregeoController.getCentreGeo);
route.delete("/:id",centregeoController.DeleteCentregeo)
route.get('/:id',centregeoController.getcentregeoByregion)
route.get('/getcentre/:id',centregeoController.getcnetregeoByid)
route.patch('/:id',centregeoController.updateCentregeo)
module.exports=route;   