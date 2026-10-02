import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const MissionVisionPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Mission &amp; Vision | RISE International"
        description="Discover the guiding mission, long-term vision, and strategic goals that drive RISE International's humanitarian initiatives."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20">
        <div className="max-w-content mx-auto px-6 lg:px-12 text-center">
          <Link to="/about" className="inline-flex items-center gap-1.5 text-secondary-fixed font-label-md text-sm mb-3 hover:underline">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>About Us</span>
          </Link>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold text-white">
            Mission &amp; Vision
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            Our guiding purpose and ambitious aspirations for international community enablement.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12 rounded-3xl overflow-hidden shadow-level-2 border border-outline-variant/30">
          <img
            src="/images/rise-about-mission-opportunity.webp"
            alt="Students and teachers smiling together outside a newly built solar-powered rural school library"
            className="w-full h-72 sm:h-96 object-cover"
            loading="lazy"
            width={1024}
            height={768}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[32px]">flag</span>
              </div>
              <h2 className="font-headline-md text-2xl text-primary font-bold mb-4">Our Mission</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                To uplift vulnerable communities through education, humanitarian aid, and sustainable development initiatives that guarantee self-sufficiency, human dignity, and economic freedom.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant/30">
              <span className="font-label-sm text-secondary font-bold uppercase tracking-wider block mb-1">
                Guiding Mandate
              </span>
              <p className="text-xs text-on-surface-variant">
                100% locally stewardship guarantee across every initiative.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[32px]">visibility</span>
              </div>
              <h2 className="font-headline-md text-2xl text-primary font-bold mb-4">Our Vision</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                A world where generational poverty is eliminated and all communities flourish with reliable clean energy, safe water, modern classrooms, and universal health dignity.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant/30">
              <span className="font-label-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Future Horizon
              </span>
              <p className="text-xs text-on-surface-variant">
                Reaching 1 million empowered beneficiaries across 50 countries by 2030.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary text-white p-8 sm:p-12 rounded-3xl text-center">
          <h3 className="font-headline-md text-2xl font-bold mb-3">Be an Instrument of Our Vision</h3>
          <p className="font-body-md text-surface-container-high/90 max-w-xl mx-auto mb-6">
            Join thousands of monthly donors, field volunteers, and partner institutions making this vision an everyday reality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/donate" className="px-6 py-3 rounded-xl bg-secondary text-white font-label-md font-bold">
              Donate Now
            </Link>
            <Link to="/about/values" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label-md font-bold">
              Explore Our Values
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
