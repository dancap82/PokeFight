const mongoose = require("mongoose");



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'pokefight',
    });
    console.log(`Connected to MongoDB:${mongoose.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;