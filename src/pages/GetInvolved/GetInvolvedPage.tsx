import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const GetInvolvedPage: React.FC = () => {
  const participationMethods = [
    {
      title: 'Donate',
      icon: 'favorite',
      badge: 'Immediate Impact',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description:
        'Contribute direct financial support to provide essential educational resources, community infrastructure materials, or emergency aid where needed most.',
      link: '/donate',
      cta: 'Make a Contribution',
    },
    {
      title: 'Volunteer',
      icon: 'how_to_reg',
      badge: 'Field & Remote',
      badgeColor: 'bg-blue-100 text-blue-800',
      description:
        'Lend your professional expertise—in education, logistics, communications, or community development—to support locally managed initiatives.',
      link: '/volunteer',
      cta: 'Apply to Volunteer',
    },
    {
      title: 'Partner With Us',
      icon: 'handshake',
      badge: 'Institutional & Corporate',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      description:
        'Collaborate with RISE International through institutional grants, corporate CSR alignments, academic research, or technical assistance frameworks.',
      link: '/get-involved/partner',
      cta: 'Explore Partnerships',
    },
    {
      title: 'Sponsor a Child',
      icon: 'child_care',
      badge: 'Education Support',
      badgeColor: 'bg-amber-100 text-amber-800',
      description:
        'Support uninterrupted primary and secondary learning opportunities, basic classroom supplies, and educational stability for children facing poverty.',
      link: '/get-involved/sponsor-a-child',
      cta: 'Learn About Sponsorship',
    },
    {
      title: 'Support a Programme',
      icon: 'hub',
      badge: 'Pillar Focus',
      badgeColor: 'bg-teal-100 text-teal-800',
      description:
        'Direct your involvement to one of our four key initiatives: Education, Community Development, Humanitarian Aid, or Economic Empowerment.',
      link: '/our-work',
      cta: 'Select a Programme',
    },
    {
      title: 'Share Our Work',
      icon: 'share',
      badge: 'Advocacy & Awareness',
      badgeColor: 'bg-rose-100 text-rose-800',
      description:
        'Amplify the voices of community leaders and field progress by sharing our stories, newsletters, and verified updates with your networks.',
      link: '/news',
      cta: 'Read & Share Stories',
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <SEO
        title="Get Involved — Donate, Volunteer & Partner | RISE International"
        description="Discover meaningful ways to participate with RISE International: donate, volunteer, establish strategic partnerships, support education, or advocate for community development."
        canonical="/get-involved"
        ogImage="/images/rise-get-involved-hero.webp"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Get Involved', item: '/get-involved' },
        ]}
      />

      {/* Header */}
      <section className="bg-primary text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-get-involved-hero.webp"
            alt="A collective community construction and tree planting workshop with volunteers and local families working side by side"
            className="w-full h-full object-cover opacity-25"
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
              { label: 'Get Involved' },
            ]}
          />
          <div className="max-w-3xl mt-6">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
              Participatory Action
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
              Six Meaningful Ways to Make a Lasting Difference
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Meaningful change requires collective action. Whether through financial stewardship, volunteer dedication, strategic partnerships, or advocacy, every contribution helps build resilient communities.
            </p>
          </div>
        </div>
      </section>

      {/* Participation Cards Grid */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {participationMethods.map((method, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">{method.icon}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${method.badgeColor}`}>
                    {method.badge}
                  </span>
                </div>
                <h2 className="text-xl font-bold font-serif text-slate-900 mb-3">
                  {method.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {method.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  to={method.link}
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  <span>{method.cta}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Transparency Banner */}
      <section className="max-w-content mx-auto px-6 lg:px-12 pb-16">
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold font-serif mb-2">
              Our Commitment to Accountability &amp; Integrity
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              RISE International operates under strict transparency guidelines. Every resource entrusted to us is directed toward verified community needs with regular reporting and open governance.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/about"
              className="px-5 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-lg hover:bg-slate-100 transition-colors"
            >
              Learn More About Our Governance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
