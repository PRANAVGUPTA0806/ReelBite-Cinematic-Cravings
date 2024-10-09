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
router.get("/all1",isAdmin, getProducts);
router.post("/",isAdmin, createProducts);

// Route for getting, updating, and deleting a product by ID
router.get("/:id", getProductsById);
router.put("/edit",isAdmin, updateProductsById);
router.delete("/del",isAdmin, deleteProductsById);

module.exports = router;
