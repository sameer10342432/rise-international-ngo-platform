import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { primaryImpactStats, detailedImpactMetrics } from '../../data/impactStats';
import { StatisticCard } from '../../components/statistics/StatisticCard';
import { storiesData } from '../../data/stories';
import { StoryCard } from '../../components/stories/StoryCard';
import { programmesData } from '../../data/programmes';

export const ImpactPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="RISE International Impact | Creating Lasting Change"
        description="Explore verifiable field metrics, independent audits, and real-time outcomes from RISE International's programs worldwide."
      />

      {/* Hero Header */}
      <section className="bg-primary-container text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 text-center">
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            TRANSPARENT ACCOUNTABILITY
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 max-w-3xl mx-auto">
            Measurable Change. Verified Lives.
          </h1>
          <p className="font-body-xl text-lg sm:text-xl text-surface-container-high/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            We hold ourselves accountable to our donors, institutional partners, and most critically, to the communities we serve.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              to="/impact/report"
              className="px-7 py-3.5 rounded-xl bg-secondary text-white font-label-lg font-bold shadow-md hover:bg-secondary/90 transition-all"
            >
              Read 2023 Annual Report
            </Link>
            <Link
              to="/impact/stories"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label-lg font-bold transition-all"
            >
              Field Stories
            </Link>
          </div>
        </div>
      </section>

      {/* High-Level Statistics Grid */}
      <section id="statistics" className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
            KEY MILESTONES
          </span>
          <h2 className="font-headline-xl text-3xl font-bold text-primary mt-1">
            Global Impact by the Numbers
          </h2>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-12 shadow-level-2 border border-outline-variant/30 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {primaryImpactStats.map((stat) => (
              <StatisticCard
                key={stat.id}
                numericValue={stat.numericValue}
                suffix={stat.suffix}
                prefix={stat.prefix}
                fallbackValue={stat.value}
                label={stat.label}
                icon={stat.icon}
                description={stat.description}
              />
            ))}
          </div>
        </div>

        {/* Detailed Fiscal & Operational Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {detailedImpactMetrics.map((dm) => (
            <div
              key={dm.label}
              className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between"
            >
              <div>
                <span className="font-stat-metric text-4xl text-secondary font-extrabold block">
                  {dm.metric}
                </span>
                <h4 className="font-headline-sm text-lg font-bold text-primary mt-2">{dm.label}</h4>
                <p className="font-body-sm text-on-surface-variant text-sm mt-1 leading-relaxed">
                  {dm.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programme Impact Highlights */}
      <section className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              PILLAR DISPATCH
            </span>
            <h2 className="font-headline-xl text-3xl font-bold text-primary mt-1">
              Impact Across Our 4 Core Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programmesData.map((prog) => (
              <div
                key={prog.id}
                className="bg-surface-container-lowest p-8 rounded-3xl shadow-level-1 border border-outline-variant/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">{prog.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-xl font-bold text-primary">{prog.title}</h3>
                      <span className="font-label-sm text-secondary text-xs uppercase font-bold">{prog.category}</span>
                    </div>
                  </div>
                  <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                    {prog.description}
                  </p>
                  <div className="space-y-2">
                    {prog.impactPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-primary">
                        <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-outline-variant/20 flex items-center justify-between">
                  <Link to={prog.link} className="text-secondary font-bold text-sm inline-flex items-center gap-1.5 hover:gap-2 transition-all">
                    <span>Explore Pillar</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                  <span className="text-xs text-on-surface-variant">Verified Telemetry</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories of Change */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              FIELD VOICES
            </span>
            <h2 className="font-headline-xl text-3xl font-bold text-primary mt-1">
              Stories Behind the Numbers
            </h2>
          </div>
          <Link
            to="/impact/stories"
            className="text-secondary font-bold inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            <span>See All Field Stories</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {storiesData.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* Annual Report CTA Banner */}
      <section className="max-w-content mx-auto px-6 lg:px-12 pb-24">
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-level-2">
          <div className="max-w-xl">
            <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
              FISCAL TRANSPARENCY
            </span>
            <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-white mt-1">
              Download Our Latest Fiscal &amp; Impact Audits
            </h3>
            <p className="font-body-md text-surface-container-high/90 mt-2 leading-relaxed">
              Clean audits, third-party evaluations, and comprehensive allocations detailing how 88% of all resources directly empower local communities.
            </p>
          </div>
          <Link
            to="/impact/report"
            className="px-8 py-4 rounded-xl bg-secondary text-white font-label-lg font-bold shadow-md hover:bg-secondary/90 transition-all flex-shrink-0"
          >
            VIEW ANNUAL REPORT
          </Link>
        </div>
      </section>
    </div>
  );
};
