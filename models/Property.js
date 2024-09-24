const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [String],
  location: {
    type: String,
    required: true,
  },
  amenities: [String],
  availability: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;