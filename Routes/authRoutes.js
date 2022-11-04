const express = require("express");
const { addAdmin, login } = require("../Controller/authController");

const router = express.Router();

router.post("/addAdmin", addAdmin);
router.post("/login", login);

module.exports = router;
