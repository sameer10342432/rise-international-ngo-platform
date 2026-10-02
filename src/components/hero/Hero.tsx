import React from 'react';
import { Link } from 'react-router-dom';
import { FloatingImpactCard } from './FloatingImpactCard';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-primary-container text-on-primary">
      {/* Hero Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/rise-home-hero-community.webp"
          alt="Wide cinematic documentary photograph of diverse community members gathering with local NGO facilitators at sunset in an African village, planning clean water and schooling initiatives with hope and unity"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105"
          loading="eager"
          width={1344}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/90 to-primary-container/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 pt-16 pb-28 lg:pt-24 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Vision & Primary Calls */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md self-start text-secondary-fixed border border-secondary-fixed/20">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                RISE INTERNATIONAL
              </span>
            </div>

            <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.1]">
              Empowering Communities. <br />
              <span className="text-secondary-fixed">Transforming Lives.</span>
            </h1>

            <p className="font-body-xl text-body-lg lg:text-body-xl text-surface-container-high/90 max-w-2xl leading-relaxed">
              RISE International works to create opportunities, strengthen communities and support sustainable change through people-centred programmes and partnerships.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-secondary text-white font-label-lg text-label-lg shadow-lg hover:bg-secondary/90 transition-all hover:-translate-y-0.5 font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                <span>Donate Now</span>
              </Link>
              <Link
                to="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-surface-container-lowest/10 backdrop-blur-md text-white font-label-lg text-label-lg hover:bg-surface-container-lowest/20 transition-all border border-white/10 font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">group_add</span>
                <span>Become a Volunteer</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3 text-surface-container-high/85 font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-secondary-fixed text-[20px]">verified</span>
              <span>People-centred programmes, local community leadership, and transparent accountability.</span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Action Deck */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <FloatingImpactCard />
          </div>
        </div>
      </div>
    </section>
  );
};
