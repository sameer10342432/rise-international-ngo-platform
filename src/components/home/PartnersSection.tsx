import React from 'react';
import { partnersData } from '../../data/partners';

export const PartnersSection: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low/60 py-16 border-y border-outline-variant/30">
      <div className="max-w-content mx-auto px-6 lg:px-12 text-center">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-8 font-bold">
          Working Together for Greater Impact With Trusted Global Organizations
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center opacity-80">
          {partnersData.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center gap-2 text-primary font-headline-sm text-base sm:text-lg font-bold hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined text-[26px] text-secondary">
                {partner.icon}
              </span>
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
