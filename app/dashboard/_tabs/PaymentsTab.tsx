"use client";

import React from "react";
import { HiOutlinePlus, HiOutlineTrash, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { usePage } from "../../_state/PageContext";
import { getTheme } from "../../_lib/themes";
import Toggle from "../../_components/Toggle";

export default function PaymentsTab() {
  const { data, addPaymentButton, updatePaymentButton, deletePaymentButton } = usePage();
  const theme = getTheme(data.appearance.themeId);

  return (
    <div>
      <h1 className="font-display" style={{ fontSize: "1.75rem", color: "#1A1A1A", marginBottom: 6 }}>
        Accept payments from your visitors
      </h1>
      <p style={{ color: "#4A4A4A", fontSize: "0.9375rem", marginBottom: 20 }}>
        Add one or more Stripe payment links — each becomes a button on your page.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.payments.buttons.map((btn) => (
          <div
            key={btn.id}
            style={{
              background: "#fff",
              border: "1px solid #E8E4DF",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#4A4A4A" }}>
                Stripe payment link URL
              </label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="url"
                  placeholder="https://buy.stripe.com/..."
                  value={btn.url}
                  onChange={(e) => updatePaymentButton(btn.id, { url: e.target.value })}
                  className="input-field"
                />
                <a
                  href="https://stripe.com/payment-links"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Learn about Stripe payment links"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    border: "1px solid #E8E4DF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#7A7A7A",
                    flexShrink: 0,
                  }}
                >
                  <HiArrowTopRightOnSquare size={16} />
                </a>
              </div>
              <div style={{ fontSize: "0.8125rem", color: "#7A7A7A" }}>
                Paste your Stripe payment link here.
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#4A4A4A" }}>
                Button label
              </label>
              <input
                type="text"
                placeholder="e.g. Buy me a coffee, Support my work, Book a session"
                value={btn.label}
                maxLength={40}
                onChange={(e) => updatePaymentButton(btn.id, { label: e.target.value })}
                className="input-field"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Toggle
                  checked={btn.visible}
                  onChange={(next) => updatePaymentButton(btn.id, { visible: next })}
                  ariaLabel="Show on page"
                />
                <span style={{ fontSize: "0.875rem", color: "#4A4A4A" }}>
                  {btn.visible ? "Showing on page" : "Hidden"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => deletePaymentButton(btn.id)}
                aria-label="Remove"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "transparent",
                  color: "#D94F4F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #E8E4DF",
                }}
              >
                <HiOutlineTrash size={16} />
              </button>
            </div>

            {/* Mini preview */}
            <div
              style={{
                borderTop: "1px dashed #E8E4DF",
                paddingTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Preview
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: theme.accent,
                  color: "#fff",
                  padding: "14px 20px",
                  borderRadius: 16,
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: `0 8px 24px ${theme.accentSoft}`,
                }}
              >
                <span aria-hidden>💛</span>
                <span>{btn.label || "Your button label"}</span>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn-secondary"
          onClick={() => addPaymentButton({ url: "", label: "", visible: true })}
          style={{ justifyContent: "flex-start" }}
        >
          <HiOutlinePlus size={16} />
          Add payment button
        </button>
      </div>
    </div>
  );
}
