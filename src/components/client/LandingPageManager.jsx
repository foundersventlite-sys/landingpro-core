import { useEffect, useState } from "react";
import { landingPageService } from "../../services/landingPageService";

const EMPTY_FORM = {
  template: "Template 1",
  title: "",
  slug: "",
};

const TEMPLATES = [
  "Template 1",
  "Template 2",
  "Template 3",
  "Template 4",
  "Template 5",
];

export default function LandingPageManager({ clientId }) {
  const [landingPages, setLandingPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    loadLandingPages();
  }, []);

  async function loadLandingPages() {
    try {
      setLoading(true);
      setMessage("");

      const response = await landingPageService.getAll();

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load landing pages"
        );
      }

      setLandingPages(response.data?.landingPages || []);
    } catch (error) {
      setMessage(
        error?.message || "Failed to load landing pages"
      );
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

    if (!clientId) {
      setMessage("Client ID is missing");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await landingPageService.create({
        clientId,
        template: form.template,
        title: form.title.trim(),
        slug: form.slug.trim().toLowerCase(),
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to create landing page"
        );
      }

      const created = response.data?.landingPage;

      if (created) {
        setLandingPages((current) => [
          created,
          ...current,
        ]);
      }

      setForm(EMPTY_FORM);
      setShowForm(false);
      setMessage("Landing page created successfully");
    } catch (error) {
      setMessage(
        error?.message || "Failed to create landing page"
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
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
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
            Landing Pages
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            Create and manage your landing pages.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm((current) => !current);
            setMessage("");
          }}
          style={buttonStyle}
        >
          {showForm ? "Close" : "Create Landing Page"}
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
            Create Landing Page
          </h2>

          <label style={labelStyle}>
            Template
          </label>

          <select
            name="template"
            value={form.template}
            onChange={handleChange}
            style={inputStyle}
          >
            {TEMPLATES.map((template) => (
              <option
                key={template}
                value={template}
              >
                {template}
              </option>
            ))}
          </select>

          <label style={labelStyle}>
            Page Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="My Landing Page"
            required
            style={inputStyle}
          />

          <label style={labelStyle}>
            Slug
          </label>

          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="my-landing-page"
            required
            pattern="[a-z0-9-]+"
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={saving}
            style={{
              ...buttonStyle,
              marginTop: "8px",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving
              ? "Creating..."
              : "Create Landing Page"}
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
            Your Landing Pages
          </h2>
        </div>

        {loading ? (
          <div style={emptyStyle}>
            Loading landing pages...
          </div>
        ) : landingPages.length === 0 ? (
          <div style={emptyStyle}>
            No landing pages yet.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "700px",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Template</th>
                  <th style={thStyle}>Slug</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>

              <tbody>
                {landingPages
                  .filter(
                    (page) =>
                      !clientId ||
                      page.client_id === clientId
                  )
                  .map((page) => (
                    <tr key={page.id}>
                      <td style={tdStyle}>
                        {page.title}
                      </td>

                      <td style={tdStyle}>
                        {page.template}
                      </td>

                      <td style={tdStyle}>
                        {page.slug}
                      </td>

                      <td style={tdStyle}>
                        {page.status}
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

const buttonStyle = {
  border: "none",
  borderRadius: "10px",
  padding: "12px 18px",
  background: "#0f172a",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  marginTop: "16px",
  fontSize: "14px",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
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
