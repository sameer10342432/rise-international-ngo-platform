import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { primaryImpactStats, detailedImpactMetrics } from '../../data/impactStats';
import { StatisticCard } from '../../components/statistics/StatisticCard';
import { storiesData } from '../../data/stories';
import { StoryCard } from '../../components/stories/StoryCard';
import { programmesData } from '../../data/programmes';

export const ImpactPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Impact &amp; Sustainable Development | RISE International"
        description="Learn how RISE International measures nonprofit impact, supports community resilience, and delivers accountable, people-centred outcomes across all programmes."
        canonical="https://riseintl.org/impact"
        ogImage="/images/rise-impact-hero-metrics.webp"
        breadcrumbs={[
          { name: "Home", item: "https://riseintl.org/" },
          { name: "Impact", item: "https://riseintl.org/impact" },
        ]}
      />

      {/* Hero Header */}
      <section className="bg-primary-container text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-impact-hero-metrics.webp"
            alt="Community field researcher and local leaders reviewing data and agricultural progress metrics outdoors on a tablet"
            className="w-full h-full object-cover object-center opacity-25"
            loading="eager"
            width={1344}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/90 to-primary-container/60" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Impact" }]} className="text-white/80" />
          </div>

          <div className="max-w-3xl">
            <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
              ACCOUNTABILITY &amp; OUTCOMES
            </span>
            <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 leading-tight">
              Community Impact Grounded in Integrity
            </h1>
            <p className="font-body-xl text-lg sm:text-xl text-surface-container-high/90 mt-4 leading-relaxed">
              We measure our work by enduring community resilience, local autonomy, and the tangible opportunities created for families and youth.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                to="/our-work"
                className="px-7 py-3.5 rounded-xl bg-secondary text-white font-label-lg font-bold shadow-md hover:bg-secondary/90 transition-all"
              >
                Explore Our Work
              </Link>
              <Link
                to="/impact/stories"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label-lg font-bold transition-all border border-white/20"
              >
                Read Community Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Impact Overview */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              OVERVIEW
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-primary font-bold">
              How We Define Meaningful Impact
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              At RISE International, impact is not defined merely by the distribution of temporary aid. Real change occurs when local communities are equipped with the infrastructure, skills, and institutional autonomy to sustain their own development indefinitely.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Every programme—whether constructing community learning spaces, drilling clean water stations, or facilitating trade cooperatives—is evaluated against long-term sustainability indicators rather than short-term output quotas.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-level-2 border border-outline-variant/30">
              <img
                src="/images/rise-impact-methodology-evaluation.webp"
                alt="Field monitoring officer and grassroots committee members evaluating newly installed solar water tank and recording telemetry readings"
                className="w-full h-[360px] object-cover"
                loading="lazy"
                width={1024}
                height={768}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Impact Statistics & Framework (Neutral, Organization-Provided Notice) */}
      <section id="statistics" className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              CORE PILLARS
            </span>
            <h2 className="font-headline-xl text-3xl font-bold text-primary mt-1">
              Impact Framework &amp; Focus Dimensions
            </h2>
            <p className="font-body-md text-on-surface-variant mt-2">
              Our interventions focus on verified strategic areas designed to support comprehensive community well-being.
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-10 shadow-level-1 border border-outline-variant/30 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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

          {/* Operational Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {detailedImpactMetrics.map((dm) => (
              <div
                key={dm.label}
                className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between shadow-level-1"
              >
                <div>
                  <span className="font-headline-sm text-xl text-secondary font-bold block">
                    {dm.metric}
                  </span>
                  <h4 className="font-headline-sm text-base font-bold text-primary mt-2">{dm.label}</h4>
                  <p className="font-body-sm text-on-surface-variant text-sm mt-1 leading-relaxed">
                    {dm.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-on-surface-variant flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[16px]">info</span>
            <span>All statistical indicators are managed and updated via the organisation administrative portal.</span>
          </div>
        </div>
      </section>

      {/* 3. How Impact Is Measured */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
            EVALUATION METHODOLOGY
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-4xl text-primary font-bold mt-2">
            How Impact Is Measured
          </h2>
          <p className="font-body-md text-on-surface-variant mt-3">
            Our multi-stage assessment framework ensures that initiatives remain responsive to genuine community needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-lg mb-4">
              1
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Community Baseline</h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              We collaborate with village councils and local partners to map existing infrastructure, resources, and self-identified priorities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-lg mb-4">
              2
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Continuous Feedback</h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Local advisory committees provide direct, regular input on implementation quality, ensuring accountability and dignity throughout.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-lg mb-4">
              3
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Operational Review</h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              We evaluate local maintenance capacity, equipment functionality, and community committee activity at set milestones.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-lg mb-4">
              4
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Long-Term Autonomy</h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              The ultimate benchmark of success is full local stewardship, with projects operating independently of external assistance.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Programme Outcomes */}
      <section className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              PROGRAMME OUTCOMES
            </span>
            <h2 className="font-headline-xl text-3xl font-bold text-primary mt-1">
              Enduring Change Across Key Areas
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
                    <span>Explore Programme</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Community Stories (Draft Notice Compliant) */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              COMMUNITY DISPATCHES
            </span>
            <h2 className="font-headline-xl text-3xl font-bold text-primary mt-1">
              Field Stories &amp; Perspectives
            </h2>
          </div>
          <Link
            to="/impact/stories"
            className="text-primary hover:text-secondary font-label-md font-bold inline-flex items-center gap-1.5"
          >
            <span>View All Stories</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {storiesData.slice(0, 3).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* 6. Impact Reporting & CTA */}
      <section className="w-full bg-surface-container-low py-20 border-t border-outline-variant/30 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="font-label-sm text-secondary uppercase tracking-wider font-bold mb-2 block">
            TRANSPARENT STEWARDSHIP
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-4xl text-primary font-bold mb-4">
            Committed to Open Reporting
          </h2>
          <p className="font-body-lg text-on-surface-variant mb-8 leading-relaxed">
            We provide clear, honest updates on programme progress, financial stewardship, and community governance. Explore our work or support an initiative today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/our-work"
              className="px-8 py-3.5 rounded-xl bg-primary text-white font-label-lg font-bold hover:bg-primary/90 transition-all shadow-md"
            >
              Explore Our Work
            </Link>
            <Link
              to="/donate"
              className="px-8 py-3.5 rounded-xl bg-secondary text-white font-label-lg font-bold hover:bg-secondary/90 transition-all shadow-md"
            >
              Support Our Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
