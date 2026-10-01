import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { DonationFrequency, SubmissionStatus } from '../../types';
import { donationService } from '../../services/donationService';
import { DonationFrequencySelector } from '../../components/donation/DonationFrequencySelector';
import { DonationAmountSelector } from '../../components/donation/DonationAmountSelector';
import { DonationPurposeSelector, donationPurposes } from '../../components/donation/DonationPurposeSelector';
import { DonationSummary } from '../../components/donation/DonationSummary';

export const DonatePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPurpose = searchParams.get('purpose') || donationPurposes[0];

  const [frequency, setFrequency] = useState<DonationFrequency>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [purpose, setPurpose] = useState<string>(initialPurpose);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [receipt, setReceipt] = useState<{ txId: string; msg: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeAmount = customAmount && Number(customAmount) > 0 ? Number(customAmount) : selectedAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAmount || activeAmount <= 0) {
      setErrorMsg('Please enter or select a valid donation amount.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid donor email address for your receipt.');
      return;
    }

    setStatus('loading');
    setErrorMsg(null);

    try {
      const res = await donationService.processDonation({
        amount: activeAmount,
        frequency,
        purpose,
        firstName,
        lastName,
        email,
      });

      setStatus('success');
      setReceipt({ txId: res.transactionId, msg: res.message });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Donation processing failed.');
    }
  };

  return (
    <div className="w-full">
      <SEO
        title="Donate Now | Support Life-Saving Initiatives | RISE International"
        description="Make a secure, tax-deductible donation to RISE International. 88% of your gift directly supports ground operations in education, water, and health."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20 text-center">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            IMMEDIATE STEWARDSHIP
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold mt-2">
            Your Contribution Transforms Lives
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            Join a global community of partners delivering durable hope, solar water wells, and scholastic opportunity.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 lg:p-12 border border-outline-variant/30 shadow-level-2">
          {status === 'success' && receipt ? (
            <div className="text-center py-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[44px]">verified</span>
              </div>
              <span className="text-xs uppercase tracking-wider font-bold text-secondary">
                Transaction Verified • 501(c)(3) Receipt Issued
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary mt-2 mb-3">
                Thank You, {firstName || 'Supporter'}!
              </h2>
              <p className="font-body-lg text-on-surface-variant max-w-lg mb-4 leading-relaxed">
                {receipt.msg}
              </p>
              <div className="p-4 rounded-xl bg-surface-container-low max-w-md w-full mb-8 text-sm text-on-surface-variant">
                <div className="flex justify-between py-1 border-b border-outline-variant/30">
                  <span className="font-medium text-primary">Confirmation ID:</span>
                  <span className="font-mono text-xs text-secondary font-bold">{receipt.txId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant/30">
                  <span className="font-medium text-primary">Amount:</span>
                  <span className="font-bold text-primary">${activeAmount} {frequency === 'monthly' ? '/ month' : 'one-time'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-primary">Designation:</span>
                  <span className="font-bold text-secondary">{purpose}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setReceipt(null);
                }}
                className="px-8 py-3.5 rounded-xl bg-primary text-white font-label-md font-bold hover:bg-primary/90 transition-all"
              >
                Make Another Gift
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Frequency Selector */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-secondary mb-3 text-center">
                  Select Frequency
                </span>
                <DonationFrequencySelector frequency={frequency} onChange={setFrequency} />
              </div>

              {/* Amount Selector */}
              <DonationAmountSelector
                selectedAmount={selectedAmount}
                customAmount={customAmount}
                onSelectPredefined={(amt) => {
                  setSelectedAmount(amt);
                  setCustomAmount('');
                }}
                onCustomAmountChange={setCustomAmount}
              />

              {/* Purpose Selector */}
              <DonationPurposeSelector purpose={purpose} onChange={setPurpose} />

              {/* Live Breakdown Summary */}
              <DonationSummary
                amount={activeAmount}
                frequency={frequency}
                purpose={purpose}
              />

              {/* Donor Contact Fields */}
              <div className="pt-6 border-t border-outline-variant/30">
                <h3 className="font-headline-sm text-lg font-bold text-primary mb-4">
                  Donor Information &amp; Tax Receipt
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Miller"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-1">Email Address for Official Receipt *</label>
                  <input
                    type="email"
                    required
                    placeholder="david@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary"
                  />
                </div>
              </div>

              {errorMsg && (
                <div role="alert" className="p-3.5 rounded-xl bg-error-container/40 text-error text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl bg-secondary text-white font-label-lg font-bold shadow-md hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Processing securely...</span>
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

              {/* Security Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
                  256-bit Bank-Grade Encryption
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                  Official 501(c)(3) Charitable Tax Deduction
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">monitoring</span>
                  88% Direct Field Allocation
                </span>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
