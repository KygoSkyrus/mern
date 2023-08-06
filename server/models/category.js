const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    // slug: { type: String, required: true, unique: true },
    // description: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'PRODUCT' }],
    subCategory:{ type: String ,default:"" },
  },{collection:"category"});

module.exports = mongoose.model('CATEGORY', CategorySchema); 
