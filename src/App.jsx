import { useEffect, useState } from "react";
import ClientManager from "./components/admin/ClientManager";
import LandingPageManager from "./components/client/LandingPageManager";

const API_BASE = "/api/auth";

const TEMPLATES = [
  {
    id: "template-1",
    name: "Template 1",
    description: "Clean and modern landing page.",
  },
  {
    id: "template-2",
    name: "Template 2",
    description: "Professional business landing page.",
  },
  {
    id: "template-3",
    name: "Template 3",
    description: "Conversion-focused landing page.",
  },
  {
    id: "template-4",
    name: "Template 4",
    description: "Premium product landing page.",
  },
  {
    id: "template-5",
    name: "Template 5",
    description: "Modern marketing landing page.",
  },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [loginRole, setLoginRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [section, setSection] = useState("dashboard");

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const response = await fetch(`${API_BASE}/session`, {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data?.success && data?.data?.user) {
        setUser(data.data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setChecking(false);
    }
  }

  async function login(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const endpoint =
      loginRole === "admin"
        ? `${API_BASE}/admin-login`
        : `${API_BASE}/client-login`;

    try {
      const response = await fetch(endpoint, {
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
      setEmail("");
      setSection("dashboard");
    } catch (error) {
      setMessage(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);

    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    }

    setUser(null);
    setSection("dashboard");
    setEmail("");
    setPassword("");
    setMessage("");
    setLoading(false);
  }

  if (checking) {
    return (
      <div style={styles.center}>
        <div style={styles.loadingCard}>
          <h2>LandingPro</h2>
          <p>Checking session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.center}>
        <div style={styles.loginCard}>
          <div style={styles.brand}>LandingPro</div>

          <h1 style={styles.loginTitle}>
            {loginRole === "admin"
              ? "Admin Login"
              : "Client Login"}
          </h1>

          <div style={styles.roleSwitch}>
            <button
              type="button"
              onClick={() => {
                setLoginRole("admin");
                setMessage("");
              }}
              style={{
                ...styles.roleButton,
                ...(loginRole === "admin"
                  ? styles.activeRole
                  : {}),
              }}
            >
              Admin
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginRole("client");
                setMessage("");
              }}
              style={{
                ...styles.roleButton,
                ...(loginRole === "client"
                  ? styles.activeRole
                  : {}),
              }}
            >
              Client
            </button>
          </div>

          <form onSubmit={login}>
            <label style={styles.label}>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="Email address"
            />

            <label style={styles.label}>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Password"
            />

            <button
              type="submit"
              disabled={loading}
              style={styles.loginButton}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {message && (
            <div style={styles.message}>
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  const isAdmin = user.role === "admin";
  const isClient = user.role === "client";

  if (isClient && section === "landing-pages") {
    return (
      <div style={styles.app}>
        <Header
          user={user}
          onLogout={logout}
          loading={loading}
        />

        <LandingPageManager />

        <div style={styles.bottomBack}>
          <button
            type="button"
            onClick={() => setSection("dashboard")}
            style={styles.backButton}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isAdmin && section === "clients") {
    return (
      <div style={styles.app}>
        <Header
          user={user}
          onLogout={logout}
          loading={loading}
        />

        <ClientManager />

        <div style={styles.bottomBack}>
          <button
            type="button"
            onClick={() => setSection("dashboard")}
            style={styles.backButton}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <Header
        user={user}
        onLogout={logout}
        loading={loading}
      />

      <main style={styles.main}>
        <section style={styles.welcomeCard}>
          <div style={styles.badge}>
            {isAdmin ? "ADMIN PANEL" : "CLIENT PANEL"}
          </div>

          <h1 style={styles.heading}>
            Welcome, {user.name || "User"}
          </h1>

          <p style={styles.subheading}>
            {isAdmin
              ? "Manage clients and the LandingPro system."
              : "Create and manage your landing pages."}
          </p>

          {isAdmin && (
            <div style={styles.actionGrid}>
              <button
                type="button"
                onClick={() => setSection("clients")}
                style={styles.actionCard}
              >
                <span style={styles.actionIcon}>👥</span>

                <strong>Client Management</strong>

                <small>
                  Create and manage clients
                </small>
              </button>
            </div>
          )}

          {isClient && (
            <div style={styles.clientGrid}>
              <button
                type="button"
                onClick={() =>
                  setSection("landing-pages")
                }
                style={styles.primaryAction}
              >
                <span style={styles.bigIcon}>＋</span>

                <span>
                  <strong>Create & Manage Landing Pages</strong>

                  <small>
                    Create, edit and manage your landing pages
                  </small>
                </span>
              </button>

              <div style={styles.templateSection}>
                <div>
                  <h2 style={styles.sectionTitle}>
                    Templates
                  </h2>

                  <p style={styles.sectionText}>
                    Choose from your available landing page
                    templates when creating a page.
                  </p>
                </div>

                <div style={styles.templateGrid}>
                  {TEMPLATES.map((template) => (
                    <div
                      key={template.id}
                      style={styles.templateCard}
                    >
                      <div style={styles.templatePreview}>
                        <span>{template.name}</span>
                      </div>

                      <h3 style={styles.templateName}>
                        {template.name}
                      </h3>

                      <p style={styles.templateDescription}>
                        {template.description}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setSection("landing-pages")
                        }
                        style={styles.templateButton}
                      >
                        Use Template
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Header({ user, onLogout, loading }) {
  return (
    <header style={styles.header}>
      <div>
        <div style={styles.headerBrand}>
          LandingPro
        </div>

        <div style={styles.headerSub}>
          {user.role === "admin"
            ? "Admin Panel"
            : "Client Dashboard"}
        </div>
      </div>

      <div style={styles.headerRight}>
        <span style={styles.userEmail}>
          {user.email}
        </span>

        <button
          type="button"
          onClick={onLogout}
          disabled={loading}
          style={styles.logout}
        >
          {loading ? "..." : "Logout"}
        </button>
      </div>
    </header>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    padding: "24px",
    boxSizing: "border-box",
  },

  loadingCard: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    padding: "32px",
    textAlign: "center",
  },

  loginCard: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "32px",
    boxSizing: "border-box",
    boxShadow:
      "0 20px 60px rgba(15,23,42,.08)",
  },

  brand: {
    fontSize: "20px",
    fontWeight: 900,
    marginBottom: "22px",
  },

  loginTitle: {
    margin: "0 0 20px",
    fontSize: "28px",
  },

  roleSwitch: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "6px",
    padding: "5px",
    background: "#f1f5f9",
    borderRadius: "10px",
    marginBottom: "22px",
  },

  roleButton: {
    border: 0,
    padding: "10px",
    borderRadius: "8px",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 700,
  },

  activeRole: {
    background: "#fff",
    boxShadow: "0 1px 5px rgba(0,0,0,.08)",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontSize: "14px",
    fontWeight: 700,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "13px",
    marginBottom: "18px",
    fontSize: "14px",
    outline: "none",
  },

  loginButton: {
    width: "100%",
    border: 0,
    borderRadius: "10px",
    padding: "14px",
    background: "#0f172a",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  },

  message: {
    marginTop: "16px",
    padding: "12px",
    borderRadius: "9px",
    background: "#fef2f2",
    color: "#b91c1c",
    fontSize: "14px",
  },

  header: {
    minHeight: "72px",
    padding: "0 24px",
    background: "#fff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },

  headerBrand: {
    fontSize: "19px",
    fontWeight: 900,
  },

  headerSub: {
    marginTop: "3px",
    fontSize: "12px",
    color: "#64748b",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  userEmail: {
    fontSize: "13px",
    color: "#64748b",
  },

  logout: {
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "9px 14px",
    background: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px",
    boxSizing: "border-box",
  },

  welcomeCard: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "32px",
    boxShadow:
      "0 10px 40px rgba(15,23,42,.04)",
  },

  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#ecfdf5",
    color: "#047857",
    fontSize: "11px",
    fontWeight: 900,
    marginBottom: "14px",
  },

  heading: {
    margin: 0,
    fontSize: "34px",
    letterSpacing: "-.03em",
  },

  subheading: {
    margin: "10px 0 28px",
    color: "#64748b",
    lineHeight: 1.6,
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "16px",
  },

  actionCard: {
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
    background: "#fff",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  actionIcon: {
    fontSize: "28px",
  },

  clientGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },

  primaryAction: {
    width: "100%",
    border: 0,
    borderRadius: "14px",
    padding: "20px",
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    textAlign: "left",
    cursor: "pointer",
  },

  bigIcon: {
    fontSize: "34px",
    lineHeight: 1,
  },

  templateSection: {
    paddingTop: "4px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "22px",
  },

  sectionText: {
    margin: "7px 0 18px",
    color: "#64748b",
  },

  templateGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(210px,1fr))",
    gap: "16px",
  },

  templateCard: {
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "14px",
    background: "#fff",
  },

  templatePreview: {
    height: "120px",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg,#e2e8f0,#f8fafc)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    color: "#475569",
    marginBottom: "13px",
  },

  templateName: {
    margin: "0 0 6px",
    fontSize: "16px",
  },

  templateDescription: {
    margin: "0 0 13px",
    color: "#64748b",
    fontSize: "13px",
    lineHeight: 1.5,
  },

  templateButton: {
    width: "100%",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "10px",
    background: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  bottomBack: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px 32px",
  },

  backButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "10px 15px",
    background: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};
