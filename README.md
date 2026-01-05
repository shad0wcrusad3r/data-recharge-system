# 📱 Data Recharge Management System

This repository contains a lightweight full-stack web application that allows users to explore available mobile recharge plans and activate subscriptions. The frontend is built using React, while the backend is powered by Node.js with Express and MongoDB for data persistence.

---

## 🗂️ Directory Overview

```
mobile-recharge/
├── backend/
│   ├── models/
│   │   └── Subscription.js  (MongoDB Schema)
│   └── routes/
│       └── subscribe.js     (Express Route)
└── frontend/
    └── src/
        ├── App.js           (React Component)
        └── App.css          (Styles)
```


---

## 🚀 How the Application Works

1. **Account Registration**  
   Users create an account to access recharge services.

2. **Authentication**  
   Registered users log in using their credentials.

3. **Plan Activation**  
   Users choose a recharge plan, complete a simulated payment, and receive confirmation of their subscription.

