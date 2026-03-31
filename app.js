import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// connect to MongoDB
connectDB();

// routes
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);

// health check
app.get('/', (req, res) => {
  res.json({ message: '🚀 API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});