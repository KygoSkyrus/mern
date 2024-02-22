const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  tax: {
    type: Number,
  },
  shipping: {
    type: Number,
  },
  payment_status: {
    type: String,
  },
  receiptUrl: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USER',
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PRODUCT',
      },
      name: {
        type: String,
      },
      image: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      price: {
        type: Number,
      }
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    line1: String,
    line2: String,
    city: String,
    postal_code: String,
    state: String,
    country: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'PayPal', 'Cash on Delivery', 'Other'],
    default: 'Card',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: "orders" });

module.exports = mongoose.model('ORDER', orderSchema);