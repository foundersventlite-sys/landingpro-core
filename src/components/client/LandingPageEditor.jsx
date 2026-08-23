import { useEffect, useState } from "react";

const TEMPLATES = [
  { id: "template-1", name: "Template 1" },
  { id: "template-2", name: "Template 2" },
  { id: "template-3", name: "Template 3" },
  { id: "template-4", name: "Template 4" },
  { id: "template-5", name: "Template 5" },
];

const EMPTY_FORM = {
  name: "",
  slug: "",
  templateId: "template-1",
  headline: "",
  description: "",
  buttonText: "Order Now",
  buttonUrl: "",
  phone: "",
  imageUrl: "",
};

export default function LandingPageEditor({
  pageId = null,
  onBack = null,
  onSaved = null,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(Boolean(pageId));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (pageId) {
      loadPage();
    }
  }, [pageId]);

  async function loadPage() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `/api/landing-pages/get?id=${encodeURIComponent(pageId)}`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Failed to load landing page"
        );
      }

      const page =
        data?.data?.landingPage ||
        data?.data?.page ||
        data?.data;

      if (!page) {
        throw new Error("Landing page data not found");
      }

      setForm({
        name: page.name || "",
        slug: page.slug || "",
        templateId:
          page.template_id ||
          page.templateId ||
          "template-1",
        headline: page.headline || "",
        description: page.description || "",
        buttonText:
          page.button_text ||
          page.buttonText ||
          "Order Now",
        buttonUrl:
          page.button_url ||
          page.buttonUrl ||
          "",
        phone: page.phone || "",
        imageUrl:
          page.image_url ||
          page.imageUrl ||
          "",
      });
    } catch (error) {
      setMessage(
        error?.message || "Failed to load landing page"
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

    setSaving(true);
    setMessage("");

    try {
      const endpoint = pageId
        ? `/api/landing-pages/update?id=${encodeURIComponent(
            pageId
          )}`
        : "/api/landing-pages/create";

      const method = pageId ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: pageId || undefined,
          name: form.name.trim(),
          slug: form.slug.trim(),
          templateId: form.templateId,
          headline: form.headline.trim(),
          description: form.description.trim(),
          buttonText: form.buttonText.trim(),
          buttonUrl: form.buttonUrl.trim(),
          phone: form.phone.trim(),
          imageUrl: form.imageUrl.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message ||
            `Failed to ${pageId ? "update" : "create"} landing page`
        );
      }

      setMessage(
        pageId
          ? "Landing page updated successfully"
          : "Landing page created successfully"
      );

      const savedPage =
        data?.data?.landingPage ||
        data?.data?.page ||
        data?.data;

      if (onSaved) {
        onSaved(savedPage);
      }
    } catch (error) {
      setMessage(
        error?.message ||
          `Failed to ${pageId ? "update" : "create"} landing page`
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.loading}>
            Loading landing page...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            {pageId
              ? "Edit Landing Page"
              : "Create Landing Page"}
          </h1>

          <p style={styles.subtitle}>
            Configure your landing page content.
          </p>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            style={styles.secondaryButton}
          >
            ← Back
          </button>
        )}
      </div>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>
            Basic Information
          </h2>

          <div style={styles.grid}>
            <Field
              label="Page Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="My Product Landing Page"
              required
            />

            <Field
              label="Slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="my-product"
            />

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

            <Field
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="01700000000"
            />
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>
            Landing Page Content
          </h2>

          <div style={styles.singleColumn}>
            <Field
              label="Headline"
              name="headline"
              value={form.headline}
              onChange={handleChange}
              placeholder="Your powerful headline goes here"
            />

            <div>
              <label style={styles.label}>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write a short description about your product or offer."
                rows={5}
                style={{
                  ...styles.input,
                  resize: "vertical",
                }}
              />
            </div>

            <Field
              label="Product Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
            />
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>
            Call To Action
          </h2>

          <div style={styles.grid}>
            <Field
              label="Button Text"
              name="buttonText"
              value={form.buttonText}
              onChange={handleChange}
              placeholder="Order Now"
            />

            <Field
              label="Button URL"
              name="buttonUrl"
              value={form.buttonUrl}
              onChange={handleChange}
              placeholder="https://example.com/order"
            />
          </div>
        </div>

        <div style={styles.previewCard}>
          <h2 style={styles.sectionTitle}>
            Live Content Preview
          </h2>

          <div style={styles.preview}>
            {form.imageUrl ? (
              <img
                src={form.imageUrl}
                alt="Landing page"
                style={styles.previewImage}
              />
            ) : (
              <div style={styles.imagePlaceholder}>
                Product Image
              </div>
            )}

            <div style={styles.previewContent}>
              <div style={styles.previewTemplate}>
                {
                  TEMPLATES.find(
                    (template) =>
                      template.id === form.templateId
                  )?.name
                }
              </div>

              <h3 style={styles.previewHeadline}>
                {form.headline ||
                  "Your headline will appear here"}
              </h3>

              <p style={styles.previewDescription}>
                {form.description ||
                  "Your landing page description will appear here."}
              </p>

              <button
                type="button"
                style={styles.previewButton}
              >
                {form.buttonText || "Order Now"}
              </button>
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              style={styles.secondaryButton}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{
              ...styles.primaryButton,
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving
              ? "Saving..."
              : pageId
              ? "Save Changes"
              : "Create Landing Page"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label style={styles.label}>
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={styles.input}
      />
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

  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "20px",
  },

  previewCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: "0 0 20px",
    fontSize: "19px",
    fontWeight: 800,
    color: "#0f172a",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },

  singleColumn: {
    display: "flex",
    flexDirection: "column",
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

  message: {
    marginBottom: "20px",
    padding: "12px 16px",
    borderRadius: "10px",
    background: "#f1f5f9",
    color: "#334155",
    fontSize: "14px",
  },

  loading: {
    padding: "50px",
    textAlign: "center",
    color: "#64748b",
  },

  preview: {
    display: "grid",
    gridTemplateColumns:
      "minmax(220px, 0.8fr) minmax(280px, 1.2fr)",
    gap: "24px",
    padding: "20px",
    borderRadius: "14px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },

  previewImage: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "12px",
    background: "#e2e8f0",
  },

  imagePlaceholder: {
    height: "260px",
    borderRadius: "12px",
    background: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
    fontWeight: 700,
  },

  previewContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  previewTemplate: {
    display: "inline-block",
    alignSelf: "flex-start",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#e2e8f0",
    color: "#475569",
    fontSize: "12px",
    fontWeight: 700,
    marginBottom: "14px",
  },

  previewHeadline: {
    margin: "0 0 12px",
    fontSize: "28px",
    lineHeight: 1.2,
    color: "#0f172a",
  },

  previewDescription: {
    margin: "0 0 20px",
    color: "#64748b",
    lineHeight: 1.6,
  },

  previewButton: {
    alignSelf: "flex-start",
    border: 0,
    borderRadius: "10px",
    padding: "12px 18px",
    background: "#0f172a",
    color: "#ffffff",
    fontWeight: 700,
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "32px",
  },

  primaryButton: {
    border: 0,
    borderRadius: "10px",
    padding: "12px 20px",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  secondaryButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    padding: "12px 18px",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },
};
