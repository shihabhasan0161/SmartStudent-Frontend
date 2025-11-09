# SmartStudent Frontend

A modern CRUD application built with Vite-React that provides an intuitive interface for students to manage their finances, complementing the SmartStudent backend service.

## 📋 Features

- **User Authentication**: 
  - Secure login/signup with email verification
  - Protected routes for authenticated users
  - JWT token management

- **Dashboard Analytics**:
  - Overview of total income and expenses
  - Recent transaction history

- **Expense & Income Management**:
  - Add expenses and incomes
  - Categorize transactions

- **Category Organization**:
  - Add category by type (Expense/Income)

- **Responsive Design**:
  - Mobile-first approach
  - Seamless experience across devices
  - Interactive sidebar navigation

## 🛠️ Tech Stack

- **Framework**: React with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + Preline UI
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Authentication**: JWT
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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request