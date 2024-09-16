const mongoose = require("mongoose");

const foodsSchema = mongoose.Schema(
  {
    products_id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Please Add Product Image URL"],
    },
    productName: {
      type: String,
      require: [true, "Please Add Product Name"],
    },
    productPrice: {
      type: String,
      required: [true, "Please Add Product Price"],
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

module.exports = mongoose.model("foods", foodsSchema);
