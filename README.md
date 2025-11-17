# 🏋️ Fitness Management System

<div align="center">

![Database](https://img.shields.io/badge/Database-MySQL%208.0-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/Frontend-React%2019-61DAFB)
![Python](https://img.shields.io/badge/Python-3.8%2B-3776AB)

**A full-stack fitness management system with advanced database features**

</div>

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [Test Accounts](#-test-accounts)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)

---

## 📌 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **MySQL 8.0+** - [Download MySQL](https://dev.mysql.com/downloads/)
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/downloads)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/VMadhav007/DBMS_SEM-5.git
cd DBMS_SEM-5
```

### 2. Database Setup

#### Start MySQL and Create Database

```bash
# For Windows (PowerShell)
net start MySQL80

# For Linux/Mac
sudo systemctl start mysql
```

```bash
# Login to MySQL
mysql -u root -p
```

```sql
-- Inside MySQL
CREATE DATABASE Fitness_DB;
USE Fitness_DB;
exit;
```

#### Import Database Schema

```bash
cd Backend

# Import schema (creates tables, triggers, procedures, functions)
mysql -u root -p Fitness_DB < sql/schema.sql

# Import sample data (includes test users and data)
mysql -u root -p Fitness_DB < sql/sample_data.sql
```

### 3. Backend Setup

```bash
# Navigate to Backend directory (if not already there)
cd Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\activate
# Windows CMD:
venv\Scripts\activate.bat
# Linux/Mac:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

#### Configure Environment Variables

```bash
# Copy example environment file
# Windows:
copy .env.example .env
# Linux/Mac:
cp .env.example .env
```

Edit `.env` file and update with your MySQL password:

```env
DATABASE_URL=mysql+pymysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/Fitness_DB
```

### 4. Frontend Setup

Open a **new terminal** and navigate to Frontend directory:

```bash
cd Frontend

# Install dependencies
npm install
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
# Make sure you're in Backend directory with venv activated
cd Backend
.\venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Linux/Mac

# Run the server
uvicorn app.main:app --reload
```

✅ **Backend running at:** `http://localhost:8000`  
📚 **API Docs:** `http://localhost:8000/docs`

### Start Frontend Server

Open a **new terminal**:

```bash
cd Frontend

# Run development server
npm run dev
```

✅ **Frontend running at:** `http://localhost:5173`

---
## ✨ Features

### User Features
- 🔐 User Registration & Login (bcrypt password hashing)
- 👤 Profile Management with Statistics
- 💳 Purchase Memberships (5 plans available)
- 🎟️ Apply Discount Coupons
- 📅 Browse & Book Fitness Sessions
- ✅ Check-in to Sessions
- 🚫 Cancel Bookings
- 💰 View Payment History

### Admin Features
- 🏢 Branch Management (CRUD operations)
- 🏋️ Studio Management
- 📊 Session Management
- 🎯 Activity Type Management
- 💎 Membership Plan Creation
- 🎫 Coupon Management
- 📈 Analytics & Reports:
  - Branch-wise revenue
  - User activity reports
  - Popular sessions
  - Active members statistics
  - Top performing branches

### Database Features
- **5 Triggers:** Auto-expire memberships, activate on payment, capacity management, overbooking prevention
- **7 Stored Procedures:** User registration, membership purchase, booking, check-in, coupon application
- **4 Functions:** Discount calculation, membership status check, check-in count, available spots
- **20+ Complex Queries:** Revenue reports, user analytics, session popularity, retention analysis

---

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PyMySQL** - MySQL database connector
- **Bcrypt** - Password hashing
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Build tool

### Database
- **MySQL 8.0** - Relational database with triggers, procedures, and functions

---

## 📡 API Documentation

Once the backend is running, visit:

**Swagger UI:** `http://localhost:8000/docs`

### Quick API Overview

#### User Endpoints (12)
- `POST /user/register` - Register new user
- `POST /user/login` - User login
- `GET /user/profile/{user_id}` - Get profile with stats
- `GET /user/membership-plans` - List all plans
- `POST /user/purchase-membership/{user_id}` - Buy membership
- `GET /user/my-memberships/{user_id}` - View memberships
- `GET /user/sessions` - Browse sessions
- `POST /user/book-session/{user_id}` - Book session
- `GET /user/my-bookings/{user_id}` - View bookings
- `PUT /user/cancel-booking/{booking_id}` - Cancel booking
- `POST /user/checkin/{user_id}` - Check-in to session
- `GET /user/my-payments/{user_id}` - Payment history

#### Admin Endpoints (19)
- Branch Management: 4 endpoints (Create, Read, Update, Delete)
- Studio Management: 2 endpoints
- Activity Types: 2 endpoints
- Session Management: 3 endpoints
- Membership Plans: 1 endpoint
- Coupons: 2 endpoints
- Reports & Analytics: 5 endpoints

---

## 📁 Project Structure

```
DBMS_SEM-5/
├── Backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── database.py          # Database connection
│   │   ├── schemas.py           # Pydantic models
│   │   ├── auth.py              # Authentication
│   │   └── routers/
│   │       ├── user.py          # User endpoints
│   │       └── admin.py         # Admin endpoints
│   ├── sql/
│   │   ├── schema.sql           # Database schema
│   │   ├── queries.sql          # Complex queries
│   │   └── sample_data.sql      # Test data
│   ├── requirements.txt         # Python dependencies
│   └── .env.example             # Environment template
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Memberships.jsx
│   │   │   ├── Sessions.jsx
│   │   │   ├── Bookings.jsx
│   │   │   ├── Payments.jsx
│   │   │   ├── Admin*.jsx       # Admin pages
│   │   │   └── ...
│   │   ├── api.js               # API client
│   │   ├── App.jsx              # Main component
│   │   └── AuthContext.jsx      # Auth state
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🐛 Troubleshooting

### MySQL Connection Error

**Error:** `Can't connect to MySQL server`

**Solution:**
```bash
# Check if MySQL is running
# Windows:
net start MySQL80

# Linux/Mac:
sudo systemctl status mysql
sudo systemctl start mysql
```

### Import Schema Fails

**Error:** `ERROR 1064 (42000): You have an error in your SQL syntax`

**Solution:**
```bash
# Make sure you're using MySQL 8.0+
mysql --version

# Try importing with source command
mysql -u root -p
USE Fitness_DB;
source /path/to/schema.sql;
```

### Python Package Installation Error

**Solution:**
```bash
# Upgrade pip first
python -m pip install --upgrade pip

# Then install requirements
pip install -r requirements.txt
```

### Backend "Access Denied" Error

**Solution:**
- Check `.env` file has correct MySQL password
- Ensure database `Fitness_DB` exists
- Verify MySQL user has proper permissions

### Frontend Won't Start

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with PowerShell:
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Port Already in Use

**Backend (port 8000):**
```bash
# Windows (find and kill process):
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:8000 | xargs kill -9
```

**Frontend (port 5173):**
```bash
# Change port in vite.config.js or kill process
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5173 | xargs kill -9
```

---

## 📊 Database Schema Overview

### Tables (14)
- `users` - User accounts
- `user_phones` - Phone numbers
- `membership_plans` - Available plans
- `memberships` - User memberships
- `payments` - Transactions
- `coupons` - Discount codes
- `coupon_redemptions` - Coupon usage
- `branches` - Gym locations
- `studios` - Rooms in branches
- `activity_types` - Exercise categories
- `sessions` - Fitness classes
- `bookings` - Reservations
- `checkins` - Attendance

### Advanced Features
- **5 Triggers** for automation
- **7 Stored Procedures** for operations
- **4 Functions** for calculations
- **20+ Complex Queries** for reports

---

## 🎯 Quick Testing Guide

### 1. Test Database Features

```sql
-- Login to MySQL
mysql -u root -p Fitness_DB

-- View triggers
SHOW TRIGGERS;

-- View procedures
SHOW PROCEDURE STATUS WHERE Db = 'Fitness_DB';

-- Run a complex query
SELECT b.name, COUNT(s.id) as sessions
FROM branches b
LEFT JOIN sessions s ON b.id = s.branch_id
GROUP BY b.id;
```

### 2. Test API via Swagger

1. Open `http://localhost:8000/docs`
2. Try `POST /user/login` with test credentials
3. Test other endpoints interactively

### 3. Test Frontend

1. Open `http://localhost:5173`
2. Login with test account
3. Navigate through different pages
4. Try booking a session

---

## 📝 Additional Resources

- **Backend Documentation:** `Backend/README.md`
- **Setup Guide:** `Backend/SETUP_GUIDE.md`
- **Project Summary:** `Backend/PROJECT_SUMMARY.md`
- **SQL Queries:** `Backend/sql/queries.sql`

---

## 👨‍💻 Developer

**GitHub:** [VMadhav007](https://github.com/VMadhav007)  
**Repository:** [DBMS_SEM-5](https://github.com/VMadhav007/DBMS_SEM-5)  

---

## 📄 License

Educational purposes only - Semester 5 DBMS Project

---

## 🙏 Acknowledgments

Built with FastAPI, React, MySQL, and TailwindCSS for academic learning and demonstration.

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

</div>

