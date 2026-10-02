import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { DonationFrequency, SubmissionStatus } from '../../types';
import { donationService } from '../../services/donationService';
import { DonationFrequencySelector } from '../../components/donation/DonationFrequencySelector';
import { DonationAmountSelector } from '../../components/donation/DonationAmountSelector';
import { DonationPurposeSelector, donationPurposes } from '../../components/donation/DonationPurposeSelector';
import { DonationSummary } from '../../components/donation/DonationSummary';

const donationFaqs = [
  {
    question: "How are donated funds utilized?",
    answer: "Contributions directly support our people-centred programmes in Education, Community Development, Humanitarian Aid, and Economic Empowerment, alongside essential project logistics and monitoring.",
  },
  {
    question: "Can I designate my gift to a specific programme?",
    answer: "Yes. You can select 'Where Needed Most' or allocate your contribution directly to Education, Humanitarian Aid, Community Development, or Economic Empowerment.",
  },
  {
    question: "Can I set up a recurring monthly donation?",
    answer: "Yes. Selecting 'Monthly' allows you to provide dependable, ongoing support for community programmes. You can adjust or cancel your recurring contribution at any time.",
  },
  {
    question: "Will I receive a confirmation receipt?",
    answer: "Yes. An immediate digital confirmation receipt with your transaction ID and donation details is generated upon successful completion.",
  },
  {
    question: "Is my payment information secure?",
    answer: "All transactions are processed through encrypted, industry-standard payment gateways. We never store complete payment card details on our servers.",
  },
];

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
      setErrorMsg('Please enter a valid donor email address for your confirmation receipt.');
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
      setErrorMsg(err instanceof Error ? err.message : 'Donation processing failed. Please try again.');
    }
  };

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Donate | Support Community Programmes | RISE International"
        description="Make a secure donation to RISE International. Your gift supports community-led education, clean water, humanitarian relief, and economic empowerment."
        canonical="https://riseintl.org/donate"
        ogImage="/images/rise-donate-hero-dignity.webp"
        breadcrumbs={[
          { name: "Home", item: "https://riseintl.org/" },
          { name: "Donate", item: "https://riseintl.org/donate" },
        ]}
        faqs={donationFaqs}
      />

      {/* Hero Banner */}
      <section className="bg-primary-container text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-donate-hero-dignity.webp"
            alt="A mother warmly embracing her smiling young child outdoors in natural morning sunlight, conveying hope, dignity, and family empowerment"
            className="w-full h-full object-cover object-center opacity-25"
            loading="eager"
            width={1344}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/90 to-primary-container/60" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 text-center">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Donate" }]} className="text-white/80 justify-center" />
          </div>
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            TRANSPARENT GIVING
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold mt-2">
            Make a Difference Today
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3 leading-relaxed">
            Your support enables communities to expand educational access, construct clean water infrastructure, deliver dignified relief, and build lasting self-reliance.
          </p>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 lg:p-12 border border-outline-variant/30 shadow-level-2">
          {status === 'success' && receipt ? (
            <div className="text-center py-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[44px]">verified</span>
              </div>
              <span className="text-xs uppercase tracking-wider font-bold text-secondary">
                Transaction Completed • Confirmation Issued
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary mt-2 mb-3">
                Thank You, {firstName || 'Supporter'}!
              </h2>
              <p className="font-body-lg text-on-surface-variant max-w-lg mb-4 leading-relaxed">
                {receipt.msg}
              </p>
              <div className="p-4 rounded-xl bg-surface-container-low max-w-md w-full mb-8 text-sm text-on-surface-variant">
                <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                  <span className="font-medium text-primary">Confirmation ID:</span>
                  <span className="font-mono text-xs text-secondary font-bold">{receipt.txId}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                  <span className="font-medium text-primary">Contribution:</span>
                  <span className="font-bold text-primary">${activeAmount} {frequency === 'monthly' ? '/ month' : 'one-time'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-medium text-primary">Programme Designation:</span>
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

              {/* Donor Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label htmlFor="first-name" className="block font-label-md text-label-md text-primary mb-1.5 font-bold">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Sarah"
                    className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-high focus:ring-2 focus:ring-secondary/30 transition-all border border-outline-variant/30"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block font-label-md text-label-md text-primary mb-1.5 font-bold">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Jenkins"
                    className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-high focus:ring-2 focus:ring-secondary/30 transition-all border border-outline-variant/30"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="donor-email" className="block font-label-md text-label-md text-primary mb-1.5 font-bold">
                    Email Address (for confirmation receipt)
                  </label>
                  <input
                    id="donor-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-high focus:ring-2 focus:ring-secondary/30 transition-all border border-outline-variant/30"
                  />
                </div>
              </div>

              {/* Summary Breakdown */}
              <DonationSummary
                amount={activeAmount}
                frequency={frequency}
                purpose={purpose}
              />

              {errorMsg && (
                <div className="p-4 rounded-xl bg-error-container text-on-error-container text-sm flex items-center gap-2" role="alert">
                  <span className="material-symbols-outlined text-[20px]">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl bg-secondary text-white font-label-lg text-label-lg font-bold hover:bg-secondary/90 shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Processing Contribution...</span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[22px]">favorite</span>
                    <span>Complete Gift of ${activeAmount}</span>
                  </>
                )}
              </button>

              <p className="text-center font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Thank you for your partnership. All contributions support verified community-led programs in accordance with strict governance and humanitarian principles.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Donation FAQs */}
      <FaqAccordion
        title="Donation FAQs"
        subtitle="Transparent answers regarding payment security, designations, and stewardship."
        faqs={donationFaqs}
        className="bg-surface-container-low/40 border-t border-outline-variant/30"
      />
    </div>
  );
};
