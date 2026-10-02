import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { programmesData } from '../../data/programmes';
import { storiesData } from '../../data/stories';
import { StoryCard } from '../../components/stories/StoryCard';

interface ProgrammeDetailPageProps {
  forcedSlug?: string;
}

export const ProgrammeDetailPage: React.FC<ProgrammeDetailPageProps> = ({ forcedSlug }) => {
  const { slug } = useParams<{ slug: string }>();
  const activeSlug = forcedSlug || slug;

  const programme = programmesData.find((p) => p.slug === activeSlug);

  if (!programme) {
    return <Navigate to="/our-work" replace />;
  }

  // Related stories
  const relatedStories = storiesData
    .filter((s) => s.category.toLowerCase().includes(programme.category.toLowerCase()) || s.id === 'community-learning-spaces')
    .slice(0, 2);

  // Customised programme configuration
  const programmeConfig: Record<
    string,
    {
      seoTitle: string;
      seoDescription: string;
      ctaText: string;
      leadHeading: string;
      focusHeading: string;
      approachHeading: string;
      supportAudience: string;
      heroImage: string;
      heroAlt: string;
      focusImage: string;
      focusAlt: string;
      approachImage: string;
      approachAlt: string;
      ctaImage: string;
      ctaAlt: string;
      faqs: { question: string; answer: string }[];
    }
  > = {
    education: {
      seoTitle: "Education Programme | Learning Access & Youth Opportunity | RISE International",
      seoDescription: "Discover how RISE International supports inclusive educational access, community learning spaces, and teacher training to create lifelong youth opportunities.",
      ctaText: "Support Education",
      leadHeading: "Education That Opens Opportunities",
      focusHeading: "What We Focus On in Education",
      approachHeading: "Our Approach to Learning",
      supportAudience: "Primary school children, youth, educators, and community parent-teacher associations seeking enduring learning opportunities.",
      heroImage: "/images/rise-education-detail-hero.webp",
      heroAlt: "African primary school students and their teacher learning enthusiastically in a bright, modern classroom",
      focusImage: "/images/rise-education-detail-materials.webp",
      focusAlt: "Interactive classroom reading circle with children and teacher engaged in foundational literacy",
      approachImage: "/images/rise-education-detail-teaching.webp",
      approachAlt: "Youth participants acquiring practical digital literacy and vocational skills in a learning workshop",
      ctaImage: "/images/rise-education-detail-cta.webp",
      ctaAlt: "Hopeful young student smiling in front of school books ready to build a bright future",
      faqs: [
        {
          question: "How does RISE International support local schools?",
          answer: "We collaborate with community school committees to provide essential learning materials, support classroom repairs, and facilitate teacher development sessions.",
        },
        {
          question: "How are educational programmes sustained?",
          answer: "Local parent-teacher groups and community leaders co-manage every initiative, ensuring ongoing maintenance and community ownership.",
        },
        {
          question: "How can I contribute to educational initiatives?",
          answer: "You can make a direct donation targeted toward educational initiatives, volunteer your skills, or sponsor child education support.",
        },
      ],
    },
    'community-development': {
      seoTitle: "Community Development | Sustainable Infrastructure & Resilience | RISE International",
      seoDescription: "Explore RISE International's community development initiatives, supporting clean water access, solar power, and local capacity building.",
      ctaText: "Support Community Development",
      leadHeading: "Community-Led Solutions for Enduring Resilience",
      focusHeading: "What We Focus On in Community Development",
      approachHeading: "Our Approach to Local Capacity",
      supportAudience: "Rural and peri-urban community councils, local maintenance committees, and resident groups building shared infrastructure.",
      heroImage: "/images/rise-community-detail-hero.webp",
      heroAlt: "Community members of diverse ages gathered outdoors in front of a newly built community centre under clear skies",
      focusImage: "/images/rise-community-detail-water.webp",
      focusAlt: "Grassroots volunteers working collectively on water pipe trenching and community infrastructure",
      approachImage: "/images/rise-community-detail-meeting.webp",
      approachAlt: "Open-air village assembly with women and elder representatives actively participating in governance discussion",
      ctaImage: "/images/rise-community-detail-cta.webp",
      ctaAlt: "Clean water running from a community tap stand into buckets with joyful children",
      faqs: [
        {
          question: "How are clean water projects maintained?",
          answer: "Before any water station is commissioned, local residents form a water committee and receive technical maintenance training to operate the system independently.",
        },
        {
          question: "What role does renewable solar energy play?",
          answer: "We prioritize solar-powered water pumping and communal lighting to minimize operational costs and ensure ecological sustainability.",
        },
      ],
    },
    'humanitarian-aid': {
      seoTitle: "Humanitarian Aid | Dignified Emergency Support & Recovery | RISE International",
      seoDescription: "RISE International delivers dignified emergency aid, vital supplies, and compassionate community relief combined with recovery support.",
      ctaText: "Support Humanitarian Aid",
      leadHeading: "Compassionate, Dignified Humanitarian Response",
      focusHeading: "What We Focus On in Emergency Response",
      approachHeading: "Our Approach: Dignity & Protection",
      supportAudience: "Families, children, and vulnerable community members affected by acute crises, natural disasters, or severe hardship.",
      heroImage: "/images/rise-humanitarian-detail-hero.webp",
      heroAlt: "Humanitarian field team in RISE vests respectfully distributing sealed food parcels and clean water to families in temporary shelter",
      focusImage: "/images/rise-humanitarian-detail-clinic.webp",
      focusAlt: "Health worker checking a child's vitals with care in a mobile community health tent",
      approachImage: "/images/rise-humanitarian-detail-supplies.webp",
      approachAlt: "Aid coordination team organizing clean water tanks and emergency hygiene kits in a warehouse",
      ctaImage: "/images/rise-humanitarian-detail-cta.webp",
      ctaAlt: "Family resting in safety receiving warm assistance from community relief volunteers",
      faqs: [
        {
          question: "How does RISE International respond to emergencies?",
          answer: "We coordinate with trusted frontline local responders to supply essential nutrition, emergency water purification, and primary healthcare outreach with dignity.",
        },
        {
          question: "Does humanitarian aid support long-term recovery?",
          answer: "Yes. Every emergency intervention is designed with recovery in mind, ensuring communities transition smoothly from acute relief into rehabilitation.",
        },
      ],
    },
    'economic-empowerment': {
      seoTitle: "Economic Empowerment | Vocational Skills & Sustainable Livelihoods | RISE International",
      seoDescription: "Learn how RISE International fosters financial self-reliance through vocational training, entrepreneurship mentorship, and cooperative support.",
      ctaText: "Support Economic Empowerment",
      leadHeading: "Unlocking Sustainable Livelihoods & Financial Independence",
      focusHeading: "What We Focus On in Economic Empowerment",
      approachHeading: "Our Approach: Local Enterprise",
      supportAudience: "Motivated artisans, women's cooperatives, smallholder producers, and youth apprentices seeking sustainable income generation.",
      heroImage: "/images/rise-economic-detail-hero.webp",
      heroAlt: "Artisan woman tailoring vibrant textile garments on a sewing machine in a cooperative workspace",
      focusImage: "/images/rise-economic-detail-weaving.webp",
      focusAlt: "Carpentry vocational apprentice learning precision woodworking from an experienced craftsperson",
      approachImage: "/images/rise-economic-detail-market.webp",
      approachAlt: "Local market cooperative stall owner reviewing accounts ledger with pride",
      ctaImage: "/images/rise-economic-detail-cta.webp",
      ctaAlt: "Group of women entrepreneurs celebrating the launch of their community micro-enterprise",
      faqs: [
        {
          question: "What types of vocational training are supported?",
          answer: "We support practical workshops in tailoring, carpentry, sustainable agriculture, and technical trades aligned with local market opportunities.",
        },
        {
          question: "How are community cooperatives assisted?",
          answer: "Cooperatives receive collective tools, workspaces, and mentor-led training in financial literacy, budgeting, and trade marketing.",
        },
      ],
    },
  };

  const currentConfig = programmeConfig[programme.slug] || {
    seoTitle: `${programme.title} | Our Work | RISE International`,
    seoDescription: programme.description,
    ctaText: `Support ${programme.title}`,
    leadHeading: programme.title,
    focusHeading: "Strategic Focus Areas",
    approachHeading: "Our Approach",
    supportAudience: "Communities and individuals participating in locally driven development.",
    heroImage: programme.image,
    heroAlt: programme.altText,
    focusImage: programme.image,
    focusAlt: programme.altText,
    approachImage: programme.image,
    approachAlt: programme.altText,
    ctaImage: programme.image,
    ctaAlt: programme.altText,
    faqs: [
      {
        question: `How does RISE International implement ${programme.title}?`,
        answer: "Through direct partnership with local community leadership and participatory planning.",
      },
    ],
  };

  return (
    <div className="w-full flex flex-col">
      <SEO
        title={currentConfig.seoTitle}
        description={currentConfig.seoDescription}
        canonical={`https://riseintl.org/our-work/${programme.slug}`}
        ogImage={currentConfig.heroImage}
        breadcrumbs={[
          { name: "Home", item: "https://riseintl.org/" },
          { name: "Our Work", item: "https://riseintl.org/our-work" },
          { name: programme.title, item: `https://riseintl.org/our-work/${programme.slug}` },
        ]}
        faqs={currentConfig.faqs}
      />

      {/* Hero Header */}
      <section className="relative bg-primary-container text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src={currentConfig.heroImage}
            alt={currentConfig.heroAlt}
            className="w-full h-full object-cover"
            loading="eager"
            width={1344}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/90 to-primary-container/60" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
          <div className="mb-4">
            <Breadcrumbs
              items={[
                { label: "Our Work", path: "/our-work" },
                { label: programme.title },
              ]}
              className="text-white/80"
            />
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary-fixed font-label-sm uppercase tracking-wider text-xs mb-3">
              <span className="material-symbols-outlined text-[16px]">{programme.icon}</span>
              <span>{programme.category}</span>
            </div>
            <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
              {currentConfig.leadHeading}
            </h1>
            <p className="font-body-xl text-lg sm:text-xl text-surface-container-high/90 mt-4 leading-relaxed">
              {programme.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-6">
              <Link
                to={`/donate?purpose=${encodeURIComponent(programme.title)}`}
                className="px-7 py-3.5 rounded-xl bg-secondary text-white font-label-lg font-bold shadow-md hover:bg-secondary/90 transition-all"
              >
                {currentConfig.ctaText}
              </Link>
              <Link
                to="/volunteer"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label-lg font-bold transition-all border border-white/20"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Indicators Ribbon */}
      <section className="bg-surface-container-low border-b border-outline-variant/30 py-8">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {programme.stats.map((st) => (
              <div key={st.label} className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="font-stat-metric text-2xl sm:text-3xl text-secondary font-bold block">
                  {st.value}
                </span>
                <span className="font-label-md text-on-surface-variant font-medium text-sm mt-1 block">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Focus Areas & Approach */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: What We Focus On */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                PROGRAMME SCOPE
              </span>
              <h2 className="font-headline-xl text-3xl font-bold text-primary mt-2">
                {currentConfig.focusHeading}
              </h2>
              <div className="my-6 rounded-2xl overflow-hidden shadow-level-1 border border-outline-variant/30">
                <img
                  src={currentConfig.focusImage}
                  alt={currentConfig.focusAlt}
                  className="w-full h-64 sm:h-80 object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {programme.whatWeDo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3.5 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    </div>
                    <p className="font-body-md text-on-surface leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach */}
            <div>
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                COLLABORATIVE PRINCIPLES
              </span>
              <h3 className="font-headline-md text-2xl font-bold text-primary mt-2">
                {currentConfig.approachHeading}
              </h3>
              <div className="my-6 rounded-2xl overflow-hidden shadow-level-1 border border-outline-variant/30">
                <img
                  src={currentConfig.approachImage}
                  alt={currentConfig.approachAlt}
                  className="w-full h-60 sm:h-72 object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
              </div>
              <p className="font-body-md text-on-surface-variant mt-3 leading-relaxed">
                Rather than imposing pre-determined solutions, our programmes prioritize direct co-development. We collaborate with grassroots leaders and local groups, ensuring that every project is culturally grounded and stewarded locally for enduring self-sufficiency.
              </p>
            </div>

            {/* Who We Aim to Support */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold block mb-1">
                TARGET COMMUNITY
              </span>
              <h4 className="font-headline-sm text-lg font-bold text-primary mb-2">
                Who We Aim to Support
              </h4>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                {currentConfig.supportAudience}
              </p>
            </div>

            {/* Impact & Outcomes */}
            <div>
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                MEANINGFUL CHANGE
              </span>
              <h3 className="font-headline-md text-2xl font-bold text-primary mt-2">
                Programmatic Outcomes
              </h3>
              <ul className="mt-4 space-y-3">
                {programme.impactPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-on-surface-variant font-body-md">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Sidebar Action & Related Stories */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Quick Action Card */}
            <div className="p-8 rounded-2xl bg-primary text-white shadow-level-2 flex flex-col">
              <div className="rounded-xl overflow-hidden mb-6 border border-white/20">
                <img
                  src={currentConfig.ctaImage}
                  alt={currentConfig.ctaAlt}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
              </div>
              <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold mb-2">
                MAKE A DIFFERENCE
              </span>
              <h3 className="font-headline-md text-2xl font-bold mb-3">
                Support {programme.title}
              </h3>
              <p className="font-body-md text-surface-container-high/90 mb-6 leading-relaxed">
                Your partnership enables communities to access vital tools, education, and resources needed for long-term growth.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to={`/donate?purpose=${encodeURIComponent(programme.title)}`}
                  className="w-full text-center py-3.5 rounded-xl bg-secondary text-white font-label-lg font-bold hover:bg-secondary/90 transition-all shadow-md"
                >
                  {currentConfig.ctaText}
                </Link>
                <Link
                  to="/get-involved"
                  className="w-full text-center py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label-md font-bold transition-all border border-white/20"
                >
                  Other Ways to Get Involved
                </Link>
              </div>
            </div>

            {/* Related Community Story */}
            {relatedStories.length > 0 && (
              <div>
                <span className="font-label-sm text-secondary uppercase tracking-wider font-bold block mb-4">
                  RELATED COMMUNITY DISPATCH
                </span>
                <StoryCard story={relatedStories[0]} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Programme FAQs */}
      <FaqAccordion
        title={`${programme.title} FAQs`}
        subtitle={`Common questions regarding our ${programme.title.toLowerCase()} initiatives.`}
        faqs={currentConfig.faqs}
        className="bg-surface-container-low/40 border-t border-outline-variant/30"
      />
    </div>
  );
};
