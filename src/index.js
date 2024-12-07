// src/index.js
const errorHandler = require('./middleware/errorMiddleware');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/tasks', taskRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
