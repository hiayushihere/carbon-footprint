#  Carbon Footprint Calculator & Tracker

A full-stack web application that helps individuals track daily carbon emissions, visualize impact trends, and receive AI-powered sustainability recommendations.

___

## Overview

This system allows users to log lifestyle activities and automatically calculate their carbon footprint using standardized emission factors. The platform combines data tracking, analytics, and AI guidance to promote environmentally conscious decisions.

The project demonstrates a production-style full-stack architecture with authentication, data persistence, analytics, and AI integration.

___

## Core Features

- User authentication (JWT-based)
- Daily activity logging (transport, energy, diet)
- Carbon emission calculation engine
- Interactive dashboard with charts
- AI-generated sustainability recommendations
- Profile management
- Responsive UI

___

## Tech Stack

**Frontend** → React, Vite, Tailwind CSS, Chart.js  
**Backend** → Node.js, Express  
**Database** → MongoDB  
**Authentication** → JWT  
**AI Integration** → OpenAI / Gemini API  

___

## Carbon Calculation Logic

| Activity | Formula |
|----------|---------|
| Car (petrol) | `distance_km × 0.12` |
| Flight (short-haul) | `distance_km × 0.255` |
| Electricity | `kWh × 0.5` |
| Beef meal | `6.0 kg CO₂` |
| Vegetarian meal | `1.5 kg CO₂` |

___

## Project Structure

```
carbon-footprint-calculator-tracker/
├── frontend/
├── backend/
├── docs/
└── README.md
```

___

## Installation & Setup

### Prerequisites

- Node.js v18+
- Git
- MongoDB (Atlas or local)

Verify:

```
node -v
npm -v
git --version
```

___

## 1. Clone Repository

```
git clone https://github.com/hiayushihere/carbon-footprint
cd carbon-footprint
```

___

## 2. Backend Setup

```
cd backend
npm install
```

Create `.env`:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start server:

```
npm run dev
```

Backend runs at:

```
http://localhost:5001
```

___

## 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

___


## Authentication Flow

1. User registers  
2. Login returns JWT  
3. Token stored in `localStorage`  
4. Protected routes use Bearer token  
5. Profile fetched via `/users/me`

___

## API Routes

| Endpoint | Description |
|----------|-------------|
| `/api/auth/register` | Register user |
| `/api/auth/login` | Login user |
| `/api/users/me` | Get profile |
| `/api/activities` | Log activity |
| `/api/recommendations` | AI suggestions |

___
--------------------------------------------------
## DELIVERABLE LINKS (also attached in submission.txt)
--------------------------------------------------

1. Video Demo

PFA attached video link:  

https://drive.google.com/file/d/1p935dQ7rNbtamF7_YjtndyBuRMJvBbdl/view?usp=sharing

2. Problem Statement Document (PDF)  

PFA attached document link:  

https://drive.google.com/file/d/1DFDcgBTaAJmSZfcAtMhkOHumgBZlyu0C/view?usp=sharing

3. AI Usage Report (PDF)  

PFA attached document link:  

https://drive.google.com/file/d/1sC92ce4VSuSfZOTW_GT54Fe17H8_mwVh/view?usp=sharing

--------------------------------------------------

## Common Issues

| Problem | Cause |
|---------|------|
| Login fails | Missing `.env` |
| Network error | Backend not running |
| Profile not loading | JWT not sent |
| User not saved | Incorrect Mongo URI |

___

## Future Improvements

- Carbon offset marketplace
- Community challenges
- Emission forecasting
- Gamification

___

## Summary

A portable, environment-agnostic carbon tracking platform built with modern web technologies. The system integrates data analytics and AI to provide actionable climate impact insights.



