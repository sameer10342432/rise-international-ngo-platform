import { Programme } from '../types';

export const programmesData: Programme[] = [
  {
    id: "education",
    slug: "education",
    title: "Education",
    category: "Education",
    tag: "Education",
    description: "Providing quality education, safe learning environments, and essential school supplies for a brighter future.",
    fullDescription: "Education is the foundation of enduring empowerment. RISE International works with underserved rural and peri-urban communities to build climate-resilient solar classrooms, supply learning materials, and train educators in modernized pedagogies.",
    mission: "To eliminate educational inequality by providing safe, well-equipped learning facilities and holistic scholastic support to vulnerable children.",
    whatWeDo: [
      "Construct solar-powered primary and middle school classrooms.",
      "Distribute textbooks, digital learning tablets, and uniform essentials.",
      "Conduct specialized teacher training fellowships for rural educators.",
      "Provide clean drinking water and sanitation blocks at school sites.",
      "Offer girls' scholarship stipends to ensure gender parity in secondary education."
    ],
    impactPoints: [
      "Over 45,000 children enrolled in RISE-supported community classrooms.",
      "94% retention rate among scholarship recipients across 8 regions.",
      "140+ certified educators completing annual pedagogy workshops."
    ],
    image: "/images/classroom-children-education.png",
    altText: "Children in classroom interacting eagerly with their teacher",
    icon: "school",
    colour: "#16B866",
    link: "/our-work/education",
    stats: [
      { label: "Classrooms Built", value: "180+" },
      { label: "Students Reached", value: "45,000+" },
      { label: "Teachers Trained", value: "1,200+" }
    ]
  },
  {
    id: "community-development",
    slug: "community-development",
    title: "Community Development",
    category: "Sustainability",
    tag: "Sustainability",
    description: "Building resilient communities through sustainable solar infrastructure, water wells, and agricultural resources.",
    fullDescription: "True community transformation requires durable basic infrastructure and ecological resilience. We partner directly with indigenous village councils to construct solar-powered water stations, develop regenerative farms, and install clean mini-grids that power clinics and communal centers.",
    mission: "To strengthen community autonomy through renewable infrastructure, clean water access, and food sovereignty.",
    whatWeDo: [
      "Drill deep solar-pump boreholes delivering clean potable water.",
      "Establish drip-irrigated community cooperative vegetable gardens.",
      "Deploy off-grid solar microgrids for communal refrigeration and evening lighting.",
      "Train local maintenance water committees to ensure indefinite operational continuity.",
      "Equip community elders and youth with sustainable land management practices."
    ],
    impactPoints: [
      "140,000+ villagers with everyday access to safe, tested drinking water.",
      "Zero borehole failure rate due to community technical stewardship.",
      "35 regional farming cooperatives generating nutritional and economic yields."
    ],
    image: "/images/community-woman-harvest.png",
    altText: "Smiling woman agricultural leader holding a basket of fresh organic produce near solar irrigation",
    icon: "solar_power",
    colour: "#006d39",
    link: "/our-work/community-development",
    stats: [
      { label: "Water Wells Active", value: "120+" },
      { label: "Community Gardens", value: "48" },
      { label: "Clean Liters Pumped/Day", value: "650,000L" }
    ]
  },
  {
    id: "humanitarian-aid",
    slug: "humanitarian-aid",
    title: "Humanitarian Aid",
    category: "Emergency Care",
    tag: "Emergency Care",
    description: "Delivering rapid emergency relief, medical aid stations, and critical nutrition kits to families affected by crises.",
    fullDescription: "When disasters strike or protracted conflicts displace vulnerable families, immediate and dignified relief is imperative. RISE International's rapid response teams coordinate mobile medical units, maternal nutrition programs, and clean sanitation corridors in hard-to-reach crisis sectors.",
    mission: "To protect human dignity and preserve life by delivering agile, transparent emergency health and relief services during times of humanitarian catastrophe.",
    whatWeDo: [
      "Deploy mobile health clinics with solar-refrigerated vaccine transport.",
      "Provide therapeutic infant nutritional supplements to avert acute malnutrition.",
      "Distribute emergency shelter, clean water purification kits, and hygiene parcels.",
      "Provide primary trauma care and maternal health monitoring in remote field stations.",
      "Liaise with international logistics corridors for swift supply clearance."
    ],
    impactPoints: [
      "Over 90,000 patients treated through roving and stationary field clinics.",
      "Under-5 acute malnutrition mortality reduced by 62% in targeted emergency camps.",
      "Average deployment turnaround of under 48 hours following severe disaster events."
    ],
    image: "/images/humanitarian-medical-clinic.png",
    altText: "Female humanitarian medic using stethoscope to examine a healthy infant in field clinic",
    icon: "health_and_safety",
    colour: "#0B2145",
    link: "/our-work/humanitarian-aid",
    stats: [
      { label: "Emergency Consultations", value: "90,000+" },
      { label: "Relief Kits Delivered", value: "32,000+" },
      { label: "Mobile Clinics Active", value: "18" }
    ]
  },
  {
    id: "economic-empowerment",
    slug: "economic-empowerment",
    title: "Economic Empowerment",
    category: "Microfinance",
    tag: "Microfinance",
    description: "Creating pathways to long-term financial self-reliance through vocational mentorship, micro-grants, and cooperative markets.",
    fullDescription: "Charity alone cannot eliminate systemic poverty; sustainable financial independence can. RISE International invests in rural entrepreneurs, women's artisan collectives, and smallholder agro-enterprises through revolving micro-grants, financial literacy curriculums, and direct market access.",
    mission: "To unlock generational economic resilience by equipping grassroots entrepreneurs and cooperatives with capital, skills, and market channels.",
    whatWeDo: [
      "Provide zero-interest revolving seed capital to vetted women's cooperatives.",
      "Deliver certified bookkeeping, digital financial literacy, and marketing workshops.",
      "Facilitate collective purchase of agro-processing equipment like grain mills and oil presses.",
      "Connect regional craftspeople with fair-trade export aggregators.",
      "Mentor emerging youth apprentices in green technologies and technical trades."
    ],
    impactPoints: [
      "3,200+ micro-enterprises launched and flourishing with a 96% repayment return.",
      "Household incomes increased by an average of 180% within 18 months of cooperative entry.",
      "Over 8,500 family dependents supported through sustainable household earnings."
    ],
    image: "/images/community-woman-harvest.png",
    altText: "A cooperative of enterprising African artisans and small business owners discussing finance ledger",
    icon: "monetization_on",
    colour: "#1479E8",
    link: "/our-work/economic-empowerment",
    stats: [
      { label: "Businesses Funded", value: "3,200+" },
      { label: "Repayment Rate", value: "96.4%" },
      { label: "Women Beneficiaries", value: "82%" }
    ]
  }
];
