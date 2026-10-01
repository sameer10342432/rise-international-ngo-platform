import { ImpactStat } from '../types';

export const primaryImpactStats: ImpactStat[] = [
  {
    id: "countries",
    value: "25+",
    numericValue: 25,
    suffix: "+",
    label: "Countries Reached",
    description: "Expanding footprint across Sub-Saharan Africa and Central Asia.",
    icon: "public",
  },
  {
    id: "projects",
    value: "500+",
    numericValue: 500,
    suffix: "+",
    label: "Projects Completed",
    description: "Locally stewarded classrooms, water clinics, and agro-farms.",
    icon: "task_alt",
  },
  {
    id: "lives",
    value: "250K+",
    numericValue: 250,
    suffix: "K+",
    label: "Lives Impacted",
    description: "Direct beneficiaries of primary schooling, nutrition & solar wells.",
    icon: "groups",
  },
  {
    id: "volunteers",
    value: "1,500+",
    numericValue: 1500,
    suffix: "+",
    label: "Active Volunteers",
    description: "Certified physicians, engineers, teachers, and regional organizers.",
    icon: "handshake",
  },
  {
    id: "partners",
    value: "300+",
    numericValue: 300,
    suffix: "+",
    label: "Partners Worldwide",
    description: "Institutional donors, civil societies, and multilateral agencies.",
    icon: "corporate_fare",
  },
];

export const detailedImpactMetrics = [
  {
    metric: "88%",
    label: "Program Expenditure",
    subtext: "Of all funding directly deployed for ground interventions",
  },
  {
    metric: "120+",
    label: "Solar Boreholes",
    subtext: "Providing clean drinking water to over 140,000 villagers daily",
  },
  {
    metric: "45,000+",
    label: "School Kits Distributed",
    subtext: "Enabling vulnerable children to access uninterrupted schooling",
  },
  {
    metric: "98.4%",
    label: "Project Continuity Rate",
    subtext: "Community-maintained infrastructure active after 5+ years",
  },
];
