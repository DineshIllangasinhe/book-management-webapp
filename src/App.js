import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import UserDetails from "./pages/UserDetails";
import Navbar from "./components/Navbar";

const API_BASE = "http://localhost:5000";

function ProtectedRoute({ children, token }) {
  return token ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const [token, setToken] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      setToken(saved);
    }
  }, []);

  const handleLoginSuccess = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    navigate("/books");
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!token;

  return (
    <div className="min-h-screen flex">
      {isLoggedIn && (
        <Navbar
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
      )}
      {!isLoggedIn && (
        <header className="fixed top-0 left-0 right-0 bg-white shadow z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
            <h1 className="font-bold text-base sm:text-lg">Book Management System</h1>
            <nav className="flex gap-2 w-full sm:w-auto">
              <Link
                to="/login"
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded transition-colors ${location.pathname === "/login"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 hover:bg-slate-50"
                  }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded transition-colors ${location.pathname === "/register"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 hover:bg-slate-50"
                  }`}
              >
                Register
              </Link>
            </nav>
          </div>
        </header>
      )}
      <main className={`flex-1 transition-all duration-300 ${isLoggedIn
          ? "pt-20 lg:pt-4 lg:ml-64 p-4"
          : "p-4 pt-24 sm:pt-28"
        }`}>
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/books" replace />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} apiBase={API_BASE} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isLoggedIn ? (
                  <Navigate to="/books" replace />
                ) : (
                  <Register onRegistered={() => navigate("/login")} apiBase={API_BASE} />
                )
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute token={token}>
                  <Books token={token} apiBase={API_BASE} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-details"
              element={
                <ProtectedRoute token={token}>
                  <UserDetails token={token} apiBase={API_BASE} />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to={isLoggedIn ? "/books" : "/login"} replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
