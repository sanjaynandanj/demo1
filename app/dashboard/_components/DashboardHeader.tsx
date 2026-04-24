"use client";

import React from "react";
import Link from "next/link";
import { HiOutlineEye, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { usePage } from "../../_state/PageContext";

interface DashboardHeaderProps {
  onPreview: () => void;
  onSave: () => void;
  onPublish: () => void;
}

export default function DashboardHeader({ onPreview, onSave, onPublish }: DashboardHeaderProps) {
  const { data } = usePage();
  const { isPublished, profile } = data;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "#fff",
        borderBottom: "1px solid #E8E4DF",
      }}
    >
      <div
        style={{
          maxWidth: 1600,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/"
          className="font-display"
          style={{ fontSize: "1.25rem", color: "#1A1A1A", textDecoration: "none" }}
        >
          corner
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            background: isPublished ? "rgba(91, 168, 91, 0.12)" : "rgba(212, 168, 83, 0.14)",
            color: isPublished ? "#3F7A3F" : "#8A6A2B",
            fontSize: "0.8125rem",
            fontWeight: 500,
            flexShrink: 1,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isPublished ? "#5BA85B" : "#D4A853",
              flexShrink: 0,
            }}
          />
          {isPublished ? (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Live at corner.link/page/{profile.username}
              </span>
              <Link
                href={`/page/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", display: "inline-flex" }}
                aria-label="Open public page"
              >
                <HiArrowTopRightOnSquare size={14} />
              </Link>
            </>
          ) : (
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Draft — only you can see this
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button type="button" className="btn-secondary" onClick={onPreview}>
            <HiOutlineEye size={16} />
            Preview
          </button>
          <button type="button" className="btn-secondary" onClick={onSave}>
            Save
          </button>
          <button type="button" className="btn-primary" onClick={onPublish}>
            {isPublished ? "Update Page" : "Publish"}
          </button>
        </div>
      </div>
    </header>
  );
}
