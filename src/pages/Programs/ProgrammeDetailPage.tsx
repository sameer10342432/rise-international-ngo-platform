import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
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

  // Related stories matching category or generic top 2
  const relatedStories = storiesData.filter(
    (s) => s.category.toLowerCase().includes(programme.category.toLowerCase()) || s.id === 'aminas-journey'
  ).slice(0, 2);

  return (
    <div className="w-full">
      <SEO
        title={`${programme.title} | Our Work | RISE International`}
        description={programme.description}
      />

      {/* Hero Header */}
      <section className="relative bg-primary-container text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src={programme.image}
            alt={programme.altText}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <Link
              to="/our-work"
              className="inline-flex items-center gap-1.5 text-secondary-fixed font-label-md text-sm mb-4 hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>All Programmes</span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary-fixed font-label-sm uppercase tracking-wider text-xs mb-3">
              <span className="material-symbols-outlined text-[16px]">{programme.icon}</span>
              <span>{programme.category} Pillar</span>
            </div>
            <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
              {programme.title}
            </h1>
            <p className="font-body-xl text-lg sm:text-xl text-surface-container-high/90 mt-4 leading-relaxed">
              {programme.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-6">
              <Link
                to={`/donate?purpose=${encodeURIComponent(programme.title)}`}
                className="px-7 py-3.5 rounded-xl bg-secondary text-white font-label-lg font-bold shadow-md hover:bg-secondary/90 transition-all"
              >
                Support This Pillar
              </Link>
              <Link
                to="/volunteer"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label-lg font-bold transition-all"
              >
                Volunteer With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="bg-surface-container-low border-b border-outline-variant/30 py-8">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {programme.stats.map((st) => (
              <div key={st.label} className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="font-stat-metric text-3xl sm:text-4xl text-secondary font-bold block">
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

      {/* Main Content: Mission & What We Do */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: What We Do */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                STRATEGIC FOCUS
              </span>
              <h2 className="font-headline-xl text-3xl font-bold text-primary mt-2">
                What We Do
              </h2>
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

            {/* Impact outcomes */}
            <div>
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                MEASURABLE OUTCOMES
              </span>
              <h3 className="font-headline-md text-2xl font-bold text-primary mt-2">
                Verified Field Impact
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

          {/* Right Column: Mission Card & Quick Action */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-level-2">
              <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[28px]">flag</span>
              </div>
              <h3 className="font-headline-sm text-xl text-primary font-bold mb-3">Pillar Mission</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                {programme.mission}
              </p>
              <div className="mt-6 pt-6 border-t border-outline-variant/30 flex flex-col gap-3">
                <Link
                  to="/donate"
                  className="w-full py-3.5 rounded-xl bg-secondary text-white font-label-md font-bold text-center hover:bg-secondary/90 transition-all"
                >
                  Donate to {programme.title}
                </Link>
                <Link
                  to="/contact"
                  className="w-full py-3 rounded-xl bg-surface-container text-primary font-label-md font-semibold text-center hover:bg-surface-container-high transition-all"
                >
                  Inquire About Partnerships
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="w-full bg-surface-container-low py-20 border-t border-outline-variant/30">
          <div className="max-w-content mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                  EVIDENCE OF TRANSFORMATION
                </span>
                <h3 className="font-headline-xl text-2xl sm:text-3xl font-bold text-primary mt-1">
                  Stories Connected to {programme.title}
                </h3>
              </div>
              <Link to="/impact/stories" className="text-secondary font-bold text-sm hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedStories.map((s) => (
                <StoryCard key={s.id} story={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
