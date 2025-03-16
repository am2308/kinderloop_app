const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const orders = require('./routes/orders');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/orders', orders);

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));