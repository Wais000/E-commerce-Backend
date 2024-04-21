const express=require("express");
const {createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct} = require("../controllers/productController");
const router = express.Router();

router.post("/", createProduct)
router.get("/:id", getSingleProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)
router.get("/", getAllProduct)

module.exports =router;