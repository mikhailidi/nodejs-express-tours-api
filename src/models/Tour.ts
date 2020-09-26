import mongoose, { Schema, Document } from 'mongoose';

export interface ITour extends Document {
  name: string;
  description: string;
  summary: string;
  duration: number;
  difficulty: number;
  maxGroupSize: number;
  imageCover: string;
  price: number;
  ratingAverage?: number;
  ratingQuantity?: number;
  priceDiscount?: number;
  images?: string[];
  createdAt: Date;
  startDates?: Date[];
}

const TourSchema: Schema = new Schema({
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

export default mongoose.model<ITour>('Tour', TourSchema);
