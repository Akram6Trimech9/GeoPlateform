const route = require("express").Router()
const CenttreDisController = require("../controllers/CentreDistriiController");
 route.post("/:idregion",CenttreDisController.Createcentre);
route.get("/",CenttreDisController.getCentreDis);
route.delete("/:id",CenttreDisController.DeleteCentre)
route.get('/:id',CenttreDisController.getcentreByregion)
route.get('/getcentre/:id',CenttreDisController.getcnetreByid)
route.patch('/:id',CenttreDisController.updateCentre)
module.exports=route;   