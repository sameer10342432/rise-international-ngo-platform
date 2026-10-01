import React from 'react';
import { Link } from 'react-router-dom';

export const AboutSection: React.FC = () => {
  return (
    <section className="w-full max-w-content mx-auto px-6 lg:px-12 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Visual Story Block */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-level-3">
            <img
              src="/images/community-woman-harvest.png"
              alt="Local agricultural pioneer showcasing healthy seasonal crop yield"
              className="w-full h-[450px] sm:h-[520px] object-cover"
              loading="lazy"
            />
          </div>
          {/* Overlapping floating story badge */}
          <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-6 bg-surface-container-lowest p-6 rounded-2xl shadow-level-2 border border-outline-variant/30 max-w-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <span className="font-label-md text-label-md text-primary font-bold block">Locally Governed</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Community-driven action</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Projects are co-designed and maintained entirely by community elders and youth leaders.
            </p>
          </div>
        </div>

        {/* Right: Narrative & Principles */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
              ABOUT RISE INTERNATIONAL
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold mt-2">
              Building Stronger Communities. Creating Lasting Opportunities.
            </h2>
          </div>

          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            RISE International is an international non-profit committed to ending generational poverty by shifting from temporary relief to perpetual self-reliance. We empower rural and urban fringe populations by building modern, localized capacities.
          </p>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Rather than imposing top-down solutions, we partner shoulder-to-shoulder with local teachers, doctors, farmers, and grassroots organizers. This guarantees that every school built, clean borehole drilled, and vocational cooperative funded continues to flourish decades into the future.
          </p>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-outline-variant/20">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">person_heart</span>
              </div>
              <h4 className="font-label-lg text-label-lg text-primary font-bold">People First</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                Every initiative honors individual dignity and local culture.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-outline-variant/20">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">eco</span>
              </div>
              <h4 className="font-label-lg text-label-lg text-primary font-bold">Sustainable</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                Ecological solar tech and locally sourced building materials.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-outline-variant/20">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </div>
              <h4 className="font-label-lg text-label-lg text-primary font-bold">Transparent</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                Open financial ledgers and real-time project metrics.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-label-lg text-label-lg hover:bg-primary/90 transition-all shadow-md hover:-translate-y-0.5"
            >
              <span>LEARN MORE ABOUT US</span>
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
