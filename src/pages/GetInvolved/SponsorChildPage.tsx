import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
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
        purpose: 'Sponsor a Child Education & Health',
      });
      setStatus('success');
    } catch {
      setStatus('idle');
    }
  };

  return (
    <div className="w-full">
      <SEO
        title="Sponsor a Child | RISE International"
        description="Provide a child with quality schooling, nutrition, learning materials, and healthcare for $35 per month."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20 text-center">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <Link to="/get-involved" className="inline-flex items-center gap-1.5 text-secondary-fixed font-label-md text-sm mb-3 hover:underline">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Get Involved</span>
          </Link>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold text-white">
            Sponsor a Child’s Future
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            For just $35 a month, unlock a child's potential with accredited schooling, uniforms, daily hot meals, and medical care.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-level-2">
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex p-1 rounded-full bg-surface-container-low border border-outline-variant/30">
              <button
                type="button"
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-2 rounded-full font-label-md text-sm font-bold transition-all ${
                  selectedPlan === 'monthly' ? 'bg-secondary text-white shadow-sm' : 'text-on-surface-variant'
                }`}
              >
                Monthly ($35/mo)
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan('yearly')}
                className={`px-6 py-2 rounded-full font-label-md text-sm font-bold transition-all ${
                  selectedPlan === 'yearly' ? 'bg-secondary text-white shadow-sm' : 'text-on-surface-variant'
                }`}
              >
                Annual ($420/yr)
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-headline-sm text-xl font-bold text-primary mb-3">Your Sponsorship Covers:</h3>
            <div className="flex items-start gap-3 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
              <span>Full annual school tuition and qualified teacher stipends.</span>
            </div>
            <div className="flex items-start gap-3 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
              <span>Classroom textbooks, bilingual reading books, notebooks, and writing stationery.</span>
            </div>
            <div className="flex items-start gap-3 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
              <span>Daily fortified hot lunches and clean drinking water access.</span>
            </div>
            <div className="flex items-start gap-3 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
              <span>Biannual pediatric health checkups and vaccination boosters.</span>
            </div>
            <div className="flex items-start gap-3 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
              <span>Annual handwritten progress letters and academic reports from your sponsored student.</span>
            </div>
          </div>

          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-secondary/15 border border-secondary text-center">
              <span className="material-symbols-outlined text-[40px] text-secondary">verified</span>
              <h4 className="font-headline-sm text-xl font-bold text-primary mt-2">Sponsorship Initiated!</h4>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">
                Thank you for choosing to transform a young life. We will send your welcome sponsorship dossier and child profile within 2 business days.
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSponsor}
              disabled={status === 'loading'}
              className="w-full py-4 rounded-xl bg-secondary text-white font-label-lg font-bold shadow-md hover:bg-secondary/90 transition-all text-center flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <span>Setting up sponsorship...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                  <span>SPONSOR A CHILD FOR ${selectedPlan === 'monthly' ? '35 / MONTH' : '420 / YEAR'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
