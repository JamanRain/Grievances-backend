require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const grievanceRoutes = require('./routes/grievanceRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using env variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/grievances', grievanceRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
