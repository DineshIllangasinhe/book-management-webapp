import React, { useEffect, useState } from "react";
import Login from "./pages/Login";

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
      <main className={!!token ? "flex-1 ml-64 p-4" : "flex-1 p-4 pt-20"}>
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