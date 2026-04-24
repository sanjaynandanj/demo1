"use client";

import React from "react";
import PhoneFrame from "../../_components/PhoneFrame";
import PublicPage from "../../_components/PublicPage";
import { usePage } from "../../_state/PageContext";

export default function PreviewPanel() {
  const { data } = usePage();

  return (
    <div
      className="dash-preview-panel"
      style={{
        flexShrink: 0,
        padding: "24px",
        display: "none",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "sticky",
        top: 68,
      }}
    >
      <PhoneFrame innerWidth={320} innerHeight={640} scale={0.95}>
        <PublicPage
          profile={data.profile}
          links={data.links}
          appearance={data.appearance}
          payments={data.payments}
          animate={false}
          interactive={true}
        />
      </PhoneFrame>
      <style jsx>{`
        @media (min-width: 1024px) {
          :global(.dash-preview-panel) {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
