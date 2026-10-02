import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { programmesData } from '../../data/programmes';
import { ProgrammeCard } from '../../components/programmes/ProgrammeCard';

export const ProgramsPage: React.FC = () => {
  const programmeFaqs = [
    {
      question: 'How are RISE International programmes selected and planned?',
      answer:
        'All programmes are initiated through participatory community consultations. We work alongside local residents, civil groups, and community leadership to identify structural challenges, ensure cultural alignment, and establish measurable long-term objectives.',
    },
    {
      question: 'How does RISE International ensure sustainable community ownership?',
      answer:
        'Rather than creating dependency, our initiatives focus on capacity strengthening, local leadership development, and infrastructure handovers to community-managed committees upon project maturity.',
    },
    {
      question: 'How can individuals or organisations support a specific programme?',
      answer:
        'Supporters can contribute directly to Education, Community Development, Humanitarian Aid, or Economic Empowerment via our secure donation page, or partner with us through skills sharing, institutional funding, and volunteer engagement.',
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <SEO
        title="Our Work — Sustainable Community Programmes | RISE International"
        description="Explore RISE International's core humanitarian and development pillars: Education, Community Development, Humanitarian Aid, and Economic Empowerment."
        canonical="/our-work"
        ogImage="/images/rise-our-work-hero-overview.webp"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Our Work', item: '/our-work' },
        ]}
        faqItems={programmeFaqs}
      />

      {/* Hero Header */}
      <section className="bg-primary text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-our-work-hero-overview.webp"
            alt="Panoramic view of a vibrant multi-generational community project where educational, clean water, and agricultural initiatives intersect"
            className="w-full h-full object-cover object-center opacity-25"
            loading="eager"
            width={1344}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/90 to-primary/80" />
        </div>
        <div className="max-w-content mx-auto px-6 lg:px-12 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Our Work' },
            ]}
          />
          <div className="max-w-3xl mt-6">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
              Strategic Initiatives
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
              Community-Led Programmes Built for Long-Term Change
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              RISE International operates through four interconnected programme areas designed to foster self-reliance, protect human dignity, and expand opportunities for communities facing structural disadvantages.
            </p>
          </div>
        </div>
      </section>

      {/* Programme Cards Section */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Our Core Programme Areas
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Each programme is designed with local leadership, verified monitoring standards, and a firm commitment to human dignity and sustainable community stewardship.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/impact"
              className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>Explore Our Impact Framework</span>
              <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programmesData.map((programme) => (
            <ProgrammeCard key={programme.id} programme={programme} />
          ))}
        </div>
      </section>

      {/* Detailed Overview Breakdown */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              How Our Four Pillars Work Together
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Sustainable progress requires addressing immediate vulnerabilities while laying foundational investments in human potential and community infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                1. Education & Learning Access
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                We support safe learning environments, essential literacy resources, and foundational skills development. Education unlocks lifelong opportunities and empowers the next generation to advocate for their communities.
              </p>
              <Link
                to="/our-work/education"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider inline-flex items-center"
              >
                <span>Read Education Programme</span>
                <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">groups</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                2. Community Development
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Supporting locally prioritized public infrastructure, clean water access, and community governance groups so neighbourhoods can manage shared assets and build collective resilience.
              </p>
              <Link
                to="/our-work/community-development"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 uppercase tracking-wider inline-flex items-center"
              >
                <span>Read Community Development</span>
                <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">healing</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                3. Humanitarian Aid & Relief
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Delivering respectful, timely assistance during times of crisis. We prioritize vital supplies and immediate stabilization while bridging seamlessly toward community-led recovery.
              </p>
              <Link
                to="/our-work/humanitarian-aid"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 uppercase tracking-wider inline-flex items-center"
              >
                <span>Read Humanitarian Aid</span>
                <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">trending_up</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                4. Economic Empowerment
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Facilitating vocational training, micro-enterprise support, and market linkages that empower families to build durable financial autonomy and sustainable livelihoods.
              </p>
              <Link
                to="/our-work/economic-empowerment"
                className="text-xs font-bold text-indigo-700 hover:text-indigo-800 uppercase tracking-wider inline-flex items-center"
              >
                <span>Read Economic Empowerment</span>
                <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Frequently Asked Questions About Our Programmes
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Learn more about how we establish, evaluate, and deliver sustainable initiatives.
            </p>
          </div>
          <FaqAccordion items={programmeFaqs} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="max-w-content mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif">
            Join Us in Supporting Resilient Communities
          </h2>
          <p className="mt-3 text-slate-200 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Whether you choose to contribute directly, partner with our field programmes, or volunteer your skills, your engagement helps foster sustainable change.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors shadow-sm"
            >
              Support Our Work
            </Link>
            <Link
              to="/get-involved"
              className="px-6 py-3 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
            >
              Explore Ways to Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
