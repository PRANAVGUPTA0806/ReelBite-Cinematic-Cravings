const express = require("express");
const { isAdmin, protect } = require('../middleware/authMiddleware.js');
const router = express.Router();

const {
  getProducts,
  createProducts,
  getProductsById,
  updateProductsById,
  deleteProductsById,
} = require("../controllers/moviesController");

router.get("/all", getProducts);
router.post("/",isAdmin, createProducts);

// Route for getting, updating, and deleting a product by ID
router.get("/", getProductsById);
router.put("/edit", updateProductsById);
router.delete("/del", deleteProductsById);

module.exports = router;
