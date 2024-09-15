const asyncHandler = require("express-async-handler");

const allProductModel = require("../models/allProductsModel");

// @desc    Add a new product
// @route   POST /api/products/add
// @access  Public
const addProduct = async (req, res) => {
    try {
        // Find the highest ID and increment it
        const products = await allProductModel.find({});
        let id;
        if (products.length > 0) {
            const last = products[products.length - 1];
            id = last._id + 1;
        } else {
            id = 1;
        }

        // Create a new product
        const product = new allProductModel({
            products_id: id,
            productImageUrl: req.body.productImageUrl,
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            category: req.body.category,
        });

        // Save the product
        await product.save();
        console.log("Product Saved");

        // Respond with success
        res.json({
            success: true,
            name: req.body.productName,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove a product
// @route   POST /api/products/remove
// @access  Public
const removeProduct = async (req, res) => {
    try {
        await allProductModel.findOneAndDelete({ products_id: req.body.products_id });
        console.log("Product Removed");

        // Respond with success
        res.json({
            success: true,
            products_id: req.body.products_id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
    try {
        const products = await allProductModel.find({});
        console.log("All products fetched");

        // Respond with products
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    addProduct,
    removeProduct,
    getAllProducts,
};

// const asyncHandler = require("express-async-handler");

// const allProductModel = require("../models/allProductsModel");

// //@desc Get all Products
// //@route GET /api/allProducts

// const getProducts = asyncHandler(async (req, res) => {
//   const products = await allProductModel.find({});
//   res.status(200).json(products);
// });

// //@desc Create New Product
// //@route POST /api/allProducts
// //@access private
// const createProducts = asyncHandler(async (req, res) => {
//   console.log("The request body is: ", req.body);
//   const {
//     products_id,
//     productImageUrl,
//     productName,
//     productDescription,
//     productPrice,
//   } = req.body;
//   if (
//     !products_id ||
//     !productImageUrl ||
//     !productName ||
//     !productDescription ||
//     !productPrice
//   ) {
//     res.status(400);
//     throw new Error("All Fields are mandatory!");
//   }
//   const products = await allProductModel.create({
//     products_id,
//     productImageUrl,
//     productName,
//     productDescription,
//     productPrice,
//   });

//   res.status(201).json(products);
// });

// //@desc GET Products by Id
// //@route GET /api/allProducts/:id
// //@access private

// const getProductsById = asyncHandler(async (req, res) => {
//   const products = await allProductModel.findById(req.params.id);
//   if (!products) {
//     res.status(404);
//     throw new Error("Product Not Found");
//   }
//   res.status(200).json(products);
// });

// //@desc Update Products by Id
// //@route PUT /api/allProducts/:id
// //@access private

// const updateProductsById = asyncHandler(async (req, res) => {
//   const products = await allProductModel.findById(req.params.id);
//   if (!products) {
//     res.status(404);
//     throw new Error("Product not found");
//   }

//   if (products.products_id.toString() !== req.params.id) {
//     res.status(403);
//     throw new Error("User don't Have Permission to update other Products");
//   }

//   const updateProductsById = await allProductModel.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.status(200).json(updateProductsById);
// });

// //@desc Delete Products By Id
// //@route DELETE /api/allProducts/:id
// //@access/private

// const deleteProductsById = asyncHandler(async (req, res) => {
//   const products = await allProductModel.findById(req.params.id);
//   if (!products) {
//     res.status(404);
//     throw new Error("Product Not Found");
//   }
//   if (products.products_id.toString() !== req.params.id) {
//     res.status(403);
//     throw new Error(
//       "User don't have permission to update other Product Details"
//     );
//   }
//   await allProductModel.deleteOne({ _id: req.params.id });
//   res.status(200).json(products);
// });

// module.exports = {
//   getProducts,
//   createProducts,
//   getProductsById,
//   updateProductsById,
//   deleteProductsById,
// };
