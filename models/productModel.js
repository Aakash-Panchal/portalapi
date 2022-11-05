const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  ProductModel: {
    type: String,
    required: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  ProductQnt: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },
  ProductTarget: {
    type: String,
    required: true,
  },
  BuyingPrice: {
    type: String,
    required: true,
  },
  SellPrice: {
    type: String,
    required: true,
  },
  ProductId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema);
