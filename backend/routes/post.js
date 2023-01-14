const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

router.get("/", postCtrl.getByHoursBegin);
router.get("/verso", auth, postCtrl.getByHoursBeginVerso);
router.get("/hoursEnd", auth, postCtrl.getByHoursEnd);
router.get("/hoursEndVerso", auth, postCtrl.getByHoursEndVerso);
router.get("/byName", auth, postCtrl.getByName);
router.get("/byNameVerso", auth, postCtrl.getByNameVerso);
router.get("/libelle", auth, postCtrl.getByLibelle);
router.get("/libelleVerso", auth, postCtrl.getByLibelleVerso);
router.post("/", auth, postCtrl.create);
router.delete("/:id", auth, postCtrl.delete);

module.exports = router;