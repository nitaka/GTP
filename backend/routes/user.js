const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.post("/", userCtrl.getOne);
router.get("/", auth, userCtrl.getAll);

module.exports = router;