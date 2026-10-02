import { NewsArticle } from '../types';

/**
 * Editorial Dispatches & News
 * Formatted according to Rule 18:
 * H1, Featured image, Category, Published date, Introduction, Main content, Related stories, CTA, SEO metadata.
 * Clearly marked as DRAFT / DEMO content to prevent fabrication of unverified historical events.
 */
export const newsArticlesData: NewsArticle[] = [
  {
    id: "strengthening-community-learning-initiatives",
    slug: "strengthening-community-learning-initiatives",
    title: "[Draft Demo] Strengthening Community Learning Spaces Through Shared Partnerships",
    excerpt: "Exploring collaborative approaches between local educators, community councils, and resource partners to support youth learning access.",
    content: [
      "Introduction: Access to reliable, supportive learning spaces is essential for youth development and community resilience. This draft dispatch outlines how RISE International collaborates with local school committees to address educational priorities.",
      "Main Content: Quality education depends not only on physical classrooms, but on the ongoing support provided to local teachers and families. By listening to community priorities, initiatives are tailored to supply foundational materials, repair existing structures, and create welcoming learning environments.",
      "Local Participation & Stewardship: Projects succeed best when community elders and parent committees take direct leadership. From maintaining solar classroom lighting to organizing study groups, community stewardship ensures long-term educational continuity.",
      "Looking Ahead: Sustainable change is built step-by-step through consistent, dignified collaboration with frontline educators.",
      "Notice: This article is demonstration draft content prepared for editorial review."
    ],
    category: "Education",
    image: "/images/rise-news-learning-hub-launch.webp",
    altText: "Community members gathering in computer room of newly opened educational learning centre",
    publishedAt: "2026-10-02",
    author: "Editorial Team",
    readTime: "4 min read",
    isDraftDemo: true,
  },
  {
    id: "sustainable-clean-water-approaches",
    slug: "sustainable-clean-water-approaches",
    title: "[Draft Demo] Sustainable Community Water Systems: Principles of Local Ownership",
    excerpt: "Why participatory planning and community maintenance committees are central to enduring clean water infrastructure.",
    content: [
      "Introduction: Clean, dependable water access is a cornerstone of public health, education, and economic stability in rural communities.",
      "Main Content: Traditional infrastructure projects often falter when maintenance knowledge is not embedded locally. RISE International's community development model emphasizes training local technicians and establishing accountable water committees prior to infrastructure completion.",
      "Sustainable Technology: Integrating solar-powered pumping systems reduces operational overhead and provides reliable water points that communities can independently operate.",
      "Notice: This article is demonstration draft content prepared for editorial review."
    ],
    category: "Community Development",
    image: "/images/rise-news-solar-water-expansion.webp",
    altText: "Solar panel clean energy installation powering community water borehole station",
    publishedAt: "2026-10-02",
    author: "Infrastructure Team",
    readTime: "3 min read",
    isDraftDemo: true,
  },
  {
    id: "principles-of-dignified-humanitarian-response",
    slug: "principles-of-dignified-humanitarian-response",
    title: "[Draft Demo] Principles of Dignified Humanitarian Aid and Community Recovery",
    excerpt: "How needs-based assistance and community coordination preserve dignity during acute hardship and disaster recovery.",
    content: [
      "Introduction: Humanitarian response must preserve individual dignity and foster local agency at every stage of relief.",
      "Main Content: In moments of acute emergency, rapid response must be closely coordinated with frontline local responders. Providing essential nutrition, clean water, and primary healthcare support with compassion ensures that vulnerable households receive timely assistance.",
      "From Relief to Recovery: Emergency aid must always anticipate the recovery phase, supporting local markets and community structures so that recovery belongs to the community.",
      "Notice: This article is demonstration draft content prepared for editorial review."
    ],
    category: "Humanitarian Aid",
    image: "/images/rise-news-annual-audit-transparency.webp",
    altText: "Analytical stewardship charts and evaluation metrics displayed on tablet device",
    publishedAt: "2026-10-02",
    author: "Humanitarian Team",
    readTime: "4 min read",
    isDraftDemo: true,
  },
];
