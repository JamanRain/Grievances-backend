require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const grievanceRoutes = require('./routes/grievanceRoutes');

const app = express();

// ✅ Allow CORS only from your frontend domain
app.use(cors({
  origin: ['https://grievances-frontend.vercel.app', 'http://localhost:3000'] // add localhost for local testing
}));

app.use(express.json());

// ✅ Connect to MongoDB using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use('/api/grievances', grievanceRoutes);

// ✅ Port from env or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
