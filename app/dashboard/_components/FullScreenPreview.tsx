"use client";

import React, { useEffect, useState } from "react";
import { HiOutlineXMark, HiOutlineDevicePhoneMobile, HiOutlineComputerDesktop } from "react-icons/hi2";
import PhoneFrame from "../../_components/PhoneFrame";
import PublicPage from "../../_components/PublicPage";
import { usePage } from "../../_state/PageContext";
import { getBackgroundValue } from "../../_lib/backgrounds";

interface FullScreenPreviewProps {
  open: boolean;
  onClose: () => void;
}

export default function FullScreenPreview({ open, onClose }: FullScreenPreviewProps) {
  const { data } = usePage();
  const [device, setDevice] = useState<"phone" | "desktop">("phone");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const bg = getBackgroundValue(data.appearance.backgroundId, data.appearance.customBg);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 200ms ease",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: 4,
            gap: 4,
          }}
        >
          <button
            type="button"
            onClick={() => setDevice("phone")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 999,
              background: device === "phone" ? "#fff" : "transparent",
              color: device === "phone" ? "#1A1A1A" : "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 150ms ease, color 150ms ease",
            }}
          >
            <HiOutlineDevicePhoneMobile size={16} />
            Phone
          </button>
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 999,
              background: device === "desktop" ? "#fff" : "transparent",
              color: device === "desktop" ? "#1A1A1A" : "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 150ms ease, color 150ms ease",
            }}
          >
            <HiOutlineComputerDesktop size={16} />
            Desktop
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 150ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
        >
          <HiOutlineXMark size={16} />
          Close
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "16px",
          overflow: "auto",
        }}
      >
        {device === "phone" ? (
          <PhoneFrame innerWidth={390} innerHeight={780} scale={0.8}>
            <PublicPage
              profile={data.profile}
              links={data.links}
              appearance={data.appearance}
              payments={data.payments}
              animate={false}
              interactive={true}
            />
          </PhoneFrame>
        ) : (
          <div
            style={{
              width: "100%",
              maxWidth: 960,
              background: bg,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
            }}
          >
            <PublicPage
              profile={data.profile}
              links={data.links}
              appearance={data.appearance}
              payments={data.payments}
              animate={false}
              interactive={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
