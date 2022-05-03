const router = require("express").Router()
const tourneeController  = require("../controllers/tourneeController");
router.post("/:id",tourneeController.Createtournee);
router.get("/",tourneeController.getalltourne);

module.exports = router;