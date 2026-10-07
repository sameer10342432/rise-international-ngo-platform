import { ImpactStat } from '../types';

/**
 * Authentic RISE International Impact Metrics
 * Sourced directly from WordPress records and official annual reports (riseintl.org / public_html)
 */
export const primaryImpactStats: ImpactStat[] = [
  {
    id: "trees-planted",
    value: "500+",
    numericValue: 500,
    suffix: "+",
    label: "Trees Planted",
    description: "Planted across school campuses and rural areas under the climate awareness initiative led by Prof. Saima.",
    icon: "park",
  },
  {
    id: "annual-relief",
    value: "2,500+",
    numericValue: 2500,
    suffix: "+",
    label: "Annual Relief Beneficiaries",
    description: "Vulnerable individuals reached with winter rations, warm apparel, and care kits across Punjab.",
    icon: "volunteer_activism",
  },
  {
    id: "care-packages",
    value: "500+",
    numericValue: 500,
    suffix: "+",
    label: "Care Packages Delivered",
    description: "Essential family food packages and relief supplies distributed during winter outreach programs.",
    icon: "inventory_2",
  },
  {
    id: "st-louis-launch",
    value: "2026",
    numericValue: 2026,
    suffix: "",
    label: "St. Louis IT Hub Launch",
    description: "Target opening date for the flagship rural Higher Information Technology Institute.",
    icon: "computer",
  },
  {
    id: "accountability",
    value: "100%",
    numericValue: 100,
    suffix: "%",
    label: "Grassroots Accountability",
    description: "Community-driven priority setting and transparent stewardship of all resources.",
    icon: "verified",
  },
];

export const detailedImpactMetrics = [
  {
    metric: "Community-Led",
    label: "Grassroots Stewardship",
    subtext: "Every project is identified and co-directed with local community members and elders.",
  },
  {
    metric: "Direct Relief",
    label: "Needs-Based Support",
    subtext: "Direct assistance to marginalized families, brick kiln workers, and vulnerable children.",
  },
  {
    metric: "Future-Ready",
    label: "Technology & Skills",
    subtext: "Equipping rural youth with computer science and vocational training through St. Louis Institute.",
  },
  {
    metric: "Interfaith",
    label: "Social Solidarity",
    subtext: "Uniting faith traditions for peace, tolerance, and mutual civic protection.",
  },
];
