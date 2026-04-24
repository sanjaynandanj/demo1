export interface Background {
  id: string;
  name: string;
  value: string;
}

export const BACKGROUNDS: Background[] = [
  { id: "warm-sunrise",  name: "Warm Sunrise",  value: "linear-gradient(135deg, #FBF8F4 0%, #F5E6D3 50%, #F0D5C0 100%)" },
  { id: "cool-ocean",    name: "Cool Ocean",    value: "linear-gradient(135deg, #F0F4F8 0%, #D4E4ED 50%, #C1D8E8 100%)" },
  { id: "soft-sage",     name: "Soft Sage",     value: "linear-gradient(135deg, #F4F7F4 0%, #DCE8DC 50%, #C8D8C8 100%)" },
  { id: "golden-hour",   name: "Golden Hour",   value: "linear-gradient(135deg, #FBF6EF 0%, #F5E0C0 50%, #EDD4A8 100%)" },
  { id: "minimal-white", name: "Minimal White", value: "#FAFAFA" },
  { id: "charcoal-dark", name: "Charcoal Dark", value: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)" },
  { id: "dusty-rose",    name: "Dusty Rose",    value: "linear-gradient(135deg, #FBF4F4 0%, #F0D5D5 50%, #E8C0C0 100%)" },
  { id: "lavender-mist", name: "Lavender Mist", value: "linear-gradient(135deg, #F5F3FB 0%, #E0D5F0 50%, #D0C0E8 100%)" },
  { id: "terracotta",    name: "Terracotta",    value: "linear-gradient(135deg, #FBF4F0 0%, #E8C4B0 50%, #D4A088 100%)" },
  { id: "slate-blue",    name: "Slate Blue",    value: "linear-gradient(135deg, #F0F2F8 0%, #C4CCE0 50%, #A8B4D0 100%)" },
];

export const DARK_BGS = new Set(["charcoal-dark"]);

export function getBackgroundValue(id: string, customBg: string): string {
  if (id === "custom-image") {
    return customBg ? `url(${customBg}) center/cover no-repeat` : "#FAFAFA";
  }
  if (id === "solid") {
    return customBg || "#FAFAFA";
  }
  const found = BACKGROUNDS.find((b) => b.id === id);
  return found ? found.value : BACKGROUNDS[0].value;
}

export function isDarkBackground(id: string, customBg: string): boolean {
  if (id === "solid" && customBg) {
    // quick luminance estimate for solid color
    const hex = customBg.replace("#", "");
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luma < 0.5;
    }
  }
  return DARK_BGS.has(id);
}
