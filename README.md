Project Setup Guide

This guide will walk you through setting up and running both the Next.js frontend and Node.js backend for this project.

Prerequisites

Make sure you have the following installed:

Node.js (v18 or later recommended)

npm or yarn

1️⃣ Backend Setup (Node.js + Express)

Step 1: Navigate to Backend Folder

cd backend

Step 2: Install Dependencies

npm install

Step 3: Configure Environment Variables

Create a .env file in the backend folder and add:

PORT=8080
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key

DB_HOST=your_database_server
DB_PORT=your_database_port
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

Step 4: Run the Backend Server

npm start

The server should start at http://localhost:8080.

2️⃣ Frontend Setup (Next.js)

Step 1: Navigate to Frontend Folder

cd frontend

Step 2: Install Dependencies

npm install

Step 3: Configure Environment Variables

Create a .env.local file in the frontend folder and add:

NEXT_PUBLIC_BASE_URL=http://localhost:8080

Step 4: Run the Frontend Server

npm run dev

The Next.js app should start at http://localhost:3000.

3️⃣ Running Both Services Together

To run both the frontend and backend simultaneously, open two terminals:

1️⃣ First Terminal (Backend):

cd backend && npm start

2️⃣ Second Terminal (Frontend):

cd frontend && npm run dev

Now, your full-stack app is running! 🚀

4️⃣ API Testing

Use Postman or cURL to test API endpoints. Example request:

curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "password123"}'

5️⃣ Common Issues & Fixes

1. Port Already in Use?

Kill the process using the port:

npx kill-port 8080 3000

2. Dependencies Not Found?

Run:

npm install

3. Environment Variables Not Loading?

Restart the server and check .env and .env.local files.

🎯 Ready to Deploy?

Frontend: Deploy on Vercel or Netlify

Backend: Deploy on Render, Railway, or Heroku

📌 Contributing

Fork the repo

Create a new branch (git checkout -b feature-branch)

Commit your changes (git commit -m 'Add new feature')

Push to the branch (git push origin feature-branch)

Create a Pull Request 🚀

🚀 Happy Coding! 🎉

