const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const createAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('✅ Admin account already exists');
      process.exit(0);
    }

    // Create default admin account
    const admin = new Admin({
      username: 'admin',
      password: 'gulistanpm_01',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin account created successfully!');
    console.log('📝 Username: admin');
    console.log('🔑 Password: gulistanpm_01');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin(); 