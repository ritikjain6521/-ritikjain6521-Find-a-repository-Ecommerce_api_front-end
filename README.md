# 🛒 MERN Stack E-Commerce Website

A full-featured **E-Commerce web application** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It includes user authentication, product management, cart functionality, admin dashboard, and secure checkout.

---

## 📦 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### Tools & Deployment
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Render](https://img.shields.io/badge/Render-00979D?style=for-the-badge&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Features

- 🛍️ Product listing with search and filter
- 🔐 User authentication (JWT-based)
- 🛒 Shopping cart with quantity control
- 💳 Checkout and order management
- 🧑‍💼 Admin panel for managing products, users, and orders
- 📦 MongoDB for product and order storage
- ⚡ Fast, responsive UI with React & Tailwind

---

## 📁 Project Structure
mern-ecommerce/
├── client/ # React Frontend
│ ├── src/
│ ├── public/
│ └── tailwind.config.js
├── server/ # Node.js + Express Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── .env
├── package.json
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mern-ecommerce.git
cd mern-ecommerce
# Client
cd client
npm install

# Server
cd ../server
npm install
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
# Backend
cd server
npm Start

# Frontend
cd ../client
npm run dev
🌐 Live Demo
https://mern-e-commerce-frontend-you-tube.vercel.app/

