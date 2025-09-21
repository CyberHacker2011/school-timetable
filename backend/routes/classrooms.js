const express = require('express');
const router = express.Router();
const Classroom = require('../models/Classroom');

// Get all classrooms
router.get('/', async (req, res) => {
  try {
    const classrooms = await Classroom.find({ isActive: true }).sort({ roomNumber: 1 });
    res.json({
      success: true,
      data: classrooms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching classrooms',
      error: error.message
    });
  }
});

// Get classroom by room number
router.get('/:roomNumber', async (req, res) => {
  try {
    const classroom = await Classroom.findOne({ 
      roomNumber: req.params.roomNumber,
      isActive: true 
    });
    
    if (classroom) {
      res.json({
        success: true,
        data: classroom
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Classroom ${req.params.roomNumber} not found`
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching classroom',
      error: error.message
    });
  }
});

// Create new classroom
router.post('/', async (req, res) => {
  try {
    const { roomNumber } = req.body;
    
    if (!roomNumber) {
      return res.status(400).json({
        success: false,
        message: 'Room number is required'
      });
    }

    // Check if classroom already exists
    const existingClassroom = await Classroom.findOne({ roomNumber });
    if (existingClassroom) {
      return res.status(400).json({
        success: false,
        message: 'Classroom with this room number already exists'
      });
    }

    const classroom = new Classroom({
      roomNumber
    });

    const savedClassroom = await classroom.save();
    res.status(201).json({
      success: true,
      data: savedClassroom
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating classroom',
      error: error.message
    });
  }
});

// Update classroom
router.put('/:id', async (req, res) => {
  try {
    const { roomNumber } = req.body;
    
    if (!roomNumber) {
      return res.status(400).json({
        success: false,
        message: 'Room number is required'
      });
    }

    const classroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      { roomNumber },
      { new: true, runValidators: true }
    );

    if (classroom) {
      res.json({
        success: true,
        data: classroom
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Classroom not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating classroom',
      error: error.message
    });
  }
});

// Delete classroom (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (classroom) {
      res.json({
        success: true,
        message: 'Classroom deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Classroom not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting classroom',
      error: error.message
    });
  }
});

// Get classrooms by floor (based on room number)
router.get('/floor/:floor', async (req, res) => {
  try {
    const { floor } = req.params;
    const floorNum = parseInt(floor);
    
    if (floorNum !== 1 && floorNum !== 2) {
      return res.status(400).json({
        success: false,
        message: 'Floor must be 1 or 2'
      });
    }

    let startRoom, endRoom;
    if (floorNum === 1) {
      startRoom = '101';
      endRoom = '110';
    } else {
      startRoom = '201';
      endRoom = '207';
    }

    const classrooms = await Classroom.find({
      roomNumber: { $gte: startRoom, $lte: endRoom },
      isActive: true
    }).sort({ roomNumber: 1 });
    
    res.json({
      success: true,
      data: classrooms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching classrooms by floor',
      error: error.message
    });
  }
});

module.exports = router; 