import { useEffect, useState } from "react";

const ENDPOINTS = {
  list: "/api/clients/list",
  create: "/api/clients/create",
  update: "/api/clients/update",
  delete: "/api/clients/delete",
};

const EMPTY_FORM = {
  id: "",
  userId: "",
  businessName: "",
  phone: "",
  email: "",
  address: "",
  status: "active",
};

export default function ClientManager() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(ENDPOINTS.list, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Failed to load clients"
        );
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

  function openCreateForm() {
    setEditing(false);
    setForm(EMPTY_FORM);
    setMessage("");
    setShowForm(true);
  }

  function openEditForm(client) {
    setEditing(true);

    setForm({
      id: client.id || "",
      userId: client.user_id || "",
      businessName: client.business_name || "",
      phone: client.phone || "",
      email: client.email || "",
      address: client.address || "",
      status: client.status || "active",
    });

    setMessage("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(false);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.businessName.trim()) {
      setMessage("Business name is required");
      return;
    }

    if (!editing && !form.userId.trim()) {
      setMessage("User ID is required");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const payload = editing
        ? {
            id: form.id,
            businessName: form.businessName.trim(),
            phone: form.phone.trim(),
            email: form.email.trim().toLowerCase(),
            address: form.address.trim(),
            status: form.status,
          }
        : {
            userId: form.userId.trim(),
            businessName: form.businessName.trim(),
            phone: form.phone.trim(),
            email: form.email.trim().toLowerCase(),
            address: form.address.trim(),
          };

      const response = await fetch(
        editing
          ? ENDPOINTS.update
          : ENDPOINTS.create,
        {
          method: editing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message ||
            (editing
              ? "Failed to update client"
              : "Failed to create client")
        );
      }

      if (editing) {
        setClients((current) =>
          current.map((client) =>
            client.id === data.data.client.id
              ? data.data.client
              : client
          )
        );

        setMessage("Client updated successfully");
      } else {
        setClients((current) => [
          data.data.client,
          ...current,
        ]);

        setMessage("Client created successfully");
      }

      closeForm();
    } catch (error) {
      setMessage(error.message || "Operation failed");
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
        `${ENDPOINTS.delete}?id=${encodeURIComponent(clientId)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Failed to delete client"
        );
      }

      setClients((current) =>
        current.filter(
          (client) => client.id !== clientId
        )
      );

      setMessage("Client deleted successfully");
    } catch (error) {
      setMessage(
        error.message || "Failed to delete client"
      );
    }
  }

  return (
    <section style={styles.container}>
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.title}>
            Client Management
          </h1>

          <p style={styles.subtitle}>
            Create, edit and manage your clients.
          </p>
        </div>

        <button
          type="button"
          onClick={
            showForm ? closeForm : openCreateForm
          }
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
        <form
          onSubmit={handleSubmit}
          style={styles.formCard}
        >
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>
              {editing
                ? "Edit Client"
                : "Create Client"}
            </h2>

            {editing && (
              <span style={styles.editBadge}>
                Editing
              </span>
            )}
          </div>

          <div style={styles.formGrid}>
            {!editing && (
              <div>
                <label style={styles.label}>
                  User ID
                </label>

                <input
                  name="userId"
                  value={form.userId}
                  onChange={handleChange}
                  placeholder="client-001"
                  required
                  style={styles.input}
                />
              </div>
            )}

            <div>
              <label style={styles.label}>
                Business Name
              </label>

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
              <label style={styles.label}>
                Phone
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="client@example.com"
                style={styles.input}
              />
            </div>

            {editing && (
              <div>
                <label style={styles.label}>
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="suspended">
                    Suspended
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>
            )}

            <div style={styles.fullWidth}>
              <label style={styles.label}>
                Address
              </label>

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

          <div style={styles.formActions}>
            <button
              type="button"
              onClick={closeForm}
              style={styles.cancelButton}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              style={styles.saveButton}
            >
              {saving
                ? editing
                  ? "Updating..."
                  : "Creating..."
                : editing
                ? "Update Client"
                : "Create Client"}
            </button>
          </div>
        </form>
      )}

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>
            Clients
          </h2>

          <span style={styles.count}>
            {clients.length}
          </span>
        </div>

        {loading ? (
          <div style={styles.empty}>
            Loading clients...
          </div>
        ) : clients.length === 0 ? (
          <div style={styles.empty}>
            No clients found.
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>
                    Business
                  </th>

                  <th style={styles.th}>
                    User
                  </th>

                  <th style={styles.th}>
                    Contact
                  </th>

                  <th style={styles.th}>
                    Status
                  </th>

                  <th style={styles.th}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td style={styles.td}>
                      <strong>
                        {client.business_name}
                      </strong>
                    </td>

                    <td style={styles.td}>
                      <div>
                        {client.name || "—"}
                      </div>

                      <small style={styles.small}>
                        {client.user_email ||
                          client.email ||
                          "—"}
                      </small>
                    </td>

                    <td style={styles.td}>
                      <div>
                        {client.phone || "—"}
                      </div>

                      <small style={styles.small}>
                        {client.email || "—"}
                      </small>
                    </td>

                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.status,
                          ...(client.status ===
                          "suspended"
                            ? styles.suspendedStatus
                            : client.status ===
                              "inactive"
                            ? styles.inactiveStatus
                            : {}),
                        }}
                      >
                        {client.status}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <div
                        style={styles.actionGroup}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(client)
                          }
                          style={styles.editButton}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(client.id)
                          }
                          style={
                            styles.deleteButton
                          }
                        >
                          Delete
                        </button>
                      </div>
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

  formHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },

  formTitle: {
    margin: 0,
    fontSize: "20px",
  },

  editBadge: {
    padding: "5px 9px",
    borderRadius: "999px",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontSize: "12px",
    fontWeight: 700,
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
    background: "#ffffff",
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
    fontFamily: "inherit",
  },

  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },

  cancelButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "11px 16px",
    background: "#ffffff",
    color: "#334155",
    fontWeight: 700,
    cursor: "pointer",
  },

  saveButton: {
    border: 0,
    borderRadius: "9px",
    padding: "11px 18px",
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
    minWidth: "820px",
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

  suspendedStatus: {
    background: "#fff7ed",
    color: "#c2410c",
  },

  inactiveStatus: {
    background: "#f1f5f9",
    color: "#64748b",
  },

  actionGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  editButton: {
    border: "1px solid #bfdbfe",
    borderRadius: "8px",
    padding: "8px 12px",
    background: "#ffffff",
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
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
