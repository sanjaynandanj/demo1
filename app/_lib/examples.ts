import type { PageData } from "../_state/PageContext";

const id = (n: string) => `example-${n}`;

export const EXAMPLE_PAGES: PageData[] = [
  {
    profile: {
      displayName: "Eli Marchetti",
      username: "eli",
      bio: "Illustrator & picture-book author. Brooklyn, NY. Currently drawing for The New Yorker.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      social: {
        instagram: "https://instagram.com/eli",
        tiktok: "",
        youtube: "",
        twitter: "https://twitter.com/eli",
        facebook: "",
        onlyfans: "",
        linkedin: "",
        spotify: "",
        website: "https://elimarchetti.com",
      },
      extraText: "Commissions open for April. Editorial, book covers, and prints.",
      extraPhoto: "",
      publications: [
        { id: id("p1"), title: "The New Yorker — recurring contributor", url: "https://example.com" },
        { id: id("p2"), title: "It's Nice That — feature, 2025", url: "https://example.com" },
      ],
    },
    links: [
      { id: id("l1"), title: "Shop prints", url: "https://elimarchetti.com/shop", visible: true },
      { id: id("l2"), title: "Commission enquiry form", url: "https://tally.so/eli", visible: true, emoji: "✍️" },
      { id: id("l3"), title: "Portfolio", url: "https://elimarchetti.com", visible: true },
      { id: id("l4"), title: "Behind the sketchbook", url: "https://instagram.com/eli", visible: true },
    ],
    appearance: { backgroundId: "cool-ocean", customBg: "", themeId: "ocean-blue" },
    payments: { buttons: [{ id: id("pay"), url: "https://buy.stripe.com/eli", label: "Buy me a coffee", visible: true }] },
    isPublished: true,
  },
  {
    profile: {
      displayName: "Noor & The Backroom",
      username: "noor",
      bio: "Indie soul trio · Brooklyn ↔ London · new record out May 9.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
      social: {
        instagram: "https://instagram.com/noor",
        tiktok: "https://tiktok.com/@noor",
        youtube: "https://youtube.com/@noor",
        twitter: "",
        facebook: "",
        onlyfans: "",
        linkedin: "",
        spotify: "https://spotify.com/artist/noor",
        website: "",
      },
      extraText: "",
      extraPhoto: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      publications: [],
    },
    links: [
      { id: id("nl1"), title: "Listen to 'Nightbloom' — new single", url: "https://open.spotify.com/track/xyz", visible: true, emoji: "🎵" },
      { id: id("nl2"), title: "Tickets: UK tour, May", url: "https://dice.fm/noor", visible: true },
      { id: id("nl3"), title: "Watch the 'Backroom' live session", url: "https://youtube.com/@noor", visible: true },
      { id: id("nl4"), title: "Merch store", url: "https://noor.bandcamp.com/merch", visible: true },
    ],
    appearance: { backgroundId: "charcoal-dark", customBg: "", themeId: "midnight-dark" },
    payments: { buttons: [] },
    isPublished: true,
  },
  {
    profile: {
      displayName: "Sana Patel",
      username: "sana",
      bio: "Yoga & breathwork teacher · Los Angeles · E-RYT 500.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      social: {
        instagram: "https://instagram.com/sana",
        tiktok: "",
        youtube: "https://youtube.com/@sana",
        twitter: "",
        facebook: "",
        onlyfans: "",
        linkedin: "",
        spotify: "",
        website: "https://sanapatel.yoga",
      },
      extraText: "Classes Monday, Wednesday & Saturday. All levels welcome.",
      extraPhoto: "",
      publications: [
        { id: id("sp1"), title: "Yoga Journal — Teacher to Watch, 2025", url: "https://example.com" },
      ],
    },
    links: [
      { id: id("sl1"), title: "Book a private session", url: "https://calendly.com/sana", visible: true },
      { id: id("sl2"), title: "10-day breathwork series", url: "https://sanapatel.yoga/breathwork", visible: true, emoji: "🌿" },
      { id: id("sl3"), title: "Class schedule", url: "https://sanapatel.yoga/schedule", visible: true },
      { id: id("sl4"), title: "Free intro video", url: "https://youtube.com/@sana", visible: true },
    ],
    appearance: { backgroundId: "soft-sage", customBg: "", themeId: "forest-green" },
    payments: { buttons: [{ id: id("spay"), url: "https://buy.stripe.com/sana", label: "Support this practice", visible: true }] },
    isPublished: true,
  },
];

export function findExampleByUsername(username: string): PageData | undefined {
  return EXAMPLE_PAGES.find((p) => p.profile.username === username);
}
