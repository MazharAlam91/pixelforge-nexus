
---

# 🔐 Security Features

## ✅ Authentication
- Password hashing using **bcrypt**
- JWT-based authentication
- Stateless session handling

## ✅ Authorization
Role-Based Access Control ensures restricted access:

| Role | Permissions |
|--------|------------|
| **Admin** | Create users, create/delete projects, assign leads, upload documents |
| **Project Lead** | Assign developers, manage project resources |
| **Developer** | View assigned projects and documents |

---

## ✅ API Protection
- Protected routes via authentication middleware
- Token verification on every request
- Unauthorized users blocked automatically

---

## ✅ Additional Security Practices
- Helmet.js for HTTP header security
- Express Rate Limiting to prevent brute-force attacks
- Environment variables for secret keys
- MongoDB schema validation

---

# 🚀 Core Features

## 🔑 Authentication APIs
- User Login
- Admin-controlled User Registration
- Password hashing
- JWT token generation

---

## 📁 Project Management (CRUD)

✔ Create Project  
✔ View Projects  
✔ Update Project Status  
✔ Delete Project  
✔ Assign Developers  
✔ Upload Project Documents  

---

## 👥 Team Assignment
Project Leads and Admins can assign developers to specific projects.

Developers can only view projects assigned to them.

---

## 📄 Document Management
- Secure file uploads using **Multer**
- Documents linked directly to projects
- Accessible only to authorized users

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


## Project Structure

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
└── README.md

## Installation Guide

### 1. Clone Repository
git clone <your-github-link>

### 2. Install Dependencies
cd server  
npm install  

### 3. Create .env file inside server folder

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

### 4. Run Server
npm run dev  

Server will start on:
http://localhost:5000

---

## Running Frontend

Open browser and go to:

http://localhost:5000/login.html


## Security Features

- Password hashing using bcrypt  
- JWT-based authentication  
- Role-Based Authorization  
- Protected API routes  
- Helmet for HTTP security  
- Rate limiting to prevent brute-force attacks  
- Environment variables for sensitive data  

---

## Test Credentials

Admin Login:

Email: admin@test.com  
Password: 123456  


---

## Scalability Note

The system follows a modular architecture which makes it easy to scale in the future.

Possible improvements:

- Redis caching  
- Docker deployment  
- Load balancing  
- Microservices architecture  

---

## Author

Mazhar Alam  
B.Tech Computer Science (Cybersecurity)

---

This project demonstrates strong backend development skills including secure API design, authentication, database management, and scalable architecture.

