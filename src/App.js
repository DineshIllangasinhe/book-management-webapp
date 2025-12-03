import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
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
      <main className={`flex-1 p-4 transition-all duration-300 ${
        !!token ? "lg:ml-64 pt-20 lg:pt-4" : "pt-20"
      }`}>
        <div className="max-w-4xl mx-auto">
          {page === "login" && (
            <Login onLoginSuccess={handleLoginSuccess} apiBase={API_BASE} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;