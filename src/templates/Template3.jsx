import React from "react";

export default function Template3({ data = {}, onOrder }) {
  const {
    brandName = "Your Brand",
    productName = "Premium Product",
    headline = "যে পণ্যটি আপনার দৈনন্দিন জীবনকে আরও সহজ করবে",
    description = "স্মার্ট ডিজাইন, নির্ভরযোগ্য মান এবং ব্যবহারিক সুবিধার সমন্বয়ে তৈরি।",
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

          <div style={styles.headerBadge}>BEST SELLER</div>
        </div>
      </header>

      <main>
        <section style={styles.hero}>
          <div style={styles.container}>
            <div style={styles.heroGrid}>
              <div style={styles.visual}>
                <div style={styles.imageCard}>
                  {image ? (
                    <img
                      src={image}
                      alt={productName}
                      style={styles.image}
                    />
                  ) : (
                    <div style={styles.placeholder}>
                      <div style={styles.placeholderIcon}>📦</div>
                      <span>Product Image</span>
                    </div>
                  )}
                </div>

                <div style={styles.floatingBadge}>
                  ★ Customer Favorite
                </div>
              </div>

              <div style={styles.content}>
                <div style={styles.category}>
                  {productName}
                </div>

                <h1 style={styles.headline}>
                  {headline}
                </h1>

                <p style={styles.description}>
                  {description}
                </p>

                <div style={styles.divider} />

                <div style={styles.priceRow}>
                  <span style={styles.price}>{price}</span>

                  {oldPrice && (
                    <span style={styles.oldPrice}>
                      {oldPrice}
                    </span>
                  )}

                  <span style={styles.discount}>
                    SAVE
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleOrder}
                  style={styles.orderButton}
                >
                  {buttonText}
                  <span style={styles.arrow}>→</span>
                </button>

                <div style={styles.guarantees}>
                  <Guarantee
                    icon="✓"
                    title="Quality Assured"
                    text="মান নিশ্চিত"
                  />

                  <Guarantee
                    icon="⚡"
                    title="Fast Delivery"
                    text="দ্রুত ডেলিভারি"
                  />

                  <Guarantee
                    icon="↻"
                    title="Easy Support"
                    text="সহজ সহযোগিতা"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.featuresSection}>
          <div style={styles.container}>
            <div style={styles.centerHeader}>
              <div style={styles.eyebrow}>
                WHY YOU'LL LOVE IT
              </div>

              <h2 style={styles.sectionTitle}>
                শুধু একটি পণ্য নয়,
                <br />
                একটি ভালো অভিজ্ঞতা
              </h2>
            </div>

            <div style={styles.featureGrid}>
              <Feature
                number="01"
                title="Premium Design"
                text="আকর্ষণীয় ও ব্যবহারবান্ধব ডিজাইন যা প্রতিদিনের ব্যবহারে স্বাচ্ছন্দ্য দেয়।"
              />

              <Feature
                number="02"
                title="Reliable Quality"
                text="দীর্ঘদিন ব্যবহারের কথা মাথায় রেখে মানসম্মত উপকরণ নির্বাচন করা হয়েছে।"
              />

              <Feature
                number="03"
                title="Made For You"
                text="আপনার প্রয়োজনকে সামনে রেখে প্রতিটি গুরুত্বপূর্ণ বিষয় বিবেচনা করা হয়েছে।"
              />
            </div>
          </div>
        </section>

        <section style={styles.storySection}>
          <div style={styles.container}>
            <div style={styles.storyCard}>
              <div>
                <div style={styles.storyLabel}>
                  SIMPLE. SMART. BETTER.
                </div>

                <h2 style={styles.storyTitle}>
                  আপনার প্রয়োজনের
                  <br />
                  সহজ সমাধান
                </h2>
              </div>

              <div style={styles.storyText}>
                <p>
                  প্রতিদিনের ব্যস্ততায় এমন একটি পণ্য দরকার,
                  যা ব্যবহার করা সহজ এবং কাজের ক্ষেত্রে
                  সত্যিই উপকারী।
                </p>

                <p>
                  এই পণ্যটি সেই প্রয়োজনকে মাথায় রেখেই
                  তৈরি করা হয়েছে—সিম্পল, কার্যকর এবং
                  নির্ভরযোগ্য।
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.ctaSection}>
          <div style={styles.container}>
            <div style={styles.cta}>
              <div>
                <div style={styles.ctaSmall}>
                  LIMITED OFFER
                </div>

                <h2 style={styles.ctaTitle}>
                  {productName} আজই নিন
                </h2>

                <p style={styles.ctaText}>
                  অফারটি শেষ হওয়ার আগেই অর্ডার করুন।
                </p>
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
          © {new Date().getFullYear()} {brandName}
        </div>
      </footer>
    </div>
  );
}

function Guarantee({ icon, title, text }) {
  return (
    <div style={styles.guarantee}>
      <div style={styles.guaranteeIcon}>{icon}</div>

      <div>
        <strong style={styles.guaranteeTitle}>
          {title}
        </strong>

        <span style={styles.guaranteeText}>
          {text}
        </span>
      </div>
    </div>
  );
}

