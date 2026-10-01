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
import { storiesData } from '../../data/stories';
import { newsArticlesData } from '../../data/news';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <SEO
        title="RISE International | Empowering Communities. Transforming Lives."
        description="RISE International is a global nonprofit organisation working to uplift vulnerable communities through education, humanitarian aid, and sustainable development initiatives."
      />

      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. IMPACT STATISTICS FLOATING BAR */}
      <ImpactStatsBar />

      {/* 3. OUR PROGRAMMES SECTION */}
      <section className="w-full max-w-content mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-secondary mb-2">
              <span className="w-3 h-0.5 bg-secondary rounded-full" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                OUR PROGRAMS
              </span>
            </div>
            <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold">
              Creating Impact Where It Matters Most
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-3 leading-relaxed">
              We focus on sustainable solutions that empower individuals and strengthen communities for long-term transformation.
            </p>
          </div>
          <Link
            to="/our-work"
            className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg hover:text-secondary transition-colors self-start md:self-auto font-bold"
          >
            <span>Explore All Initiatives</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>

        {/* 4 Programme Cards */}
        <ProgrammeGrid />
      </section>

      {/* 4. IMPACT PANEL (DARK NAVY / NUMBERS THAT REFLECT CHANGE) */}
      <ImpactHighlightSection />

      {/* 5. ABOUT RISE INTERNATIONAL */}
      <AboutSection />

      {/* 6. OUR APPROACH (PROCESS ROADMAP) */}
      <ApproachSection />

      {/* 7. FEATURED IMPACT STORIES */}
      <section className="w-full max-w-content mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
              FIELD DISPATCHES
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

      {/* 8. INTERACTIVE DONATION CALCULATOR & CTA SECTION */}
      <DonationCalculator />

      {/* 9. VOLUNTEER & GET INVOLVED */}
      <VolunteerSection />

      {/* 10. PARTNERS / SUPPORTERS LOGO GRID */}
      <PartnersSection />

      {/* 11. LATEST NEWS & STORIES */}
      <section className="w-full max-w-content mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
              UPDATES FROM THE FIELD
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold mt-2">
              Latest News &amp; Stories
            </h2>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-primary font-label-md text-label-md hover:bg-surface-container transition-all self-start md:self-auto font-bold"
          >
            <span>VIEW ALL STORIES</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticlesData.slice(0, 3).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 12. NEWSLETTER SIGNUP */}
      <NewsletterSection />

      {/* 13. CONTACT TEASER */}
      <ContactCtaSection />
    </div>
  );
};
