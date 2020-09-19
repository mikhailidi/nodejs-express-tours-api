const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Tour must have a description'],
  },
  summary: {
    type: String,
    required: [true, 'Tour must have a summary'],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Tour must have a duration'],
  },
  difficulty: {
    type: Number,
    required: [true, 'Tour must have a difficulty'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Tour must have a maximum group size'],
  },
  imageCover: {
    type: String,
    required: [true, 'Tour must have a cover image'],
  },
  ratingAverage: {
    type: Number,
    default: 0,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  priceDiscount: Number,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;
