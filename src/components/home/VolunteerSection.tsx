import React from 'react';
import { Link } from 'react-router-dom';

export const VolunteerSection: React.FC = () => {
  return (
    <section className="w-full max-w-content mx-auto px-6 lg:px-12 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
          COLLABORATIVE ACTION
        </span>
        <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold mt-2">
          Be Part of the Change
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-3 leading-relaxed">
          Discover meaningful ways to contribute your expertise, time, or voice to empower communities worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Volunteer Your Time */}
        <div className="flex flex-col p-8 rounded-2xl bg-surface-container-low justify-between gap-6 hover:shadow-level-2 transition-all duration-300 border border-outline-variant/30">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-primary mb-6 shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-[30px]">schedule</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
              Volunteer Your Time
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Join medical dispatch squads, remote engineering cohorts, or mentor localized youth groups virtually and on the ground.
            </p>
          </div>
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md hover:gap-3 transition-all font-bold"
          >
            <span>Apply to Volunteer</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {/* Card 2: Support Our Programmes */}
        <div className="flex flex-col p-8 rounded-2xl bg-surface-container-low justify-between gap-6 hover:shadow-level-2 transition-all duration-300 border border-outline-variant/30">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-secondary mb-6 shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-[30px]">hub</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
              Support Our Programmes
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Underwrite high-impact infrastructure such as localized solar microgrids, community clinics, or primary school libraries.
            </p>
          </div>
          <Link
            to="/get-involved/partner"
            className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md hover:gap-3 transition-all font-bold"
          >
            <span>Sponsor an Initiative</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {/* Card 3: Become a Community Advocate */}
        <div className="flex flex-col p-8 rounded-2xl bg-surface-container-low justify-between gap-6 hover:shadow-level-2 transition-all duration-300 border border-outline-variant/30">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-primary mb-6 shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-[30px]">campaign</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
              Become a Community Advocate
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Champion educational and nutritional equity in your school, church, or corporate network with our turnkey advocacy toolkits.
            </p>
          </div>
          <Link
            to="/contact?inquiry=advocacy"
            className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md hover:gap-3 transition-all font-bold"
          >
            <span>Get Advocacy Toolkit</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          to="/volunteer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-white font-label-lg text-label-lg shadow-md hover:bg-secondary/90 transition-all hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
          <span>BECOME A VOLUNTEER TODAY</span>
        </Link>
      </div>
    </section>
  );
};
