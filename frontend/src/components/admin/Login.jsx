import React, { useState } from "react";
import { apiLogin } from "../../lib/api";

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await apiLogin(password);
      if (res?.token) {
        localStorage.setItem("admin_token", res.token);
        onSuccess && onSuccess();
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full border px-3 py-2 rounded"
          />
          {error && <div className="text-red-600">{error}</div>}
          <button className="w-full bg-blue-600 text-white py-2 rounded">Sign in</button>
        </form>
        <p className="text-xs text-gray-500 mt-3">This is a development login. Replace with secure auth for production.</p>
      </div>
    </div>
  );
}
