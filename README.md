# AlumniConnect

A full-stack alumni networking platform designed to connect students and alumni through profiles, networking, and direct messaging.

## 🚀 Overview

**AlumniConnect** is a LinkedIn-style platform developed to create a dedicated networking environment for students and alumni.

The platform allows users to create profiles, discover other users, and communicate through a real-time-style messaging interface backed by a persistent database.

The project focuses on building a clean, scalable full-stack architecture using modern web technologies.

---

## ✨ Features

### 👤 User Authentication

* User registration and login
* Secure password handling
* User session management
* Authentication using JWT

### 🧑‍💼 Alumni Profiles

* Create and manage user profiles
* Display professional and academic information
* View other users' profiles
* Dedicated alumni networking environment

### 💬 Messaging / Chat

The messaging module currently supports:

* Direct one-to-one conversations
* Loading previously stored messages
* Sending new messages
* Persistent message storage
* Message bubbles
* Sender/receiver alignment
* Message timestamps
* Automatic message refresh after sending
* Automatic scrolling to the latest message
* Chat header with Back navigation
* Responsive chat interface
* Dedicated message input area
* Send-button based messaging

Messages are stored in MongoDB and retrieved through REST APIs.

### 🎨 Responsive UI

* Clean modern interface
* Responsive chat layout
* Mobile-friendly message bubbles
* Responsive input and Send button
* Consistent styling across the application

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Authentication & Security

* JWT
* bcryptjs
* Environment variables

### Development Tools

* Git
* GitHub
* VS Code
* Vite Development Server
* MongoDB Atlas

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │      User           │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                         Mongoose ODM
                               │
                               ▼
                    ┌─────────────────────┐
                    │   MongoDB Atlas     │
                    │      Database       │
                    └─────────────────────┘
```

---

## 💬 Messaging Architecture

The chat system follows a simple client-server architecture.

```text
User
 │
 ▼
React Chat Component
 │
 │ GET /message/:senderId/:receiverId
 │
 ▼
Express Backend
 │
 ▼
MongoDB
 │
 ▼
Messages
 │
 ▼
React Chat UI
```

### Sending a message

```text
User types message
        │
        ▼
     Send Button
        │
        ▼
POST /message/send
        │
        ▼
Express Backend
        │
        ▼
MongoDB
        │
        ▼
Message saved
        │
        ▼
Chat reloads messages
        │
        ▼
New message displayed
```

---

## 📁 Project Structure

```text
AlumniConnect/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Chat.jsx
│   │   │
│   │   ├── styles/
│   │   │   └── modern.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Profile.js
│   │   └── Message.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   └── message.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

> Your actual folder structure may differ depending on the current state of your repository.

---

## 🔌 API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Messaging

Get messages between two users:

```text
GET /api/message/:senderId/:receiverId
```

Send a message:

```text
POST /api/message/send
```

Example request:

```json
{
  "senderId": "USER_ID",
  "receiverId": "ALUMNI_ID",
  "text": "Hello!"
}
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd AlumniConnect
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Never commit your `.env` file to GitHub.**

### 4. Start the backend

```bash
npm run dev
```

or:

```bash
node server.js
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

The Vite development server will provide a local URL such as:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

The following sensitive information should be stored in environment variables:

```text
MONGO_URI
JWT_SECRET
PORT
```

Add `.env` to `.gitignore`:

```text
.env
node_modules/
dist/
```

---

## 🧪 Current Chat Testing

The messaging functionality has been tested for:

* Loading existing conversations
* Displaying message count
* Sending messages
* Clearing the input after sending
* Reloading messages
* Displaying messages from MongoDB
* Left/right message alignment
* Message timestamps
* Automatic scrolling
* Back navigation
* Responsive layout

Example:

```text
Messages loaded: 5

                         ┌──────────────────┐
                         │ Hey              │
                         │ 10:32 PM         │
                         └──────────────────┘

┌──────────────────┐
│ Hello!           │
│ 10:35 PM         │
└──────────────────┘

┌─────────────────────────────────────────────┐
│ Type a message...                    Send   │
└─────────────────────────────────────────────┘
```

---

## 🔮 Future Enhancements

Planned improvements include:

* Real-time messaging using Socket.IO
* Online/offline status
* Typing indicators
* Read receipts
* Unread message notifications
* Search conversations
* Conversation list
* Alumni name and profile information in chat header
* Profile pictures in chat
* Message deletion
* Message editing
* Notifications
* Alumni connection requests
* Advanced alumni search and filtering

---

## 🎯 Project Goals

AlumniConnect aims to:

1. Connect students with alumni.
2. Provide a dedicated professional networking platform.
3. Enable direct communication between users.
4. Store user and messaging data securely.
5. Provide a scalable full-stack architecture.
6. Create a simple and responsive user experience.

---

## 📌 Project Status

**Status:** 🚧 Active Development

Current modules:

* ✅ Authentication
* ✅ User Profiles
* ✅ Dashboard
* ✅ Direct Messaging
* ✅ Persistent Message Storage
* ✅ Responsive Chat UI

More networking and communication features are currently being developed.

---

## 👩‍💻 Development

This project is being developed as a full-stack web application using the MERN-style architecture:

**MongoDB + Express.js + React.js + Node.js**

The application is structured to allow individual modules to be developed and tested independently.

---

## 📄 License

This project is currently intended for educational and development purposes.

A formal open-source license can be added in the future if the project is released publicly.

```
```
