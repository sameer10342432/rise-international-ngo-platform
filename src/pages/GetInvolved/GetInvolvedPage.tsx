import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const GetInvolvedPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Get Involved | RISE International"
        description="Join RISE International through child sponsorship, monthly donations, field volunteering, and strategic institutional partnerships."
      />

      <section className="bg-primary-container text-white py-16 lg:py-24 text-center">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            PARTICIPATORY ACTION
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-2">
            Join the Movement for Change
          </h1>
          <p className="font-body-xl text-lg sm:text-xl text-surface-container-high/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            There are many avenues to lend your heart, expertise, and resources to vulnerable communities around the globe.
          </p>
        </div>
      </section>

      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Donate */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-level-1 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[32px]">favorite</span>
              </div>
              <h2 className="font-headline-md text-2xl font-bold text-primary mb-3">Make a Donation</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Provide immediate life-saving medical supplies, fund solar water drilling, or underwrite classroom construction with a one-time or monthly gift.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-white font-label-md font-bold hover:bg-secondary/90 transition-all"
              >
                <span>Donate Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Sponsor a Child */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-level-1 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[32px]">child_care</span>
              </div>
              <h2 className="font-headline-md text-2xl font-bold text-primary mb-3">Sponsor a Child</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Provide comprehensive primary school tuition, uniform essentials, nutritional lunches, and annual medical screenings for an underserved child.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/get-involved/sponsor-a-child"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-label-md font-bold hover:bg-primary/90 transition-all"
              >
                <span>Sponsor a Child</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Volunteer */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-level-1 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[32px]">how_to_reg</span>
              </div>
              <h2 className="font-headline-md text-2xl font-bold text-primary mb-3">Volunteer With Us</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Offer your clinical medical skills, engineering knowledge, teaching expertise, or remote digital contributions to support our global field offices.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/volunteer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-white font-label-md font-bold hover:bg-secondary/90 transition-all"
              >
                <span>Volunteer Today</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 4: Partner With Us */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-level-1 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[32px]">handshake</span>
              </div>
              <h2 className="font-headline-md text-2xl font-bold text-primary mb-3">Partner With Us</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Connect your corporate CSR initiatives, philanthropic foundation grants, or university research programs to verified grassroots implementation.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/get-involved/partner"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-label-md font-bold hover:bg-primary/90 transition-all"
              >
                <span>Institutional Partnerships</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
