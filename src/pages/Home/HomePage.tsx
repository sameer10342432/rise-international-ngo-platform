import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Hero } from '../../components/hero/Hero';
import { ImpactStatsBar } from '../../components/statistics/ImpactStatsBar';
import { ProgrammeGrid } from '../../components/programmes/ProgrammeGrid';
import { ImpactHighlightSection } from '../../components/impact/ImpactHighlightSection';
import { AboutSection } from '../../components/home/AboutSection';
import { ApproachSection } from '../../components/home/ApproachSection';
import { StoryCard } from '../../components/stories/StoryCard';
import { DonationCalculator } from '../../components/donation/DonationCalculator';
import { VolunteerSection } from '../../components/home/VolunteerSection';
import { PartnersSection } from '../../components/home/PartnersSection';
import { NewsCard } from '../../components/stories/NewsCard';
import { NewsletterSection } from '../../components/home/NewsletterSection';
import { ContactCtaSection } from '../../components/home/ContactCtaSection';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { storiesData } from '../../data/stories';
import { newsArticlesData } from '../../data/news';

const homepageFaqs = [
  {
    question: "What is RISE International's primary mission?",
    answer: "RISE International works to create opportunities, strengthen communities and support sustainable change through people-centred programmes and partnerships across education, community development, humanitarian aid, and economic empowerment.",
  },
  {
    question: "How can I support RISE International?",
    answer: "You can support our work through charitable donations, volunteering your time and skills, partnering as an organisation, or sharing our mission to raise awareness.",
  },
  {
    question: "How are community programmes selected and managed?",
    answer: "All initiatives are co-developed in direct response to local community invitations and priorities. We work alongside grassroots councils to ensure projects are locally stewarded, culturally aligned, and sustainable for the long term.",
  },
  {
    question: "How can I get in touch with the organisation?",
    answer: "You can reach us by email at info@riseintl.org or by telephone at +49 1520-6777889. You can also send an inquiry via our online contact form.",
  },
  {
    question: "How does RISE International ensure transparency?",
    answer: "We uphold strict standards of financial governance, open reporting, and responsible stewardship. Every contribution supports verified on-the-ground interventions.",
  },
];

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <SEO
        title="RISE International | Empowering Communities & Creating Change"
        description="RISE International is an international nonprofit organisation working to create opportunities, strengthen communities, and support sustainable change through education, community development, and humanitarian aid. Learn how you can get involved today."
        canonical="https://riseintl.org/"
        ogImage="/images/rise-home-hero-community.webp"
        faqs={homepageFaqs}
      />

      {/* 1. HERO SECTION (Includes Eyebrow, H1, Supporting Copy, Primary CTAs) */}
      <Hero />

      {/* 2. IMPACT OVERVIEW / STATISTICS FLOATING BAR */}
      <ImpactStatsBar />

      {/* 3. OUR PROGRAMMES SECTION */}
      <section className="w-full max-w-content mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-secondary mb-2">
              <span className="w-3 h-0.5 bg-secondary rounded-full" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                OUR PROGRAMMES
              </span>
            </div>
            <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold">
              Creating Meaningful Opportunities Where It Matters Most
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-3 leading-relaxed">
              We focus on sustainable, community-led initiatives that empower individuals, protect human dignity, and build long-term local resilience.
            </p>
          </div>
          <Link
            to="/our-work"
            className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg hover:text-secondary transition-colors self-start md:self-auto font-bold"
          >
            <span>Explore All Programmes</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>

        {/* 4 Programme Cards */}
        <ProgrammeGrid />
      </section>

      {/* 4. IMPACT HIGHLIGHT PANEL */}
      <ImpactHighlightSection />

      {/* 5. ABOUT RISE INTERNATIONAL */}
      <AboutSection />

      {/* 6. OUR APPROACH (COMMUNITY ROADMAP) */}
      <ApproachSection />

      {/* 7. STORIES OF CHANGE */}
      <section className="w-full max-w-content mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
              COMMUNITY DISPATCHES
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold mt-2">
              Stories of Change
            </h2>
          </div>
          <Link
            to="/impact/stories"
            className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg hover:text-secondary transition-colors self-start md:self-auto font-bold"
          >
            <span>View All Stories</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>

        {/* 3 Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {storiesData.slice(0, 3).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* 8. DONATION CALCULATOR & CTA SECTION */}
      <DonationCalculator />

      {/* 9. VOLUNTEER & GET INVOLVED CTA */}
      <VolunteerSection />

      {/* 10. COLLABORATIVE PARTNERSHIP FRAMEWORKS */}
      <PartnersSection />

      {/* 11. LATEST NEWS */}
      <section className="w-full max-w-content mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
              UPDATES &amp; ARTICLES
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold mt-2">
              Latest News &amp; Dispatches
            </h2>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-primary font-label-md text-label-md hover:bg-surface-container transition-all self-start md:self-auto font-bold"
          >
            <span>VIEW ALL NEWS</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticlesData.slice(0, 3).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 12. HOMEPAGE FAQS */}
      <FaqAccordion
        title="Frequently Asked Questions"
        subtitle="Learn more about how RISE International operates, how initiatives are stewarded, and ways to get involved."
        faqs={homepageFaqs}
        className="bg-surface-container-low/40 border-t border-outline-variant/30"
      />

      {/* 13. NEWSLETTER SIGNUP */}
      <NewsletterSection />

      {/* 14. CONTACT CTA */}
      <ContactCtaSection />
    </div>
  );
};
