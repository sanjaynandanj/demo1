"use client";

import React, { useState } from "react";
import { HiOutlineClipboard, HiOutlineXMark } from "react-icons/hi2";
import { usePage } from "../../_state/PageContext";
import { useToast } from "../../_components/Toast";

const HARDCODED_EMAIL = "maya@corner.link";
const RENEWAL_DATE = "April 18, 2027";

export default function AccountTab() {
  const { data } = usePage();
  const toast = useToast();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const publicUrl = `corner.link/page/${data.profile.username || "you"}`;

  const copyUrl = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(publicUrl);
      }
      toast.show("Copied!");
    } catch {
      toast.show("Copied!");
    }
  };

  return (
    <div>
      <h1 className="font-display" style={{ fontSize: "1.75rem", color: "#1A1A1A", marginBottom: 6 }}>
        Account
      </h1>
      <p style={{ color: "#4A4A4A", fontSize: "0.9375rem", marginBottom: 24 }}>
        Manage your account and subscription.
      </p>

      {/* Public link */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#4A4A4A", marginBottom: 8 }}>
          Your public link
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#fff",
            border: "1px solid #E8E4DF",
            borderRadius: 12,
            padding: "14px 16px",
          }}
        >
          <span style={{ flex: 1, fontFamily: "monospace", fontSize: "0.9375rem", color: "#1A1A1A" }}>
            {publicUrl}
          </span>
          <button
            type="button"
            onClick={copyUrl}
            aria-label="Copy"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "transparent",
              color: "#4A4A4A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "1px solid #E8E4DF",
            }}
          >
            <HiOutlineClipboard size={16} />
          </button>
        </div>
      </section>

      {/* Email */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#4A4A4A", marginBottom: 8 }}>
          Email address
        </h2>
        <div
          style={{
            background: "#fff",
            border: "1px solid #E8E4DF",
            borderRadius: 12,
            padding: "14px 16px",
            color: "#1A1A1A",
            fontSize: "0.9375rem",
          }}
        >
          {HARDCODED_EMAIL}
        </div>
      </section>

      {/* Subscription */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#4A4A4A", marginBottom: 8 }}>
          Subscription
        </h2>
        <div
          style={{
            background: "#fff",
            border: "1px solid #E8E4DF",
            borderRadius: 12,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ fontSize: "1rem", color: "#1A1A1A", fontWeight: 500 }}>
            Plan: Corner Pro · Renews {RENEWAL_DATE}
          </div>
          <div style={{ fontSize: "0.875rem", color: "#4A4A4A" }}>
            Your page is published at {publicUrl}.
          </div>
          <span
            style={{
              fontSize: "0.875rem",
              color: "#E8735A",
              fontWeight: 500,
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            Manage subscription
          </span>
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#4A4A4A", marginBottom: 8 }}>
          Danger zone
        </h2>
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 20,
            borderLeft: "3px solid #D94F4F",
            border: "1px solid #E8E4DF",
            borderLeftWidth: 3,
            borderLeftColor: "#D94F4F",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ fontSize: "0.9375rem", color: "#4A4A4A", lineHeight: 1.5 }}>
            Sign out of your account, or permanently delete your page and all its data.
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" className="btn-secondary">
              Log out
            </button>
            <button
              type="button"
              style={{
                background: "#D94F4F",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 18px",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => setDeleteOpen(true)}
            >
              Delete my account
            </button>
          </div>
        </div>
      </section>

      {deleteOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            animation: "fadeIn 200ms ease",
          }}
          onClick={() => setDeleteOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 440,
              background: "#fff",
              borderRadius: 16,
              padding: 32,
              animation: "modalPop 250ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => setDeleteOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "transparent",
                color: "#7A7A7A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <HiOutlineXMark size={18} />
            </button>
            <h3 className="font-display" style={{ fontSize: "1.5rem", color: "#1A1A1A", marginBottom: 10 }}>
              Delete account?
            </h3>
            <p style={{ color: "#4A4A4A", fontSize: "0.9375rem", lineHeight: 1.5, marginBottom: 20 }}>
              This will permanently delete your page and all your data. This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="btn-secondary" onClick={() => setDeleteOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                style={{
                  background: "#D94F4F",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 18px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => setDeleteOpen(false)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
