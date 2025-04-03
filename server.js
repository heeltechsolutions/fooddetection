import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes.js'; // Add `.js` extension explicitly
import authRoutes from './routes/authRoutes.js';


const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: ["http://localhost:5173", "https://app.mmrtechsolutions.co.in"], // Allow both local and production frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api', uploadRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5900;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
