import Image from '../models/ImageModel.js';
import cloudinary from 'cloudinary';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;

    const fruitName = await detectFruit(imageUrl);
    if (!fruitName) {
      return res.status(400).json({ message: 'Choose another image, this is not a fruit' });
    }

    const newImage = new Image({ imageUrl, fruitName });
    await newImage.save();

    res.json({ message: 'Image uploaded successfully', imageUrl, fruitName });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
};

const detectFruit = async (imageUrl) => {
  try {
    const response = await axios.post(
      'https://api.fruitdetector.com/detect', // Replace with actual API
      { image_url: imageUrl },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.FRUIT_DETECTOR_API_KEY}`,
        },
      }
    );

    return response.data.fruitName || null;
  } catch (error) {
    console.error('Fruit detection error:', error.message);
    return null;
  }
};
