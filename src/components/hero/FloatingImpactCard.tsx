import React from 'react';
import { Link } from 'react-router-dom';

export const FloatingImpactCard: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-on-surface shadow-level-3 border border-outline-variant/30 flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
            Direct Action Hub
          </span>
          <h3 className="font-headline-md text-xl sm:text-headline-md text-primary font-bold mt-1 leading-snug">
            Together, we can create lasting change for a better tomorrow.
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-surface-container-high/60 flex items-center justify-center flex-shrink-0 text-primary">
          <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
        </div>
      </div>

      {/* Action Quick-Links */}
      <div className="flex flex-col gap-3">
        {/* Option 1: Sponsor a Child */}
        <Link
          to="/get-involved/sponsor-a-child"
          className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-surface hover:bg-surface-container-low transition-all border border-outline-variant/20 hover:border-secondary/40"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div>
              <h4 className="font-label-lg text-label-lg text-primary font-bold">Sponsor a Child</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-xs sm:text-sm">Change a life through quality education</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all text-[20px]">
            arrow_forward
          </span>
        </Link>

        {/* Option 2: Support a Project */}
        <Link
          to="/our-work/community-development"
          className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-surface hover:bg-surface-container-low transition-all border border-outline-variant/20 hover:border-secondary/40"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[24px]">solar_power</span>
            </div>
            <div>
              <h4 className="font-label-lg text-label-lg text-primary font-bold">Support a Project</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-xs sm:text-sm">Fund clean water &amp; solar initiatives</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all text-[20px]">
            arrow_forward
          </span>
        </Link>

        {/* Option 3: Make a Donation */}
        <Link
          to="/donate"
          className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-surface hover:bg-surface-container-low transition-all border border-outline-variant/20 hover:border-secondary/40"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[24px]">favorite</span>
            </div>
            <div>
              <h4 className="font-label-lg text-label-lg text-primary font-bold">Make a Donation</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-xs sm:text-sm">Deliver immediate life-saving relief</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all text-[20px]">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Indicator footer */}
      <div className="flex items-center justify-between pt-1">
        <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
          Empowerment Priority: East Africa &amp; Sahel
        </span>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-6 h-2 rounded-full bg-secondary"></span>
          <span className="w-2 h-2 rounded-full bg-surface-container-high"></span>
          <span className="w-2 h-2 rounded-full bg-surface-container-high"></span>
        </div>
      </div>
    </div>
  );
};
