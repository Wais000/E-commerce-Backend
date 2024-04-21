const express=require("express");
const {createProduct, getSingleProduct, getAllProduct, updateProduct} = require("../controllers/productController");
const router = express.Router();

router.post("/", createProduct)
router.get("/:id", getSingleProduct)
router.put("/:id", updateProduct)
router.get("/", getAllProduct)

module.exports =router;