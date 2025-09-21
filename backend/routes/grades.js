const express = require('express');
const router = express.Router();

// Predefined subjects list
const subjects = [
  'Mathematics',
  'English',
  'Science',
  'History',
  'Geography',
  'Physical Education',
  'Art',
  'Music',
  'Computer Science',
  'Literature',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Psychology',
  'Sociology',
  'Foreign Language',
  'Religious Studies',
  'Technology',
  'Health Education'
];

// Sample grades data
const grades = [
  { id: 5, name: "Grade 5", classes: ["Green", "Blue"] },
  { id: 6, name: "Grade 6", classes: ["Green", "Blue"] },
  { id: 7, name: "Grade 7", classes: ["Green", "Blue"] },
  { id: 8, name: "Grade 8", classes: ["Green", "Blue"] },
  { id: 9, name: "Grade 9", classes: ["Green", "Blue"] },
  { id: 10, name: "Grade 10", classes: ["Green", "Blue"] },
  { id: 11, name: "Grade 11", classes: ["Green", "Blue"] }
];

// Get all grades
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: grades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching grades',
      error: error.message
    });
  }
});

// Get grade by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const grade = grades.find(g => g.id === parseInt(id));
    
    if (grade) {
      res.json({
        success: true,
        data: grade
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Grade ${id} not found`
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching grade',
      error: error.message
    });
  }
});

// Get all subjects
router.get('/subjects/list', (req, res) => {
  try {
    res.json({
      success: true,
      data: subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subjects',
      error: error.message
    });
  }
});

// Get subjects by category
router.get('/subjects/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    let filteredSubjects = [];
    
    switch (category.toLowerCase()) {
      case 'core':
        filteredSubjects = ['Mathematics', 'English', 'Science', 'History', 'Geography'];
        break;
      case 'arts':
        filteredSubjects = ['Art', 'Music', 'Physical Education'];
        break;
      case 'sciences':
        filteredSubjects = ['Physics', 'Chemistry', 'Biology', 'Computer Science'];
        break;
      case 'humanities':
        filteredSubjects = ['Literature', 'Economics', 'Psychology', 'Sociology', 'Religious Studies'];
        break;
      default:
        filteredSubjects = subjects;
    }
    
    res.json({
      success: true,
      data: filteredSubjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subjects by category',
      error: error.message
    });
  }
});

module.exports = router; 