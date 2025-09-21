const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find({ isActive: true }).sort({ name: 1 });
    res.json({
      success: true,
      data: teachers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teachers',
      error: error.message
    });
  }
});

// Get teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    
    if (teacher) {
      res.json({
        success: true,
        data: teacher
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teacher',
      error: error.message
    });
  }
});

// Create new teacher
router.post('/', async (req, res) => {
  try {
    const { name, subject } = req.body;
    
    if (!name || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Name and subject are required'
      });
    }

    const teacher = new Teacher({
      name,
      subject
    });

    const savedTeacher = await teacher.save();
    res.status(201).json({
      success: true,
      data: savedTeacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating teacher',
      error: error.message
    });
  }
});

// Update teacher
router.put('/:id', async (req, res) => {
  try {
    const { name, subject } = req.body;
    
    if (!name || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Name and subject are required'
      });
    }

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, subject },
      { new: true, runValidators: true }
    );

    if (teacher) {
      res.json({
        success: true,
        data: teacher
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating teacher',
      error: error.message
    });
  }
});

// Delete teacher (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (teacher) {
      res.json({
        success: true,
        message: 'Teacher deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting teacher',
      error: error.message
    });
  }
});

// Get teachers by subject
router.get('/subject/:subject', async (req, res) => {
  try {
    const { subject } = req.params;
    const teachers = await Teacher.find({
      subject: { $regex: subject, $options: 'i' },
      isActive: true
    }).sort({ name: 1 });
    
    res.json({
      success: true,
      data: teachers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teachers by subject',
      error: error.message
    });
  }
});

module.exports = router; 