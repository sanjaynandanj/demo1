"use client";

import React, { useState } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import Sidebar, { type TabId } from "./_components/Sidebar";
import PreviewPanel from "./_components/PreviewPanel";
import FullScreenPreview from "./_components/FullScreenPreview";
import LoginPromptModal from "./_components/LoginPromptModal";
import LinksTab from "./_tabs/LinksTab";
import ProfileTab from "./_tabs/ProfileTab";
import AppearanceTab from "./_tabs/AppearanceTab";
import PaymentsTab from "./_tabs/PaymentsTab";
import AccountTab from "./_tabs/AccountTab";
import { useToast } from "../_components/Toast";
import { usePage } from "../_state/PageContext";

export default function DashboardPage() {
  const [active, setActive] = useState<TabId>("links");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; mode: "save" | "publish" }>({
    open: false,
    mode: "save",
  });

  const toast = useToast();
  const { data, setPublished } = usePage();

  const onSave = () => setModal({ open: true, mode: "save" });
  const onPublish = () => {
    if (data.isPublished) {
      toast.show("Page updated");
      return;
    }
    setModal({ open: true, mode: "publish" });
  };

  const onContinue = () => {
    const mode = modal.mode;
    setModal({ open: false, mode });
    if (mode === "save") {
      toast.show("Draft saved");
    } else {
      setPublished(true);
      toast.show("Page published — you're live!");
    }
  };

  return (
    <div style={{ background: "#F8F6F3", minHeight: "100vh" }}>
      <DashboardHeader onPreview={() => setPreviewOpen(true)} onSave={onSave} onPublish={onPublish} />

      <div
        style={{
          maxWidth: 1600,
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-start",
          paddingBottom: 80,
        }}
      >
        <Sidebar active={active} onChange={setActive} />

        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: "24px 20px 24px",
            maxWidth: 720,
          }}
        >
          {active === "links" && <LinksTab />}
          {active === "profile" && <ProfileTab />}
          {active === "appearance" && <AppearanceTab />}
          {active === "payments" && <PaymentsTab />}
          {active === "account" && <AccountTab />}
        </main>

        <PreviewPanel />
      </div>

      <FullScreenPreview open={previewOpen} onClose={() => setPreviewOpen(false)} />
      <LoginPromptModal
        open={modal.open}
        mode={modal.mode}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
        onContinue={onContinue}
      />
    </div>
  );
}
