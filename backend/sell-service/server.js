const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const sellRoutes = require('./routes/sell');
const cors = require('cors');
const uploadRoutes = require('./routes/upload');
const fileUpload = require('express-fileupload');
dotenv.config();
const app = express();
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  abortOnLimit: true, // Return error if file size exceeds limit
}));
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/sell', sellRoutes);
// Mount routes
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Sell service running on port ${PORT}`));