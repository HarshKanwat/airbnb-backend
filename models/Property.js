const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
  category: { type: String, required: true },
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
