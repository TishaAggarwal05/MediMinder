#  MediMinder — Smart Pill & Health Reminder for the Elderly

MediMinder is a full-stack health-tech web application designed to help elderly users manage their **medication schedules**, **doctor appointments**, and receive **personalized health tips** — all in one place.

> ⚕️ Empowering the elderly to live independently and healthily.

<!--![MediMinder Banner](https://your-image-url-here.com/banner.png)  Replace with real image link or comment this if not ready -->

---

## 🚀 Features

- ✅ **Medication Tracking** — Timely reminders for daily pills
- 🩺 **Doctor Appointment Manager** — Track upcoming consultations
- 🥗 **Personalized Health & Diet Tips** — Based on user profile
- 📅 **Daily Dashboard** — See today’s medications and events at a glance
- 💡 **Clean, Accessible UI** — Built for ease of use, especially for seniors

---

## 🖥️ Tech Stack

### Frontend:
- React.js
- Vite
- Bootstrap
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv

### Tools:
- Git & GitHub
- Postman (for API testing)
<!--- Render (for backend deployment)
- Netlify / Vercel (for frontend deployment)-->

---

## 📸 Screenshots

> *(Add real screenshots or placeholders below)*

## Landing Page View
![Landing Page](https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img1.png)

## Dashboard View
![Dashboard](https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img2.png)
## Dashboard View - Real time MedStatus updates tab,today appointment tab
![Dashboard](https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img3.png)
## Medicine View -
![Dashboard](https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img4.png)
## Add new Medicine- 
![Dashboard](https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img5.png)
## Add New Appointment + Big react Calendar- 
![Dashboard](https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img6.png)



## 🛠️ Getting Started

### 📦 Prerequisites
- Node.js & npm installed
- MongoDB URI (local or cloud like MongoDB Atlas)

---

### 🔧 Setup Instructions

```bash
git clone https://github.com/TishaAggarwal05/MediMinder.git
cd MediMinder
```
```bash
cd backend
npm install
# Create a .env file
# Add: MONGO_URI=your_mongodb_uri_here
#      PORT=5000
npm start

```
```bash
cd ../client
npm install
# Create a .env file
# Add: REACT_APP_API_URL=http://localhost:5000
npm run dev

```


## Available Commands
In backend/:
npm start — Start backend server

npm run dev — Start server with nodemon

In client/:
npm run dev — Start React frontend

npm run build — Build for production


## 🔮 Future Scope

🔐 Authentication & User Login System

🤖 AI-powered Health Chatbot

📲 SMS or Email Reminders Integration

🗣️ Voice Command Support for Accessibility

🧠 ML-based Health Tip Recommendations
