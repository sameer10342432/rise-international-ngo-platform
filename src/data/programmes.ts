import { Programme } from '../types';

export const programmesData: Programme[] = [
  {
    id: "education",
    slug: "education",
    title: "Education",
    category: "Education",
    tag: "Education",
    description: "Expanding access to quality learning environments, youth skills training, and teacher support to unlock long-term opportunity.",
    fullDescription: "Education is a transformative foundation for enduring community change. RISE International works alongside local educators, parents, and community leaders to support safe learning environments, expand access to educational resources, and foster foundational literacy and digital skills for youth.",
    mission: "To foster inclusive, high-quality learning opportunities that equip children and youth with the knowledge, confidence, and practical skills needed for a self-determined future.",
    whatWeDo: [
      "Support community-led learning spaces and safe classroom environments",
      "Provide essential learning materials, books, and instructional tools",
      "Collaborate with local educators to offer professional development workshops",
      "Facilitate foundational literacy, numeracy, and practical youth skills development",
      "Encourage community-managed parent-teacher forums to support student continuity"
    ],
    impactPoints: [
      "Community-centred learning spaces supported across partner regions",
      "Strengthened learning pathways for children in under-resourced communities",
      "Dedicated teacher support sessions focused on inclusive, modern pedagogy"
    ],
    image: "/images/rise-programme-card-education.webp",
    altText: "Elementary students in uniforms sitting at wooden desks attentive to their teacher",
    icon: "school",
    colour: "#16B866",
    link: "/our-work/education",
    stats: [
      { label: "Focus Area", value: "Primary & Youth" },
      { label: "Implementation", value: "Community-Led" },
      { label: "Approach", value: "Inclusive Access" }
    ]
  },
  {
    id: "community-development",
    slug: "community-development",
    title: "Community Development",
    category: "Community Resilience",
    tag: "Sustainability",
    description: "Strengthening community resilience through participatory planning, sustainable clean water systems, and local infrastructure.",
    fullDescription: "Sustainable progress begins with local ownership. Our community development initiatives focus on listening to community priorities and co-designing sustainable solutions—from clean water access to renewable solar power and agricultural resource management.",
    mission: "To strengthen local autonomy by investing in community capacity, sustainable infrastructure, and participatory decision-making.",
    whatWeDo: [
      "Collaborate with community councils to identify and plan key infrastructure needs",
      "Support clean water initiatives and reliable water access points",
      "Promote sustainable local resources and renewable solar energy adoption",
      "Train local committees to ensure operational stewardship and maintenance",
      "Foster community resilience against environmental and economic challenges"
    ],
    impactPoints: [
      "Locally managed water and sanitation infrastructure established with community committees",
      "Participatory planning processes that place decision-making in the hands of residents",
      "Ongoing capacity training to support long-term infrastructure maintenance"
    ],
    image: "/images/rise-programme-card-community-dev.webp",
    altText: "Engineers and community workers installing reliable solar water pumping equipment",
    icon: "solar_power",
    colour: "#006d39",
    link: "/our-work/community-development",
    stats: [
      { label: "Approach", value: "Grassroots" },
      { label: "Ownership", value: "100% Local" },
      { label: "Focus", value: "Sustainability" }
    ]
  },
  {
    id: "humanitarian-aid",
    slug: "humanitarian-aid",
    title: "Humanitarian Aid",
    category: "Emergency Relief",
    tag: "Humanitarian Response",
    description: "Delivering dignified emergency assistance, vital health supplies, and coordinated relief alongside community responders.",
    fullDescription: "When crises and natural hardships occur, timely and respectful assistance preserves dignity and protects lives. RISE International provides emergency aid grounded in humanitarian principles, ensuring that relief efforts prioritize the vulnerable while laying foundations for steady recovery.",
    mission: "To provide prompt, compassionate, and dignified humanitarian relief that addresses immediate survival needs while fostering long-term recovery.",
    whatWeDo: [
      "Coordinate with local emergency networks to deliver essential food and household supplies",
      "Facilitate emergency water purification and essential health hygiene kits",
      "Support primary community healthcare outreach and medical wellness checks",
      "Provide dignified shelter support for families experiencing acute hardship",
      "Bridge emergency interventions into community-led recovery and rehabilitation"
    ],
    impactPoints: [
      "Timely, dignified emergency assistance provided during community crises",
      "Community healthcare outreach focused on maternal and child health support",
      "Close coordination with frontline local responders to minimize duplication"
    ],
    image: "/images/rise-programme-card-humanitarian-aid.webp",
    altText: "Healthcare worker providing respectful medical consultation at a community clinic",
    icon: "health_and_safety",
    colour: "#0B2145",
    link: "/our-work/humanitarian-aid",
    stats: [
      { label: "Response", value: "Needs-Based" },
      { label: "Principle", value: "Human Dignity" },
      { label: "Coordination", value: "Local Partners" }
    ]
  },
  {
    id: "economic-empowerment",
    slug: "economic-empowerment",
    title: "Economic Empowerment",
    category: "Livelihood & Skills",
    tag: "Livelihoods",
    description: "Equipping individuals and cooperatives with practical vocational skills, mentorship, and opportunities for sustainable financial independence.",
    fullDescription: "Economic independence is central to breaking cycles of poverty. We support vocational training programs, women's artisan collectives, and smallholder initiatives, helping individuals develop resilient livelihoods and participate fully in local economic life.",
    mission: "To unlock sustainable income opportunities by equipping community entrepreneurs and cooperatives with practical training, tools, and mentorship.",
    whatWeDo: [
      "Facilitate vocational training and skills workshops in viable local trades",
      "Support grassroots artisan and agricultural cooperatives with tools and workspace",
      "Provide practical mentorship in basic financial literacy, budgeting, and planning",
      "Help local producers access broader community markets and fair exchange opportunities",
      "Encourage youth entrepreneurship through hands-on technical apprenticeships"
    ],
    impactPoints: [
      "Vocational training programs equipping participants with marketable craft and trade skills",
      "Strengthened women-led cooperative enterprises fostering household financial stability",
      "Youth apprenticeship initiatives creating clear pathways into skilled employment"
    ],
    image: "/images/rise-programme-card-economic-empowerment.webp",
    altText: "Tailoring trainee measuring fabric on a worktable in a vocational training studio",
    icon: "monetization_on",
    colour: "#1479E8",
    link: "/our-work/economic-empowerment",
    stats: [
      { label: "Focus", value: "Vocational Skills" },
      { label: "Participation", value: "Inclusive" },
      { label: "Outcome", value: "Self-Reliance" }
    ]
  }
];
