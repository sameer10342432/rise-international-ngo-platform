import { Partner } from '../types';

/**
 * Partnership Collaboration Areas & Frameworks
 * Strictly adheres to rule: Do NOT list fake partner organisations.
 * Clearly articulates the verified sectors and collaboration models through which RISE International works.
 */
export const partnersData: Partner[] = [
  {
    id: "community-councils",
    name: "COMMUNITY COUNCILS",
    category: "Grassroots & Village Councils",
    icon: "groups",
  },
  {
    id: "educational-institutions",
    name: "LEARNING ALLIANCES",
    category: "Schools & Teacher Fellowships",
    icon: "school",
  },
  {
    id: "civic-initiatives",
    name: "HEALTH ALLIANCES",
    category: "Community Health Networks",
    icon: "health_and_safety",
  },
  {
    id: "sustainable-infra",
    name: "CLEAN WATER & ENERGY",
    category: "Technical & Solar Partners",
    icon: "solar_power",
  },
  {
    id: "artisan-cooperatives",
    name: "LIVELIHOOD HUBS",
    category: "Artisan & Agricultural Collectives",
    icon: "handshake",
  },
  {
    id: "institutional-supporters",
    name: "RESOURCE SUPPORTERS",
    category: "Philanthropic & Civic Coalitions",
    icon: "corporate_fare",
  },
];
