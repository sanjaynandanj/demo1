"use client";

import React, { useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

interface LoginPromptModalProps {
  open: boolean;
  mode: "save" | "publish";
  onClose: () => void;
  onContinue: () => void;
}

export default function LoginPromptModal({ open, mode, onClose, onContinue }: LoginPromptModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const headline = mode === "save" ? "Save your page" : "Ready to go live?";
  const body =
    mode === "save"
      ? "Create a free account to save your draft — you can come back and edit anytime."
      : "Create an account and publish your page for $12/year. Cancel anytime.";

  return (
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
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 440,
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          animation: "modalPop 250ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={onClose}
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
            transition: "background 150ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F1EC")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <HiOutlineXMark size={18} />
        </button>

        <h2
          className="font-display"
          style={{ fontSize: "1.75rem", color: "#1A1A1A", marginBottom: 8 }}
        >
          {headline}
        </h2>
        <p style={{ color: "#4A4A4A", fontSize: "0.9375rem", lineHeight: 1.5 }}>{body}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onContinue();
          }}
          style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #E8E4DF",
              borderRadius: 8,
              background: "#fff",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                padding: "12px 12px 12px 16px",
                color: "#7A7A7A",
                fontSize: "0.9375rem",
                borderRight: "1px solid #E8E4DF",
                background: "#FAFAFA",
                whiteSpace: "nowrap",
              }}
            >
              corner.link/page/
            </span>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "none",
                outline: "none",
                fontFamily: "inherit",
                fontSize: "0.9375rem",
                background: "#fff",
                color: "#1A1A1A",
              }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: 8, padding: "12px 18px" }}>
            Continue
          </button>
          <div style={{ textAlign: "center", marginTop: 4 }}>
            <span style={{ fontSize: "0.875rem", color: "#4A4A4A" }}>
              Already have an account?{" "}
              <span style={{ color: "#E8735A", fontWeight: 500, cursor: "pointer" }}>Log in</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
