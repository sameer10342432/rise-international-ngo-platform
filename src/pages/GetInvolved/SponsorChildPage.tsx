import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { donationService } from '../../services/donationService';

export const SponsorChildPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const monthlyAmount = 35;
  const yearlyAmount = 420;

  const handleSponsor = async () => {
    setStatus('loading');
    try {
      await donationService.processDonation({
        amount: selectedPlan === 'monthly' ? monthlyAmount : yearlyAmount,
        frequency: selectedPlan === 'monthly' ? 'monthly' : 'once',
        purpose: 'Education & Child Sponsorship Support',
      });
      setStatus('success');
    } catch {
      setStatus('idle');
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <SEO
        title="Support Education & Child Sponsorship | RISE International"
        description="Help provide vulnerable children with access to quality learning environments, textbooks, and supportive school programmes."
        canonical="/get-involved/sponsor-a-child"
        ogImage="/images/rise-sponsor-child-hero.webp"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Get Involved', item: '/get-involved' },
          { name: 'Sponsor a Child', item: '/get-involved/sponsor-a-child' },
        ]}
      />

      <section className="bg-primary text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-sponsor-child-hero.webp"
            alt="A happy young primary school pupil in a blue school uniform reading an illustrated storybook in an African school library"
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
              { label: 'Get Involved', path: '/get-involved' },
              { label: 'Sponsor a Child' },
            ]}
          />
          <div className="max-w-3xl mt-6">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
              Education Access
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
              Sponsor Educational Opportunities for Children
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Support sustained access to safe classrooms, dedicated teachers, and essential learning materials for children facing socio-economic barriers.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly ($35/mo)
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan('yearly')}
                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedPlan === 'yearly'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Annual ($420/yr)
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold font-serif text-slate-900 mb-2">
              How Your Sponsorship Supports Learning:
            </h2>
            <div className="flex items-start gap-3 text-slate-700 text-sm">
              <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">check_circle</span>
              <span>Subsidizes tuition and school enrollment costs for underserved children.</span>
            </div>
            <div className="flex items-start gap-3 text-slate-700 text-sm">
              <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">check_circle</span>
              <span>Supplies textbooks, notebooks, stationery, and essential reading materials.</span>
            </div>
            <div className="flex items-start gap-3 text-slate-700 text-sm">
              <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">check_circle</span>
              <span>Supports nutritious school-day meals and clean drinking water facilities.</span>
            </div>
            <div className="flex items-start gap-3 text-slate-700 text-sm">
              <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">check_circle</span>
              <span>Contributes toward teacher training, classroom repairs, and community learning spaces.</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-8 leading-relaxed">
            <strong className="text-slate-800">Transparency Note:</strong> Sponsorship funds are pooled within our community education programme to benefit both individual students and their broader classroom environment, ensuring equitable impact without stigmatization.
          </div>

          {status === 'success' ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="material-symbols-outlined text-4xl text-emerald-600">verified</span>
              <h3 className="text-lg font-bold text-emerald-950 mt-2 font-serif">
                Thank You for Your Sponsorship!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 mt-2 max-w-md mx-auto">
                Your support makes a significant difference. A confirmation receipt and programme overview have been sent to your email.
              </p>
              <div className="mt-4">
                <Link
                  to="/our-work/education"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Read More About Our Education Work</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSponsor}
              disabled={status === 'loading'}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              {status === 'loading'
                ? 'Processing...'
                : `Commit ${selectedPlan === 'monthly' ? '$35 / month' : '$420 / year'}`}
            </button>
          )}

          <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Secure 256-bit encrypted transaction • Transparent financial governance</span>
          </div>
        </div>
      </section>
    </div>
  );
};
