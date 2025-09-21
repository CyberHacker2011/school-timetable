# School Timetable Backend API

Backend API for Gulistan Presidential School Timetable Management System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/school-timetable
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=http://localhost:5173
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Timetables
- `GET /api/timetables` - Get all timetables
- `GET /api/timetables/grade/:grade/class/:class` - Get timetable by grade and class
- `GET /api/timetables/teacher/:teacherName` - Get timetable by teacher
- `GET /api/timetables/classroom/:room` - Get timetable by classroom

### Grades
- `GET /api/grades` - Get all grades
- `GET /api/grades/:id` - Get grade by ID

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID
- `GET /api/teachers/subject/:subject` - Get teachers by subject

### Classrooms
- `GET /api/classrooms` - Get all classrooms
- `GET /api/classrooms/:number` - Get classroom by number
- `GET /api/classrooms/floor/:floor` - Get classrooms by floor
- `GET /api/classrooms/type/:type` - Get classrooms by type

## Available Classrooms
- First Floor: 101-110
- Second Floor: 201-207
- Special: Sport Hall

## Available Grades
- Grades 5-11
- Each grade has Green and Blue classes 