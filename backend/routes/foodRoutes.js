const express = require("express");

const router = express.Router();

const {
  getProducts,
  createProducts,
  getProductsById,
  updateProductsById,
  deleteProductsById,
} = require("../controllers/foodsController");

router.get("/all", getProducts);
router.post("/", createProducts);

// Route for getting, updating, and deleting a product by ID
router.get("/", getProductsById);
router.put("/edit", updateProductsById);
router.delete("/del", deleteProductsById);

module.exports = router;
