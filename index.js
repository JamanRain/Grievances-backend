require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const grievanceRoutes = require('./routes/grievanceRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Add this

const app = express();

// ✅ CORS Configuration (Allow frontend + localhost)
const allowedOrigins = [
  'https://grievances-frontend.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// ✅ Middleware
app.use(express.json());

// ✅ Root route for deployment test
app.get('/', (req, res) => {
  res.send('💡 Grievance Portal Backend is live!');
});

// ✅ API Routes
app.use('/api/grievances', grievanceRoutes);
app.use('/api/auth', authRoutes); // ✅ Add this

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
