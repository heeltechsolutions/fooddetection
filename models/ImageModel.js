import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  imageUrl: String,
  fruitName: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Image', ImageSchema);
