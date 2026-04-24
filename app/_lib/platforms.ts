import type { ComponentType } from "react";
import {
  FaInstagram, FaTiktok, FaYoutube, FaFacebook, FaLinkedin, FaSpotify,
  FaSnapchatGhost, FaPinterest, FaTwitch, FaGithub, FaSoundcloud,
  FaDiscord, FaTelegram, FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiOnlyfans, SiApplemusic, SiThreads, SiSubstack } from "react-icons/si";
import { HiOutlineEnvelope, HiOutlineLink } from "react-icons/hi2";

export type IconType = ComponentType<{ className?: string; size?: number | string; style?: React.CSSProperties }>;

export interface Platform {
  key: string;
  name: string;
  icon: IconType;
  color: string;
  match: (url: string) => boolean;
}

const has = (sub: string) => (url: string) => url.toLowerCase().includes(sub);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PLATFORMS: Platform[] = [
  { key: "instagram", name: "Instagram", icon: FaInstagram, color: "#E4405F", match: has("instagram.com") },
  { key: "tiktok", name: "TikTok", icon: FaTiktok, color: "#000000", match: has("tiktok.com") },
  { key: "youtube", name: "YouTube", icon: FaYoutube, color: "#FF0000", match: (u) => has("youtube.com")(u) || has("youtu.be")(u) },
  { key: "x", name: "X", icon: FaXTwitter, color: "#000000", match: (u) => has("twitter.com")(u) || has("x.com")(u) },
  { key: "facebook", name: "Facebook", icon: FaFacebook, color: "#1877F2", match: (u) => has("facebook.com")(u) || has("fb.com")(u) },
  { key: "linkedin", name: "LinkedIn", icon: FaLinkedin, color: "#0A66C2", match: has("linkedin.com") },
  { key: "spotify", name: "Spotify", icon: FaSpotify, color: "#1DB954", match: has("spotify.com") },
  { key: "onlyfans", name: "OnlyFans", icon: SiOnlyfans, color: "#00AFF0", match: has("onlyfans.com") },
  { key: "snapchat", name: "Snapchat", icon: FaSnapchatGhost, color: "#FFFC00", match: has("snapchat.com") },
  { key: "pinterest", name: "Pinterest", icon: FaPinterest, color: "#BD081C", match: has("pinterest.com") },
  { key: "twitch", name: "Twitch", icon: FaTwitch, color: "#9146FF", match: has("twitch.tv") },
  { key: "github", name: "GitHub", icon: FaGithub, color: "#181717", match: has("github.com") },
  { key: "applemusic", name: "Apple Music", icon: SiApplemusic, color: "#FA243C", match: has("music.apple.com") },
  { key: "soundcloud", name: "SoundCloud", icon: FaSoundcloud, color: "#FF5500", match: has("soundcloud.com") },
  { key: "discord", name: "Discord", icon: FaDiscord, color: "#5865F2", match: (u) => has("discord.com")(u) || has("discord.gg")(u) },
  { key: "telegram", name: "Telegram", icon: FaTelegram, color: "#0088CC", match: (u) => has("telegram.org")(u) || has("t.me")(u) },
  { key: "whatsapp", name: "WhatsApp", icon: FaWhatsapp, color: "#25D366", match: (u) => has("whatsapp.com")(u) || has("wa.me")(u) },
  { key: "threads", name: "Threads", icon: SiThreads, color: "#000000", match: has("threads.net") },
  { key: "substack", name: "Substack", icon: SiSubstack, color: "#FF6719", match: has("substack.com") },
  {
    key: "email",
    name: "Email",
    icon: HiOutlineEnvelope,
    color: "#4A4A4A",
    match: (u) => u.toLowerCase().startsWith("mailto:") || emailRegex.test(u.trim()),
  },
  { key: "website", name: "Website", icon: HiOutlineLink, color: "#4A4A4A", match: () => true },
];

export function detectPlatform(url: string): Platform {
  const trimmed = (url || "").trim();
  for (const p of PLATFORMS) {
    if (p.match(trimmed)) return p;
  }
  return PLATFORMS[PLATFORMS.length - 1];
}

export function getPlatformByKey(key: string): Platform {
  return PLATFORMS.find((p) => p.key === key) ?? PLATFORMS[PLATFORMS.length - 1];
}
