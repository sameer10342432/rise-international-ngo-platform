import React, { useState } from 'react';
import { SubmissionStatus } from '../../types';
import { newsletterService } from '../../services/newsletterService';

export const NewsletterSection: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage(null);

    try {
      const res = await newsletterService.subscribe({ firstName, email });
      setStatus('success');
      setMessage(res.message);
      setFirstName('');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Subscription failed. Please try again.');
    }
  };

  return (
    <section className="w-full bg-surface-container-high py-20">
      <div className="max-w-content mx-auto px-6 lg:px-12">
        <div className="bg-primary text-on-primary rounded-3xl p-8 lg:p-14 shadow-level-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
                MONTHLY DISPATCH
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-white font-bold mt-2">
                Stay Connected With Our Work
              </h2>
              <p className="font-body-md text-body-md text-surface-container-high/85 mt-3 leading-relaxed">
                Receive quarterly field updates, photostories from our clinics, and transparent audits directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-6">
              {status === 'success' ? (
                <div className="p-6 rounded-2xl bg-secondary/20 border border-secondary text-white flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-fixed text-[28px]">check_circle</span>
                  <div>
                    <p className="font-bold text-base">Subscription Confirmed</p>
                    <p className="text-sm text-surface-container-high">{message}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="px-4 py-3.5 rounded-xl bg-surface-container-lowest/10 text-white placeholder-surface-container-high/60 focus:outline-none focus:bg-surface-container-lowest/20 focus:ring-2 focus:ring-secondary border border-white/10 flex-1 sm:max-w-[170px]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-3.5 rounded-xl bg-surface-container-lowest/10 text-white placeholder-surface-container-high/60 focus:outline-none focus:bg-surface-container-lowest/20 focus:ring-2 focus:ring-secondary border border-white/10 flex-1"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-7 py-3.5 rounded-xl bg-secondary text-white font-label-lg text-label-lg hover:bg-secondary/90 transition-all flex-shrink-0 disabled:opacity-60 font-bold"
                    >
                      {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                    </button>
                  </div>

                  {status === 'error' && (
                    <span role="alert" className="text-error-container text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">error</span>
                      <span>{message}</span>
                    </span>
                  )}

                  <span className="font-body-sm text-body-sm text-surface-container-high/70 text-xs block">
                    We respect your privacy. Unsubscribe at any time.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
