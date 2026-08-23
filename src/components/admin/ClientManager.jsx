import { useEffect, useState } from "react";

const API_BASE = "/api/clients";

export default function ClientManager() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    businessName: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(API_BASE, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Failed to load clients");
      }

      setClients(data.data?.clients || []);
    } catch (error) {
      setMessage(error.message || "Failed to load clients");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleCreate(event) {
    event.preventDefault();

    if (!form.userId.trim() || !form.businessName.trim()) {
      setMessage("User ID and business name are required");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Failed to create client");
      }

      setClients((current) => [
        data.data.client,
        ...current,
      ]);

      setForm({
        userId: "",
        businessName: "",
        phone: "",
        email: "",
        address: "",
      });

      setShowForm(false);
      setMessage("Client created successfully");
    } catch (error) {
      setMessage(error.message || "Failed to create client");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(clientId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmed) return;

    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE}?id=${encodeURIComponent(clientId)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Failed to delete client");
      }

      setClients((current) =>
        current.filter((client) => client.id !== clientId)
      );

      setMessage("Client deleted successfully");
    } catch (error) {
      setMessage(error.message || "Failed to delete client");
    }
  }

  return (
    <section style={styles.container}>
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.title}>Client Management</h1>
          <p style={styles.subtitle}>
            Create, view and manage your clients.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm((current) => !current);
            setMessage("");
          }}
          style={styles.primaryButton}
        >
          {showForm ? "Close Form" : "Add Client"}
        </button>
      </div>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} style={styles.formCard}>
          <h2 style={styles.formTitle}>Create Client</h2>

          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>User ID</label>
              <input
                name="userId"
                value={form.userId}
                onChange={handleChange}
                placeholder="client-001"
                required
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Business Name</label>
              <input
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Business name"
                required
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="client@example.com"
                style={styles.input}
              />
            </div>

            <div style={styles.fullWidth}>
              <label style={styles.label}>Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Business address"
                rows="3"
                style={styles.textarea}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={styles.saveButton}
          >
            {saving ? "Creating..." : "Create Client"}
          </button>
        </form>
      )}

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Clients</h2>
          <span style={styles.count}>{clients.length}</span>
        </div>

        {loading ? (
          <div style={styles.empty}>Loading clients...</div>
        ) : clients.length === 0 ? (
          <div style={styles.empty}>
            No clients found.
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Business</th>
                  <th style={styles.th}>User</th>
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td style={styles.td}>
                      <strong>{client.business_name}</strong>
                    </td>

                    <td style={styles.td}>
                      <div>{client.name || "—"}</div>
                      <small style={styles.small}>
                        {client.user_email || client.email || "—"}
                      </small>
                    </td>

                    <td style={styles.td}>
                      <div>{client.phone || "—"}</div>
                      <small style={styles.small}>
                        {client.email || "—"}
                      </small>
                    </td>

                    <td style={styles.td}>
                      <span style={styles.status}>
                        {client.status}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <button
                        type="button"
                        onClick={() => handleDelete(client.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px",
    boxSizing: "border-box",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#0f172a",
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    letterSpacing: "-0.03em",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#64748b",
  },

  primaryButton: {
    border: 0,
    borderRadius: "10px",
    padding: "12px 18px",
    background: "#0f172a",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  },

  message: {
    marginBottom: "20px",
    padding: "12px 14px",
    borderRadius: "10px",
    background: "#f1f5f9",
    color: "#334155",
    fontSize: "14px",
  },

  formCard: {
    marginBottom: "24px",
    padding: "24px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
  },

  formTitle: {
    margin: "0 0 20px",
    fontSize: "20px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },

  fullWidth: {
    gridColumn: "1 / -1",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontSize: "13px",
    fontWeight: 700,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 13px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 13px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    fontSize: "14px",
    resize: "vertical",
    outline: "none",
  },

  saveButton: {
    marginTop: "20px",
    border: 0,
    borderRadius: "9px",
    padding: "12px 18px",
    background: "#0f172a",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    overflow: "hidden",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "20px 24px",
    borderBottom: "1px solid #e2e8f0",
  },

  cardTitle: {
    margin: 0,
    fontSize: "20px",
  },

  count: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "24px",
    height: "24px",
    padding: "0 7px",
    borderRadius: "999px",
    background: "#f1f5f9",
    color: "#475569",
    fontSize: "12px",
    fontWeight: 700,
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "720px",
  },

  th: {
    padding: "13px 18px",
    textAlign: "left",
    background: "#f8fafc",
    color: "#64748b",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },

  td: {
    padding: "16px 18px",
    borderTop: "1px solid #e2e8f0",
    fontSize: "14px",
    verticalAlign: "middle",
  },

  small: {
    color: "#64748b",
    fontSize: "12px",
  },

  status: {
    display: "inline-block",
    padding: "5px 9px",
    borderRadius: "999px",
    background: "#ecfdf5",
    color: "#047857",
    fontSize: "12px",
    fontWeight: 700,
  },

  deleteButton: {
    border: "1px solid #fecaca",
    borderRadius: "8px",
    padding: "8px 12px",
    background: "#ffffff",
    color: "#dc2626",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  },

  empty: {
    padding: "40px 24px",
    textAlign: "center",
    color: "#64748b",
  },
};
