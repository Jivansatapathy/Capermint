import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: String,
  email: String,
  subject: String,
  message: String,
  // Allow other fields as metadata for flexibility
}, { timestamps: true, strict: false });

export const Response = mongoose.model('Response', responseSchema);
