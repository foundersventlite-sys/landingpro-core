import { useState } from "react";

const features = [
  "Fast landing pages",
  "Client management",
  "Order management",
  "Cloudflare-powered infrastructure",
];

export default function App() {
  const [status, setStatus] = useState("System Ready");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "24px",
          padding: "48px",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 14px",
            borderRadius: "999px",
            background: "#ecfdf5",
            color: "#047857",
            fontSize: "14px",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          ● {status}
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 7vw, 64px)",
            lineHeight: 1.05,
            margin: "0 0 16px",
            letterSpacing: "-0.04em",
          }}
        >
          LandingPro Core
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#64748b",
            maxWidth: "680px",
            margin: "0 0 32px",
          }}
        >
          A fast, scalable landing-page management platform built for
          administrators and clients.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "14px",
            marginBottom: "32px",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature}
              style={{
                padding: "18px",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                background: "#f8fafc",
                fontWeight: 600,
              }}
            >
              {feature}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setStatus("Foundation Working")}
          style={{
            border: 0,
            borderRadius: "12px",
            padding: "14px 22px",
            background: "#0f172a",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Test Foundation
        </button>
      </section>
    </main>
  );
            }
