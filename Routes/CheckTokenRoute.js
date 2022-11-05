const express = require("express");
const Checktoken = require("../Controller/Checktoken");

const router = express.Router();

router.post("/", Checktoken);

module.exports = router;
