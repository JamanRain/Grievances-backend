require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database'); // your MongoDB connection file
const grievanceRoutes = require('./routes/grievanceRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Updated CORS Configuration
const allowedOrigins = [
  'https://grievances-frontend.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include DELETE
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('💡 Grievance Portal Backend is live!');
});

// API Routes
app.use('/api/grievances', grievanceRoutes);
app.use('/api/messages', messageRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

