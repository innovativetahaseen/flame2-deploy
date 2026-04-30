# 🔥 FLAME2-DT  
## Dual-Modality Forest Fire Detection System

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Flask-Backend-000000?logo=flask)
![PyTorch](https://img.shields.io/badge/PyTorch-DeepLearning-EE4C2C?logo=pytorch)
![JWT](https://img.shields.io/badge/Auth-JWT-green)
![REST API](https://img.shields.io/badge/API-REST-orange)
![Vite](https://img.shields.io/badge/Vite-Build-purple?logo=vite)
![Python](https://img.shields.io/badge/Python-Backend-3776AB?logo=python)
![GitHub](https://img.shields.io/badge/Git-VersionControl-black?logo=github)

---

# 📌 Project Overview

**FLAME2-DT (Forest Learning and Monitoring Engine – Dual Technology)** is an AI-powered forest fire detection platform that uses a **dual-modality deep learning approach (RGB + Thermal images)** to detect fires early.

The system is designed with a **modular full-stack architecture**, combining:

• React Frontend  
• Flask Backend API  
• PyTorch Machine Learning Model  
• Automated Alert System  

Users can upload images to the system and receive **real-time fire detection predictions**. When a fire is detected, the system triggers an **alert notification system** for faster emergency response.

---

# 🏗️ System Architecture

```
User
 ↓
React Frontend (Vite)
 ↓
Flask Backend API
 ↓
Authentication Layer (JWT)
 ↓
ML Detection Service
 ↓
Fire Detection Model (RGB + Thermal)
 ↓
Prediction Engine
 ↓
Alert System (Email Notification)
 ↓
Response to User
```

---

# 📂 Project Structure

```
FLAME2-DT-Dual-Modality-Forest-Fire-Detection-System/

│
├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── models/
│   │   │   └── user.py
│   │   │
│   │   ├── routes/
│   │   │   ├── auth_routes.py
│   │   │   └── detection_routes.py
│   │   │
│   │   ├── services/
│   │   │   ├── alert_service.py
│   │   │   └── ml_service.py
│   │   │
│   │   ├── __init__.py
│   │   └── extensions.py
│   │
│   └── run.py
│
├── frontend-react/
│   │
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── ml/
│   ├── fire_model.pth
│   ├── model.py
│   └── train.py
│
├── requirements.txt
├── .gitignore
└── README.md
```

---

# ⚙️ Technologies Used

## Backend
Python  
Flask  
REST API  
Flask-JWT-Extended  
SQLAlchemy  

## Frontend
React  
Vite  
JavaScript  
HTML  
CSS  
Axios / Fetch API  

## Machine Learning
PyTorch  
Deep Learning Image Classification  
Dual-Modality Detection  

## Alert System
Email Notification System  
Environment Variable Configuration  

## Version Control
Git  
GitHub  
Branch-Based Development Workflow  

---

# 🚀 How to Run Locally

## 1️⃣ Clone the Repository

```
git clone https://github.com/innovativetahaseen/FLAME2-DT-Dual-Modality-Forest-Fire-Detection-System.git
cd FLAME2-DT-Dual-Modality-Forest-Fire-Detection-System
```

---

## 2️⃣ Setup Backend

```
cd backend
python -m venv venv
```

Mac / Linux

```
source venv/bin/activate
```

Windows

```
venv\Scripts\activate
```

Install dependencies

```
pip install -r ../requirements.txt
```

---

## 3️⃣ Run Backend Server

```
python run.py
```

Backend will run at:

```
http://127.0.0.1:5000
```

---

## 4️⃣ Run Frontend

Open a new terminal

```
cd frontend-react
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# 📊 Key Features

🔥 Dual-Modality Fire Detection (RGB + Thermal)  
⚡ Real-time AI Prediction System  
🚨 Automated Fire Alert System  
🔐 Secure JWT Authentication  
🧠 PyTorch Deep Learning Model  
🧩 Modular Flask Backend Architecture  
🌐 Modern React + Vite Frontend  
🔗 REST API Integration  

---

# 🔧 Development Workflow

The project follows a **branch-based Git workflow**.

```
main
│
├── backend-dev
├── ML-Model
├── feature/authentication
├── feature/alert-system
└── react-integration
```

Each feature is developed in its own branch and merged into `main` using Pull Requests.

---

# 👥 Team Members

Tahaseen Khan  
Shaurya Singhal  
Bharti Chaudhary  

---

# 📄 License

This project is developed for **academic research and educational purposes**.