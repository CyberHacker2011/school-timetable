const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  period: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7]
  },
  roomNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        const num = parseInt(v);
        return (num >= 101 && num <= 110) || (num >= 201 && num <= 207);
      },
      message: 'Room number must be between 101-110 or 201-207'
    }
  },
  teacherName: {
    type: String,
    required: true,
    trim: true
  },
  teacherSubject: {
    type: String,
    required: true,
    trim: true
  },
  grade: {
    type: Number,
    required: true,
    enum: [5, 6, 7, 8, 9, 10, 11]
  },
  class: {
    type: String,
    required: true,
    enum: ['Green', 'Blue']
  },
  isBreak: {
    type: Boolean,
    default: false
  },
  breakType: {
    type: String,
    enum: ['Tea Break', 'Lunch Break', ''],
    default: ''
  }
}, {
  timestamps: true
});

// Compound index to ensure unique entries for day, period, grade, and class
timetableSchema.index({ day: 1, period: 1, grade: 1, class: 1 }, { unique: true });

// Virtual for full class name
timetableSchema.virtual('fullClassName').get(function() {
  return `Grade ${this.grade} ${this.class}`;
});

// Virtual for time slot based on period
timetableSchema.virtual('timeSlot').get(function() {
  const timeSlots = {
    1: { start: '8:30', end: '9:15' },
    2: { start: '9:20', end: '10:05' },
    3: { start: '10:10', end: '10:55' },
    4: { start: '11:15', end: '12:00' },
    5: { start: '12:05', end: '12:50' },
    6: { start: '14:00', end: '14:45' },
    7: { start: '14:50', end: '15:35' }
  };
  return timeSlots[this.period] || { start: '', end: '' };
});

// Virtual for full time display
timetableSchema.virtual('timeDisplay').get(function() {
  if (this.isBreak) {
    if (this.period === 3) return '10:55 - 11:15 (Tea Break)';
    if (this.period === 5) return '12:50 - 14:00 (Lunch Break)';
  }
  return `${this.timeSlot.start} - ${this.timeSlot.end}`;
});

module.exports = mongoose.model('Timetable', timetableSchema); 