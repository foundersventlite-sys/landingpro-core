import React from "react";

export default function Template1({
  data = {},
  onOrder,
}) {
  const {
    brandName = "Your Brand",
    productName = "Premium Product",
    headline = "আপনার পছন্দের পণ্য এখন আরও সহজে অর্ডার করুন",
    description = "উন্নত মানের পণ্য, দ্রুত ডেলিভারি এবং নির্ভরযোগ্য সার্ভিস।",
    price = "৳1,490",
    oldPrice = "৳1,790",
    image = "",
    buttonText = "অর্ডার করুন",
    phone = "",
  } = data;

  function handleOrder() {
    if (typeof onOrder === "function") {
      onOrder();
      return;
    }

    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.brand}>{brandName}</div>

          {phone && (
            <a href={`tel:${phone}`} style={styles.callButton}>
              কল করুন
            </a>
          )}
        </div>
      </header>

      <main>
        <section style={styles.hero}>
          <div style={styles.container}>
            <div style={styles.heroGrid}>
              <div style={styles.content}>
                <div style={styles.badge}>বিশেষ অফার</div>

                <h1 style={styles.headline}>
                  {headline}
                </h1>

                <p style={styles.description}>
                  {description}
                </p>

                <div style={styles.productName}>
                  {productName}
                </div>

                <div style={styles.priceRow}>
                  <strong style={styles.price}>
                    {price}
                  </strong>

                  {oldPrice && (
                    <span style={styles.oldPrice}>
                      {oldPrice}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleOrder}
                  style={styles.orderButton}
                >
                  {buttonText}
                </button>

                <div style={styles.trust}>
                  <span>✓ নিরাপদ অর্ডার</span>
                  <span>✓ দ্রুত ডেলিভারি</span>
                  <span>✓ মানসম্মত পণ্য</span>
                </div>
              </div>

              <div style={styles.imageArea}>
                {image ? (
                  <img
                    src={image}
                    alt={productName}
                    style={styles.productImage}
                  />
                ) : (
                  <div style={styles.imagePlaceholder}>
                    <div style={styles.placeholderIcon}>📦</div>
                    <span>Product Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section style={styles.features}>
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <span style={styles.smallTitle}>কেন আমাদের পণ্য?</span>

              <h2 style={styles.sectionTitle}>
                আপনার জন্য তৈরি একটি নির্ভরযোগ্য পছন্দ
              </h2>
            </div>

            <div style={styles.featureGrid}>
              <Feature
                icon="✓"
                title="প্রিমিয়াম কোয়ালিটি"
                text="মানসম্মত উপকরণ ও যত্নসহকারে তৈরি।"
              />

              <Feature
                icon="🚚"
                title="দ্রুত ডেলিভারি"
                text="সারা বাংলাদেশে দ্রুত ডেলিভারি সুবিধা।"
              />

              <Feature
                icon="🔒"
                title="নিরাপদ অর্ডার"
                text="আপনার তথ্য নিরাপদ ও গোপন রাখা হয়।"
              />
            </div>
          </div>
        </section>

        <section style={styles.cta}>
          <div style={styles.container}>
            <div style={styles.ctaCard}>
              <div>
                <div style={styles.ctaTitle}>
                  আজই অর্ডার করুন
                </div>

                <div style={styles.ctaText}>
                  সীমিত সময়ের অফার — দেরি না করে অর্ডার করুন।
                </div>
              </div>

              <button
                type="button"
                onClick={handleOrder}
                style={styles.ctaButton}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.container}>
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div style={styles.featureCard}>
      <div style={styles.featureIcon}>{icon}</div>

      <h3 style={styles.featureTitle}>
        {title}
      </h3>

      <p style={styles.featureText}>
        {text}
      </p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#0f172a",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "0 24px",
    boxSizing: "border-box",
  },

  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
  },

  brand: {
    fontSize: "21px",
    fontWeight: 800,
    letterSpacing: "-0.03em",
  },

  callButton: {
    textDecoration: "none",
    background: "#0f172a",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 700,
  },

  hero: {
    padding: "70px 0 80px",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #ffffff 55%, #eff6ff 100%)",
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1.05fr) minmax(300px, 0.95fr)",
    gap: "60px",
    alignItems: "center",
  },

  content: {
    maxWidth: "620px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 13px",
    borderRadius: "999px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "13px",
    fontWeight: 800,
    marginBottom: "20px",
  },

  headline: {
    margin: "0 0 18px",
    fontSize: "clamp(36px, 5vw, 62px)",
    lineHeight: 1.08,
    letterSpacing: "-0.045em",
  },

  description: {
    margin: "0 0 22px",
    color: "#64748b",
    fontSize: "18px",
    lineHeight: 1.7,
  },

  productName: {
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#334155",
  },

  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "25px",
  },

  price: {
    fontSize: "34px",
    color: "#dc2626",
    letterSpacing: "-0.03em",
  },

  oldPrice: {
    color: "#94a3b8",
    fontSize: "18px",
    textDecoration: "line-through",
  },

  orderButton: {
    border: "none",
    background: "#0f172a",
    color: "#ffffff",
    padding: "15px 30px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.18)",
  },

  trust: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    marginTop: "22px",
    color: "#64748b",
    fontSize: "13px",
    fontWeight: 600,
  },

  imageArea: {
    minHeight: "420px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    boxSizing: "border-box",
    background: "#ffffff",
    borderRadius: "28px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 25px 70px rgba(15, 23, 42, 0.08)",
  },

  productImage: {
    width: "100%",
    maxWidth: "480px",
    maxHeight: "500px",
    objectFit: "contain",
    display: "block",
  },

  imagePlaceholder: {
    width: "100%",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    borderRadius: "18px",
    background: "#f8fafc",
    color: "#94a3b8",
    fontWeight: 700,
  },

  placeholderIcon: {
    fontSize: "60px",
  },

  features: {
    padding: "80px 0",
    background: "#ffffff",
  },

  sectionHeader: {
    maxWidth: "650px",
    margin: "0 auto 40px",
    textAlign: "center",
  },

  smallTitle: {
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: 800,
  },

  sectionTitle: {
    margin: "10px 0 0",
    fontSize: "34px",
    lineHeight: 1.2,
    letterSpacing: "-0.035em",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "20px",
  },

  featureCard: {
    padding: "28px",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    background: "#ffffff",
  },

  featureIcon: {
    width: "46px",
    height: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "18px",
    borderRadius: "12px",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "20px",
    fontWeight: 800,
  },

  featureTitle: {
    margin: "0 0 8px",
    fontSize: "19px",
  },

  featureText: {
    margin: 0,
    color: "#64748b",
    lineHeight: 1.6,
  },

  cta: {
    padding: "0 0 80px",
  },

  ctaCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "25px",
    padding: "34px",
    borderRadius: "20px",
    background: "#0f172a",
    color: "#ffffff",
  },

  ctaTitle: {
    fontSize: "25px",
    fontWeight: 800,
    marginBottom: "7px",
  },

  ctaText: {
    color: "#cbd5e1",
  },

  ctaButton: {
    flexShrink: 0,
    border: "none",
    borderRadius: "10px",
    padding: "13px 22px",
    background: "#ffffff",
    color: "#0f172a",
    fontWeight: 800,
    cursor: "pointer",
  },

  footer: {
    padding: "25px 0",
    borderTop: "1px solid #e2e8f0",
    color: "#64748b",
    fontSize: "13px",
  },
};
