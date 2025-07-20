#  MediMinder — Smart Pill & Health Reminder for the Elderly

MediMinder is a full-stack health-tech web application designed to help elderly users manage their **medication schedules**, **doctor appointments**, and receive **personalized health tips** — all in one place.

> ⚕️ Empowering the elderly to live independently and healthily.

<!--![MediMinder Banner](https://your-image-url-here.com/banner.png)  Replace with real image link or comment this if not ready -->

---

## 🚀 Features
- 📅 Medication Tracking – Set daily medications with dosage and time, and receive timely reminders.

- 🩺 Doctor Appointment Reminders – Schedule appointments in react calendar

- 🍲 Personalised Health-Assistant chat bot -  Get health and diet tips tailored to your age, gender, diseases, and medications using a smart AI-powered assistant(llama3).

- 👴 Elder-Friendly UI – Clean, accessible interface optimized for senior users.

- 🔄 Progress Visualization – Pie chart shows weekly stats of medication adherence (taken vs skipped).
 
- 🧠 React Hook Form Integration – Efficient and user-friendly form validation and state management.

- 📆 React Big Calendar Integration – Visual calendar for tracking appointments and medication schedules at a glance.
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



## Landing Page View
<img src="https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img1.png" width="500"/>
## Dashboard View - Real time MedStatus updates tab,today appointment tab
<img src="https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img11.png" width="500"/>
## Health Chatbot
<img src="https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img7.png" width="500"/>
<img src="https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img8.png" width="500"/>
## Medicine View -
<img src="https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img3.png" width="500"/>
## Analytics of Pills consistency
<img src="https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img4.png" width="500"/>
## Add new Medicine
<img src="https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img5.png" width="500"/>
## Add New Appointment + Big react Calendar-
<img src="https://github.com/TishaAggarwal05/MediMinder/blob/main/screenshots/img10.png" width="500"/>







## 🛠️ Getting Started

### 📦 Prerequisites
- Node.js & npm installed
- MongoDB URI (local or cloud like MongoDB Atlas)
- Environment Setup
Before running the project, ensure the following environment variables are set. These are required for secure access and external integrations:

✅ 1. Ngrok Setup
To expose your local server securely over the internet:

Step 1: Sign up at https://dashboard.ngrok.com and Get your Ngrok Auth Token

Step 3: (Optional) Reserve a Custom Domain (for stability across sessions)

✅ 2. Hugging Face API Token (Meta LLaMA 3)

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
# In backend/:
nodemon index.js

# In client/:
npm run dev — Start React frontend



## 🔮 Future Scope

- 🔐 Authentication & User Login System

- 📲 SMS or Email Reminders Integration

- 🗣️ Voice Command Support for Accessibility

