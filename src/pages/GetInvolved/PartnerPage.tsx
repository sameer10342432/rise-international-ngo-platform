import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { contactService } from '../../services/contactService';

export const PartnerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    email: '',
    partnershipType: 'Corporate CSR & Matching',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await contactService.submitMessage({
        fullName: `${formData.contactName} (${formData.orgName})`,
        email: formData.email,
        subject: `Partnership: ${formData.partnershipType}`,
        message: formData.message,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full">
      <SEO
        title="Partner With Us | Institutional &amp; Corporate CSR | RISE International"
        description="Collaborate with RISE International through corporate matching grants, philanthropic foundations, and multilateral aid coalitions."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20 text-center">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <Link to="/get-involved" className="inline-flex items-center gap-1.5 text-secondary-fixed font-label-md text-sm mb-3 hover:underline">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Get Involved</span>
          </Link>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold text-white">
            Partner With RISE International
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            Amplify your institutional philanthropy with our verified ground logistics and 88%+ program efficiency.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-level-2">
          {status === 'success' ? (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-[48px] text-secondary">handshake</span>
              <h3 className="font-headline-md text-2xl font-bold text-primary mt-3">Partnership Proposal Received</h3>
              <p className="text-on-surface-variant max-w-md mx-auto mt-2">
                Thank you for your interest in partnering with RISE International. Our Institutional Alliances team will review your organization's inquiry and connect with you within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-primary mb-1">Organization Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Global Foundation"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-1">Contact Representative *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Chen"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-primary mb-1">Corporate / Institutional Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="michael@acme.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-1">Partnership Format</label>
                  <select
                    value={formData.partnershipType}
                    onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary cursor-pointer"
                  >
                    <option>Corporate CSR &amp; Matching</option>
                    <option>Institutional Philanthropic Grant</option>
                    <option>University / Technical Research Coalition</option>
                    <option>In-Kind Logistics &amp; Technology Supply</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-1">Scope &amp; Objectives *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your organization's geographic priorities, budget scale, or desired thematic pillars..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-xl bg-surface border border-outline-variant/30 text-primary"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl bg-primary text-white font-label-lg font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                {status === 'loading' ? 'SUBMITTING INQUIRY...' : 'SUBMIT PARTNERSHIP INQUIRY'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
