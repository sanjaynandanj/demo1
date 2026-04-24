"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  emoji?: string;
  visible: boolean;
}

export interface Publication {
  id: string;
  title: string;
  url: string;
}

export interface SocialHandles {
  instagram: string; tiktok: string; youtube: string; twitter: string;
  facebook: string; onlyfans: string; linkedin: string; spotify: string;
  website: string;
}

export interface ProfileData {
  displayName: string;
  bio: string;
  avatar: string;
  username: string;
  social: SocialHandles;
  extraText: string;
  extraPhoto: string;
  publications: Publication[];
}

export interface AppearanceData {
  backgroundId: string;
  customBg: string;
  themeId: string;
}

export interface PaymentButton {
  id: string;
  url: string;
  label: string;
  visible: boolean;
}

export interface PaymentsData {
  buttons: PaymentButton[];
}

export interface PageData {
  profile: ProfileData;
  links: LinkItem[];
  appearance: AppearanceData;
  payments: PaymentsData;
  isPublished: boolean;
}

const makeId = () => Math.random().toString(36).slice(2, 10);

export const DEFAULT_DATA: PageData = {
  profile: {
    displayName: "Maya Calloway",
    bio: "Brooklyn florist · weekly market at Fort Greene · custom arrangements for weddings & events.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    username: "maya",
    social: {
      instagram: "https://instagram.com/mayacalloway",
      tiktok: "",
      youtube: "",
      twitter: "",
      facebook: "",
      onlyfans: "",
      linkedin: "",
      spotify: "",
      website: "https://mayaflowers.com",
    },
    extraText: "Open studio visits every Saturday, 11–4. Stop by with a coffee — no appointment needed.",
    extraPhoto: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=400&fit=crop",
    publications: [
      { id: makeId(), title: "Featured in Brooklyn Magazine — Spring 2026", url: "https://example.com" },
      { id: makeId(), title: "Editor's Pick, The Cut's Design Issue", url: "https://example.com" },
    ],
  },
  links: [
    { id: makeId(), title: "Shop this week's market bouquet", url: "https://mayaflowers.com/market", visible: true },
    { id: makeId(), title: "Book a wedding consultation", url: "https://calendly.com/mayaflowers/wedding", visible: true },
    { id: makeId(), title: "Studio workshops — monthly", url: "https://mayaflowers.com/workshops", visible: true, emoji: "🌷" },
    { id: makeId(), title: "Behind the scenes on Instagram", url: "https://instagram.com/mayacalloway", visible: true },
    { id: makeId(), title: "Spring newsletter", url: "https://mayaflowers.substack.com", visible: true },
  ],
  appearance: {
    backgroundId: "warm-sunrise",
    customBg: "",
    themeId: "warm-coral",
  },
  payments: {
    buttons: [
      { id: makeId(), url: "https://buy.stripe.com/example", label: "Tip the studio", visible: true },
    ],
  },
  isPublished: false,
};

interface PageContextType {
  data: PageData;
  setProfile: (patch: Partial<ProfileData>) => void;
  setSocial: (patch: Partial<SocialHandles>) => void;
  setAppearance: (patch: Partial<AppearanceData>) => void;
  addPaymentButton: (btn: Omit<PaymentButton, "id">) => void;
  updatePaymentButton: (id: string, patch: Partial<PaymentButton>) => void;
  deletePaymentButton: (id: string) => void;
  addLink: (link: Omit<LinkItem, "id">) => void;
  updateLink: (id: string, patch: Partial<LinkItem>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (ids: string[]) => void;
  toggleLink: (id: string) => void;
  addPublication: (pub: Omit<Publication, "id">) => void;
  updatePublication: (id: string, patch: Partial<Publication>) => void;
  deletePublication: (id: string) => void;
  setPublished: (v: boolean) => void;
}

const PageContext = createContext<PageContextType | null>(null);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PageData>(DEFAULT_DATA);

  const setProfile = useCallback((patch: Partial<ProfileData>) => {
    setData((d) => ({ ...d, profile: { ...d.profile, ...patch } }));
  }, []);

  const setSocial = useCallback((patch: Partial<SocialHandles>) => {
    setData((d) => ({ ...d, profile: { ...d.profile, social: { ...d.profile.social, ...patch } } }));
  }, []);

  const setAppearance = useCallback((patch: Partial<AppearanceData>) => {
    setData((d) => ({ ...d, appearance: { ...d.appearance, ...patch } }));
  }, []);

  const addPaymentButton = useCallback((btn: Omit<PaymentButton, "id">) => {
    setData((d) => ({ ...d, payments: { buttons: [...d.payments.buttons, { ...btn, id: makeId() }] } }));
  }, []);

  const updatePaymentButton = useCallback((id: string, patch: Partial<PaymentButton>) => {
    setData((d) => ({
      ...d,
      payments: { buttons: d.payments.buttons.map((b) => (b.id === id ? { ...b, ...patch } : b)) },
    }));
  }, []);

  const deletePaymentButton = useCallback((id: string) => {
    setData((d) => ({ ...d, payments: { buttons: d.payments.buttons.filter((b) => b.id !== id) } }));
  }, []);

  const addLink = useCallback((link: Omit<LinkItem, "id">) => {
    setData((d) => ({ ...d, links: [...d.links, { ...link, id: makeId() }] }));
  }, []);

  const updateLink = useCallback((id: string, patch: Partial<LinkItem>) => {
    setData((d) => ({ ...d, links: d.links.map((l) => (l.id === id ? { ...l, ...patch } : l)) }));
  }, []);

  const deleteLink = useCallback((id: string) => {
    setData((d) => ({ ...d, links: d.links.filter((l) => l.id !== id) }));
  }, []);

  const reorderLinks = useCallback((ids: string[]) => {
    setData((d) => {
      const map = new Map(d.links.map((l) => [l.id, l]));
      const next = ids.map((id) => map.get(id)).filter(Boolean) as LinkItem[];
      // append any links not in ids (safety)
      for (const l of d.links) if (!ids.includes(l.id)) next.push(l);
      return { ...d, links: next };
    });
  }, []);

  const toggleLink = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      links: d.links.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)),
    }));
  }, []);

  const addPublication = useCallback((pub: Omit<Publication, "id">) => {
    setData((d) => ({
      ...d,
      profile: { ...d.profile, publications: [...d.profile.publications, { ...pub, id: makeId() }] },
    }));
  }, []);

  const updatePublication = useCallback((id: string, patch: Partial<Publication>) => {
    setData((d) => ({
      ...d,
      profile: {
        ...d.profile,
        publications: d.profile.publications.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      },
    }));
  }, []);

  const deletePublication = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      profile: { ...d.profile, publications: d.profile.publications.filter((p) => p.id !== id) },
    }));
  }, []);

  const setPublished = useCallback((v: boolean) => {
    setData((d) => ({ ...d, isPublished: v }));
  }, []);

  const value = useMemo(
    () => ({
      data,
      setProfile,
      setSocial,
      setAppearance,
      addPaymentButton,
      updatePaymentButton,
      deletePaymentButton,
      addLink,
      updateLink,
      deleteLink,
      reorderLinks,
      toggleLink,
      addPublication,
      updatePublication,
      deletePublication,
      setPublished,
    }),
    [data, setProfile, setSocial, setAppearance, addPaymentButton, updatePaymentButton, deletePaymentButton, addLink, updateLink, deleteLink, reorderLinks, toggleLink, addPublication, updatePublication, deletePublication, setPublished]
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage(): PageContextType {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error("usePage must be used within PageProvider");
  return ctx;
}
