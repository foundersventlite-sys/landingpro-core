import React from "react";

export default function Template4({ data = {}, onOrder }) {
  const {
    brandName = "Your Brand",
    productName = "Premium Product",
    headline = "আপনার পছন্দের পণ্য, এখন আরও সহজে",
    description = "প্রতিদিনের প্রয়োজনের জন্য সুন্দর, কার্যকর এবং নির্ভরযোগ্য একটি সমাধান।",
    price = "৳1,490",
    oldPrice = "৳1,790",
    image = "",
    buttonText = "অর্ডার করুন",
    phone = "",
  } = data;

  const order = () => {
    if (typeof onOrder === "function") return onOrder();

    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.brand}>{brandName}</div>

          <button type="button" onClick={order} style={styles.headerButton}>
            অর্ডার করুন
          </button>
        </div>
      </header>

      <main>
        <section style={styles.hero}>
          <div style={styles.container}>
            <div style={styles.heroGrid}>
              <div style={styles.content}>
                <div style={styles.label}>NEW ARRIVAL</div>

                <h1 style={styles.headline}>{headline}</h1>

                <p style={styles.description}>{description}</p>

                <div style={styles.priceBox}>
                  <div>
                    <span style={styles.price}>{price}</span>

                    {oldPrice && (
                      <span style={styles.oldPrice}>{oldPrice}</span>
                    )}
                  </div>

                  <span style={styles.offer}>SPECIAL OFFER</span>
                </div>

                <button
                  type="button"
                  onClick={order}
                  style={styles.primaryButton}
                >
                  {buttonText}
                  <span>→</span>
                </button>

                <div style={styles.trustRow}>
                  <div>
                    <strong>✓</strong>
                    <span>Quality Product</span>
                  </div>

                  <div>
                    <strong>✓</strong>
                    <span>Fast Delivery</span>
                  </div>

                  <div>
                    <strong>✓</strong>
                    <span>Trusted Service</span>
                  </div>
                </div>
              </div>

              <div style={styles.productArea}>
                <div style={styles.circle} />

                <div style={styles.productCard}>
                  {image ? (
                    <img
                      src={image}
                      alt={productName}
                      style={styles.image}
                    />
                  ) : (
                    <div style={styles.placeholder}>
                      <span style={styles.placeholderIcon}>📦</span>
                      <span>{productName}</span>
                    </div>
                  )}
                </div>

                <div style={styles.productName}>
                  {productName}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.benefits}>
          <div style={styles.container}>
            <div style={styles.sectionHeading}>
              <span style={styles.sectionLabel}>WHY CHOOSE US</span>

              <h2 style={styles.sectionTitle}>
                আপনার সন্তুষ্টিই আমাদের
                <br />
                প্রথম অগ্রাধিকার
              </h2>
            </div>

            <div style={styles.benefitGrid}>
              <Benefit
                icon="01"
                title="Premium Quality"
                text="মানসম্মত পণ্য নির্বাচন এবং নির্ভরযোগ্য অভিজ্ঞতা নিশ্চিত করতে আমরা গুরুত্ব দিই।"
              />

              <Benefit
                icon="02"
                title="Quick Delivery"
                text="আপনার অর্ডার দ্রুত এবং নিরাপদভাবে পৌঁছে দেওয়ার জন্য আমরা কাজ করি।"
              />

              <Benefit
                icon="03"
                title="Customer First"
                text="অর্ডার থেকে ডেলিভারি পর্যন্ত প্রতিটি ধাপে সহজ ও সুন্দর সাপোর্ট।"
              />
            </div>
          </div>
        </section>

        <section style={styles.details}>
          <div style={styles.container}>
            <div style={styles.detailsGrid}>
              <div>
                <span style={styles.sectionLabel}>ABOUT THE PRODUCT</span>

                <h2 style={styles.detailsTitle}>
                  ব্যবহার সহজ।
                  <br />
                  ফলাফল আরও ভালো।
                </h2>
              </div>

              <div style={styles.detailsText}>
                <p>
                  {productName} এমনভাবে তৈরি করা হয়েছে যাতে
                  আপনার দৈনন্দিন ব্যবহারে প্রয়োজনীয় সুবিধাগুলো
                  সহজেই পাওয়া যায়।
                </p>

                <p>
                  সুন্দর ডিজাইন, ব্যবহারিক ফিচার এবং নির্ভরযোগ্য
                  মান—সবকিছু একসাথে একটি সম্পূর্ণ অভিজ্ঞতা
                  তৈরি করে।
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.finalCta}>
          <div style={styles.container}>
            <div style={styles.ctaCard}>
              <div>
                <span style={styles.ctaLabel}>READY TO ORDER?</span>

                <h2 style={styles.ctaTitle}>
                  {productName} আপনার জন্য অপেক্ষা করছে।
                </h2>
              </div>

              <button
                type="button"
                onClick={order}
                style={styles.ctaButton}
              >
                {buttonText}
                <span>→</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <span>{brandName}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <article style={styles.benefit}>
      <div style={styles.benefitIcon}>{icon}</div>

      <h3 style={styles.benefitTitle}>{title}</h3>

      <p style={styles.benefitText}>{text}</p>
    </article>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111827",
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
    height: "76px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #eceef2",
    background: "#ffffff",
  },

  brand: {
    fontSize: "21px",
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },

  headerButton: {
    border: "1px solid #111827",
    borderRadius: "8px",
    padding: "10px 17px",
    background: "#ffffff",
    color: "#111827",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  hero: {
    padding: "80px 0 95px",
    background: "#f4f5f7",
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) minmax(0, 0.9fr)",
    gap: "65px",
    alignItems: "center",
  },

  content: {
    maxWidth: "620px",
  },

  label: {
    display: "inline-block",
    marginBottom: "20px",
    padding: "7px 10px",
    borderRadius: "5px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "0.13em",
  },

  headline: {
    margin: 0,
    fontSize: "clamp(38px, 5vw, 64px)",
    lineHeight: 1.04,
    letterSpacing: "-0.055em",
  },

  description: {
    maxWidth: "540px",
    margin: "25px 0 0",
    color: "#667085",
    fontSize: "17px",
    lineHeight: 1.75,
  },

  priceBox: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "14px",
    margin: "30px 0 24px",
  },

  price: {
    marginRight: "12px",
    fontSize: "38px",
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },

  oldPrice: {
    color: "#98a2b3",
    fontSize: "16px",
    textDecoration: "line-through",
  },

  offer: {
    padding: "6px 9px",
    borderRadius: "4px",
    background: "#e5e7eb",
    color: "#374151",
    fontSize: "9px",
    fontWeight: 900,
    letterSpacing: "0.08em",
  },

  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "22px",
    minWidth: "180px",
    border: 0,
    borderRadius: "9px",
    padding: "15px 22px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
  },

  trustRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "30px",
  },

  productArea: {
    position: "relative",
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
    position: "absolute",
    width: "390px",
    height: "390px",
    borderRadius: "50%",
    background: "#e2e5e9",
  },

  productCard: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "450px",
    minHeight: "430px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "35px",
    boxSizing: "border-box",
    borderRadius: "22px",
    background: "#ffffff",
    border: "1px solid #e1e4e8",
    boxShadow: "0 25px 60px rgba(17, 24, 39, 0.08)",
  },

  image: {
    width: "100%",
    height: "390px",
    objectFit: "contain",
    display: "block",
  },

  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    color: "#98a2b3",
    fontWeight: 700,
  },

  placeholderIcon: {
    fontSize: "70px",
  },

  productName: {
    position: "absolute",
    zIndex: 3,
    right: "0",
    bottom: "35px",
    padding: "10px 15px",
    borderRadius: "7px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: 800,
  },

  benefits: {
    padding: "95px 0",
    background: "#ffffff",
  },

  sectionHeading: {
    marginBottom: "50px",
  },

  sectionLabel: {
    display: "block",
    marginBottom: "12px",
    color: "#667085",
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "0.14em",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "40px",
    lineHeight: 1.13,
    letterSpacing: "-0.045em",
  },

  benefitGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "20px",
  },

  benefit: {
    padding: "30px",
    border: "1px solid #e5e7eb",
    borderRadius: "15px",
  },

  benefitIcon: {
    width: "42px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
    borderRadius: "8px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: 900,
  },

  benefitTitle: {
    margin: "0 0 10px",
    fontSize: "20px",
    letterSpacing: "-0.02em",
  },

  benefitText: {
    margin: 0,
    color: "#667085",
    lineHeight: 1.75,
    fontSize: "14px",
  },

  details: {
    padding: "0 0 95px",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 0.9fr) minmax(0, 1.1fr)",
    gap: "70px",
    padding: "60px",
    borderRadius: "20px",
    background: "#111827",
    color: "#ffffff",
  },

  detailsTitle: {
    margin: 0,
    fontSize: "40px",
    lineHeight: 1.15,
    letterSpacing: "-0.045em",
  },

  detailsText: {
    color: "#d1d5db",
    fontSize: "16px",
    lineHeight: 1.85,
  },

  finalCta: {
    paddingBottom: "75px",
  },

  ctaCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "25px",
    padding: "32px 35px",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
  },

  ctaLabel: {
    display: "block",
    marginBottom: "8px",
    color: "#667085",
    fontSize: "9px",
    fontWeight: 900,
    letterSpacing: "0.13em",
  },

  ctaTitle: {
    margin: 0,
    fontSize: "24px",
    letterSpacing: "-0.03em",
  },

  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "15px",
    flexShrink: 0,
    border: 0,
    borderRadius: "8px",
    padding: "13px 20px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  footer: {
    padding: "25px 0",
    borderTop: "1px solid #eceef2",
    color: "#98a2b3",
    fontSize: "12px",
  },
};
