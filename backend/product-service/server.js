const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const products = require('./routes/products');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', products);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));