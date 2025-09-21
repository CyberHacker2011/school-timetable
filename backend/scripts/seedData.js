const mongoose = require('mongoose');
const Teacher = require('../models/Teacher');
const Classroom = require('../models/Classroom');
const Timetable = require('../models/Timetable');
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

const seedTeachers = async () => {
  const teachers = [
    { name: 'Sarah Johnson', subject: 'Mathematics' },
    { name: 'Michael Chen', subject: 'English' },
    { name: 'Dr. Emily Rodriguez', subject: 'Science' },
    { name: 'James Wilson', subject: 'History' },
    { name: 'Lisa Thompson', subject: 'Geography' },
    { name: 'David Brown', subject: 'Physical Education' },
    { name: 'Maria Garcia', subject: 'Art' },
    { name: 'Robert Davis', subject: 'Music' },
    { name: 'Jennifer Lee', subject: 'Computer Science' },
    { name: 'Thomas Anderson', subject: 'Literature' },
    { name: 'Amanda White', subject: 'Physics' },
    { name: 'Christopher Taylor', subject: 'Chemistry' },
    { name: 'Rachel Green', subject: 'Biology' },
    { name: 'Daniel Martinez', subject: 'Economics' },
    { name: 'Jessica Clark', subject: 'Psychology' },
    { name: 'Kevin Lewis', subject: 'Sociology' },
    { name: 'Nicole Hall', subject: 'Foreign Language' },
    { name: 'Andrew Scott', subject: 'Religious Studies' },
    { name: 'Stephanie Adams', subject: 'Technology' },
    { name: 'Ryan Baker', subject: 'Health Education' }
  ];

  try {
    await Teacher.deleteMany({});
    const createdTeachers = await Teacher.insertMany(teachers);
    console.log(`✅ Seeded ${createdTeachers.length} teachers`);
    return createdTeachers;
  } catch (error) {
    console.error('❌ Error seeding teachers:', error);
    throw error;
  }
};

const seedClassrooms = async () => {
  const classrooms = [
    // First floor classrooms (101-110)
    { roomNumber: '101', capacity: 25, floor: 1 },
    { roomNumber: '102', capacity: 25, floor: 1 },
    { roomNumber: '103', capacity: 25, floor: 1 },
    { roomNumber: '104', capacity: 25, floor: 1 },
    { roomNumber: '105', capacity: 25, floor: 1 },
    { roomNumber: '106', capacity: 25, floor: 1 },
    { roomNumber: '107', capacity: 25, floor: 1 },
    { roomNumber: '108', capacity: 25, floor: 1 },
    { roomNumber: '109', capacity: 25, floor: 1 },
    { roomNumber: '110', capacity: 25, floor: 1 },
    // Second floor classrooms (201-207)
    { roomNumber: '201', capacity: 25, floor: 2 },
    { roomNumber: '202', capacity: 25, floor: 2 },
    { roomNumber: '203', capacity: 25, floor: 2 },
    { roomNumber: '204', capacity: 25, floor: 2 },
    { roomNumber: '205', capacity: 25, floor: 2 },
    { roomNumber: '206', capacity: 25, floor: 2 },
    { roomNumber: '207', capacity: 25, floor: 2 }
  ];

  try {
    await Classroom.deleteMany({});
    const createdClassrooms = await Classroom.insertMany(classrooms);
    console.log(`✅ Seeded ${createdClassrooms.length} classrooms`);
    return createdClassrooms;
  } catch (error) {
    console.error('❌ Error seeding classrooms:', error);
    throw error;
  }
};

const seedTimetables = async (teachers) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const grades = [5, 6, 7, 8, 9, 10, 11];
  const classes = ['Green', 'Blue'];
  const periods = [1, 2, 3, 4, 5, 6, 7];
  
  // Valid room numbers
  const validRooms = ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '201', '202', '203', '204', '205', '206', '207'];
  
  const timetables = [];

  // Create sample timetables for each grade and class
  grades.forEach(grade => {
    classes.forEach(className => {
      days.forEach(day => {
        periods.forEach(period => {
          // Handle breaks (periods 3 and 5)
          if (period === 3) {
            // Tea break
            timetables.push({
              day,
              period,
              roomNumber: '101', // Default room for breaks
              teacherName: 'Break',
              teacherSubject: 'Break',
              grade,
              class: className,
              isBreak: true,
              breakType: 'Tea Break'
            });
            return;
          }
          
          if (period === 5) {
            // Lunch break
            timetables.push({
              day,
              period,
              roomNumber: '101', // Default room for breaks
              teacherName: 'Break',
              teacherSubject: 'Break',
              grade,
              class: className,
              isBreak: true,
              breakType: 'Lunch Break'
            });
            return;
          }

          // Regular class periods
          const teacherIndex = (grade + period + day.length) % teachers.length;
          const teacher = teachers[teacherIndex];
          const roomIndex = (grade + period + day.length) % validRooms.length;
          const roomNumber = validRooms[roomIndex];

          timetables.push({
            day,
            period,
            roomNumber,
            teacherName: teacher.name,
            teacherSubject: teacher.subject,
            grade,
            class: className,
            isBreak: false,
            breakType: ''
          });
        });
      });
    });
  });

  try {
    await Timetable.deleteMany({});
    const createdTimetables = await Timetable.insertMany(timetables);
    console.log(`✅ Seeded ${createdTimetables.length} timetable entries`);
    return createdTimetables;
  } catch (error) {
    console.error('❌ Error seeding timetables:', error);
    throw error;
  }
};

const seedData = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    const teachers = await seedTeachers();
    const classrooms = await seedClassrooms();
    const timetables = await seedTimetables(teachers);
    
    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Teachers: ${teachers.length}`);
    console.log(`   - Classrooms: ${classrooms.length}`);
    console.log(`   - Timetable entries: ${timetables.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData, seedTeachers, seedClassrooms, seedTimetables }; 