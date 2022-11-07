const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  Getdata,
  PostData,
  GetSingleProduct,
  DeleteProduct,
  EditProduct,
} = require("../Controller/controller");
const router = express.Router();

router.post("/", verifyAdmin, PostData);
router.get("/", verifyAdmin, Getdata);
router.get("/:id", verifyAdmin, GetSingleProduct);
router.patch("/:id", verifyAdmin, EditProduct);
router.delete("/:id", verifyAdmin, DeleteProduct);

module.exports = router;
