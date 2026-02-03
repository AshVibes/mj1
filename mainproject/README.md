# Interview Helper - Frontend Documentation

## Overview
Interview Helper is a comprehensive frontend application for managing, conducting, and tracking technical interviews. The application provides an intuitive interface for recruiters and interviewers to manage candidates, conduct interviews, and maintain a question bank.

## Features

### 1. **Dashboard**
- Overview statistics (total candidates, completed interviews, questions, average ratings)
- Recent interview history
- Quick access to key features

### 2. **Interview Management**
- List of all interviews with filtering and search
- Create new interviews
- View interview details
- Manage interview status (pending, in-progress, completed)
- Interview session interface with:
  - Live timer
  - Question navigation
  - Response notes
  - Real-time rating system
  - Quick notes sidebar
  - Interview statistics

### 3. **Candidate Management**
- Complete candidate database
- Search and filter candidates by status
- Add new candidates
- View candidate details
- Track candidate history
- Status tracking (new, interviewed, hired, rejected)

### 4. **Question Bank**
- Comprehensive question library
- Filter by category and difficulty level
- Add new questions
- Categorization (Technical, Behavioral, Coding, System Design)
- Difficulty levels (Easy, Medium, Hard)
- Expected answer guidelines
- Search functionality

## Project Structure

```
mainproject/
├── templates/
│   ├── base.html                    # Base template with navigation
│   ├── home.html                    # Dashboard
│   ├── interviews.html              # Interviews list
│   ├── interview_session.html       # Active interview interface
│   ├── candidates.html              # Candidates management
│   └── questions.html               # Question bank
├── static/
│   ├── css/
│   │   └── style.css               # Main stylesheet (1000+ lines)
│   └── js/
│       ├── main.js                 # Global utilities and functions
│       ├── interviews.js           # Interview page functionality
│       ├── candidates.js           # Candidates page functionality
│       ├── questions.js            # Questions page functionality
│       └── interview-session.js    # Interview session functionality
├── views.py                         # Django views
├── urls.py                          # URL routing
└── settings.py                      # Django settings (updated)
```

## Installation & Setup

### 1. Ensure Django is Installed
```bash
pip install django
```

### 2. Run the Development Server
```bash
cd mainproject
python manage.py runserver
```

### 3. Access the Application
Navigate to: `http://localhost:8000/`

## URL Routes

- `/` - Home/Dashboard
- `/interviews/` - Interviews list
- `/interview/<id>/` - Interview session
- `/candidates/` - Candidates management
- `/questions/` - Question bank
- `/admin/` - Django admin panel

## Frontend Architecture

### HTML Templates
All templates extend `base.html` which includes:
- Navigation bar
- Footer
- Common modal structure
- Static file links

### CSS Styling
- **Color Scheme**: Professional blue primary color with supporting colors
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px
- **Components**:
  - Navigation bar
  - Dashboard cards
  - Interview/candidate cards
  - Modal dialogs
  - Form elements
  - Tables
  - Rating systems
  - Status badges

### JavaScript Functionality

#### Global Functions (main.js)
- Modal management
- Form validation
- Notification system
- Search and filter utilities
- Timer management
- Keyboard shortcuts
- Export to CSV

#### Page-Specific Scripts

**interviews.js**
- Create new interview modal
- Interview listing and filtering
- Search functionality
- Card interactions

**candidates.js**
- Add candidate modal
- Candidate table filtering
- Search by name
- Status filtering
- Delete confirmation

**questions.js**
- Question bank management
- Multi-filter system (category, difficulty)
- Add question modal
- Question operations (view, edit, delete)

**interview-session.js**
- Question navigation
- Response tracking
- Rating system for answers
- Session timer
- End interview workflow
- Star rating for final assessment

## Key Features Implementation

### 1. Modal System
Modals are used for:
- Creating new interviews
- Adding candidates
- Adding questions
- Ending interviews with final notes

All modals use a consistent design with close buttons and form validation.

### 2. Search & Filter
Implemented across all list pages:
- Real-time search as user types
- Dropdown filters for status/category
- Dynamic table/card hiding based on criteria

### 3. Rating System
- Numeric rating buttons (1-5)
- Star rating interface for final assessment
- Persistent rating storage
- Visual feedback with "selected" state

### 4. Interview Session
Complete workflow:
1. Question navigation panel on the left
2. Main question display
3. Response notes textarea
4. Rating buttons for current answer
5. Navigation between questions
6. Quick notes sidebar
7. Live timer showing elapsed time
8. End interview with final rating and notes

### 5. Responsive Design
- Mobile navigation
- Flexible grid layouts
- Stacked layouts for small screens
- Touch-friendly buttons and inputs

## Customization

### Colors
Edit the CSS root variables in `static/css/style.css`:
```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #64748b;
    --success-color: #10b981;
    --danger-color: #ef4444;
    /* ... more colors ... */
}
```

### Fonts
Default font stack: System fonts (Apple/Google fonts)
To change, modify the `body` font-family in `style.css`

### Questions & Categories
Edit the question list in:
- `interview_session.html` - Update the questions array in JavaScript
- `questions.html` - Modify displayed questions

### Branding
Update in `base.html`:
- Application name in navbar
- Favicon
- Page titles

## Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization
- Minimal external dependencies (only Font Awesome for icons)
- CSS-only animations and transitions
- Event delegation for better performance
- Lazy modal initialization
- Efficient DOM queries with caching

## Future Enhancements
- Backend API integration
- Real-time collaboration features
- Video interview recording
- AI-powered answer analysis
- Interview analytics dashboard
- Email notifications
- Calendar integration
- Export interview reports

## Notes
- All data is currently stored in JavaScript (no persistence)
- Backend integration required for actual functionality
- Icons from Font Awesome (CDN)
- No external UI framework dependencies

## Support
For customization or feature requests, refer to the inline code comments and documentation within each JavaScript file.
