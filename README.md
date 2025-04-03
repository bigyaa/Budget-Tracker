# Budget Tracker App

## Overview
Budget Tracker is a web application that helps users track their income, expenses, and savings. It features real-time data visualization, authentication via Firebase, and a backend powered by Node.js, GraphQL, MongoDB, and Redis for optimal performance.

## Features
- **User Authentication** (Google Sign-In, Email/Password via Firebase)
- **Transaction Management** (Income, Expenses, Savings)
- **GraphQL API** for fetching and modifying data
- **Redux for Global State Management**
- **Redis Caching for Improved Performance**
- **Real-Time Updates with Apollo Client**
- **Responsive UI using TailwindCSS**

## Tech Stack
### **Frontend:**
- React + Vite
- Apollo Client (GraphQL)
- Firebase Authentication
- Redux Toolkit
- Tailwind CSS

### **Backend:**
- Node.js + Express.js
- GraphQL (Apollo Server)
- MongoDB + Mongoose
- Redis (Caching Layer)
- Firebase Admin SDK (Authentication)

## 📂 Folder Structure
```
budget-tracker/
├── backend/              # Backend API (Node.js + GraphQL + MongoDB)
│   ├── config/          # Configuration files (MongoDB, Firebase, Redis)
│   ├── graphql/         # GraphQL schema and resolvers
│   ├── models/          # Mongoose Models
│   ├── routes/          # API routes (if using REST alongside GraphQL)
│   ├── middlewares/     # Middleware (Auth, Logging, etc.)
│   ├── server.ts        # Main server entry point
│   ├── package.json     # Backend dependencies
│   └── .env             # Backend environment variables (ignored in Git)
│
├── frontend/            # React Frontend (Vite + Apollo Client)
│   ├── public/          # Static assets
│   ├── src/             # Source code
│   │   ├── assets/      # Images, icons, etc.
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components (Dashboard, Login, etc.)
│   │   ├── graphql/     # Apollo Client GraphQL Queries & Mutations
│   │   ├── store/       # Redux store (State Management)
│   │   ├── firebase-config.ts # Firebase configuration
│   │   ├── main.tsx     # React app entry point
│   ├── config/          # Config files (Tailwind, Vite, etc.)
│   ├── package.json     # Frontend dependencies
│   └── .env             # Frontend environment variables (ignored in Git)
│
├── README.md            # Documentation
└── .gitignore           # Ignore unnecessary files
```

## 🛠️ Setup & Installation
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/bigyaa/Budget-Tracker.git
cd Budget-Tracker
npm run dev # Runs both frontend and backend
```
If you want to run them separately, follow the steps below.

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
cp .env.example .env   # Add MongoDB & Firebase credentials
redis-server # Start Redis server to cache data
npm run build  # Build the backend
npm run dev  # Start the backend server
```
### **3️⃣ Frontend Setup**
```sh
cd frontend
npm install
cp .env.example .env   # Add Firebase credentials
npm run dev  # Start the frontend
```

## 🚀 Running the App
- **Backend** runs on `http://localhost:5000`
- **Frontend** runs on `http://localhost:5173`
- Open `http://localhost:5173` in your browser to start using the app.

## 🛡️ Environment Variables
Create a `.env` file in both **frontend** and **backend**, and configure:

### **Backend (`backend/.env`)**
```
PORT=5000
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/budget_tracker
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
FIREBASE_CREDENTIALS=./config/firebaseServiceAccountKey.json
```

### **Frontend (`frontend/.env`)**
```
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
```

## 📖 API Usage (GraphQL)
### **Query: Get User Transactions**
```graphql
query {
  getTransactions(userId: "firebase-user-id") {
    id
    type
    description
    amount
    date
  }
}
```

### **Mutation: Add a Transaction**
```graphql
mutation {
  addTransaction(userId: "firebase-user-id", type: "income", description: "Salary", amount: 5000) {
    id
    type
    description
    amount
  }
}
```

## 🔥 Features in Development
- 📊 **More Financial Reports & Charts**
- 🔔 **Push Notifications for Expenses**
- 🌎 **Multi-Currency Support**

## 🎯 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## 📜 License
This project is MIT Licensed and open-source. Feel free to make changes and contribute!

---

**Built with 💗 by Bigya**
