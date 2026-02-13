# 🚀 PixelForge Nexus — Secure Scalable RBAC Backend System

A production-ready secure REST API built with **Node.js, Express, and MongoDB** implementing Authentication, Role-Based Access Control (RBAC), CRUD operations, and secure file uploads.

Developed as part of a **Backend Developer Internship assignment** to demonstrate secure backend architecture, scalable design, and API development skills.

---

# 📌 Features Overview

## 🔑 Authentication & Authorization
- Secure password hashing using **bcrypt**
- JWT-based authentication
- Stateless session management
- Role-Based Access Control (RBAC)

### Roles & Permissions

| Role | Permissions |
|--------|------------|
| **Admin** | Create users, create/delete projects, assign project leads, upload documents |
| **Project Lead** | Assign developers, manage project resources, upload documents |
| **Developer** | View assigned projects and access documents |

---

## 📁 Project Management (Full CRUD)

✔ Create Project  
✔ View Projects  
✔ Update Project Status  
✔ Delete Projects  
✔ Assign Developers  
✔ Upload Project Documents  

---

## 👥 Team Assignment
- Project Leads and Admins can assign developers to projects.
- Developers can only access projects assigned to them.
- Unauthorized access is automatically blocked.

---

## 📄 Secure Document Management
- Secure file uploads using **Multer**
- Documents linked directly to projects
- Access restricted to authorized users only

---

# 🔐 Security Features

✅ Protected API routes via authentication middleware  
✅ Token verification on every request  
✅ Helmet.js for HTTP header protection  
✅ Express Rate Limiting to prevent brute-force attacks  
✅ Environment variables for secret keys  
✅ MongoDB schema validation  

---

# 🛠 Tech Stack

## Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT  
- bcrypt  
- Multer  
- Helmet  
- Express-rate-limit  

## Frontend (Basic UI)
- HTML  
- CSS  
- Vanilla JavaScript  

---

# 📂 Project Structure

pixelforge-nexus  
│  
├── server  
│   ├── controllers  
│   ├── models  
│   ├── routes  
│   ├── middleware  
│   └── server.js  
│  
├── public  
│   ├── login.html  
│   ├── dashboard.html  
│   ├── project.html  
│   ├── create-user.html  
│   └── create-project.html  
│  
├── uploads  
├── SCALABILITY.md  
└── README.md  

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository
git clone https://github.com/MazharAlam91/pixelforge-nexus.git

---

## 2️⃣ Install Dependencies
cd server  
npm install  

---

## 3️⃣ Create .env File inside **server** folder

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

---

## 4️⃣ Run Server

If using nodemon:

npm run dev  

Otherwise:

node server.js  

Server will start on:

http://localhost:5000

---

# 🌐 Running the Frontend

Open browser:

http://localhost:5000/login.html

---

# 📘 API Documentation

A complete **Postman Collection** is included in this repository.

Import it into Postman to test:

- Authentication APIs  
- Project CRUD APIs  
- File Upload APIs  
- Role-Protected Routes  

---

# 🧪 Test Credentials

### ✅ Admin Login
Email: admin@test.com  
Password: 123456  

(You may change credentials inside the database if needed.)

---

# 📈 Scalability Note

The system follows a **modular architecture**, making it easy to scale for enterprise usage.

### Future Improvements:
- Redis caching for faster response times  
- Docker containerization  
- Load balancing  
- Microservices architecture  
- Centralized logging  

(See **SCALABILITY.md** for details.)

---

# ✅ Assignment Requirements Covered

✔ Secure Authentication (JWT + bcrypt)  
✔ Role-Based Access Control  
✔ Full CRUD APIs  
✔ Secure File Upload  
✔ Protected Routes  
✔ Database Schema Design  
✔ Basic Frontend Integration  
✔ Scalable Backend Architecture  
✔ API Documentation  

---

# 👨‍💻 Author

Mazhar Alam  
Backend Developer | Cybersecurity Enthusiast  

---

# ⭐ Project Summary

This project demonstrates strong backend engineering capabilities including:

- Secure API development  
- Authentication & authorization  
- Database design  
- Scalable architecture  
- Secure file handling  

Built with a focus on **security, modularity, and production-ready practices**.
