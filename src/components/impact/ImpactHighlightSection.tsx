import React from 'react';
import { Link } from 'react-router-dom';
import { ImpactStat } from './ImpactStat';

export const ImpactHighlightSection: React.FC = () => {
  return (
    <section className="w-full bg-primary-container text-on-primary py-20 relative overflow-hidden">
      {/* Subtle geometric background vector */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" fill="none" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="300" r="280" stroke="currentColor" strokeDasharray="8 8" strokeWidth="1.5" />
          <circle cx="1200" cy="150" r="350" stroke="currentColor" strokeWidth="2" />
          <path d="M-100 400C300 250 800 550 1500 350" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
              Accountability &amp; Results
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-white font-bold mt-2">
              Numbers That Reflect Change
            </h2>
            <p className="font-body-lg text-body-lg text-surface-container-high/85 mt-4 leading-relaxed">
              Every donation, volunteer hour, and partnership converts directly into measurable field outcomes. We maintain uncompromising fiscal transparency with 88% of funds deployed directly on the ground.
            </p>
            <div className="pt-6">
              <Link
                to="/impact"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-secondary text-white font-label-lg text-label-lg hover:bg-secondary/90 transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>SEE OUR IMPACT REPORT</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* 4 Impact metric pill cards */}
          <div className="w-full lg:max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImpactStat
              numericValue={25}
              suffix="+"
              fallbackValue="25+"
              title="Countries Reached"
              description="Expanding footprint across Sub-Saharan Africa and Central Asia."
            />
            <ImpactStat
              numericValue={250000}
              suffix="+"
              fallbackValue="250,000+"
              title="People Impacted"
              description="Direct beneficiaries of primary schooling, nutrition & solar wells."
            />
            <ImpactStat
              numericValue={500}
              suffix="+"
              fallbackValue="500+"
              title="Community Projects"
              description="Locally stewarded classrooms, water clinics, and agro-farms."
            />
            <ImpactStat
              numericValue={1500}
              suffix="+"
              fallbackValue="1,500+"
              title="Active Volunteers"
              description="Certified physicians, engineers, teachers, and regional organizers."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
