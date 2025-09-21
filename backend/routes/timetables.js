const express = require('express');
const Timetable = require('../models/Timetable');
const Teacher = require('../models/Teacher');
const Classroom = require('../models/Classroom');

const router = express.Router();

// Get all timetables (organized view)
router.get('/', async (req, res) => {
  try {
    const { view = 'all', day, flat = false } = req.query;
    
    let timetables;
    if (view === 'today') {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      timetables = await Timetable.find({ day: today }).sort({ period: 1, grade: 1, class: 1 });
    } else if (view === 'day' && day) {
      timetables = await Timetable.find({ day }).sort({ period: 1, grade: 1, class: 1 });
    } else {
      timetables = await Timetable.find().sort({ day: 1, period: 1, grade: 1, class: 1 });
    }

    // If flat is requested, return flat array for admin
    if (flat === 'true') {
      return res.json({
        success: true,
        data: timetables
      });
    }

    // Organize data based on view type
    let organizedData;
    if (view === 'today' || (view === 'day' && day)) {
      // Group by period for single day view
      const schedule = {};
      timetables.forEach(entry => {
        if (!schedule[entry.period]) {
          schedule[entry.period] = [];
        }
        schedule[entry.period].push({
          time: entry.timeDisplay,
          roomNumber: entry.roomNumber,
          grade: entry.grade,
          class: entry.class,
          teacherName: entry.teacherName,
          teacherSubject: entry.teacherSubject,
          isBreak: entry.isBreak,
          breakType: entry.breakType
        });
      });
      organizedData = {
        day: view === 'today' ? new Date().toLocaleDateString('en-US', { weekday: 'long' }) : day,
        schedule
      };
    } else {
      // Group by day for all timetables view
      const schedule = {};
      timetables.forEach(entry => {
        if (!schedule[entry.day]) {
          schedule[entry.day] = [];
        }
        schedule[entry.day].push({
          period: entry.period,
          time: entry.timeDisplay,
          roomNumber: entry.roomNumber,
          grade: entry.grade,
          class: entry.class,
          teacherName: entry.teacherName,
          teacherSubject: entry.teacherSubject,
          isBreak: entry.isBreak,
          breakType: entry.breakType
        });
      });
      organizedData = { schedule };
    }

    res.json({
      success: true,
      data: organizedData
    });
  } catch (error) {
    console.error('Error fetching timetables:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching timetables',
      error: error.message
    });
  }
});

// Get all timetables flat (for admin)
router.get('/flat', async (req, res) => {
  try {
    const timetables = await Timetable.find().sort({ day: 1, period: 1, grade: 1, class: 1 });
    
    res.json({
      success: true,
      data: timetables
    });
  } catch (error) {
    console.error('Error fetching flat timetables:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching timetables',
      error: error.message
    });
  }
});

// Get timetable by grade and class
router.get('/grade/:grade/class/:class', async (req, res) => {
  try {
    const { grade, class: className } = req.params;
    
    const timetables = await Timetable.find({ 
      grade: parseInt(grade), 
      class: className 
    }).sort({ day: 1, period: 1 });

    if (timetables.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Timetable not found for Grade ${grade} ${className}`
      });
    }

    // Group by day
    const schedule = {};
    timetables.forEach(entry => {
      if (!schedule[entry.day]) {
        schedule[entry.day] = [];
      }
      
      schedule[entry.day].push({
        period: entry.period,
        time: entry.timeDisplay,
        roomNumber: entry.roomNumber,
        teacherName: entry.teacherName,
        teacherSubject: entry.teacherSubject,
        isBreak: entry.isBreak,
        breakType: entry.breakType
      });
    });

    res.json({
      success: true,
      data: {
        grade: parseInt(grade),
        class: className,
        schedule
      }
    });
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching timetable',
      error: error.message
    });
  }
});

// Get timetable by room
router.get('/room/:roomNumber', async (req, res) => {
  try {
    const { roomNumber } = req.params;
    
    const timetables = await Timetable.find({ 
      roomNumber: roomNumber 
    }).sort({ day: 1, period: 1 });

    if (timetables.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No timetable entries found for room ${roomNumber}`
      });
    }

    // Group by day
    const schedule = {};
    timetables.forEach(entry => {
      if (!schedule[entry.day]) {
        schedule[entry.day] = [];
      }
      
      schedule[entry.day].push({
        period: entry.period,
        time: entry.timeDisplay,
        grade: entry.grade,
        class: entry.class,
        teacherName: entry.teacherName,
        teacherSubject: entry.teacherSubject,
        isBreak: entry.isBreak,
        breakType: entry.breakType
      });
    });

    res.json({
      success: true,
      data: {
        roomNumber: roomNumber,
        schedule
      }
    });
  } catch (error) {
    console.error('Error fetching room timetable:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching room timetable',
      error: error.message
    });
  }
});

