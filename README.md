# Book Management Web App

## Project Overview

This is a simple web application for managing your book collection. You can create an account, log in, and then add, edit, search, and delete books from your personal library. The app keeps track of book titles, authors, and descriptions, making it easy to organize your reading list.

**Features:**
- User registration and login
- Add new books with title, author, and description
- Edit existing books
- Delete books
- Search books by title or author
- View your user profile
- Clean and responsive design that works on desktop and mobile

## Steps to Run the Project

### Prerequisites

Before you start, make sure you have these installed on your computer:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Setup Instructions

1. **Install dependencies**
   
   Open your terminal in the project folder and run:
   ```
   npm install
   ```
   
   This will download all the required packages for the project.

2. **Start the development server**
   
   Run this command:
   ```
   npm start
   ```
   
   The app will automatically open in your browser at `http://localhost:3000`. If it doesn't open automatically, just type that address in your browser.

3. **Note about the Backend**
   
   This app needs a backend server running on `http://localhost:5000` to work properly. Make sure you have the backend API running before using the app. The backend handles user authentication and book data storage.

### Other Useful Commands

- **Build for production**: `npm run build` - Creates an optimized version of the app for deployment
- **Run tests**: `npm test` - Runs the test suite

That's it! You're ready to start managing your books. 🎉