function Feature({ number, title, text }) {
  return (
    <article style={styles.feature}>
      <div style={styles.featureNumber}>{number}</div>

      <h3 style={styles.featureTitle}>{title}</h3>

      <p style={styles.featureText}>{text}</p>
    </article>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#172033",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: "1160px",
    margin: "0 auto",
    padding: "0 24px",
    boxSizing: "border-box",
  },

  header: {
    borderBottom: "1px solid #e8ebf0",
    background: "#ffffff",
  },

  brand: {
    fontSize: "20px",
    fontWeight: 800,
    letterSpacing: "-0.03em",
  },

  headerBadge: {
    padding: "7px 11px",
    borderRadius: "6px",
    background: "#172033",
    color: "#ffffff",
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "0.12em",
  },

  hero: {
    padding: "70px 0 85px",
    background: "#f7f8fa",
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 0.95fr) minmax(0, 1.05fr)",
    gap: "70px",
    alignItems: "center",
  },

  visual: {
    position: "relative",
  },

  imageCard: {
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "35px",
    boxSizing: "border-box",
    borderRadius: "24px",
    background: "#ffffff",
    border: "1px solid #e4e7ec",
  },

  image: {
    width: "100%",
    maxWidth: "470px",
    maxHeight: "500px",
    objectFit: "contain",
    display: "block",
  },

  placeholder: {
    width: "100%",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    color: "#98a2b3",
    fontWeight: 700,
  },

  placeholderIcon: {
    fontSize: "65px",
  },

  floatingBadge: {
    position: "absolute",
    right: "-15px",
    bottom: "30px",
    padding: "12px 16px",
    borderRadius: "10px",
    background: "#172033",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 800,
    boxShadow: "0 12px 30px rgba(23, 32, 51, 0.18)",
  },

  content: {
    maxWidth: "600px",
  },

  category: {
    marginBottom: "15px",
    color: "#667085",
    fontSize: "13px",
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  headline: {
    margin: "0 0 20px",
    fontSize: "clamp(36px, 5vw, 60px)",
    lineHeight: 1.05,
    letterSpacing: "-0.05em",
  },

  description: {
    margin: 0,
    color: "#667085",
    fontSize: "17px",
    lineHeight: 1.75,
  },

  divider: {
    height: "1px",
    margin: "28px 0",
    background: "#dfe3e8",
  },

  priceRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "13px",
    marginBottom: "25px",
  },

  price: {
    color: "#172033",
    fontSize: "37px",
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },

  oldPrice: {
    color: "#98a2b3",
    fontSize: "17px",
    textDecoration: "line-through",
  },

  discount: {
    padding: "5px 8px",
    borderRadius: "5px",
    background: "#e8f5ee",
    color: "#18794e",
    fontSize: "10px",
    fontWeight: 900,
  },

  orderButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "18px",
    border: "none",
    borderRadius: "10px",
    padding: "15px 22px",
    background: "#172033",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
  },

  arrow: {
    fontSize: "20px",
    lineHeight: 1,
  },

  guarantees: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "15px",
    marginTop: "32px",
  },

  guarantee: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },

  guaranteeIcon: {
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#eef1f5",
    color: "#172033",
    fontSize: "13px",
    fontWeight: 900,
  },

  guaranteeTitle: {
    display: "block",
    fontSize: "11px",
  },

  guaranteeText: {
    display: "block",
    marginTop: "3px",
    color: "#98a2b3",
    fontSize: "10px",
  },

  featuresSection: {
    padding: "90px 0",
    background: "#ffffff",
  },

  centerHeader: {
    maxWidth: "700px",
    margin: "0 auto 50px",
    textAlign: "center",
  },

  eyebrow: {
    marginBottom: "12px",
    color: "#667085",
    fontSize: "11px",
    fontWeight: 900,
    letterSpacing: "0.14em",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "38px",
    lineHeight: 1.15,
    letterSpacing: "-0.04em",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "20px",
  },

  feature: {
    padding: "30px",
    borderTop: "2px solid #172033",
    background: "#f8f9fb",
  },

  featureNumber: {
    marginBottom: "35px",
    color: "#98a2b3",
    fontSize: "12px",
    fontWeight: 900,
  },

  featureTitle: {
    margin: "0 0 10px",
    fontSize: "20px",
  },

  featureText: {
    margin: 0,
    color: "#667085",
    lineHeight: 1.7,
  },

  storySection: {
    padding: "0 0 90px",
    background: "#ffffff",
  },

  storyCard: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 0.8fr) minmax(0, 1.2fr)",
    gap: "70px",
    padding: "55px",
    borderRadius: "22px",
    background: "#172033",
    color: "#ffffff",
  },

  storyLabel: {
    marginBottom: "14px",
    color: "#98a2b3",
    fontSize: "11px",
    fontWeight: 900,
    letterSpacing: "0.13em",
  },

  storyTitle: {
    margin: 0,
    fontSize: "38px",
    lineHeight: 1.15,
    letterSpacing: "-0.04em",
  },

  storyText: {
    color: "#d0d5dd",
    fontSize: "16px",
    lineHeight: 1.8,
  },

  ctaSection: {
    padding: "0 0 70px",
  },

  cta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "25px",
    padding: "30px 35px",
    border: "1px solid #e4e7ec",
    borderRadius: "16px",
  },

  ctaSmall: {
    marginBottom: "7px",
    color: "#667085",
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "0.12em",
  },

  ctaTitle: {
    margin: 0,
    fontSize: "24px",
    letterSpacing: "-0.03em",
  },

  ctaText: {
    margin: "6px 0 0",
    color: "#667085",
    fontSize: "13px",
  },

  ctaButton: {
    flexShrink: 0,
    border: "none",
    borderRadius: "9px",
    padding: "13px 22px",
    background: "#172033",
    color: "#ffffff",
    fontWeight: 800,
    cursor: "pointer",
  },

  footer: {
    padding: "25px 0",
    borderTop: "1px solid #e8ebf0",
    color: "#98a2b3",
    fontSize: "12px",
  },
};
