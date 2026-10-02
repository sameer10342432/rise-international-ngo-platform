import { TeamMember } from '../types';

/**
 * Functional Stewardship Roles
 * Note: Individual team appointments and biographies are managed via the CMS.
 * No unverified personal identities or fabricated accreditations are asserted.
 */
export const teamData: TeamMember[] = [
  {
    id: "executive-leadership",
    name: "Executive Leadership",
    role: "Organisation Direction & Strategy",
    department: "Executive Stewardship",
    bio: "Guiding RISE International's strategic vision, upholding humanitarian integrity, and fostering meaningful global partnerships.",
    image: "/images/rise-team-exec-leadership.webp",
  },
  {
    id: "field-programmes",
    name: "Programme Operations",
    role: "Community Initiatives & Field Coordination",
    department: "Programme Management",
    bio: "Working directly with community coordinators to ensure projects are locally driven, ethically implemented, and sustainable.",
    image: "/images/rise-team-programmes-director.webp",
  },
  {
    id: "education-initiatives",
    name: "Education & Skills",
    role: "Learning Initiatives Lead",
    department: "Education & Youth Opportunities",
    bio: "Focusing on inclusive primary education access, teacher training support, and foundational literacy opportunities.",
    image: "/images/rise-team-education-lead.webp",
  },
  {
    id: "humanitarian-operations",
    name: "Humanitarian Response",
    role: "Emergency Assistance Coordination",
    department: "Humanitarian Aid & Health",
    bio: "Coordinating rapid, dignified relief supplies, water access, and community healthcare support during acute hardship.",
    image: "/images/rise-team-humanitarian-lead.webp",
  },
  {
    id: "livelihoods-development",
    name: "Economic Empowerment",
    role: "Livelihood & Skills Development",
    department: "Community Enterprise",
    bio: "Supporting vocational training, women's artisan collectives, and smallholder community enterprise initiatives.",
    image: "/images/rise-team-economic-specialist.webp",
  },
  {
    id: "governance-transparency",
    name: "Governance & Accountability",
    role: "Financial Stewardship & Compliance",
    department: "Audit & Governance",
    bio: "Ensuring transparent resource allocation, rigorous compliance with humanitarian standards, and regular public reporting.",
    image: "/images/rise-team-accountability-lead.webp",
  }
];
