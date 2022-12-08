const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  Id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ShopName: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
