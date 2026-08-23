import { useEffect, useState } from "react";
import LandingPageEditor from "./LandingPageEditor";

export default function LandingPageManager() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/landing-pages/list", {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Failed to load landing pages"
        );
      }

      const list =
        data?.data?.landingPages ||
        data?.data?.pages ||
        data?.data ||
        [];

      setPages(Array.isArray(list) ? list : []);
    } catch (error) {
      setMessage(
        error?.message || "Failed to load landing pages"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    setEditingPage(null);
    setMessage("");
    setShowEditor(true);
  }

  function handleEdit(page) {
    setEditingPage(page);
    setMessage("");
    setShowEditor(true);
  }

  function handleSaved() {
    setShowEditor(false);
    setEditingPage(null);
    loadPages();
  }

  async function handleDelete(page) {
    const id = page?.id;

    if (!id) return;

    const confirmed = window.confirm(
      `Delete "${page.name || "this landing page"}"?`
    );

    if (!confirmed) return;

    try {
      setMessage("");

      const response = await fetch(
        `/api/landing-pages/delete?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Failed to delete landing page"
        );
      }

      setMessage("Landing page deleted successfully");
      await loadPages();
    } catch (error) {
      setMessage(
        error?.message || "Failed to delete landing page"
      );
    }
  }

  function getPageId(page) {
    return page?.id || page?._id;
  }

  function getTemplateId(page) {
    return (
      page?.template_id ||
      page?.templateId ||
      "template-1"
    );
  }

  function getStatus(page) {
    return page?.status || "draft";
  }

  if (showEditor) {
    return (
      <LandingPageEditor
        pageId={getPageId(editingPage)}
        onBack={() => {
          setShowEditor(false);
          setEditingPage(null);
        }}
        onSaved={handleSaved}
      />
    );
  }

  return (
    <section style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.badge}>Client Area</div>

          <h1 style={styles.title}>
            Landing Pages
          </h1>

          <p style={styles.subtitle}>
            Create, edit and manage your landing pages.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          style={styles.createButton}
        >
          + Create Landing Page
        </button>
      </div>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      {loading ? (
        <div style={styles.emptyCard}>
          <div style={styles.loading}>
            Loading landing pages...
          </div>
        </div>
      ) : pages.length === 0 ? (
        <div style={styles.emptyCard}>
          <div style={styles.emptyIcon}>+</div>

          <h2 style={styles.emptyTitle}>
            No landing pages yet
          </h2>

          <p style={styles.emptyText}>
            Create your first landing page to get started.
          </p>

          <button
            type="button"
            onClick={handleCreate}
            style={styles.createButton}
          >
            Create Your First Landing Page
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {pages.map((page) => {
            const pageId = getPageId(page);

            return (
              <article
                key={pageId || page.slug || page.name}
                style={styles.card}
              >
                <div style={styles.cardTop}>
                  <div>
                    <h2 style={styles.cardTitle}>
                      {page.name || "Untitled Landing Page"}
                    </h2>

                    <p style={styles.slug}>
                      /{page.slug || "no-slug"}
                    </p>
                  </div>

                  <span
                    style={{
                      ...styles.status,
                      ...(getStatus(page) === "published"
                        ? styles.published
                        : styles.draft),
                    }}
                  >
                    {getStatus(page)}
                  </span>
                </div>

                <div style={styles.details}>
                  <div style={styles.detail}>
                    <span style={styles.detailLabel}>
                      Template
                    </span>

                    <strong>
                      {getTemplateId(page)}
                    </strong>
                  </div>

                  <div style={styles.detail}>
                    <span style={styles.detailLabel}>
                      Phone
                    </span>

                    <strong>
                      {page.phone || "Not set"}
                    </strong>
                  </div>
                </div>

                <div style={styles.actions}>
                  <button
                    type="button"
                    onClick={() => handleEdit(page)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>

                  {pageId && (
                    <button
                      type="button"
                      onClick={() => handleDelete(page)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

const styles = {
  page: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px",
    boxSizing: "border-box",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#0f172a",
  },

  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "28px",
  },

  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#ecfdf5",
    color: "#047857",
    fontSize: "12px",
    fontWeight: 800,
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    lineHeight: 1.2,
    letterSpacing: "-0.03em",
  },

  subtitle: {
    margin: "8px 0 0",
    color: "#64748b",
    lineHeight: 1.5,
  },

  createButton: {
    border: 0,
    borderRadius: "10px",
    padding: "12px 18px",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: "14px",
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

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "20px",
    boxShadow:
      "0 8px 30px rgba(15, 23, 42, 0.04)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "20px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 800,
  },

  slug: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: "13px",
  },

  status: {
    display: "inline-flex",
    padding: "5px 9px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 800,
    textTransform: "capitalize",
  },

  published: {
    background: "#dcfce7",
    color: "#166534",
  },

  draft: {
    background: "#f1f5f9",
    color: "#475569",
  },

  details: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "20px",
  },

  detail: {
    padding: "12px",
    borderRadius: "10px",
    background: "#f8fafc",
    overflow: "hidden",
  },

  detailLabel: {
    display: "block",
    marginBottom: "5px",
    color: "#64748b",
    fontSize: "11px",
    textTransform: "uppercase",
    fontWeight: 700,
  },

  actions: {
    display: "flex",
    gap: "10px",
    paddingTop: "16px",
    borderTop: "1px solid #e2e8f0",
  },

  editButton: {
    flex: 1,
    border: 0,
    borderRadius: "9px",
    padding: "10px",
    background: "#0f172a",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  },

  deleteButton: {
    border: "1px solid #fecaca",
    borderRadius: "9px",
    padding: "10px 14px",
    background: "#ffffff",
    color: "#dc2626",
    fontWeight: 700,
    cursor: "pointer",
  },

  emptyCard: {
    background: "#ffffff",
    border: "1px dashed #cbd5e1",
    borderRadius: "18px",
    padding: "60px 24px",
    textAlign: "center",
  },

  emptyIcon: {
    width: "48px",
    height: "48px",
    margin: "0 auto 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    background: "#f1f5f9",
    color: "#475569",
    fontSize: "28px",
    fontWeight: 400,
  },

  emptyTitle: {
    margin: "0 0 8px",
    fontSize: "20px",
  },

  emptyText: {
    margin: "0 0 22px",
    color: "#64748b",
  },

  loading: {
    color: "#64748b",
    padding: "20px",
  },
};
