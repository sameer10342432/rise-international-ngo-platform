import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const ReportPage: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <SEO
        title="Financial Stewardship & Accountability Reports | RISE International"
        description="Learn about RISE International's principles of transparent governance, resource allocation, and accountability reporting."
        canonical="/impact/report"
        ogImage="/images/rise-impact-governance-audit.webp"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Impact', item: '/impact' },
          { name: 'Accountability & Reports', item: '/impact/report' },
        ]}
      />

      <section className="bg-primary text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-impact-governance-audit.webp"
            alt="Financial audit and governance review meeting between RISE international stewards and community oversight council"
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
              { label: 'Impact', path: '/impact' },
              { label: 'Accountability & Reports' },
            ]}
          />
          <div className="max-w-3xl mt-6">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
              Governance &amp; Stewardship
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
              Accountability &amp; Financial Reporting
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Transparent stewardship is foundational to our mission. We believe that communities, supporters, and partners deserve complete clarity on how resources are stewarded.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 space-y-12">
        {/* Core Principles */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold font-serif text-slate-900 mb-4">
            Our Stewardship Commitments
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            RISE International operates under clear financial governance guidelines designed to maximize programme efficacy, protect donor intent, and prioritize community-led outcomes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm mb-2">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span>Programme-First Allocation</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                The overwhelming majority of contributions are allocated directly to frontline programme initiatives—education, community infrastructure, and humanitarian relief.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm mb-2">
                <span className="material-symbols-outlined text-lg">fact_check</span>
                <span>Independent Financial Oversight</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Financial records and programme allocations undergo systematic review and audit in accordance with international accounting standards.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm mb-2">
                <span className="material-symbols-outlined text-lg">public</span>
                <span>Community Transparency</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Local project budgets and resource allocations are reviewed alongside local committees, ensuring community ownership and eliminating waste.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm mb-2">
                <span className="material-symbols-outlined text-lg">lock</span>
                <span>Ethical Fundraising</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                We never sell, rent, or trade supporter data. All contributions are processed through verified, secure, PCI-compliant payment gateways.
              </p>
            </div>
          </div>
        </div>

        {/* Documentation Access */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
              Request Fiscal &amp; Audit Disclosures
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Official annual disclosures, organizational filings, and detailed programme evaluation reports are available to partners and contributors upon formal request.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <span className="material-symbols-outlined text-sm">mail</span>
              <span>Contact Stewardship Office</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
