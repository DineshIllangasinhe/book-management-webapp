import React, { useState } from "react";

function Navbar({ onNavigate, onLogout, isLoggedIn, currentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-slate-300 hover:bg-slate-50 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-slate-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-slate-200">
          <h1 className="font-bold text-xl text-slate-800">Book Management System</h1>
        </div>
        <nav className="flex-1 p-4 flex flex-col overflow-y-auto">
          {!isLoggedIn && (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleNavigate("login")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "login"
                    ? "bg-slate-900 text-white font-medium"
                    : "border border-slate-300 hover:bg-slate-50"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate("register")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "register"
                    ? "bg-slate-900 text-white font-medium"
                    : "border border-slate-300 hover:bg-slate-50"
                }`}
              >
                Register
              </button>
            </div>
          )}

          {isLoggedIn && (
            <>
              <div className="mb-4">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">
                  Navigation
                </h2>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleNavigate("books")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      currentPage === "books"
                        ? "bg-slate-900 text-white font-medium shadow-md"
                        : "border border-slate-300 hover:bg-slate-50 hover:border-slate-400"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Books
                    </span>
                  </button>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-200">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 rounded-lg bg-red-500 text-white border border-red-500 hover:bg-red-600 transition-colors font-medium"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </span>
                </button>
              </div>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}

export default Navbar;
