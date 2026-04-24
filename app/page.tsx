"use client";

import React from "react";
import Link from "next/link";
import PhoneFrame from "./_components/PhoneFrame";
import PublicPage from "./_components/PublicPage";
import { EXAMPLE_PAGES } from "./_lib/examples";
import {
  HiOutlineSwatch,
  HiOutlineCreditCard,
  HiOutlineGlobeAlt,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";

export default function LandingPage() {
  return (
    <div style={{ background: "#FBF8F4", minHeight: "100vh" }}>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(251, 248, 244, 0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            className="font-display"
            style={{ fontSize: "1.5rem", color: "#1A1A1A", textDecoration: "none" }}
          >
            corner
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#7A7A7A", fontSize: "0.9375rem", cursor: "default" }}>Login</span>
            <Link href="/dashboard" className="btn-primary" style={{ padding: "10px 22px", borderRadius: 999 }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "96px 24px 80px",
          textAlign: "center",
        }}
      >
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.75rem, 8vw, 5rem)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#1A1A1A",
          }}
        >
          Your corner of the internet.
        </h1>
        <p
          style={{
            marginTop: 24,
            fontSize: "1.125rem",
            color: "#4A4A4A",
            maxWidth: 560,
            margin: "24px auto 0",
            lineHeight: 1.6,
          }}
        >
          One beautiful page for all your links, socials, and whatever else you want the world to see.
        </p>
        <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
          <Link
            href="/dashboard"
            className="btn-primary"
            style={{
              padding: "16px 32px",
              borderRadius: 999,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.8125rem",
            }}
          >
            Create your page — it&rsquo;s free
          </Link>
        </div>
        <p style={{ marginTop: 16, fontSize: "0.875rem", color: "#7A7A7A" }}>
          No credit card. No signup to start building.
        </p>
      </section>

      <section style={{ padding: "40px 24px 96px", overflow: "hidden" }}>
        <div
          className="no-scrollbar"
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            overflowX: "auto",
            paddingBottom: 24,
          }}
        >
          {EXAMPLE_PAGES.map((page, i) => (
            <div
              key={page.profile.username}
              style={{
                transform: i === 1 ? "translateY(-16px)" : "none",
                flexShrink: 0,
              }}
            >
              <PhoneFrame innerWidth={300} innerHeight={600} scale={0.95}>
                <PublicPage
                  profile={page.profile}
                  links={page.links}
                  appearance={page.appearance}
                  payments={page.payments}
                  animate={false}
                  interactive={false}
                />
              </PhoneFrame>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#fff", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              textAlign: "center",
              color: "#1A1A1A",
            }}
          >
            How it works
          </h2>
          <div
            style={{
              marginTop: 64,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 48,
            }}
          >
            {[
              { n: "1", title: "Build your page", body: "Start with a pre-filled example. Change everything with a click — no setup." },
              { n: "2", title: "Sign up for free", body: "Save your draft with an email and password. No credit card required." },
              { n: "3", title: "Publish when you're ready", body: "Go live at corner.link/page/you for $12 a year. Cancel anytime." },
            ].map((step) => (
              <div key={step.n} style={{ textAlign: "left" }}>
                <div
                  className="font-display"
                  style={{
                    fontSize: "4rem",
                    color: "#E8735A",
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {step.n}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1A1A1A", marginBottom: 10 }}>
                  {step.title}
                </h3>
                <p style={{ color: "#4A4A4A", fontSize: "1rem", lineHeight: 1.6 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              textAlign: "center",
              color: "#1A1A1A",
            }}
          >
            Built with taste.
          </h2>
          <div
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 32,
            }}
          >
            {[
              { Icon: HiOutlineSwatch, title: "Themes worth using", body: "Six hand-picked color palettes and ten backgrounds that look like someone actually designed them." },
              { Icon: HiOutlineCreditCard, title: "Accept payments", body: "Wire up Stripe once. Add a tip jar, a product link, or a booking link — it all lives on the same page." },
              { Icon: HiOutlineGlobeAlt, title: "Your own URL", body: "Claim corner.link/page/you. Short, clean, shareable anywhere." },
              { Icon: HiOutlineDevicePhoneMobile, title: "Beautiful on every device", body: "Tested on phones first. Works everywhere else." },
            ].map((f, i) => {
              const Icon = f.Icon;
              return (
                <div key={i} style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "rgba(232, 115, 90, 0.1)",
                      color: "#E8735A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: "#1A1A1A", marginBottom: 6 }}>
                      {f.title}
                    </h3>
                    <p style={{ color: "#4A4A4A", fontSize: "0.9375rem", lineHeight: 1.6 }}>{f.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "96px 24px", textAlign: "center" }}>
        <h2
          className="font-display"
          style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)", color: "#1A1A1A" }}
        >
          Make your corner.
        </h2>
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <Link
            href="/dashboard"
            className="btn-primary"
            style={{
              padding: "16px 32px",
              borderRadius: 999,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.8125rem",
            }}
          >
            Create your page — it&rsquo;s free
          </Link>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(0,0,0,0.06)",
          padding: "24px",
          background: "#FBF8F4",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span className="font-display" style={{ fontSize: "1.25rem", color: "#1A1A1A" }}>
            corner
          </span>
          <span style={{ fontSize: "0.8125rem", color: "#7A7A7A" }}>© 2026 corner</span>
        </div>
      </footer>
    </div>
  );
}
