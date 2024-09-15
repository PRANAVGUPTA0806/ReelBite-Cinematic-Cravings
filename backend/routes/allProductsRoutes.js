const express = require('express');
const router = express.Router();
const {
    addProduct,
    removeProduct,
    getAllProducts,
} = require('../controllers/allProductsController');

// Route to add a product
router.post('/add', addProduct);

// Route to remove a product
router.post('/remove', removeProduct);

// Route to get all products
router.get('/', getAllProducts);

module.exports = router;

// const express = require("express");

// const router = express.Router();

// const {
//   getProducts,
//   createProducts,
//   getProductsById,
//   updateProductsById,
//   deleteProductsById,
// } = require("../controllers/allProductsController");

// router.route("/").get(getProducts).post(createProducts);
// router
//   .route(":/id")
//   .get(getProductsById)
//   .put(updateProductsById)
//   .delete(deleteProductsById);

// module.exports = router;
