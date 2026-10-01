import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { teamData } from '../../data/team';

export const TeamPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Our Team &amp; Governance | RISE International"
        description="Meet the international leadership, operations coordinators, and humanitarian specialists driving RISE International."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20">
        <div className="max-w-content mx-auto px-6 lg:px-12 text-center">
          <Link to="/about" className="inline-flex items-center gap-1.5 text-secondary-fixed font-label-md text-sm mb-3 hover:underline">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>About Us</span>
          </Link>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold text-white">
            Leadership &amp; Governance
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            Experienced stewards dedicated to operational excellence, transparency, and field impact.
          </p>
        </div>
      </section>

      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member) => (
            <div
              key={member.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-level-1 hover:shadow-level-2 transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between"
            >
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-primary font-bold text-2xl mb-5 border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[32px] text-secondary">
                    badge
                  </span>
                </div>
                <span className="font-label-sm text-secondary font-bold text-xs uppercase tracking-wider block mb-1">
                  {member.department}
                </span>
                <h3 className="font-headline-sm text-xl text-primary font-bold">{member.name}</h3>
                <p className="font-body-sm text-on-surface-variant font-medium text-sm mt-1 mb-4">
                  {member.role}
                </p>
                <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="px-8 pb-6 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                <span>RISE Global Directorate</span>
                <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 text-center max-w-2xl mx-auto">
          <h3 className="font-headline-sm text-xl text-primary font-bold mb-2">Want to Join Our Team?</h3>
          <p className="font-body-md text-on-surface-variant mb-6">
            We are always looking for passionate humanitarian professionals, engineers, and volunteers to support our field programs.
          </p>
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-white font-label-md font-bold hover:bg-secondary/90 transition-all"
          >
            <span>Explore Opportunities</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
