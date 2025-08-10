# Socially

A full-stack social media web application built with React (Vite) for the client and Node.js/Express for the server. Socially allows users to connect, share posts, explore content, and manage their profiles in a modern, responsive interface.

## Features

### Client (Frontend)

- Built with React and Vite for fast development and performance
- Modern UI with reusable components
- User authentication (signup, login, protected routes)
- Feed with post uploads, likes, and comments
- Explore section to discover new content
- Profile management (edit profile, view stats, media, about)
- Notifications and messaging
- Responsive sidebar navigation
- Theming support

### Server (Backend)

- Node.js with Express.js
- MongoDB for data storage (via Mongoose)
- User authentication with JWT
- RESTful API endpoints for users, posts, and notifications
- Middleware for authentication and error handling
- Cloudinary integration for media uploads

## Folder Structure

```
Socially/
├── Client/         # React frontend (Vite)
│   ├── public/     # Static assets
│   └── src/        # Source code
│       ├── Components/   # Reusable UI components
│       ├── Context/      # React context providers
│       ├── Hooks/        # Custom hooks
│       ├── Layouts/      # Page layouts
│       ├── Pages/        # Route pages
│       └── assets/       # Images, fonts, etc.
├── Server/         # Node.js backend
│   ├── Controllers/   # Route controllers
│   ├── Middlewares/   # Express middlewares
│   ├── Models/        # Mongoose models
│   ├── Routes/        # API routes
│   ├── Utils/         # Utility functions
│   └── server.js      # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Cloudinary account (for media uploads)

### Setup

#### 1. Clone the repository

```sh
git clone <repo-url>
cd Socially
```

#### 2. Setup the Server

```sh
cd Server
npm install
# Create a .env file based on .env.example and set your environment variables
npm start
```

#### 3. Setup the Client

```sh
cd ../Client
npm install
# Create a .env file based on .env.example and set your environment variables
npm run dev
```

#### 4. Open in Browser

Visit `http://localhost:5173` (or the port shown in your terminal) to view the app.

## Environment Variables

Both `Client` and `Server` require `.env` files. See the provided `.env.example` files for required variables.

## Scripts

### Client

- `npm run dev` – Start Vite dev server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

### Server

- `npm start` – Start the Express server

## License

This project is licensed under the MIT License.

---

**Socially** – Connect, share, and explore with your friends!
