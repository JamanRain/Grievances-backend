const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const grievanceRoutes = require('./routes/grievanceRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/grievances', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"));

app.use('/api/grievances', grievanceRoutes);

require('dotenv').config();
const port = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
