export type HeroCampaignData = {
  badge: string;
  subtitle: string;
  discountNumber: string;
  discountSymbol: string;
  discountUnit: string;
  titleLine1: string;
  titleLine2: string;
  durationDate: string;
  ctaText: string;
  ctaLink: string;
  secondaryText: string;
  secondaryLink: string;
  showDiscount: boolean;
  showDuration: boolean;
};

export const defaultHeroCampaign: HeroCampaignData = {
  badge: "BLACK FRIDAY",
  subtitle: "SITEWIDE SALE",
  discountNumber: "50",
  discountSymbol: "%",
  discountUnit: "OFF",
  titleLine1: "NOT FOR",
  titleLine2: "EVERYONE.",
  durationDate: "NOV 27 — NOV 29",
  ctaText: "Explore drop",
  ctaLink: "#featured",
  secondaryText: "Members only",
  secondaryLink: "/login/",
  showDiscount: true,
  showDuration: true,
};

export const CAMPAIGN_STORAGE_KEY = "classified_hero_campaign_v2";

export function getStoredHeroCampaign(): HeroCampaignData {
  if (typeof window === "undefined") return defaultHeroCampaign;
  try {
    const raw = window.localStorage.getItem(CAMPAIGN_STORAGE_KEY);
    if (!raw) return defaultHeroCampaign;
    const parsed = JSON.parse(raw);
    return { ...defaultHeroCampaign, ...parsed };
  } catch {
    return defaultHeroCampaign;
  }
}

export function saveStoredHeroCampaign(data: HeroCampaignData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}
