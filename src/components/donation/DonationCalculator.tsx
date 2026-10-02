import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DonationFrequency, SubmissionStatus } from '../../types';
import { donationService } from '../../services/donationService';
import { DonationFrequencySelector } from './DonationFrequencySelector';
import { DonationAmountSelector } from './DonationAmountSelector';
import { DonationPurposeSelector, donationPurposes } from './DonationPurposeSelector';
import { DonationSummary } from './DonationSummary';

export const DonationCalculator: React.FC = () => {
  const [frequency, setFrequency] = useState<DonationFrequency>('once');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [purpose, setPurpose] = useState<string>(donationPurposes[0]);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeAmount = customAmount && Number(customAmount) > 0 ? Number(customAmount) : selectedAmount;

  const handleSelectPredefined = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setErrorMessage(null);
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAmount || activeAmount <= 0) {
      setErrorMessage('Please choose or enter a valid amount.');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const res = await donationService.processDonation({
        amount: activeAmount,
        frequency,
        purpose,
      });
      setStatus('success');
      setSuccessMessage(res.message);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to process donation.');
    }
  };

  return (
    <section className="w-full bg-primary-container text-on-primary py-24 relative overflow-hidden" id="donate-calculator">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/rise-home-donation-stewardship.webp"
          alt="Mother and daughter smiling peacefully holding fresh vegetables harvested from a community garden supported by RISE"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
          width={1344}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-container/90 via-primary-container/80 to-primary-container/95" />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            MAKE AN IMMEDIATE DIFFERENCE
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-white font-bold mt-2">
            Your Support Can Change a Life.
          </h2>
          <p className="font-body-lg text-body-lg text-surface-container-high/85 mt-3 leading-relaxed">
            Every contribution helps create opportunities, strengthen communities and support people facing difficult circumstances.
          </p>
        </div>

        {/* Donation Card Component */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 lg:p-12 text-on-surface shadow-2xl max-w-3xl mx-auto border border-white/20">
          {status === 'success' ? (
            <div className="text-center py-8 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h3 className="font-headline-md text-2xl text-primary font-bold mb-2">
                Thank You For Your Support!
              </h3>
              <p className="font-body-lg text-on-surface-variant max-w-md mb-6 leading-relaxed">
                {successMessage}
              </p>
              <div className="p-4 rounded-xl bg-surface-container-low max-w-md w-full mb-6 text-sm text-on-surface-variant">
                <span className="font-bold text-primary block">Impact Allocation:</span>
                Your gift of ${activeAmount} {frequency === 'monthly' ? '/ month' : ''} is assigned directly to {purpose}. A tax-deductible receipt has been dispatched.
              </div>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setSuccessMessage(null);
                }}
                className="px-6 py-3 rounded-xl bg-primary text-white font-label-md text-label-md hover:bg-primary/90 transition-all"
              >
                Make Another Gift
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Frequency Selector */}
              <DonationFrequencySelector frequency={frequency} onChange={setFrequency} />

              {/* Amount Selection */}
              <DonationAmountSelector
                selectedAmount={selectedAmount}
                customAmount={customAmount}
                onSelectPredefined={handleSelectPredefined}
                onCustomAmountChange={handleCustomAmountChange}
              />

              {/* Purpose Selector */}
              <DonationPurposeSelector purpose={purpose} onChange={setPurpose} />

              {/* Live Summary Calculation */}
              <DonationSummary
                amount={activeAmount}
                frequency={frequency}
                purpose={purpose}
              />

              {errorMessage && (
                <div role="alert" className="p-3 rounded-xl bg-error-container/40 text-error text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-secondary text-white font-label-lg text-label-lg text-center shadow-md hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">favorite</span>
                      <span>
                        COMPLETE ${activeAmount} DONATION {frequency === 'monthly' ? '/ MONTH' : ''}
                      </span>
                    </>
                  )}
                </button>

                <Link
                  to="/get-involved/partner"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-surface-container text-primary font-label-lg text-label-lg text-center hover:bg-surface-container-high transition-all font-semibold"
                >
                  BECOME A PARTNER
                </Link>
              </div>

              {/* Security & Audit Micro-Trust Bar */}
              <div className="pt-6 border-t border-outline-variant/30 flex flex-wrap items-center justify-center gap-6 text-on-surface-variant font-body-sm text-body-sm text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
                  <span>256-bit SSL Secure Donation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                  <span>100% Tax Deductible (501c3)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">monitoring</span>
                  <span>Transparent Impact Tracking</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
