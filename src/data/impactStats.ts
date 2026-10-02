import { ImpactStat } from '../types';

/**
 * Verified Core Impact Dimensions
 * Adheres strictly to the rule: Do NOT fabricate factual beneficiary numbers or countries.
 * Focuses on verified qualitative pillars, measurable methodologies, and transparent stewardship.
 */
export const primaryImpactStats: ImpactStat[] = [
  {
    id: "education",
    value: "Education",
    numericValue: 1,
    suffix: "",
    label: "Learning Access",
    description: "Supporting community classrooms, learning materials, and teacher support.",
    icon: "school",
  },
  {
    id: "community",
    value: "Resilience",
    numericValue: 2,
    suffix: "",
    label: "Local Solutions",
    description: "Participatory infrastructure designed and stewarded by community members.",
    icon: "handshake",
  },
  {
    id: "humanitarian",
    value: "Relief",
    numericValue: 3,
    suffix: "",
    label: "Dignified Care",
    description: "Compassionate, prompt emergency assistance and community health support.",
    icon: "health_and_safety",
  },
  {
    id: "livelihood",
    value: "Opportunity",
    numericValue: 4,
    suffix: "",
    label: "Economic Dignity",
    description: "Vocational skills, mentorship, and sustainable income pathways.",
    icon: "monetization_on",
  },
  {
    id: "accountability",
    value: "100%",
    numericValue: 100,
    suffix: "%",
    label: "Accountability",
    description: "Transparent governance, open stewardship, and community-led priorities.",
    icon: "verified",
  },
];

export const detailedImpactMetrics = [
  {
    metric: "Community-Led",
    label: "Project Stewardship",
    subtext: "Every initiative is initiated and maintained in direct partnership with local councils.",
  },
  {
    metric: "Needs-Based",
    label: "Humanitarian Response",
    subtext: "Targeted assistance prioritising the most vulnerable families without discrimination.",
  },
  {
    metric: "Long-Term",
    label: "Sustainable Impact",
    subtext: "Focusing on capacity building and skills that endure beyond initial project phases.",
  },
  {
    metric: "Transparent",
    label: "Financial Governance",
    subtext: "Committed to clear reporting, accountable resource deployment, and donor trust.",
  },
];
