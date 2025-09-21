const mongoose = require('mongoose');
require('dotenv').config();

const dropDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');
    
    await mongoose.connection.db.dropDatabase();
    console.log('🗑️ Database dropped successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error dropping database:', error);
    process.exit(1);
  }
};

dropDatabase(); 