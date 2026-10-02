import React from 'react';
import { Link } from 'react-router-dom';
import { partnersData } from '../../data/partners';

export const PartnersSection: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low/60 py-16 border-y border-outline-variant/30">
      <div className="max-w-content mx-auto px-6 lg:px-12 text-center">
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block mb-2 font-bold">
          COLLABORATIVE PARTNERSHIPS
        </span>
        <h3 className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold mb-4">
          Working Across Sectors to Drive Community Solutions
        </h3>
        <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
          Meaningful change is achieved together. RISE International collaborates with local community councils, educational groups, healthcare providers, and civic partners to build durable, sustainable initiatives.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
          {partnersData.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 hover:border-secondary/40 transition-all text-center gap-2 group"
            >
              <span className="material-symbols-outlined text-[32px] text-secondary group-hover:scale-110 transition-transform">
                {partner.icon}
              </span>
              <span className="font-label-sm text-xs sm:text-sm font-bold text-primary tracking-wide">
                {partner.name}
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                {partner.category}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/get-involved/partner"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-label-md font-bold hover:bg-primary/90 transition-all shadow-sm"
          >
            <span>Explore Partnership Opportunities</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
