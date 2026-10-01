import React from 'react';
import { SEO } from '../../components/common/SEO';
import { ProgrammeGrid } from '../../components/programmes/ProgrammeGrid';
import { DonationCalculator } from '../../components/donation/DonationCalculator';

export const ProgramsPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Our Work &amp; Programmes | RISE International"
        description="Explore RISE International's core humanitarian pillars: Education, Community Development, Humanitarian Aid, and Economic Empowerment."
      />

      <section className="bg-primary-container text-white py-16 lg:py-24 text-center">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            STRATEGIC INITIATIVES
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 max-w-3xl mx-auto">
            Creating Impact Where It Matters Most
          </h1>
          <p className="font-body-xl text-lg sm:text-xl text-surface-container-high/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            We operate through four coordinated pillars engineered to transition vulnerable populations from emergency crisis to complete self-governance.
          </p>
        </div>
      </section>

      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <ProgrammeGrid />
      </section>

      <DonationCalculator />
    </div>
  );
};
