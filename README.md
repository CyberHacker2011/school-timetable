# School Timetable Management System

A comprehensive web application for managing school timetables with an intuitive admin interface and flexible viewing options.

## 🚀 Features

### Core Functionality
- **Complete Timetable Management**: Create, edit, and delete timetable entries
- **Teacher Management**: Add and manage teachers with their subjects
- **Classroom Management**: Manage classrooms with capacity and floor information
- **Flexible Viewing Options**: View timetables by room, teacher, subject, class, day, or today's schedule
- **Admin Panel**: Secure admin interface for managing all data

### Timetable Structure
- **Grades**: 5-11 (7 grades)
- **Classes**: Green and Blue for each grade
- **Days**: Monday to Friday (5 days)
- **Periods**: 7 periods of 45 minutes each
- **Time Slots**:
  - Period 1: 8:30 - 9:15
  - Period 2: 9:20 - 10:05
  - Period 3: 10:10 - 10:55
  - Tea Break: 10:55 - 11:15
  - Period 4: 11:15 - 12:00
  - Period 5: 12:05 - 12:50
  - Lunch Break: 12:50 - 14:00
  - Period 6: 14:00 - 14:45
  - Period 7: 14:50 - 15:35

### Classrooms
- **First Floor**: Rooms 101-110
- **Second Floor**: Rooms 201-207
- **Capacity**: 25 students per room

### Viewing Options
1. **By Room**: See all classes scheduled in a specific classroom
2. **By Teacher**: View a teacher's complete schedule
3. **By Subject**: See all classes for a specific subject
4. **By Class**: View a specific grade and class schedule
5. **By Day**: See complete schedule for a specific day
6. **Today's Schedule**: View all classes happening today
7. **All Timetables**: Complete school timetable overview

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **CORS** for cross-origin requests
- **Helmet** for security headers
- **Morgan** for logging

### Frontend
- **React.js** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Shadcn/ui** components

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-timetable
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/school-timetable
   JWT_SECRET=your-secret-key-here
   PORT=5000
   NODE_ENV=development
   ```

4. **Create Admin Account**
   ```bash
   node createAdmin.js
   ```
   This creates the default admin account:
   - Username: `admin`
   - Password: `gulistanpm_01`

5. **Seed Sample Data (Optional)**
   ```bash
   node scripts/seedData.js
   ```

6. **Start Backend Server**
   ```bash
   npm start
   # or
   npm run dev
   ```

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd ../
   npm install
   ```

2. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```

## 🚀 Usage

### Accessing the Application

1. **Home Page**: `http://localhost:5173`
   - View school information
   - Access timetable selection interface

2. **Admin Panel**: `http://localhost:5173/admin`
   - Login with admin credentials
   - Manage timetables, teachers, and classrooms

### Admin Panel Features

#### Timetable Management
- Add new timetable entries
- View all current timetables
- Delete timetable entries
- Support for breaks (tea and lunch)

#### Teacher Management
- Add new teachers with subjects
- View all teachers
- Delete teachers
- No email requirement (simplified)

#### Classroom Management
- Add new classrooms
- Set room numbers, capacity, and floor
- View all classrooms
- Delete classrooms

### Timetable Viewing

#### Selection Interface
- Choose viewing method (room, teacher, subject, class, today, all)
- Dynamic dropdowns with real data
- Quick stats display

#### Viewing Options
1. **Room View**: `/timetable/room/101`
2. **Teacher View**: `/timetable/teacher/Sarah Johnson`
3. **Subject View**: `/timetable/subject/Mathematics`
4. **Class View**: `/timetable/5/Green`
5. **Day View**: `/timetable/day/Monday`
6. **Today's Schedule**: `/timetable/today`
7. **All Timetables**: `/timetable/all`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create new admin (protected)

### Timetables
- `GET /api/timetables` - Get all timetables
- `GET /api/timetables/grade/:grade/class/:class` - Get class timetable
- `GET /api/timetables/room/:roomNumber` - Get room timetable
- `GET /api/timetables/teacher/:teacherName` - Get teacher timetable
- `GET /api/timetables/day/:day` - Get day timetable
- `GET /api/timetables/today` - Get today's timetable
- `GET /api/timetables/stats` - Get timetable statistics
- `POST /api/timetables` - Create timetable entry
- `PUT /api/timetables/:id` - Update timetable entry
- `DELETE /api/timetables/:id` - Delete timetable entry

### Teachers
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Classrooms
- `GET /api/classrooms` - Get all classrooms
- `POST /api/classrooms` - Create classroom
- `PUT /api/classrooms/:id` - Update classroom
- `DELETE /api/classrooms/:id` - Delete classroom

### Grades & Subjects
- `GET /api/grades` - Get all grades
- `GET /api/grades/subjects/list` - Get all subjects
- `GET /api/grades/subjects/category/:category` - Get subjects by category

## 🔧 Configuration

### Database Schema

#### Teacher Model
```javascript
{
  name: String (required),
  subject: String (required),
  isActive: Boolean (default: true)
}
```

#### Classroom Model
```javascript
{
  roomNumber: String (required, unique),
  capacity: Number (required),
  floor: Number (required),
  isActive: Boolean (default: true)
}
```

#### Timetable Model
```javascript
{
  day: String (required, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
  period: Number (required, enum: [1, 2, 3, 4, 5, 6, 7]),
  roomNumber: String (required),
  teacherName: String (required),
  teacherSubject: String (required),
  grade: Number (required, enum: [5, 6, 7, 8, 9, 10, 11]),
  class: String (required, enum: ['Green', 'Blue']),
  isBreak: Boolean (default: false),
  breakType: String (enum: ['Tea Break', 'Lunch Break', ''])
}
```

## 🎨 UI Components

### Design System
- **Color Scheme**: Modern, accessible color palette
- **Typography**: Clean, readable fonts
- **Icons**: Lucide React icons for consistency
- **Components**: Reusable UI components with Shadcn/ui

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface

## 🔒 Security Features

- **JWT Authentication** for admin access
- **Input Validation** on all forms
- **CORS Configuration** for secure API access
- **Helmet.js** for security headers
- **Password Hashing** with bcrypt

## 🧪 Testing

### Manual Testing Checklist
- [ ] Admin login/logout
- [ ] Add/edit/delete teachers
- [ ] Add/edit/delete classrooms
- [ ] Add/edit/delete timetable entries
- [ ] View timetables by all methods
- [ ] Responsive design on different devices
- [ ] Form validation
- [ ] Error handling

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB (local or cloud)
2. Configure environment variables
3. Install dependencies: `npm install`
4. Create admin account: `node createAdmin.js`
5. Start server: `npm start`

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure API base URL for production

## 📝 Changelog

### Version 1.0.0
- Complete timetable management system
- Teacher and classroom management
- Multiple viewing options
- Admin panel with authentication
- Responsive design
- Sample data seeding

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the API endpoints
- Test with sample data
- Contact the development team

---

**School Timetable Management System** - Making school scheduling simple and efficient! 🎓
"# school-timetable" 
