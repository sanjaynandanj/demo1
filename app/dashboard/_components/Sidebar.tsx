"use client";

import React from "react";
import {
  HiOutlineLink,
  HiOutlineUser,
  HiOutlineSwatch,
  HiOutlineCreditCard,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

export type TabId = "links" | "profile" | "appearance" | "payments" | "account";

const TABS: Array<{ id: TabId; label: string; Icon: React.ComponentType<{ size?: number }> }> = [
  { id: "links", label: "Links", Icon: HiOutlineLink },
  { id: "profile", label: "Profile", Icon: HiOutlineUser },
  { id: "appearance", label: "Appearance", Icon: HiOutlineSwatch },
  { id: "payments", label: "Payments", Icon: HiOutlineCreditCard },
  { id: "account", label: "Account", Icon: HiOutlineCog6Tooth },
];

interface SidebarProps {
  active: TabId;
  onChange: (t: TabId) => void;
}

export default function Sidebar({ active, onChange }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          padding: "24px 16px",
          display: "none",
          flexDirection: "column",
          gap: 4,
        }}
        className="dash-sidebar-desktop"
      >
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 10,
                background: isActive ? "rgba(232, 115, 90, 0.08)" : "transparent",
                color: isActive ? "#E8735A" : "#4A4A4A",
                fontWeight: isActive ? 600 : 500,
                fontSize: "0.9375rem",
                textAlign: "left",
                cursor: "pointer",
                transition: "background 150ms ease, color 150ms ease",
                borderLeft: isActive ? "3px solid #E8735A" : "3px solid transparent",
                paddingLeft: 12,
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = "#F4F1EC";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </aside>

      {/* Mobile bottom bar */}
      <nav
        className="dash-sidebar-mobile"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-around",
          background: "#fff",
          borderTop: "1px solid #E8E4DF",
          padding: "8px 4px",
          zIndex: 20,
        }}
      >
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                padding: "6px 8px",
                background: "transparent",
                color: isActive ? "#E8735A" : "#7A7A7A",
                fontSize: "0.6875rem",
                fontWeight: isActive ? 600 : 500,
                minWidth: 56,
                cursor: "pointer",
              }}
            >
              <Icon size={20} />
              {label}
            </button>
          );
        })}
      </nav>

      <style jsx>{`
        @media (min-width: 768px) {
          :global(.dash-sidebar-desktop) {
            display: flex !important;
          }
          :global(.dash-sidebar-mobile) {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
