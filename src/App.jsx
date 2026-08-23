import { useEffect, useState } from "react";
import ClientManager from "./components/admin/ClientManager";
import TemplateRenderer from "./templates/TemplateRenderer";

const API_BASE = "/api/auth";

const DEMO_TEMPLATE_DATA = {
  brandName: "LandingPro",
  productName: "Premium Product",
  headline: "আপনার পছন্দের পণ্য, এখন আরও সহজে",
  description:
    "স্মার্ট ডিজাইন, প্রয়োজনীয় ফিচার এবং নির্ভরযোগ্য মান—সবকিছু একসাথে।",
  price: "৳1,490",
  oldPrice: "৳1,790",
  image: "",
  buttonText: "এখনই অর্ডার করুন",
};

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const response = await fetch(`${API_BASE}/session`, {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data?.success) {
        setUser(data.data.user);
      }
    } catch (error) {
      console.error("Session check failed:", error);
    } finally {
      setCheckingSession(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const endpoint =
      role === "admin" ? "admin-login" : "client-login";

    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, {
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

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Login failed");
      }

      setUser(data.data.user);
      setPassword("");
      setMessage("");
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);

    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      setEmail("");
      setPassword("");
      setMessage("");
      setActiveSection("dashboard");
    } catch {
      setMessage("Logout failed");
    } finally {
      setLoading(false);
    }
  }

  function handleOrder() {
    setMessage("Order action is ready.");
  }

  if (checkingSession) {
    return (
      <main style={styles.centerPage}>
        <div style={styles.loadingCard}>
          <div style={styles.badge}>LandingPro Core</div>

          <h2 style={styles.loadingTitle}>
            Checking session...
          </h2>

          <p style={styles.muted}>
            Please wait while we verify your authentication.
          </p>
        </div>
      </main>
    );
  }

  if (user) {
    if (
      user.role === "admin" &&
      activeSection === "clients"
    ) {
      return (
        <main style={styles.dashboardPage}>
          <header style={styles.header}>
            <div>
              <div style={styles.brand}>
                LandingPro Core
              </div>

              <div style={styles.headerSubtitle}>
                Admin Panel
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              style={styles.logoutButton}
            >
              {loading ? "Signing out..." : "Logout"}
            </button>
          </header>

          <ClientManager />

          <div style={styles.backButtonContainer}>
            <button
              type="button"
              onClick={() =>
                setActiveSection("dashboard")
              }
              style={styles.backButton}
            >
              ← Back to Dashboard
            </button>
          </div>
        </main>
      );
    }

    if (
      user.role === "admin" &&
      activeSection === "templates"
    ) {
      return (
        <main style={styles.dashboardPage}>
          <header style={styles.header}>
            <div>
              <div style={styles.brand}>
                LandingPro Core
              </div>

              <div style={styles.headerSubtitle}>
                Template Preview
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              style={styles.logoutButton}
            >
              {loading ? "Signing out..." : "Logout"}
            </button>
          </header>

          <section style={styles.templatePanel}>
            <div style={styles.templateToolbar}>
              <div>
                <h1 style={styles.templateTitle}>
                  Landing Page Templates
                </h1>

                <p style={styles.templateSubtitle}>
                  Select a template to preview it.
                </p>
              </div>

              <div style={styles.templateButtons}>
                {[1, 2, 3, 4, 5].map((templateNumber) => (
                  <button
                    key={templateNumber}
                    type="button"
                    onClick={() =>
                      setSelectedTemplate(templateNumber)
                    }
                    style={{
                      ...styles.templateButton,
                      ...(selectedTemplate === templateNumber
                        ? styles.activeTemplateButton
                        : {}),
                    }}
                  >
                    Template {templateNumber}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.previewFrame}>
              <TemplateRenderer
                template={selectedTemplate}
                data={DEMO_TEMPLATE_DATA}
                onOrder={handleOrder}
              />
            </div>

            {message && (
              <div style={styles.message}>
                {message}
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                setActiveSection("dashboard")
              }
              style={styles.backButton}
            >
              ← Back to Dashboard
            </button>
          </section>
        </main>
      );
    }

    return (
      <main style={styles.dashboardPage}>
        <header style={styles.header}>
          <div>
            <div style={styles.brand}>
              LandingPro Core
            </div>

            <div style={styles.headerSubtitle}>
              {user.role === "admin"
                ? "Admin Panel"
                : "Client Panel"}
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            style={styles.logoutButton}
          >
            {loading ? "Signing out..." : "Logout"}
          </button>
        </header>

        <section style={styles.dashboardContainer}>
          <div style={styles.welcomeCard}>
            <div style={styles.badge}>
              Authenticated
            </div>

            <h1 style={styles.dashboardTitle}>
              Welcome, {user.name}
            </h1>

            <p style={styles.dashboardText}>
              You are successfully logged in as a{" "}
              {user.role === "admin"
                ? "administrator"
                : "client"}.
            </p>

            <div style={styles.infoGrid}>
              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>
                  Name
                </span>

                <strong>{user.name}</strong>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>
                  Email
                </span>

                <strong>{user.email}</strong>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>
                  Role
                </span>

                <strong>{user.role}</strong>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>
                  Status
                </span>

                <strong>Active</strong>
              </div>
            </div>

            {user.role === "admin" && (
              <div style={styles.adminActions}>
                <button
                  type="button"
                  onClick={() =>
                    setActiveSection("clients")
                  }
                  style={styles.actionButton}
                >
                  Client Management
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveSection("templates")
                  }
                  style={styles.actionButton}
                >
                  Template Preview
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.centerPage}>
      <section style={styles.loginCard}>
        <div style={styles.badge}>
          LandingPro Core
        </div>

        <h1 style={styles.title}>
          {role === "admin"
            ? "Admin Login"
            : "Client Login"}
        </h1>

        <p style={styles.subtitle}>
          Sign in to access your{" "}
          {role === "admin"
            ? "administration"
            : "client"}{" "}
          panel.
        </p>

        <div style={styles.roleSwitch}>
          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setMessage("");
            }}
            style={{
              ...styles.roleButton,
              ...(role === "admin"
                ? styles.activeRoleButton
                : {}),
            }}
          >
            Admin
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("client");
              setMessage("");
            }}
            style={{
              ...styles.roleButton,
              ...(role === "client"
                ? styles.activeRoleButton
                : {}),
            }}
          >
            Client
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <label style={styles.label}>
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder={
              role === "admin"
                ? "admin@landingpro.local"
                : "client@landingpro.local"
            }
            autoComplete="email"
            required
            style={styles.input}
          />

          <label style={styles.label}>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.loginButton,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}
      </section>
    </main>
  );
}

