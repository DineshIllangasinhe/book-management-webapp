import React, { useState } from "react";

function Login({ onLoginSuccess, apiBase }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      onLoginSuccess(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-2 py-2 text-sm rounded bg-slate-900 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
