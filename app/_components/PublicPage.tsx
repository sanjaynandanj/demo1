"use client";

import React from "react";
import type { ProfileData, LinkItem, AppearanceData, PaymentsData } from "../_state/PageContext";
import { getBackgroundValue, isDarkBackground } from "../_lib/backgrounds";
import { getTheme } from "../_lib/themes";
import { detectPlatform, getPlatformByKey } from "../_lib/platforms";
import { HiArrowUpRight } from "react-icons/hi2";

interface PublicPageProps {
  profile: ProfileData;
  links: LinkItem[];
  appearance: AppearanceData;
  payments: PaymentsData;
  animate?: boolean;
  interactive?: boolean;
}

const SOCIAL_ORDER: Array<{ field: keyof ProfileData["social"]; key: string }> = [
  { field: "instagram", key: "instagram" },
  { field: "tiktok", key: "tiktok" },
  { field: "youtube", key: "youtube" },
  { field: "twitter", key: "x" },
  { field: "facebook", key: "facebook" },
  { field: "onlyfans", key: "onlyfans" },
  { field: "linkedin", key: "linkedin" },
  { field: "spotify", key: "spotify" },
  { field: "website", key: "website" },
];

export default function PublicPage({
  profile,
  links,
  appearance,
  payments,
  animate = true,
  interactive = true,
}: PublicPageProps) {
  const theme = getTheme(appearance.themeId);
  const bgValue = getBackgroundValue(appearance.backgroundId, appearance.customBg);
  const isDark = isDarkBackground(appearance.backgroundId, appearance.customBg);

  const textPrimary = isDark ? "#FAFAFA" : "#1A1A1A";
  const textSecondary = isDark ? "#CCCCCC" : "#4A4A4A";

  const fadeStyle = (delay: number): React.CSSProperties =>
    animate ? { animationDelay: `${delay}ms` } : {};
  const fadeClass = animate ? "fade-up" : "";

  const visibleLinks = links.filter((l) => l.visible);
  const socialItems = SOCIAL_ORDER.filter(({ field }) => profile.social[field] && profile.social[field].trim());

  const visiblePaymentButtons = payments.buttons.filter((b) => b.visible && b.url && b.url.trim());

  const LinkEl: React.ElementType = interactive ? "a" : "div";
  const socialLinkEl = (interactive ? "a" : "span") as React.ElementType;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: bgValue,
        color: textPrimary,
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "48px 20px 64px",
        }}
      >
        {/* Avatar */}
        <div
          className={fadeClass}
          style={{ display: "flex", justifyContent: "center", ...fadeStyle(0) }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #fff",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              background: "#E8E4DF",
              flexShrink: 0,
            }}
          >
            {profile.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar}
                alt={profile.displayName}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : null}
          </div>
        </div>

        {/* Name */}
        <h1
          className={`font-display ${fadeClass}`}
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 400,
            color: textPrimary,
            ...fadeStyle(100),
          }}
        >
          {profile.displayName || "Your Name"}
        </h1>

        {/* Bio */}
        {profile.bio ? (
          <p
            className={fadeClass}
            style={{
              marginTop: 10,
              textAlign: "center",
              fontSize: "1rem",
              lineHeight: 1.5,
              color: textSecondary,
              maxWidth: 380,
              marginLeft: "auto",
              marginRight: "auto",
              ...fadeStyle(200),
            }}
          >
            {profile.bio}
          </p>
        ) : null}

        {/* Social row */}
        {socialItems.length > 0 && (
          <div
            className={fadeClass}
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              gap: 16,
              ...fadeStyle(300),
            }}
          >
            {socialItems.map(({ field, key }) => {
              const url = profile.social[field];
              const platform = getPlatformByKey(key);
              const Icon = platform.icon;
              return React.createElement(
                socialLinkEl,
                interactive
                  ? {
                      key: field,
                      href: url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      style: {
                        color: textPrimary,
                        display: "inline-flex",
                        transition: "transform 200ms ease, opacity 200ms ease",
                      },
                      onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
                        (e.currentTarget as HTMLElement).style.opacity = "0.7";
                      },
                      onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
                        (e.currentTarget as HTMLElement).style.opacity = "1";
                      },
                    }
                  : { key: field, style: { color: textPrimary, display: "inline-flex" } },
                <Icon size={20} />
              );
            })}
          </div>
        )}

        {/* Link cards */}
        {visibleLinks.length > 0 && (
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
            {visibleLinks.map((link, i) => {
              const platform = detectPlatform(link.url);
              const Icon = platform.icon;
              const delay = 400 + i * 80;
              const cardProps = interactive
                ? {
                    href: link.url,
                    target: "_blank" as const,
                    rel: "noopener noreferrer",
                  }
                : {};
              return (
                <LinkEl
                  key={link.id}
                  {...cardProps}
                  className={`link-card ${isDark ? "link-card-dark" : ""} ${fadeClass}`}
                  style={{
                    color: textPrimary,
                    textDecoration: "none",
                    ...fadeStyle(delay),
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      display: "inline-flex",
                      justifyContent: "center",
                      color: isDark ? "#FAFAFA" : "#4A4A4A",
                      fontSize: "1.125rem",
                    }}
                  >
                    {link.emoji ? (
                      <span style={{ fontSize: "1.125rem", lineHeight: 1 }}>{link.emoji}</span>
                    ) : (
                      <Icon size={20} />
                    )}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: textPrimary,
                    }}
                  >
                    {link.title || "Untitled link"}
                  </span>
                  <HiArrowUpRight size={14} style={{ color: isDark ? "#CCCCCC" : "#7A7A7A" }} />
                </LinkEl>
              );
            })}
          </div>
        )}

        {/* Extra text */}
        {profile.extraText ? (
          <p
            style={{
              marginTop: 28,
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              textAlign: "center",
              color: textSecondary,
            }}
          >
            {profile.extraText}
          </p>
        ) : null}

        {/* Extra photo */}
        {profile.extraPhoto ? (
          <div
            style={{
              marginTop: 28,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.extraPhoto}
              alt=""
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </div>
        ) : null}

        {/* Publications */}
        {profile.publications && profile.publications.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <div
              style={{
                textAlign: "center",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                opacity: 0.7,
                color: textSecondary,
                marginBottom: 10,
              }}
            >
              Featured in
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {profile.publications.map((p) => (
                <div
                  key={p.id}
                  style={{
                    textAlign: "center",
                    fontSize: "0.9375rem",
                    color: textPrimary,
                    paddingBottom: 6,
                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"}`,
                  }}
                >
                  {p.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment buttons */}
        {visiblePaymentButtons.length > 0 && (
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
            {visiblePaymentButtons.map((btn) => {
              const payProps = interactive
                ? { href: btn.url, target: "_blank" as const, rel: "noopener noreferrer" }
                : {};
              return (
                <LinkEl
                  key={btn.id}
                  {...payProps}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: theme.accent,
                    color: "#fff",
                    textDecoration: "none",
                    padding: "14px 20px",
                    borderRadius: 16,
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: `0 8px 24px ${theme.accentSoft}`,
                    transition: "transform 200ms ease, background 200ms ease",
                  }}
                  onMouseEnter={
                    interactive
                      ? (e: React.MouseEvent<HTMLElement>) => {
                          (e.currentTarget as HTMLElement).style.background = theme.accentHover;
                        }
                      : undefined
                  }
                  onMouseLeave={
                    interactive
                      ? (e: React.MouseEvent<HTMLElement>) => {
                          (e.currentTarget as HTMLElement).style.background = theme.accent;
                        }
                      : undefined
                  }
                >
                  <span aria-hidden style={{ fontSize: "1rem" }}>💛</span>
                  <span>{btn.label || "Support"}</span>
                </LinkEl>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 48,
            textAlign: "center",
            fontFamily: "var(--font-instrument-serif), serif",
            fontSize: "1rem",
            color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
            letterSpacing: "-0.01em",
          }}
        >
          corner
        </div>
      </div>
    </div>
  );
}
