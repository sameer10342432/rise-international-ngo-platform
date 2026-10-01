import React from 'react';

const approachSteps = [
  {
    step: '01',
    title: 'Listen & Understand',
    description:
      'We spend months on the ground with village councils, mothers, and educators listening to root challenges before drafting blueprints.',
    highlight: false,
  },
  {
    step: '02',
    title: 'Build Sustainable Solutions',
    description:
      'Co-designing eco-resilient water wells, clinic cold chains, and durable solar classrooms utilizing local materials and green engineering.',
    highlight: true,
  },
  {
    step: '03',
    title: 'Work With Communities',
    description:
      'Training indigenous water technicians, micro-finance treasurers, and teachers so local leadership possesses full operational autonomy.',
    highlight: false,
  },
  {
    step: '04',
    title: 'Measure & Improve',
    description:
      'Deploying sensor telemetrics, annual literacy exams, and independent audits to continuously refine our global interventions.',
    highlight: false,
  },
];

export const ApproachSection: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low py-24 border-y border-outline-variant/30">
      <div className="max-w-content mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
            OUR METHODOLOGY
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold mt-2">
            How We Create Lasting Change
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3 leading-relaxed">
            A four-stage framework designed to transition communities from vulnerability to complete independence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {approachSteps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col bg-surface-container-lowest p-8 rounded-2xl shadow-level-1 hover:shadow-level-2 transition-all duration-300 border border-outline-variant/30 relative"
            >
              <span
                className={`font-stat-metric text-4xl sm:text-5xl font-extrabold mb-4 ${
                  item.highlight ? 'text-secondary' : 'text-surface-container-highest'
                }`}
              >
                {item.step}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-bold">
                {item.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
