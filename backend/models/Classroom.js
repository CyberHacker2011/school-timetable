const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Allow room numbers 101-110 and 201-207
        const num = parseInt(v);
        return (num >= 101 && num <= 110) || (num >= 201 && num <= 207);
      },
      message: 'Room number must be between 101-110 or 201-207'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Classroom', classroomSchema); 