import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

const coreValues = [
  {
    title: 'People First',
    icon: 'person_heart',
    description: 'Every project begins and ends with individual dignity, cultural reverence, and direct grassroots agency.',
  },
  {
    title: 'Sustainability',
    icon: 'eco',
    description: 'We prioritize off-grid solar tech, durable indigenous materials, and regenerative agriculture for multi-decade life spans.',
  },
  {
    title: 'Transparent Stewardship',
    icon: 'visibility',
    description: '88% of all funds are deployed directly into field operations, backed by open ledger accounts and third-party audits.',
  },
  {
    title: 'Local Leadership',
    icon: 'group',
    description: 'Indigenous leaders and elders co-direct every program from inception, ensuring total operational autonomy.',
  },
  {
    title: 'Uncompromising Quality',
    icon: 'verified',
    description: 'We adhere to the highest international engineering, medical cold chain, and scholastic benchmarks.',
  },
  {
    title: 'Continuous Accountability',
    icon: 'monitoring',
    description: 'Telemetric sensors and independent field assessments measure outcome continuity long after construction.',
  },
];

export const ValuesPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Our Core Values | RISE International"
        description="The foundational ethical principles and operational standards that govern every RISE International program."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20">
        <div className="max-w-content mx-auto px-6 lg:px-12 text-center">
          <Link to="/about" className="inline-flex items-center gap-1.5 text-secondary-fixed font-label-md text-sm mb-3 hover:underline">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>About Us</span>
          </Link>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold text-white">
            Our Core Values
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            The ethical commitments that anchor every decision, dollar, and field intervention.
          </p>
        </div>
      </section>

      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((val) => (
            <div
              key={val.title}
              className="p-8 rounded-2xl bg-surface-container-lowest shadow-level-1 border border-outline-variant/30 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center mb-5 border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[26px]">{val.icon}</span>
                </div>
                <h3 className="font-headline-sm text-xl text-primary font-bold mb-3">{val.title}</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
