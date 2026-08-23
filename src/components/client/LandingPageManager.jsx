import { useEffect, useState } from "react";

const EMPTY_FORM = {
  name: "",
  slug: "",
  templateId: "template-1",
};

const TEMPLATES = [
  {
    id: "template-1",
    name: "Template 1",
  },
  {
    id: "template-2",
    name: "Template 2",
  },
  {
    id: "template-3",
    name: "Template 3",
  },
  {
    id: "template-4",
    name: "Template 4",
  },
  {
    id: "template-5",
    name: "Template 5",
  },
];

export default function LandingPageManager() {
  const [pages, setPages] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/landing-pages", {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Failed to load landing pages"
        );
      }

      setPages(data?.data?.landingPages || data?.data?.pages || []);
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

    if (!form.name.trim()) {
      setMessage("Landing page name is required");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/landing-pages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: form.name.trim(),
          slug: form.slug.trim(),
          templateId: form.templateId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Failed to create landing page"
        );
      }

      const createdPage =
        data?.data?.landingPage ||
        data?.data?.page ||
        data?.data;

      if (createdPage) {
        setPages((current) => [
          createdPage,
          ...current,
        ]);
      } else {
        await loadPages();
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

  function getTemplateName(templateId) {
    const template = TEMPLATES.find(
      (item) => item.id === templateId
    );

    return template?.name || templateId || "Template 1";
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Landing Pages
          </h1>

          <p style={styles.subtitle}>
            Create and manage your landing pages.
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
          {showForm ? "Close" : "Create Landing Page"}
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
          <h2 style={styles.formTitle}>
            Create Landing Page
          </h2>

          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>
                Page Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="My Landing Page"
                required
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>
                Slug
              </label>

              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="my-landing-page"
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>
                Template
              </label>

              <select
                name="templateId"
                value={form.templateId}
                onChange={handleChange}
                style={styles.input}
              >
                {TEMPLATES.map((template) => (
                  <option
                    key={template.id}
                    value={template.id}
                  >
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              ...styles.primaryButton,
              marginTop: "20px",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving
              ? "Creating..."
              : "Create Landing Page"}
          </button>
        </form>
      )}

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>
            Your Landing Pages
          </h2>

          <button
            type="button"
            onClick={loadPages}
            disabled={loading}
            style={styles.refreshButton}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div style={styles.empty}>
            Loading landing pages...
          </div>
        ) : pages.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyTitle}>
              No landing pages yet
            </div>

            <div style={styles.emptyText}>
              Create your first landing page to get started.
            </div>
          </div>
        ) : (
          <div style={styles.list}>
            {pages.map((page) => (
              <div
                key={page.id}
                style={styles.pageItem}
              >
                <div>
                  <div style={styles.pageName}>
                    {page.name ||
                      page.title ||
                      "Untitled Landing Page"}
                  </div>

                  <div style={styles.pageMeta}>
                    Template:{" "}
                    {getTemplateName(
                      page.template_id ||
                        page.templateId
                    )}
                  </div>

                  <div style={styles.pageMeta}>
                    Status:{" "}
                    {page.status || "draft"}
                  </div>
                </div>

                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => {
                    setMessage(
                      "Landing page editor will be available in the next step."
                    );
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    fontWeight: 800,
    color: "#0f172a",
  },

  subtitle: {
    margin: "8px 0 0",
    color: "#64748b",
    lineHeight: 1.5,
  },

  primaryButton: {
    border: 0,
    borderRadius: "10px",
    padding: "12px 18px",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  secondaryButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "9px 14px",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  },

  refreshButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "8px 13px",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  },

  message: {
    marginBottom: "20px",
    padding: "12px 16px",
    borderRadius: "10px",
    background: "#f1f5f9",
    color: "#334155",
    fontSize: "14px",
  },

  formCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "24px",
  },

  formTitle: {
    margin: "0 0 20px",
    fontSize: "20px",
    color: "#0f172a",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#334155",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    fontSize: "14px",
    background: "#ffffff",
    color: "#0f172a",
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
    justifyContent: "space-between",
    gap: "12px",
    padding: "20px 24px",
    borderBottom: "1px solid #e2e8f0",
  },

  cardTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#0f172a",
  },

  empty: {
    padding: "50px 24px",
    textAlign: "center",
    color: "#64748b",
  },

  emptyTitle: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#334155",
    marginBottom: "6px",
  },

  emptyText: {
    fontSize: "14px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
  },

  pageItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    padding: "18px 24px",
    borderBottom: "1px solid #e2e8f0",
  },

  pageName: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "6px",
  },

  pageMeta: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "3px",
  },
};
