"use client";

import React, { useRef } from "react";
import { HiOutlinePhoto, HiOutlineSwatch } from "react-icons/hi2";
import { usePage } from "../../_state/PageContext";
import { BACKGROUNDS } from "../../_lib/backgrounds";
import { THEMES } from "../../_lib/themes";

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function AppearanceTab() {
  const { data, setAppearance } = usePage();
  const { appearance } = data;
  const fileRef = useRef<HTMLInputElement>(null);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readAsDataUrl(file);
    setAppearance({ backgroundId: "custom-image", customBg: dataUrl });
  };

  return (
    <div>
      <h1 className="font-display" style={{ fontSize: "1.75rem", color: "#1A1A1A", marginBottom: 6 }}>
        Appearance
      </h1>
      <p style={{ color: "#4A4A4A", fontSize: "0.9375rem", marginBottom: 24 }}>
        Pick a background and a color theme. Changes apply immediately.
      </p>

      {/* Backgrounds */}
      <h2 style={{ fontSize: "1.0625rem", fontWeight: 600, color: "#1A1A1A", marginBottom: 12 }}>
        Background
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {BACKGROUNDS.map((bg) => {
          const selected = appearance.backgroundId === bg.id;
          return (
            <button
              key={bg.id}
              type="button"
              onClick={() => setAppearance({ backgroundId: bg.id })}
              title={bg.name}
              aria-label={bg.name}
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                background: bg.value,
                cursor: "pointer",
                border: "2px solid transparent",
                outline: selected ? "2px solid #E8735A" : "none",
                outlineOffset: 2,
                transition: "transform 150ms ease",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          );
        })}

        {/* Upload your own */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          aria-label="Upload your own background"
          title="Upload your own"
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: appearance.backgroundId === "custom-image" && appearance.customBg
              ? `url(${appearance.customBg}) center/cover no-repeat`
              : "#fff",
            border: "2px dashed #D6D2CC",
            color: "#7A7A7A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            outline: appearance.backgroundId === "custom-image" ? "2px solid #E8735A" : "none",
            outlineOffset: 2,
          }}
        >
          <HiOutlinePhoto size={20} />
        </button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onUpload} />

        {/* Solid color */}
        <label
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: appearance.backgroundId === "solid" && appearance.customBg ? appearance.customBg : "#fff",
            border: "2px dashed #D6D2CC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            color: "#7A7A7A",
            outline: appearance.backgroundId === "solid" ? "2px solid #E8735A" : "none",
            outlineOffset: 2,
          }}
          title="Pick a solid color"
        >
          <HiOutlineSwatch size={20} />
          <input
            type="color"
            value={appearance.backgroundId === "solid" && appearance.customBg ? appearance.customBg : "#FAFAFA"}
            onChange={(e) => setAppearance({ backgroundId: "solid", customBg: e.target.value })}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              cursor: "pointer",
            }}
          />
        </label>
      </div>

      {/* Themes */}
      <h2 style={{ fontSize: "1.0625rem", fontWeight: 600, color: "#1A1A1A", marginBottom: 12 }}>
        Color theme
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {THEMES.map((theme) => {
          const selected = appearance.themeId === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setAppearance({ themeId: theme.id })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                border: selected ? "1px solid transparent" : "1px solid #E8E4DF",
                background: selected ? theme.accent : "#fff",
                color: selected ? "#fff" : "#1A1A1A",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 150ms ease, color 150ms ease",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: theme.accent,
                  border: selected ? "1px solid rgba(255,255,255,0.6)" : "1px solid transparent",
                }}
              />
              {theme.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
