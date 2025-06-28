require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB Docker container connection
const MONGODB_HOST = process.env.MONGODB_HOST || 'mongodb';
const MONGODB_PORT = process.env.MONGODB_PORT || '27017';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'sportsmanagement';
const uri = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;

console.log('Connecting to MongoDB:', uri);

const clientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 5000,
};

const connectPromise = mongoose.connect(uri, clientOptions)
    .then(() => {
        console.log('MongoDB connection established successfully!');
        console.log('Connected to database:', MONGODB_DATABASE);
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

module.exports = { mongoose, connectPromise };
