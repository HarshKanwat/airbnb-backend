const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
