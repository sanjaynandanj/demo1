"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface ToastItem {
  id: number;
  message: string;
  leaving?: boolean;
}

interface ToastContextType {
  show: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, 250);
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          left: "50%",
          bottom: 32,
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              background: "#1A1A1A",
              color: "#FAFAFA",
              padding: "12px 20px",
              borderRadius: 12,
              fontSize: "0.875rem",
              fontWeight: 500,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              animation: t.leaving ? "fadeIn 250ms reverse" : "toastIn 250ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              pointerEvents: "auto",
              maxWidth: 440,
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // safe no-op outside provider
    return { show: () => {} };
  }
  return ctx;
}

// Optional helper to also use outside of provider where we always expect it
export function useRequiredToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useRequiredToast must be used within ToastProvider");
  return ctx;
}

// silence unused warning
void useEffect;
