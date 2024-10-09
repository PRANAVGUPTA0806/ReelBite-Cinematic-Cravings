const asyncHandler = require("express-async-handler");

const allProductModel = require("../models/foodModel");

//@desc Get all Products
//@route GET /api/allProducts

const getProducts = asyncHandler(async (req, res) => {
  try{
  const products = await allProductModel.find({});
  res.status(200).json(products);
  }catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching products' });
}
});

//@desc Create New Product
//@route POST /api/allProducts
//@access private
const createProducts = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const {
    image,
    productName,
    productPrice,
    available,
  } = req.body;
  if (
    !image ||
    !productName ||
    !productPrice||!available
  ) {
    res.status(400);
    throw new Error("All Fields are mandatory!");
  }
  try{
  let product = await allProductModel.find({});
        let id;

        if (product.length > 0) {
            let lastProduct = product.slice(-1)[0];
            id = lastProduct.id + 1;
        } else {
            id = 1;
        }
  const products = await allProductModel.create({
    products_id:id,
    image,
    productName,
    productPrice,
    available
  });

  res.status(201).json({
    success: true,
    products,
});}
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding product' });
}
});

//@desc GET Products by Id
//@route GET /api/allProducts/:id
//@access private

const getProductsById = asyncHandler(async (req, res) => {
  const products = await allProductModel.findById(req.params.id);
  // console.log(`Products fetched:`, products);
  if (!products) {
    // console.log(`Product not found: ${req.params.id}`);
    res.status(400);
    throw new Error("Product Not Found");
  }
  res.status(200).json(products);
});



//@desc Update Products by Id
//@route PUT /api/allProducts/:id
//@access private

const updateProductsById = asyncHandler(async (req, res) => {
  try {
    // Find the product by ID
    const products = await allProductModel.find({ product_id: req.body.product_id });
    if (!products) {
      res.status(404);
      throw new Error("Product Not Found");
    }
    
    // if (products.products_id !== req.body.products_id) {
    //   res.status(403);
    //   throw new Error(
    //     "User don't have permission to update other Product Details"
    //   );
    // }
    // Update the product
    const updatedProduct = await allProductModel.findOneAndUpdate(
      { products_id: req.body.products_id },
      req.body,
      { new: true }
    );

    return res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ success: false, message: 'Error updating product' });
  }
});

//@desc Delete Products By Id
//@route DELETE /api/allProducts/:id
//@access/private

const deleteProductsById = asyncHandler(async (req, res) => {
  try{
  const products = await allProductModel.find({ products_id: req.body.product_id });
  if (!products) {
    res.status(404);
    throw new Error("Product Not Found");
  }
 
  await allProductModel.deleteOne({ products_id: req.body.product_id });
  res.status(200).json({
    success: true,
    name: req.body.name,
});
  }catch(error){
    console.error(error);
    res.status(500).json({ success: false, message: 'Error removing product' });

  }
});

module.exports = {
  getProducts,
  createProducts,
  getProductsById,
  updateProductsById,
  deleteProductsById,
};
