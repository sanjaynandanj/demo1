"use client";

import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
  innerWidth?: number;
  innerHeight?: number;
  scale?: number;
}

export default function PhoneFrame({
  children,
  innerWidth = 390,
  innerHeight = 780,
  scale = 1,
}: PhoneFrameProps) {
  const bezel = 12; // px of bezel on each side
  const frameWidth = innerWidth + bezel * 2;
  const frameHeight = innerHeight + bezel * 2;
  const layoutWidth = frameWidth * scale;
  const layoutHeight = frameHeight * scale;

  return (
    <div
      style={{
        width: layoutWidth,
        height: layoutHeight,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: frameWidth,
          height: frameHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Outer dark bezel */}
        <div
          style={{
            width: frameWidth,
            height: frameHeight,
            background: "#1A1A1A",
            borderRadius: 48,
            padding: bezel,
            boxShadow: "0 20px 48px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.08)",
            position: "relative",
          }}
        >
          {/* Inner screen */}
          <div
            style={{
              width: innerWidth,
              height: innerHeight,
              borderRadius: 38,
              overflow: "hidden",
              background: "#fff",
              position: "relative",
            }}
          >
            {/* Dynamic Island */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 100,
                height: 28,
                borderRadius: 999,
                background: "#0A0A0A",
                zIndex: 10,
              }}
            />
            <div
              className="no-scrollbar"
              style={{
                width: "100%",
                height: "100%",
                overflow: "auto",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
