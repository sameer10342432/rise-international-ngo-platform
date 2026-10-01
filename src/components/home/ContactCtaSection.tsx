import React, { useState } from 'react';
import { SubmissionStatus } from '../../types';
import { contactService } from '../../services/contactService';
import { organizationInfo } from '../../data/organization';

export const ContactCtaSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedback('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    setFeedback(null);

    try {
      const res = await contactService.submitMessage(formData);
      setStatus('success');
      setFeedback(res.message);
      setFormData({
        fullName: '',
        email: '',
        subject: 'General Enquiry',
        message: '',
      });
    } catch (err) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Message sending failed.');
    }
  };

  return (
    <section className="w-full max-w-content mx-auto px-6 lg:px-12 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Direct Coordination Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
              GET IN TOUCH
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold mt-2">
              Let’s Create Change Together
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-3 leading-relaxed">
              Have questions about institutional grants, child sponsorship, corporate matching, or field visits? Reach out to our global coordination headquarters.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary border border-outline-variant/30">
                <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                  DIRECT COORDINATION
                </span>
                <p className="font-label-lg text-label-lg text-primary font-bold">
                  {organizationInfo.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary border border-outline-variant/30">
                <span className="material-symbols-outlined text-[22px]">mail</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                  OFFICIAL INQUIRIES
                </span>
                <p className="font-label-lg text-label-lg text-primary font-bold">
                  {organizationInfo.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Contact Form */}
        <div className="lg:col-span-7 bg-surface-container-low p-8 lg:p-10 rounded-3xl shadow-sm border border-outline-variant/30">
          {status === 'success' ? (
            <div className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h3 className="font-headline-md text-2xl text-primary font-bold mb-2">Message Received</h3>
              <p className="font-body-md text-on-surface-variant max-w-md mb-6">{feedback}</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-label-md text-label-md"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-md text-label-md text-primary mb-2 font-bold">
                  Your Name <span className="text-secondary">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-surface text-primary font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-outline-variant/30"
                />
              </div>

              <div>
                <label className="block font-label-md text-label-md text-primary mb-2 font-bold">
                  Email Address <span className="text-secondary">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@example.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-surface text-primary font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-outline-variant/30"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-label-md text-label-md text-primary mb-2 font-bold">
                  Inquiry Type
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-surface text-primary font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-outline-variant/30 cursor-pointer"
                >
                  <option>General Enquiry</option>
                  <option>Corporate Partnership &amp; Matching</option>
                  <option>Volunteering Inquiry</option>
                  <option>Press &amp; Media Inquiries</option>
                  <option>Donation &amp; Fiscal Verification</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-label-md text-label-md text-primary mb-2 font-bold">
                  How can we assist you? <span className="text-secondary">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share how you would like to partner with RISE International..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-xl bg-surface text-primary font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-outline-variant/30"
                />
              </div>

              {status === 'error' && (
                <div role="alert" className="sm:col-span-2 p-3 rounded-xl bg-error-container/40 text-error text-xs flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  <span>{feedback}</span>
                </div>
              )}

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl bg-primary text-white font-label-lg text-label-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-60 font-bold"
                >
                  {status === 'loading' ? (
                    <span>SENDING...</span>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
