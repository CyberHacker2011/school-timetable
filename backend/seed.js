const mongoose = require('mongoose');
const Teacher = require('./models/Teacher');
const Classroom = require('./models/Classroom');
const Timetable = require('./models/Timetable');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Predefined time slots
const TIME_SLOTS = {
  1: { startTime: '08:30', endTime: '09:15' },
  2: { startTime: '09:20', endTime: '10:05' },
  3: { startTime: '10:10', endTime: '10:55' },
  4: { startTime: '11:15', endTime: '12:00' },
  5: { startTime: '12:05', endTime: '12:50' },
  6: { startTime: '14:00', endTime: '14:45' },
  7: { startTime: '14:50', endTime: '15:35' }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Teacher.deleteMany({});
    await Classroom.deleteMany({});
    await Timetable.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create teachers
    const teachers = [
      { name: 'Sarah Johnson', subject: 'Mathematics', email: 'sarah.johnson@school.edu' },
      { name: 'Michael Chen', subject: 'Physics', email: 'michael.chen@school.edu' },
      { name: 'Emily Davis', subject: 'English Literature', email: 'emily.davis@school.edu' },
      { name: 'David Wilson', subject: 'Chemistry', email: 'david.wilson@school.edu' },
      { name: 'Lisa Brown', subject: 'History', email: 'lisa.brown@school.edu' },
      { name: 'James Miller', subject: 'Biology', email: 'james.miller@school.edu' },
      { name: 'Anna Garcia', subject: 'Geography', email: 'anna.garcia@school.edu' },
      { name: 'Robert Taylor', subject: 'Computer Science', email: 'robert.taylor@school.edu' }
    ];

    const createdTeachers = await Teacher.insertMany(teachers);
    console.log('✅ Created', createdTeachers.length, 'teachers');

    // Create classrooms
    const classrooms = [
      { roomNumber: '101', building: 'Main Building', capacity: 30 },
      { roomNumber: '102', building: 'Main Building', capacity: 30 },
      { roomNumber: '103', building: 'Main Building', capacity: 30 },
      { roomNumber: '201', building: 'Main Building', capacity: 30 },
      { roomNumber: '202', building: 'Main Building', capacity: 30 },
      { roomNumber: '203', building: 'Main Building', capacity: 30 },
      { roomNumber: 'Lab-1', building: 'Science Wing', capacity: 25 },
      { roomNumber: 'Lab-2', building: 'Science Wing', capacity: 25 },
      { roomNumber: 'Computer-1', building: 'Tech Wing', capacity: 20 },
      { roomNumber: 'Computer-2', building: 'Tech Wing', capacity: 20 }
    ];

    const createdClassrooms = await Classroom.insertMany(classrooms);
    console.log('✅ Created', createdClassrooms.length, 'classrooms');

    // Create sample timetable entries
    const timetableEntries = [
      // Grade 5 Green - Monday
      {
        day: 'Monday',
        timeSlotId: 1,
        timeSlot: TIME_SLOTS[1],
        subject: 'Mathematics',
        teacher: createdTeachers[0]._id, // Sarah Johnson
        classroom: createdClassrooms[0]._id, // Room 101
        grade: 5,
        class: 'Green'
      },
      {
        day: 'Monday',
        timeSlotId: 2,
        timeSlot: TIME_SLOTS[2],
        subject: 'English Literature',
        teacher: createdTeachers[2]._id, // Emily Davis
        classroom: createdClassrooms[1]._id, // Room 102
        grade: 5,
        class: 'Green'
      },
      {
        day: 'Monday',
        timeSlotId: 3,
        timeSlot: TIME_SLOTS[3],
        subject: 'Physics',
        teacher: createdTeachers[1]._id, // Michael Chen
        classroom: createdClassrooms[6]._id, // Lab-1
        grade: 5,
        class: 'Green'
      },
      {
        day: 'Monday',
        timeSlotId: 4,
        timeSlot: TIME_SLOTS[4],
        subject: 'History',
        teacher: createdTeachers[4]._id, // Lisa Brown
        classroom: createdClassrooms[2]._id, // Room 103
        grade: 5,
        class: 'Green'
      },
      {
        day: 'Monday',
        timeSlotId: 5,
        timeSlot: TIME_SLOTS[5],
        subject: 'Geography',
        teacher: createdTeachers[6]._id, // Anna Garcia
        classroom: createdClassrooms[3]._id, // Room 201
        grade: 5,
        class: 'Green'
      },
      {
        day: 'Monday',
        timeSlotId: 6,
        timeSlot: TIME_SLOTS[6],
        subject: 'Computer Science',
        teacher: createdTeachers[7]._id, // Robert Taylor
        classroom: createdClassrooms[8]._id, // Computer-1
        grade: 5,
        class: 'Green'
      },
      {
        day: 'Monday',
        timeSlotId: 7,
        timeSlot: TIME_SLOTS[7],
        subject: 'Biology',
        teacher: createdTeachers[5]._id, // James Miller
        classroom: createdClassrooms[7]._id, // Lab-2
        grade: 5,
        class: 'Green'
      },

      // Grade 5 Blue - Monday
      {
        day: 'Monday',
        timeSlotId: 1,
        timeSlot: TIME_SLOTS[1],
        subject: 'English Literature',
        teacher: createdTeachers[2]._id, // Emily Davis
        classroom: createdClassrooms[1]._id, // Room 102
        grade: 5,
        class: 'Blue'
      },
      {
        day: 'Monday',
        timeSlotId: 2,
        timeSlot: TIME_SLOTS[2],
        subject: 'Mathematics',
        teacher: createdTeachers[0]._id, // Sarah Johnson
        classroom: createdClassrooms[0]._id, // Room 101
        grade: 5,
        class: 'Blue'
      },
      {
        day: 'Monday',
        timeSlotId: 3,
        timeSlot: TIME_SLOTS[3],
        subject: 'Chemistry',
        teacher: createdTeachers[3]._id, // David Wilson
        classroom: createdClassrooms[6]._id, // Lab-1
        grade: 5,
        class: 'Blue'
      },
      {
        day: 'Monday',
        timeSlotId: 4,
        timeSlot: TIME_SLOTS[4],
        subject: 'Geography',
        teacher: createdTeachers[6]._id, // Anna Garcia
        classroom: createdClassrooms[2]._id, // Room 103
        grade: 5,
        class: 'Blue'
      },
      {
        day: 'Monday',
        timeSlotId: 5,
        timeSlot: TIME_SLOTS[5],
        subject: 'History',
        teacher: createdTeachers[4]._id, // Lisa Brown
        classroom: createdClassrooms[3]._id, // Room 201
        grade: 5,
        class: 'Blue'
      },
      {
        day: 'Monday',
        timeSlotId: 6,
        timeSlot: TIME_SLOTS[6],
        subject: 'Biology',
        teacher: createdTeachers[5]._id, // James Miller
        classroom: createdClassrooms[7]._id, // Lab-2
        grade: 5,
        class: 'Blue'
      },
      {
        day: 'Monday',
        timeSlotId: 7,
        timeSlot: TIME_SLOTS[7],
        subject: 'Computer Science',
        teacher: createdTeachers[7]._id, // Robert Taylor
        classroom: createdClassrooms[8]._id, // Computer-1
        grade: 5,
        class: 'Blue'
      }
    ];

    const createdTimetables = await Timetable.insertMany(timetableEntries);
    console.log('✅ Created', createdTimetables.length, 'timetable entries');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

connectDB().then(seedData); 