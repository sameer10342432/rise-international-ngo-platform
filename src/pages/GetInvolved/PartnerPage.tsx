import React, { useState } from 'react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { contactService } from '../../services/contactService';

const partnershipAreas = [
  {
    title: "Corporate Partnerships",
    description: "Align your organisation's social impact goals with community priorities through workplace giving, matching gifts, and ethical corporate engagement.",
    icon: "corporate_fare",
  },
  {
    title: "Community Organisations",
    description: "Collaborate on locally led initiatives where grassroots associations and community councils take direct ownership of project stewardship.",
    icon: "groups",
  },
  {
    title: "Programme Partnerships",
    description: "Join forces on thematic initiatives in education, community water infrastructure, humanitarian response, or vocational livelihoods.",
    icon: "school",
  },
  {
    title: "Skills-Based Support",
    description: "Lend professional technical expertise—including civil engineering, public health guidance, digital technology, or legal counsel.",
    icon: "handshake",
  },
  {
    title: "Fundraising Partnerships",
    description: "Mobilize institutional foundations, civic groups, and philanthropic coalitions to support scalable community initiatives.",
    icon: "volunteer_activism",
  },
];

export const PartnerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    email: '',
    partnershipType: 'Corporate Partnerships',
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
        subject: `Partnership Inquiry: ${formData.partnershipType}`,
        message: formData.message,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Partner With Us | Collaborative Partnerships | RISE International"
        description="Partner with RISE International. Explore partnership opportunities across corporate collaborations, community organisations, programme partnerships, and skills-based support."
        canonical="https://riseintl.org/get-involved/partner"
        ogImage="/images/rise-partner-hero-institutional.webp"
        breadcrumbs={[
          { name: "Home", item: "https://riseintl.org/" },
          { name: "Get Involved", item: "https://riseintl.org/get-involved" },
          { name: "Partner With Us", item: "https://riseintl.org/get-involved/partner" },
        ]}
      />

      {/* Hero Banner */}
      <section className="bg-primary-container text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-partner-hero-institutional.webp"
            alt="Representatives of an international partner institution shaking hands with local community elders under a solar project canopy"
            className="w-full h-full object-cover object-center opacity-25"
            loading="eager"
            width={1344}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/90 to-primary-container/60" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 text-center">
          <div className="mb-4">
            <Breadcrumbs
              items={[
                { label: "Get Involved", path: "/get-involved" },
                { label: "Partner With Us" },
              ]}
              className="text-white/80 justify-center"
            />
          </div>
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            COLLABORATIVE IMPACT
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold mt-2">
            Partner With RISE International
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3 leading-relaxed">
            We partner with organisations that share our commitment to human dignity, community stewardship, and lasting, self-governed development.
          </p>
        </div>
      </section>

      {/* Partnership Opportunities Overview */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
            OPPORTUNITY AREAS
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-4xl text-primary font-bold mt-2">
            Ways We Can Work Together
          </h2>
          <p className="font-body-md text-on-surface-variant mt-3 leading-relaxed">
            We do not engage in superficial sponsorships. Our partnerships are structured around genuine community needs and transparent, verifiable collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnershipAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-level-1 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[26px]">{area.icon}</span>
              </div>
              <h3 className="font-headline-sm text-xl font-bold text-primary mb-2">
                {area.title}
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 lg:p-12 border border-outline-variant/30 shadow-level-2">
            <div className="mb-8 text-center">
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                INITIATE A DIALOGUE
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary mt-1">
                Partnership Inquiry
              </h2>
              <p className="font-body-md text-on-surface-variant mt-2">
                Tell us about your organisation and how you envision collaborating with RISE International.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[36px]">verified</span>
                </div>
                <h3 className="font-headline-md text-2xl font-bold text-primary mb-2">
                  Inquiry Received
                </h3>
                <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our partnerships team will review your proposal and respond promptly to discuss potential alignment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="partner-org" className="block text-sm font-bold text-primary mb-1.5">
                      Organisation Name *
                    </label>
                    <input
                      id="partner-org"
                      type="text"
                      required
                      placeholder="e.g. Community Foundation"
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="partner-contact" className="block text-sm font-bold text-primary mb-1.5">
                      Contact Representative *
                    </label>
                    <input
                      id="partner-contact"
                      type="text"
                      required
                      placeholder="e.g. David Weber"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="partner-email" className="block text-sm font-bold text-primary mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="partner-email"
                      type="email"
                      required
                      placeholder="contact@organisation.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="partner-type" className="block text-sm font-bold text-primary mb-1.5">
                      Partnership Area *
                    </label>
                    <select
                      id="partner-type"
                      value={formData.partnershipType}
                      onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-surface border border-outline-variant/30 text-primary font-body-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/30"
                    >
                      <option>Corporate Partnerships</option>
                      <option>Community Organisations</option>
                      <option>Programme Partnerships</option>
                      <option>Skills-Based Support</option>
                      <option>Fundraising Partnerships</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="partner-message" className="block text-sm font-bold text-primary mb-1.5">
                    Collaboration Objectives &amp; Scope *
                  </label>
                  <textarea
                    id="partner-message"
                    rows={4}
                    required
                    placeholder="Describe your organisation, thematic interest, and how you envision collaborating with RISE International..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-surface border border-outline-variant/30 text-primary font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl bg-primary text-white font-label-lg font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? 'Submitting Proposal...' : 'Submit Partnership Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
