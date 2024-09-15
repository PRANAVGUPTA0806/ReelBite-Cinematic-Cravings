const mongoose = require("mongoose");

const allProductsSchema = mongoose.Schema(
  {
    products_id: {
      type: String,
      required: true,
    },
    productImageUrl: {
      type: String,
      required: [true, "Please Add Product Image URL"],
    },
    productName: {
      type: String,
      require: [true, "Please Add Product Name"],
    },
    productDescription: {
      type: String,
      require: [true, "Please Add Product Description"],
    },
    productPrice: {
      type: String,
      required: [true, "Please Add Product Price"],
    },
    category:{
      type:String,
      required:true,
    },
    date:{
      type:Date,
      default:Date.now,
    },
    available:{
      type:Boolean,
      default:true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("allProducts", allProductsSchema);
