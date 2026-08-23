import { useEffect, useState } from "react";

const EMPTY_FORM = {
  userId: "",
  businessName: "",
  phone: "",
  email: "",
  address: "",
};

export default function ClientManager() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      setLoading(true);

      const response = await fetch("/api/clients/list", {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load clients"
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

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/clients/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: form.userId.trim(),
            businessName: form.businessName.trim(),
            phone: form.phone.trim(),
            email: form.email.trim().toLowerCase(),
            address: form.address.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to create client"
        );
      }

      setMessage("Client created successfully");

      setClients((current) => [
        data.data.client,
        ...current,
      ]);

      setForm(EMPTY_FORM);
      setShowForm(false);
    } catch (error) {
      setMessage(
        error.message || "Failed to create client"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            Client Management
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            Manage your clients.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm((current) => !current);
            setMessage("");
          }}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#0f172a",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {showForm ? "Close" : "Add Client"}
        </button>
      </div>

      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            borderRadius: "10px",
            background: "#f1f5f9",
            color: "#334155",
          }}
        >
          {message}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "20px",
            }}
          >
            Create Client
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            <div>
              <label>User ID</label>

              <input
                name="userId"
                value={form.userId}
                onChange={handleChange}
                placeholder="client-001"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label>Business Name</label>

              <input
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Test Business"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label>Phone</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="01700000000"
                style={inputStyle}
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="client@example.com"
                required
                style={inputStyle}
              />
            </div>

            <div
              style={{
                gridColumn: "1 / -1",
              }}
            >
              <label>Address</label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Dhaka, Bangladesh"
                rows="3"
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              background: "#0f172a",
              color: "#fff",
              fontWeight: 700,
              cursor: saving
                ? "not-allowed"
                : "pointer",
            }}
          >
            {saving
              ? "Creating..."
              : "Create Client"}
          </button>
        </form>
      )}

      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h2 style={{ margin: 0 }}>
            Clients
          </h2>
        </div>

        {loading ? (
          <div style={emptyStyle}>
            Loading clients...
          </div>
        ) : clients.length === 0 ? (
          <div style={emptyStyle}>
            No clients found.
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "700px",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>
                    Business
                  </th>

                  <th style={thStyle}>
                    User
                  </th>

                  <th style={thStyle}>
                    Phone
                  </th>

                  <th style={thStyle}>
                    Email
                  </th>

                  <th style={thStyle}>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td style={tdStyle}>
                      {client.business_name}
                    </td>

                    <td style={tdStyle}>
                      {client.user_id}
                    </td>

                    <td style={tdStyle}>
                      {client.phone || "—"}
                    </td>

                    <td style={tdStyle}>
                      {client.email || "—"}
                    </td>

                    <td style={tdStyle}>
                      {client.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  marginTop: "7px",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "9px",
  fontSize: "14px",
};

const thStyle = {
  padding: "14px",
  textAlign: "left",
  background: "#f8fafc",
  fontSize: "13px",
};

const tdStyle = {
  padding: "14px",
  borderTop: "1px solid #e2e8f0",
  fontSize: "14px",
};

const emptyStyle = {
  padding: "40px",
  textAlign: "center",
  color: "#64748b",
};
