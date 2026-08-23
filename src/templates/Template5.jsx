import React from "react";

export default function Template5({ data = {}, onOrder }) {
  const {
    brandName = "Your Brand",
    productName = "Premium Product",
    headline = "যেটা আপনার প্রয়োজন, সেটাই এখন হাতের কাছে",
    description = "স্মার্ট ডিজাইন, প্রয়োজনীয় ফিচার এবং নির্ভরযোগ্য মান—সবকিছু একসাথে।",
    price = "৳1,490",
    oldPrice = "৳1,790",
    image = "",
    buttonText = "এখনই অর্ডার করুন",
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
          <div style={styles.logo}>{brandName}</div>

          <button
            type="button"
            onClick={handleOrder}
            style={styles.topButton}
          >
            অর্ডার করুন
          </button>
        </div>
      </header>

      <main>
        <section style={styles.hero}>
          <div style={styles.container}>
            <div style={styles.heroGrid}>
              <div style={styles.heroContent}>
                <div style={styles.eyebrow}>LIMITED OFFER</div>

                <h1 style={styles.headline}>{headline}</h1>

                <p style={styles.description}>{description}</p>

                <div style={styles.priceRow}>
                  <span style={styles.price}>{price}</span>

                  {oldPrice && (
                    <span style={styles.oldPrice}>{oldPrice}</span>
                  )}

                  <span style={styles.discount}>SAVE MORE</span>
                </div>

                <button
                  type="button"
                  onClick={handleOrder}
                  style={styles.primaryButton}
                >
                  {buttonText}
                  <span style={styles.arrow}>→</span>
                </button>

                <div style={styles.smallNote}>
                  ✓ নিরাপদ অর্ডার &nbsp; ✓ দ্রুত ডেলিভারি &nbsp; ✓ বিশ্বস্ত সার্ভিস
                </div>
              </div>

              <div style={styles.visual}>
                <div style={styles.backgroundShape} />

                <div style={styles.imageFrame}>
                  {image ? (
                    <img
                      src={image}
                      alt={productName}
                      style={styles.productImage}
                    />
                  ) : (
                    <div style={styles.placeholder}>
                      <div style={styles.placeholderIcon}>✦</div>
                      <div>{productName}</div>
                    </div>
                  )}
                </div>

                <div style={styles.floatingCard}>
                  <span style={styles.floatingNumber}>01</span>

                  <div>
                    <strong style={styles.floatingTitle}>
                      Premium Choice
                    </strong>

                    <span style={styles.floatingText}>
                      Made for everyday use
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.featureSection}>
          <div style={styles.container}>
            <div style={styles.sectionIntro}>
              <div style={styles.sectionEyebrow}>FEATURES</div>

              <h2 style={styles.sectionTitle}>
                কেন এই পণ্যটি
                <br />
                আপনার জন্য?
              </h2>
            </div>

            <div style={styles.featureGrid}>
              <Feature
                number="01"
                title="স্মার্ট ডিজাইন"
                text="ব্যবহার সহজ করার জন্য পরিষ্কার এবং ব্যবহারিক ডিজাইন।"
              />

              <Feature
                number="02"
                title="নির্ভরযোগ্য মান"
                text="দৈনন্দিন ব্যবহারের কথা মাথায় রেখে মানসম্মত উপকরণ।"
              />

              <Feature
                number="03"
                title="সহজ ব্যবহার"
                text="জটিলতা ছাড়াই দ্রুত ব্যবহার করা যায়।"
              />

              <Feature
                number="04"
                title="দীর্ঘস্থায়ী"
                text="নিয়মিত ব্যবহারের জন্য তৈরি একটি নির্ভরযোগ্য সমাধান।"
              />
            </div>
          </div>
        </section>

        <section style={styles.storySection}>
          <div style={styles.container}>
            <div style={styles.storyGrid}>
              <div style={styles.storyVisual}>
                <div style={styles.storyShape}>
                  {image ? (
                    <img
                      src={image}
                      alt={productName}
                      style={styles.storyImage}
                    />
                  ) : (
                    <span style={styles.storyPlaceholder}>
                      {productName}
                    </span>
                  )}
                </div>
              </div>

              <div style={styles.storyContent}>
                <div style={styles.sectionEyebrow}>THE PRODUCT</div>

                <h2 style={styles.storyTitle}>
                  ছোট ছোট সুবিধা,
                  <br />
                  বড় পার্থক্য।
                </h2>

                <p style={styles.storyText}>
                  {productName} আপনার দৈনন্দিন প্রয়োজনকে আরও সহজ
                  এবং আরামদায়ক করার জন্য তৈরি করা হয়েছে।
                </p>

                <p style={styles.storyText}>
                  প্রয়োজনীয় ফিচার, সুন্দর লুক এবং ব্যবহারিক
                  ডিজাইনের সমন্বয়ে এটি হতে পারে আপনার পরবর্তী
                  পছন্দ।
                </p>

                <button
                  type="button"
                  onClick={handleOrder}
                  style={styles.secondaryButton}
                >
                  বিস্তারিত জানতে অর্ডার করুন
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.trustSection}>
          <div style={styles.container}>
            <div style={styles.trustBox}>
              <div>
                <div style={styles.sectionEyebrow}>SHOP WITH CONFIDENCE</div>

                <h2 style={styles.trustTitle}>
                  আপনার অর্ডার,
                  <br />
                  আমাদের দায়িত্ব।
                </h2>
              </div>

              <div style={styles.trustItems}>
                <TrustItem
                  title="Fast Delivery"
                  text="দ্রুত ডেলিভারি সার্ভিস"
                />

                <TrustItem
                  title="Easy Order"
                  text="সহজ অর্ডার প্রসেস"
                />

                <TrustItem
                  title="Customer Support"
                  text="সহযোগিতাপূর্ণ সাপোর্ট"
                />
              </div>
            </div>
          </div>
        </section>

        <section style={styles.ctaSection}>
          <div style={styles.container}>
            <div style={styles.cta}>
              <div>
                <div style={styles.ctaEyebrow}>READY TO GET YOURS?</div>

                <h2 style={styles.ctaTitle}>
                  {productName}
                </h2>

                <p style={styles.ctaText}>
                  আজই অর্ডার করুন এবং আপনার পছন্দের পণ্যটি
                  নিজের করে নিন।
                </p>
              </div>

              <div style={styles.ctaAction}>
                <div style={styles.ctaPrice}>{price}</div>

                <button
                  type="button"
                  onClick={handleOrder}
                  style={styles.ctaButton}
                >
                  {buttonText}
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <span style={styles.footerBrand}>{brandName}</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

