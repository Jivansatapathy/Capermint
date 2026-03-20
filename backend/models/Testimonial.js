import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  rating: Number,
  text: String,
  name: String,
  role: String,
  icon: String,
}, { timestamps: true, strict: false });

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
