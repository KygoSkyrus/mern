const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  visibility:{
    type: Boolean,
    default: true,
  },
  reviews: [{
    name: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  }],
},{collection:"products"});

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   orderItems: [{

module.exports = mongoose.model('PRODUCT', productSchema); 
