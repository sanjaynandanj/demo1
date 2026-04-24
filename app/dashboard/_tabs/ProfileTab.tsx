"use client";

import React, { useRef } from "react";
import { HiOutlineUser, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi2";
import { usePage, type SocialHandles } from "../../_state/PageContext";
import { getPlatformByKey } from "../../_lib/platforms";
import { useToast } from "../../_components/Toast";

const SOCIAL_FIELDS: Array<{ field: keyof SocialHandles; key: string; placeholder: string }> = [
  { field: "instagram", key: "instagram", placeholder: "https://instagram.com/you" },
  { field: "tiktok", key: "tiktok", placeholder: "https://tiktok.com/@you" },
  { field: "youtube", key: "youtube", placeholder: "https://youtube.com/@you" },
  { field: "twitter", key: "x", placeholder: "https://x.com/you" },
  { field: "facebook", key: "facebook", placeholder: "https://facebook.com/you" },
  { field: "onlyfans", key: "onlyfans", placeholder: "https://onlyfans.com/you" },
  { field: "linkedin", key: "linkedin", placeholder: "https://linkedin.com/in/you" },
  { field: "spotify", key: "spotify", placeholder: "https://open.spotify.com/artist/…" },
  { field: "website", key: "website", placeholder: "https://yoursite.com" },
];

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function ProfileTab() {
  const { data, setProfile, setSocial, addPublication, updatePublication, deletePublication } = usePage();
  const { profile } = data;
  const toast = useToast();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const extraPhotoRef = useRef<HTMLInputElement>(null);

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.show("Please choose an image under 5MB.");
      return;
    }
    const dataUrl = await readAsDataUrl(file);
    setProfile({ avatar: dataUrl });
  };

  const handleExtraPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.show("Please choose an image under 5MB.");
      return;
    }
    const dataUrl = await readAsDataUrl(file);
    setProfile({ extraPhoto: dataUrl });
  };

  return (
    <div>
      <h1 className="font-display" style={{ fontSize: "1.75rem", color: "#1A1A1A", marginBottom: 6 }}>
        Your profile
      </h1>
      <p style={{ color: "#4A4A4A", fontSize: "0.9375rem", marginBottom: 24 }}>
        Who you are, in a glance.
      </p>

      {/* Avatar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <button
          type="button"
          onClick={() => avatarInputRef.current?.click()}
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "#fff",
            border: "2px dashed #E8E4DF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            cursor: "pointer",
            color: "#7A7A7A",
          }}
        >
          {profile.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <HiOutlineUser size={32} />
          )}
        </button>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={handleAvatar}
        />
        <div style={{ fontSize: "0.8125rem", color: "#7A7A7A" }}>Square images look best. Max 5MB.</div>
      </div>

      <FieldGroup>
        <Field label="Display name" counter={`${profile.displayName.length}/40`}>
          <input
            type="text"
            value={profile.displayName}
            maxLength={40}
            onChange={(e) => setProfile({ displayName: e.target.value })}
            className="input-field"
            placeholder="Your name"
          />
        </Field>

        <Field label="Bio" counter={`${profile.bio.length}/200`}>
          <textarea
            value={profile.bio}
            maxLength={200}
            onChange={(e) => setProfile({ bio: e.target.value })}
            className="input-field"
            placeholder="One or two sentences about you."
            rows={3}
            style={{ resize: "vertical", minHeight: 80 }}
          />
        </Field>

        <Field label="Username">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #E8E4DF",
              borderRadius: 8,
              background: "#fff",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                padding: "12px 12px 12px 16px",
                color: "#7A7A7A",
                fontSize: "0.9375rem",
                background: "#FAFAFA",
                borderRight: "1px solid #E8E4DF",
              }}
            >
              corner.link/page/
            </span>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile({ username: e.target.value.replace(/\s+/g, "").toLowerCase() })}
              placeholder="handle"
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "none",
                outline: "none",
                fontSize: "0.9375rem",
                color: "#1A1A1A",
                background: "#fff",
              }}
            />
          </div>
        </Field>
      </FieldGroup>

      <SectionHeading>Social profiles</SectionHeading>
      <FieldGroup>
        {SOCIAL_FIELDS.map(({ field, key, placeholder }) => {
          const p = getPlatformByKey(key);
          const Icon = p.icon;
          return (
            <div key={field} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#4A4A4A" }}>
                {p.name}
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#7A7A7A",
                    display: "inline-flex",
                  }}
                >
                  <Icon size={16} />
                </span>
                <input
                  type="url"
                  value={profile.social[field]}
                  onChange={(e) => setSocial({ [field]: e.target.value } as Partial<SocialHandles>)}
                  placeholder={placeholder}
                  className="input-field"
                  style={{ paddingLeft: 40 }}
                />
              </div>
            </div>
          );
        })}
      </FieldGroup>

      <SectionHeading>Extra info (optional)</SectionHeading>
      <FieldGroup>
        <Field label="Text block" counter={`${profile.extraText.length}/500`}>
          <textarea
            value={profile.extraText}
            maxLength={500}
            onChange={(e) => setProfile({ extraText: e.target.value })}
            className="input-field"
            placeholder="This appears below your links as a text section."
            rows={4}
            style={{ resize: "vertical", minHeight: 100 }}
          />
        </Field>

        <Field label="Extra photo">
          {profile.extraPhoto ? (
            <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.extraPhoto} alt="" style={{ width: "100%", display: "block" }} />
              <button
                type="button"
                onClick={() => setProfile({ extraPhoto: "" })}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 10px",
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => extraPhotoRef.current?.click()}
              style={{
                width: "100%",
                padding: "32px 16px",
                border: "2px dashed #E8E4DF",
                borderRadius: 12,
                background: "#fff",
                color: "#7A7A7A",
                cursor: "pointer",
                fontSize: "0.9375rem",
              }}
            >
              Click to upload an image
            </button>
          )}
          <input
            ref={extraPhotoRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            style={{ display: "none" }}
            onChange={handleExtraPhoto}
          />
        </Field>
      </FieldGroup>

      <SectionHeading>Publications / press</SectionHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {profile.publications.map((pub) => (
          <div
            key={pub.id}
            style={{
              background: "#fff",
              border: "1px solid #E8E4DF",
              borderRadius: 12,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <input
              type="text"
              placeholder="Title (e.g., Featured in Brooklyn Magazine)"
              value={pub.title}
              onChange={(e) => updatePublication(pub.id, { title: e.target.value })}
              className="input-field"
            />
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="url"
                placeholder="Link URL (optional)"
                value={pub.url}
                onChange={(e) => updatePublication(pub.id, { url: e.target.value })}
                className="input-field"
              />
              <button
                type="button"
                onClick={() => deletePublication(pub.id)}
                aria-label="Remove publication"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "transparent",
                  color: "#D94F4F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #E8E4DF",
                  flexShrink: 0,
                }}
              >
                <HiOutlineTrash size={16} />
              </button>
            </div>
          </div>
        ))}
        {profile.publications.length < 10 && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => addPublication({ title: "", url: "" })}
            style={{ justifyContent: "flex-start" }}
          >
            <HiOutlinePlus size={16} />
            Add publication
          </button>
        )}
      </div>
    </div>
  );
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>{children}</div>;
}

function Field({
  label,
  counter,
  children,
}: {
  label: string;
  counter?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#4A4A4A" }}>{label}</label>
        {counter ? <span style={{ fontSize: "0.75rem", color: "#7A7A7A" }}>{counter}</span> : null}
      </div>
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "#1A1A1A",
        marginTop: 8,
        marginBottom: 12,
      }}
    >
      {children}
    </h2>
  );
}