// Get timetable by teacher
router.get('/teacher/:teacherName', async (req, res) => {
  try {
    const { teacherName } = req.params;
    
    const timetables = await Timetable.find({ 
      teacherName: { $regex: teacherName, $options: 'i' }
    }).sort({ day: 1, period: 1 });

    if (timetables.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No timetable entries found for teacher ${teacherName}`
      });
    }

    // Group by day
    const schedule = {};
    timetables.forEach(entry => {
      if (!schedule[entry.day]) {
        schedule[entry.day] = [];
      }
      
      schedule[entry.day].push({
        period: entry.period,
        time: entry.timeDisplay,
        roomNumber: entry.roomNumber,
        grade: entry.grade,
        class: entry.class,
        teacherSubject: entry.teacherSubject,
        isBreak: entry.isBreak,
        breakType: entry.breakType
      });
    });

    res.json({
      success: true,
      data: {
        teacherName: timetables[0].teacherName,
        schedule
      }
    });
  } catch (error) {
    console.error('Error fetching teacher timetable:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching teacher timetable',
      error: error.message
    });
  }
});

// Get timetable by day
router.get('/day/:day', async (req, res) => {
  try {
    const { day } = req.params;
    
    const timetables = await Timetable.find({ 
      day: day 
    }).sort({ period: 1, grade: 1, class: 1 });

    if (timetables.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No timetable entries found for ${day}`
      });
    }

    // Group by period
    const schedule = {};
    timetables.forEach(entry => {
      if (!schedule[entry.period]) {
        schedule[entry.period] = [];
      }
      
      schedule[entry.period].push({
        time: entry.timeDisplay,
        roomNumber: entry.roomNumber,
        grade: entry.grade,
        class: entry.class,
        teacherName: entry.teacherName,
        teacherSubject: entry.teacherSubject,
        isBreak: entry.isBreak,
        breakType: entry.breakType
      });
    });

    res.json({
      success: true,
      data: {
        day: day,
        schedule
      }
    });
  } catch (error) {
    console.error('Error fetching day timetable:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching day timetable',
      error: error.message
    });
  }
});

// Get today's timetable
router.get('/today', async (req, res) => {
  try {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    const timetables = await Timetable.find({ 
      day: today 
    }).sort({ period: 1, grade: 1, class: 1 });

    if (timetables.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No timetable entries found for today (${today})`
      });
    }

    // Group by period
    const schedule = {};
    timetables.forEach(entry => {
      if (!schedule[entry.period]) {
        schedule[entry.period] = [];
      }
      
      schedule[entry.period].push({
        time: entry.timeDisplay,
        roomNumber: entry.roomNumber,
        grade: entry.grade,
        class: entry.class,
        teacherName: entry.teacherName,
        teacherSubject: entry.teacherSubject,
        isBreak: entry.isBreak,
        breakType: entry.breakType
      });
    });

    res.json({
      success: true,
      data: {
        day: today,
        schedule
      }
    });
  } catch (error) {
    console.error('Error fetching today\'s timetable:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching today\'s timetable',
      error: error.message
    });
  }
});

// Get timetable statistics
router.get('/stats', async (req, res) => {
  try {
    const totalEntries = await Timetable.countDocuments();
    const totalTeachers = await Teacher.countDocuments({ isActive: true });
    const totalClassrooms = await Classroom.countDocuments({ isActive: true });
    
    // Count entries by day
    const dayStats = await Timetable.aggregate([
      { $group: { _id: '$day', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalEntries,
        totalTeachers,
        totalClassrooms,
        dayStats
      }
    });
  } catch (error) {
    console.error('Error fetching timetable stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching timetable statistics',
      error: error.message
    });
  }
});

// Create new timetable entry (Admin only)
router.post('/', async (req, res) => {
  try {
    const {
      day,
      period,
      roomNumber,
      teacherName,
      teacherSubject,
      grade,
      class: className,
      isBreak = false,
      breakType = ''
    } = req.body;

    const timetable = new Timetable({
      day,
      period,
      roomNumber,
      teacherName,
      teacherSubject,
      grade,
      class: className,
      isBreak,
      breakType
    });

    await timetable.save();

    res.status(201).json({
      success: true,
      message: 'Timetable entry created successfully',
      data: timetable
    });
  } catch (error) {
    console.error('Error creating timetable entry:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A timetable entry already exists for this day, period, grade, and class'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating timetable entry',
      error: error.message
    });
  }
});

// Update timetable entry (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const timetable = await Timetable.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: 'Timetable entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Timetable entry updated successfully',
      data: timetable
    });
  } catch (error) {
    console.error('Error updating timetable entry:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating timetable entry',
      error: error.message
    });
  }
});

// Delete timetable entry (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const timetable = await Timetable.findByIdAndDelete(id);

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: 'Timetable entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Timetable entry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting timetable entry:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting timetable entry',
      error: error.message
    });
  }
});

module.exports = router;
