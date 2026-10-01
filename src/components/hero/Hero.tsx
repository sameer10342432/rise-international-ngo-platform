import React from 'react';
import { Link } from 'react-router-dom';
import { FloatingImpactCard } from './FloatingImpactCard';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-primary-container text-on-primary">
      {/* Hero Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/classroom-children-education.png"
          alt="Children smiling in a vibrant classroom with a volunteer teacher"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105"
          loading="eager"
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
                RISE International • Global Humanitarian Initiative
              </span>
            </div>

            <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.1]">
              Empowering Communities. <br />
              <span className="text-secondary-fixed">Transforming Lives.</span>
            </h1>

            <p className="font-body-xl text-body-lg lg:text-body-xl text-surface-container-high/90 max-w-2xl leading-relaxed">
              RISE International is a global nonprofit organisation working to uplift vulnerable communities through education, humanitarian aid, and sustainable development initiatives.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-secondary text-white font-label-lg text-label-lg shadow-lg hover:bg-secondary/90 transition-all hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                <span>DONATE NOW</span>
              </Link>
              <Link
                to="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-surface-container-lowest/10 backdrop-blur-md text-white font-label-lg text-label-lg hover:bg-surface-container-lowest/20 transition-all border border-white/10"
              >
                <span className="material-symbols-outlined text-[20px]">group_add</span>
                <span>BECOME A VOLUNTEER</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3 text-surface-container-high/85 font-body-sm text-body-sm">
              <div className="flex text-secondary-fixed" aria-label="5 star institutional rating">
                <span className="material-symbols-outlined text-[18px]">star</span>
                <span className="material-symbols-outlined text-[18px]">star</span>
                <span className="material-symbols-outlined text-[18px]">star</span>
                <span className="material-symbols-outlined text-[18px]">star</span>
                <span className="material-symbols-outlined text-[18px]">star</span>
              </div>
              <span>Trusted by 300+ international partners &amp; active in 25+ countries</span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Impact Deck */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <FloatingImpactCard />
          </div>
        </div>
      </div>
    </section>
  );
};
