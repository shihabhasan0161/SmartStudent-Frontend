# SmartStudent Frontend

A full stack Smart Expense Tracking application built with Spring Boot (Backend) and ReactJS (Frontend) that provides an intuitive interface for students to manage their finances with CRUD (Create, Read, Update, Delete) operations.

## Screenshots Demo

### HomePage
<img width="1352" height="762" alt="ss_1" src="https://github.com/user-attachments/assets/46e379d1-fab4-4214-b650-dd221303eae7" />

### Login
<img width="830" height="710" alt="ss_3" src="https://github.com/user-attachments/assets/cd137fc7-999c-457d-9308-d03cfae41147" />

### Dashboard
<img width="1897" height="923" alt="ss_4" src="https://github.com/user-attachments/assets/4b2a8c58-8e46-42c7-ad49-36cbe5a0ced8" />

## 🎯 Motivation
SmartStudent was built to help students develop better financial habits by
tracking income and expenses in a simple, distraction-free interface.
The project focuses on real-world authentication flows, secure APIs,
and scalable frontend architecture.

## 📋 Features

- **User Authentication**: 
  - Secure login/signup with email verification
  - Protected routes for authenticated users
  - JWT token management
  - OAuth2 social login with Google and Github (WIP)

- **Dashboard Analytics**:
  - Overview of total income and expenses
  - Recent transaction history

- **Expense & Income Management**:
  - Add expenses and incomes
  - Categorize transactions

- **Category Organization**:
  - Add category by type (Expense/Income)

- **Responsive Design**:
  - Used [Preline UI](https://preline.co/) Tailwind CSS Library
  - Mobile-first approach
  - Seamless experience across devices
  - Interactive sidebar navigation

## 🛠️ Tech Stack

- **Framework**: React with Vite CLI
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + Preline UI
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Authentication**: JWT, OAuth2
- **Backend Service**: [SmartStudent Backend](https://github.com/shihabhasan0161/SmartStudent-Backend)

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm
- SmartStudent Backend Service

### Installation

1. Clone the repository
```bash
git clone https://github.com/shihabhasan0161/SmartStudent-Frontend.git
cd SmartStudent-Frontend

git clone https://github.com/shihabhasan0161/SmartStudent-Backend.git
cd SmartStudent-Backend/studentexpensetracker
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```env
VITE_BACKEND_URL=http://localhost:8080/api/v1
```

4. Start development server
```bash
npm run dev

follow the instructions to set up and run the backend service from the SmartStudent Backend repository.
```

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
├── context/        # React Context providers
├── pages/          # Route components
├── util/           # Utility functions
└── App.jsx         # Root component
```

## 🔐 Authentication Flow

1. User registers with email/password
2. Email verification link sent
3. User activates account via email
4. Login with credentials
5. JWT token stored in localStorage
6. Protected routes accessible
7. Register/Login directly with OAuth2 with Google or Github (WIP)
8. Email verification is not required if logged in with Social

## 🎨 Components

- **Navigation**:
  - Responsive sidebar
  - Mobile hamburger menu
  - Dynamic route highlighting

- **Dashboard Widgets**:
  - Stats cards
  - Recent transactions
  - Category distribution

- **Forms**:
  - Login/Signup forms
  - Transaction forms
  - Category management

## 🔄 API Integration

The frontend communicates with the SmartStudent backend through these endpoints:

- **Auth**: `/login`, `/register`, `/activate`
- **Transactions**: `/expenses`, `/incomes`
- **Categories**: `/categories`
- **Dashboard**: `/dashboard`
- **Filter**: `/filter`

## 🛣️ Routes

- `/`: Landing page
- `/signin`: Login page
- `/signup`: Registration page
- `/dashboard`: Main dashboard
- `/expenses`: Expense management
- `/incomes`: Income management
- `/categories`: Category management
- `/filter`: Transaction filtering

## 📚 What I Learned
- Integrating a React frontend with a Spring Boot backend
- Implementing JWT-based authentication with protected routes
- Designing reusable React components with Context API
- Handling async API calls and global error states
- Structuring a scalable full-stack application
- Implementing OAuth2 for secure login with Google and Github

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
