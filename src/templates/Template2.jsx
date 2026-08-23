import React from "react";

export default function Template2({
  data = {},
  onOrder,
}) {
  const {
    brandName = "Your Brand",
    productName = "Premium Product",
    headline = "আপনার দৈনন্দিন জীবনের জন্য স্মার্ট ও প্রয়োজনীয় সমাধান",
    description = "আধুনিক ডিজাইন, নির্ভরযোগ্য মান এবং সহজ ব্যবহারের জন্য তৈরি।",
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
          <div style={styles.brand}>{brandName}</div>

          <div style={styles.headerText}>
            Limited Offer
          </div>
        </div>
      </header>

      <main>
        <section style={styles.hero}>
          <div style={styles.container}>
            <div style={styles.heroCard}>
              <div style={styles.left}>
                <div style={styles.offer}>
                  LIMITED TIME OFFER
                </div>

                <div style={styles.productLabel}>
                  {productName}
                </div>

                <h1 style={styles.headline}>
                  {headline}
                </h1>

                <p style={styles.description}>
                  {description}
                </p>

                <div style={styles.priceBox}>
                  <span style={styles.price}>{price}</span>

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

                <div style={styles.note}>
                  অল্প স্টক • দ্রুত ডেলিভারি • সহজ অর্ডার
                </div>
              </div>

              <div style={styles.right}>
                <div style={styles.imageWrapper}>
                  {image ? (
                    <img
                      src={image}
                      alt={productName}
                      style={styles.image}
                    />
                  ) : (
                    <div style={styles.placeholder}>
                      <span style={styles.placeholderIcon}>
                        📦
                      </span>
                      <span>Product Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.benefits}>
          <div style={styles.container}>
            <div style={styles.benefitGrid}>
              <Benefit
                number="01"
                title="Premium Quality"
                text="প্রতিটি পণ্য মানের দিকে গুরুত্ব দিয়ে নির্বাচন করা হয়।"
              />

              <Benefit
                number="02"
                title="Fast Delivery"
                text="দ্রুত ও নির্ভরযোগ্য ডেলিভারি সুবিধা।"
              />

              <Benefit
                number="03"
                title="Easy Ordering"
                text="কয়েকটি সহজ ধাপেই আপনার অর্ডার সম্পন্ন করুন।"
              />
            </div>
          </div>
        </section>

        <section style={styles.details}>
          <div style={styles.container}>
            <div style={styles.detailsGrid}>
              <div>
                <div style={styles.sectionTag}>
                  WHY CHOOSE US
                </div>

                <h2 style={styles.sectionTitle}>
                  আপনার প্রয়োজনের জন্য
                  <br />
                  একটি নির্ভরযোগ্য পছন্দ
                </h2>
              </div>

              <div style={styles.detailList}>
                <Detail
                  title="উন্নত মান"
                  text="দীর্ঘদিন ব্যবহার উপযোগী মানসম্মত পণ্য।"
                />

                <Detail
                  title="সাশ্রয়ী মূল্য"
                  text="প্রতিযোগিতামূলক দামে প্রিমিয়াম অভিজ্ঞতা।"
                />

                <Detail
                  title="বিশ্বস্ত সার্ভিস"
                  text="অর্ডার থেকে ডেলিভারি পর্যন্ত সহযোগিতা।"
                />
              </div>
            </div>
          </div>
        </section>

        <section style={styles.finalCta}>
          <div style={styles.container}>
            <div style={styles.ctaInner}>
              <div>
                <div style={styles.ctaTitle}>
                  {productName}
                </div>

                <div style={styles.ctaText}>
                  আজকের অফারটি মিস করবেন না।
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
          © {new Date().getFullYear()} {brandName}
        </div>
      </footer>
    </div>
  );
}

function Benefit({ number, title, text }) {
  return (
    <div style={styles.benefit}>
      <div style={styles.benefitNumber}>{number}</div>

      <h3 style={styles.benefitTitle}>{title}</h3>

      <p style={styles.benefitText}>{text}</p>
    </div>
  );
}

function Detail({ title, text }) {
  return (
    <div style={styles.detail}>
      <div style={styles.check}>✓</div>

      <div>
        <h3 style={styles.detailTitle}>{title}</h3>

        <p style={styles.detailText}>{text}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
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
    background: "#111827",
    color: "#ffffff",
  },

  brand: {
    fontSize: "20px",
    fontWeight: 800,
    letterSpacing: "-0.03em",
  },

  headerText: {
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#fbbf24",
  },

  hero: {
    padding: "55px 0 65px",
    background: "#111827",
  },

  heroCard: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) minmax(320px, 0.9fr)",
    gap: "50px",
    alignItems: "center",
    padding: "45px",
    borderRadius: "26px",
    background: "#ffffff",
    boxSizing: "border-box",
  },

  left: {
    maxWidth: "610px",
  },

  offer: {
    display: "inline-block",
    padding: "7px 11px",
    marginBottom: "18px",
    borderRadius: "6px",
    background: "#111827",
    color: "#fbbf24",
    fontSize: "11px",
    fontWeight: 900,
    letterSpacing: "0.12em",
  },

  productLabel: {
    marginBottom: "10px",
    color: "#6b7280",
    fontSize: "15px",
    fontWeight: 700,
  },

  headline: {
    margin: "0 0 18px",
    fontSize: "clamp(34px, 5vw, 58px)",
    lineHeight: 1.05,
    letterSpacing: "-0.045em",
  },

  description: {
    margin: "0 0 25px",
    color: "#6b7280",
    fontSize: "17px",
    lineHeight: 1.7,
  },

  priceBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "24px",
  },

  price: {
    color: "#dc2626",
    fontSize: "36px",
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },

  oldPrice: {
    color: "#9ca3af",
    fontSize: "18px",
    textDecoration: "line-through",
  },

  orderButton: {
    border: "none",
    borderRadius: "9px",
    padding: "15px 30px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
  },

  note: {
    marginTop: "15px",
    color: "#6b7280",
    fontSize: "12px",
    fontWeight: 600,
  },

  right: {
    display: "flex",
    justifyContent: "center",
  },

  imageWrapper: {
    width: "100%",
    minHeight: "410px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "25px",
    boxSizing: "border-box",
    borderRadius: "20px",
    background: "#f3f4f6",
  },

  image: {
    width: "100%",
    maxWidth: "470px",
    maxHeight: "470px",
    objectFit: "contain",
    display: "block",
  },

  placeholder: {
    width: "100%",
    height: "340px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "#9ca3af",
    fontWeight: 700,
  },

  placeholderIcon: {
    fontSize: "60px",
  },

  benefits: {
    padding: "65px 0",
    background: "#ffffff",
  },

  benefitGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "1px",
    background: "#e5e7eb",
    border: "1px solid #e5e7eb",
  },

  benefit: {
    padding: "30px",
    background: "#ffffff",
  },

  benefitNumber: {
    marginBottom: "18px",
    color: "#9ca3af",
    fontSize: "13px",
    fontWeight: 900,
    letterSpacing: "0.1em",
  },

  benefitTitle: {
    margin: "0 0 9px",
    fontSize: "20px",
  },

  benefitText: {
    margin: 0,
    color: "#6b7280",
    lineHeight: 1.65,
  },

  details: {
    padding: "80px 0",
    background: "#f3f4f6",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) minmax(0, 1fr)",
    gap: "70px",
    alignItems: "start",
  },

  sectionTag: {
    marginBottom: "12px",
    color: "#6b7280",
    fontSize: "12px",
    fontWeight: 900,
    letterSpacing: "0.12em",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "38px",
    lineHeight: 1.15,
    letterSpacing: "-0.04em",
  },

  detailList: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },

  detail: {
    display: "flex",
    gap: "15px",
    paddingBottom: "22px",
    borderBottom: "1px solid #d1d5db",
  },

  check: {
    width: "30px",
    height: "30px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#111827",
    color: "#ffffff",
    fontWeight: 900,
  },

  detailTitle: {
    margin: "0 0 5px",
    fontSize: "17px",
  },

  detailText: {
    margin: 0,
    color: "#6b7280",
    lineHeight: 1.6,
  },

  finalCta: {
    padding: "0 0 65px",
    background: "#f3f4f6",
  },

  ctaInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "25px",
    padding: "30px 34px",
    borderRadius: "16px",
    background: "#111827",
    color: "#ffffff",
  },

  ctaTitle: {
    marginBottom: "5px",
    fontSize: "22px",
    fontWeight: 800,
  },

  ctaText: {
    color: "#d1d5db",
    fontSize: "14px",
  },

  ctaButton: {
    flexShrink: 0,
    border: "none",
    borderRadius: "8px",
    padding: "13px 22px",
    background: "#fbbf24",
    color: "#111827",
    fontWeight: 900,
    cursor: "pointer",
  },

  footer: {
    padding: "25px 0",
    background: "#111827",
    color: "#9ca3af",
    fontSize: "13px",
  },
};
