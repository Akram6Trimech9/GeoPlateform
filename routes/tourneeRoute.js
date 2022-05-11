const router = require("express").Router()
const tourneeController  = require("../controllers/tourneeController");
router.post("/:id",tourneeController.Createtournee);
router.get("/",tourneeController.getalltourne);
router.get("/:id",tourneeController.getTourneeByid)
router.delete("/:id",tourneeController.Deletetournee)
router.patch("/:id",tourneeController.UpdateTournee)
router.get("/getbyfacteur/:id",tourneeController.gettourneebyfacteur)
module.exports = router;