const styles = {
  centerPage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box",
    background: "#f8fafc",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#0f172a",
  },

  loginCard: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "32px",
    boxSizing: "border-box",
    boxShadow:
      "0 20px 60px rgba(15, 23, 42, 0.08)",
  },

  loadingCard: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "32px",
    boxSizing: "border-box",
    textAlign: "center",
  },

  badge: {
    display: "inline-block",
    padding: "7px 12px",
    borderRadius: "999px",
    background: "#ecfdf5",
    color: "#047857",
    fontSize: "13px",
    fontWeight: 700,
    marginBottom: "16px",
  },

  title: {
    margin: "0 0 8px",
    fontSize: "30px",
    letterSpacing: "-0.03em",
  },

  loadingTitle: {
    margin: "0 0 8px",
    fontSize: "24px",
  },

  subtitle: {
    margin: "0 0 20px",
    color: "#64748b",
    lineHeight: 1.6,
  },

  muted: {
    margin: 0,
    color: "#64748b",
    lineHeight: 1.6,
  },

  roleSwitch: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginBottom: "22px",
    padding: "4px",
    background: "#f1f5f9",
    borderRadius: "10px",
  },

  roleButton: {
    border: 0,
    borderRadius: "8px",
    padding: "10px",
    background: "transparent",
    color: "#64748b",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  activeRoleButton: {
    background: "#ffffff",
    color: "#0f172a",
    boxShadow:
      "0 1px 4px rgba(15, 23, 42, 0.08)",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: 600,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
    marginBottom: "18px",
  },

  loginButton: {
    width: "100%",
    border: 0,
    borderRadius: "10px",
    padding: "14px",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },

  dashboardPage: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#0f172a",
  },

  header: {
    minHeight: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    boxSizing: "border-box",
  },

  brand: {
    fontSize: "18px",
    fontWeight: 800,
  },

  headerSubtitle: {
    marginTop: "3px",
    fontSize: "13px",
    color: "#64748b",
  },

  logoutButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "10px 16px",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  dashboardContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "32px 24px",
    boxSizing: "border-box",
  },

  welcomeCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "32px",
    boxShadow:
      "0 12px 40px rgba(15, 23, 42, 0.05)",
  },

  dashboardTitle: {
    margin: "0 0 10px",
    fontSize: "34px",
    letterSpacing: "-0.03em",
  },

  dashboardText: {
    margin: "0 0 28px",
    color: "#64748b",
    lineHeight: 1.6,
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
  },

  infoCard: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    padding: "18px",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    background: "#f8fafc",
  },

  infoLabel: {
    fontSize: "12px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 700,
  },

  adminActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "28px",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0",
  },

  actionButton: {
    border: 0,
    borderRadius: "10px",
    padding: "12px 18px",
    background: "#0f172a",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  },

  backButtonContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px 32px",
  },

  backButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "10px 16px",
    background: "#ffffff",
    color: "#0f172a",
    fontWeight: 700,
    cursor: "pointer",
  },

  templatePanel: {
    width: "100%",
    boxSizing: "border-box",
    padding: "28px 24px 40px",
  },

  templateToolbar: {
    maxWidth: "1200px",
    margin: "0 auto 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },

  templateTitle: {
    margin: 0,
    fontSize: "28px",
    letterSpacing: "-0.03em",
  },

  templateSubtitle: {
    margin: "7px 0 0",
    color: "#64748b",
  },

  templateButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  templateButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "9px 13px",
    background: "#ffffff",
    color: "#334155",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },

  activeTemplateButton: {
    background: "#0f172a",
    borderColor: "#0f172a",
    color: "#ffffff",
  },

  previewFrame: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto 24px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    background: "#ffffff",
  },

  message: {
    maxWidth: "1200px",
    margin: "0 auto 20px",
    padding: "12px 14px",
    borderRadius: "10px",
    background: "#f1f5f9",
    color: "#334155",
    fontSize: "14px",
    lineHeight: 1.5,
  },
};
