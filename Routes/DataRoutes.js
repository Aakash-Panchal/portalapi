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
router.get("/:ProductId", verifyAdmin, GetSingleProduct);
router.patch("/:ProductId", verifyAdmin, EditProduct);
router.delete("/:ProductId", verifyAdmin, DeleteProduct);

module.exports = router;
