import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const ReportPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Annual Impact Report &amp; Audits | RISE International"
        description="Review RISE International's independent financial audits, program efficiency allocations, and annual governance metrics."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20 text-center">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <Link to="/impact" className="inline-flex items-center gap-1.5 text-secondary-fixed font-label-md text-sm mb-3 hover:underline">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Impact Overview</span>
          </Link>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold text-white">
            Annual Impact Report &amp; Audits
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            Independent evaluations, financial statements, and verified operational efficacy.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-20 space-y-12">
        {/* Report Overview Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-level-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-outline-variant/30">
            <div>
              <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary font-label-sm font-bold text-xs uppercase">
                Official Publication
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary mt-2">
                2023 Fiscal Year Comprehensive Report
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Audited by Global Independent Assurance LLP • Published April 2024
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Downloading official RISE International 2023 Annual Report (PDF).')}
              className="px-6 py-3.5 rounded-xl bg-secondary text-white font-label-md font-bold shadow-sm hover:bg-secondary/90 transition-all flex items-center gap-2 self-start sm:self-auto flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
              <span>DOWNLOAD PDF (4.2 MB)</span>
            </button>
          </div>

          {/* Fiscal Allocation Breakdown */}
          <div className="mt-8">
            <h3 className="font-headline-sm text-xl font-bold text-primary mb-6">
              Where Your Dollar Goes (Fiscal Breakdown)
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-bold text-primary mb-1">
                  <span>Direct Field Programmes &amp; Community Infrastructure</span>
                  <span className="text-secondary">88.2%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '88.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold text-primary mb-1">
                  <span>General Management, Quality Assurance &amp; Governance</span>
                  <span>7.1%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '7.1%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold text-primary mb-1">
                  <span>Fundraising Development &amp; Donor Relations</span>
                  <span>4.7%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-outline rounded-full" style={{ width: '4.7%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Reaffirmation */}
        <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[28px]">verified</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-lg font-bold text-primary">Unqualified Clean Audit Opinion</h4>
            <p className="font-body-md text-on-surface-variant text-sm mt-1 leading-relaxed">
              Our independent external auditors issued an unqualified clean audit opinion for the fiscal year ended December 31, 2023, verifying that all financial statements present fairly, in all material respects, the financial position and programmatic expenditures of RISE International.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
