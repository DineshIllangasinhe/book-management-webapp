import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Navbar from "./components/Navbar";

const API_BASE = "http://localhost:5000";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      setToken(saved);
      setPage("books");
    }
  }, []);

  const handleLoginSuccess = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    setPage("books");
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setPage("login");
  };

  return (
    <div className="min-h-screen flex">
      {!!token && (
        <Navbar
          onNavigate={setPage}
          onLogout={handleLogout}
          isLoggedIn={!!token}
          currentPage={page}
        />
      )}
      {!token && (
        <header className="fixed top-0 left-0 right-0 bg-white shadow z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
            <h1 className="font-bold text-base sm:text-lg">Book Management System</h1>
            <nav className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setPage("login")}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded transition-colors ${
                  page === "login"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 hover:bg-slate-50"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setPage("register")}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded transition-colors ${
                  page === "register"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 hover:bg-slate-50"
                }`}
              >
                Register
              </button>
            </nav>
          </div>
        </header>
      )}
      <main className={`flex-1 transition-all duration-300 ${
        !!token 
          ? "pt-20 lg:pt-4 lg:ml-64 p-4" 
          : "p-4 pt-24 sm:pt-28"
      }`}>
        <div className="max-w-4xl mx-auto">
          {page === "login" && (
            <Login onLoginSuccess={handleLoginSuccess} apiBase={API_BASE} />
          )}
          {page === "register" && (
            <Register onRegistered={() => setPage("login")} apiBase={API_BASE} />
          )}
          {page === "books" && (
            <Books token={token} apiBase={API_BASE} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
