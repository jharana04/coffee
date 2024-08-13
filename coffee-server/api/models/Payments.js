const mongoose = require("mongoose");
const { Schema } = mongoose;

//create schema
const paymentSchema = new Schema({
  transitionId: String,
  email: String,
  price: Number,
  quantity: Number,
  status: String,
  itemName: Array,
  cartItems: Array,
  menuItems: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create model
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
