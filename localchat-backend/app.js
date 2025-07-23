const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');  // Import the database connection

const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
