# Exploding Kitten Game 🎴🐱

A single-player online card game built with **React (frontend)**, **Redux** for state management, **Golang** (backend), and **Redis** as the database.

## Features
- Draw cards randomly until you either win or draw an exploding kitten card.
- Keeps track of player scores and maintains a **Leaderboard**.
- Simple, responsive design for a seamless gaming experience.


---

## Tech Stack
- **Frontend**: React, Redux
- **Backend**: Golang
- **Database**: Redis
- **Styling**: CSS
- **API Communication**: Axios

---

## Setup Instructions

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- **Node.js** (v14 or later)
- **npm** or **yarn**
- **Golang** (v1.16 or later)
- **Redis** (latest stable version)

### Clone the Repository
https://github.com/GarvGopalia/Exploding-Kitten.git

### Install Frontend Dependencies
Navigate to the frontend directory and install the necessary dependencies:

cd exploding-kitten-frontend
npm install
Install Backend Dependencies

Navigate to the backend directory:

cd exploding-kitten-backend
go mod tidy

How to Run the App
Start the Backend Server
Ensure Redis is running on your system:

redis-server
Start the Golang server:

go run main.go
The server should now be running on http://localhost:8000.
Start the Frontend
Open a new terminal and navigate to the frontend directory:

cd exploding-kitten-frontend
Start the React development server:

npm start
The app should now be running on http://localhost:3000.