function Feature({ number, title, text }) {
  return (
    <article style={styles.feature}>
      <div style={styles.featureTop}>
        <span style={styles.featureNumber}>{number}</span>
        <span style={styles.featureLine} />
      </div>

      <h3 style={styles.featureTitle}>{title}</h3>

      <p style={styles.featureText}>{text}</p>
    </article>
  );
}

function TrustItem({ title, text }) {
  return (
    <div style={styles.trustItem}>
      <div style={styles.check}>✓</div>

      <div>
        <strong style={styles.trustItemTitle}>{title}</strong>
        <span style={styles.trustItemText}>{text}</span>
      </div>
    </div>
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
    height: "74px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #eaecf0",
    background: "#ffffff",
  },

  logo: {
    fontSize: "20px",
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },

  topButton: {
    border: "1px solid #111827",
    borderRadius: "7px",
    padding: "10px 17px",
    background: "#ffffff",
    color: "#111827",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  hero: {
    padding: "85px 0 105px",
    background: "#f8f9fa",
    overflow: "hidden",
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) minmax(0, 0.95fr)",
    gap: "55px",
    alignItems: "center",
  },

  heroContent: {
    maxWidth: "620px",
  },

  eyebrow: {
    display: "inline-block",
    marginBottom: "19px",
    padding: "7px 10px",
    borderRadius: "4px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "9px",
    fontWeight: 900,
    letterSpacing: "0.15em",
  },

  headline: {
    margin: 0,
    fontSize: "clamp(40px, 5vw, 65px)",
    lineHeight: 1.03,
    letterSpacing: "-0.06em",
    fontWeight: 900,
  },

  description: {
    maxWidth: "550px",
    margin: "25px 0 0",
    color: "#667085",
    fontSize: "17px",
    lineHeight: 1.75,
  },

  priceRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    margin: "30px 0 24px",
  },

  price: {
    fontSize: "39px",
    fontWeight: 900,
    letterSpacing: "-0.045em",
  },

  oldPrice: {
    color: "#98a2b3",
    fontSize: "16px",
    textDecoration: "line-through",
  },

  discount: {
    padding: "6px 8px",
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
    gap: "24px",
    minWidth: "200px",
    border: 0,
    borderRadius: "8px",
    padding: "15px 21px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 800,
    cursor: "pointer",
  },

  arrow: {
    fontSize: "18px",
    lineHeight: 1,
  },

  smallNote: {
    marginTop: "20px",
    color: "#98a2b3",
    fontSize: "11px",
    lineHeight: 1.7,
  },

  visual: {
    position: "relative",
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundShape: {
    position: "absolute",
    width: "430px",
    height: "430px",
    borderRadius: "50%",
    background: "#e4e7eb",
  },

  imageFrame: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "430px",
    height: "440px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    boxSizing: "border-box",
    borderRadius: "24px",
    background: "#ffffff",
    border: "1px solid #e4e7ec",
    boxShadow: "0 30px 70px rgba(16, 24, 40, 0.10)",
  },

  productImage: {
    width: "100%",
    height: "390px",
    objectFit: "contain",
    display: "block",
  },

  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
    color: "#98a2b3",
    fontSize: "14px",
    fontWeight: 700,
    textAlign: "center",
  },

  placeholderIcon: {
    fontSize: "65px",
  },

  floatingCard: {
    position: "absolute",
    zIndex: 3,
    left: "0",
    bottom: "35px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 17px",
    borderRadius: "9px",
    background: "#111827",
    color: "#ffffff",
    boxShadow: "0 15px 35px rgba(16, 24, 40, 0.18)",
  },

  floatingNumber: {
    fontSize: "11px",
    fontWeight: 900,
    color: "#9ca3af",
  },

  floatingTitle: {
    display: "block",
    fontSize: "11px",
    marginBottom: "3px",
  },

  floatingText: {
    display: "block",
    color: "#9ca3af",
    fontSize: "9px",
  },

  featureSection: {
    padding: "100px 0",
  },

  sectionIntro: {
    marginBottom: "55px",
  },

  sectionEyebrow: {
    marginBottom: "12px",
    color: "#667085",
    fontSize: "9px",
    fontWeight: 900,
    letterSpacing: "0.15em",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "42px",
    lineHeight: 1.12,
    letterSpacing: "-0.05em",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "18px",
  },

  feature: {
    padding: "28px",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
  },

  featureTop: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "35px",
  },

  featureNumber: {
    fontSize: "11px",
    fontWeight: 900,
  },

  featureLine: {
    height: "1px",
    flex: 1,
    background: "#e5e7eb",
  },

  featureTitle: {
    margin: "0 0 10px",
    fontSize: "19px",
    letterSpacing: "-0.025em",
  },

  featureText: {
    margin: 0,
    color: "#667085",
    fontSize: "13px",
    lineHeight: 1.75,
  },

  storySection: {
    padding: "0 0 100px",
  },

  storyGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) minmax(0, 1fr)",
    gap: "80px",
    alignItems: "center",
  },

  storyVisual: {
    minHeight: "480px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    background: "#f4f5f7",
    overflow: "hidden",
  },

  storyShape: {
    width: "80%",
    height: "390px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  storyImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  storyPlaceholder: {
    color: "#98a2b3",
    fontSize: "15px",
    fontWeight: 800,
  },

  storyContent: {
    maxWidth: "520px",
  },

  storyTitle: {
    margin: "0 0 22px",
    fontSize: "43px",
    lineHeight: 1.1,
    letterSpacing: "-0.05em",
  },

  storyText: {
    margin: "0 0 15px",
    color: "#667085",
    fontSize: "15px",
    lineHeight: 1.85,
  },

  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "12px",
    border: "1px solid #111827",
    borderRadius: "8px",
    padding: "12px 17px",
    background: "#ffffff",
    color: "#111827",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  trustSection: {
    padding: "0 0 100px",
  },

  trustBox: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 0.8fr) minmax(0, 1.2fr)",
    gap: "60px",
    padding: "55px",
    borderRadius: "20px",
    background: "#111827",
    color: "#ffffff",
  },

  trustTitle: {
    margin: 0,
    fontSize: "39px",
    lineHeight: 1.12,
    letterSpacing: "-0.045em",
  },

  trustItems: {
    display: "grid",
    gap: "15px",
  },

  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "17px",
    border: "1px solid #374151",
    borderRadius: "10px",
  },

  check: {
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: "50%",
    background: "#ffffff",
    color: "#111827",
    fontSize: "14px",
    fontWeight: 900,
  },

  trustItemTitle: {
    display: "block",
    marginBottom: "3px",
    fontSize: "13px",
  },

  trustItemText: {
    display: "block",
    color: "#9ca3af",
    fontSize: "11px",
  },

  ctaSection: {
    paddingBottom: "80px",
  },

  cta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "35px",
    padding: "38px",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
  },

  ctaEyebrow: {
    marginBottom: "7px",
    color: "#667085",
    fontSize: "9px",
    fontWeight: 900,
    letterSpacing: "0.14em",
  },

  ctaTitle: {
    margin: 0,
    fontSize: "28px",
    letterSpacing: "-0.035em",
  },

  ctaText: {
    margin: "8px 0 0",
    color: "#667085",
    fontSize: "13px",
  },

  ctaAction: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexShrink: 0,
  },

  ctaPrice: {
    fontSize: "27px",
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },

  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "15px",
    border: 0,
    borderRadius: "8px",
    padding: "14px 20px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  footer: {
    padding: "25px 0",
    borderTop: "1px solid #eaecf0",
    color: "#98a2b3",
    fontSize: "11px",
  },

  footerBrand: {
    color: "#344054",
    fontWeight: 800,
  },
};
