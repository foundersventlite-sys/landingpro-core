 import { useState } from "react";

const API_URL = "/api/auth";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      setMessage(
        `Login successful. Welcome ${data?.data?.user?.name || "Admin"}!`
      );
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#f8fafc",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#0f172a",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "7px 12px",
              borderRadius: "999px",
              background: "#ecfdf5",
              color: "#047857",
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            LandingPro Core
          </div>

          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "30px",
              letterSpacing: "-0.03em",
            }}
          >
            Admin Login
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              lineHeight: 1.6,
            }}
          >
            Sign in to access the administration panel.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@landingpro.local"
            autoComplete="email"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              outline: "none",
              fontSize: "15px",
              marginBottom: "18px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              outline: "none",
              fontSize: "15px",
              marginBottom: "20px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              border: 0,
              borderRadius: "10px",
              padding: "14px",
              background: loading ? "#64748b" : "#0f172a",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px 14px",
              borderRadius: "10px",
              background: "#f1f5f9",
              color: "#334155",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            {message}
          </div>
        )}
      </section>
    </main>
  );
                }
