import React from 'react';
import { SEO } from '../../components/common/SEO';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Privacy Policy | RISE International"
        description="Official privacy policy governing data protection, donor confidentiality, and user rights at RISE International."
        canonical="/privacy"
      />

      <section className="bg-primary-container text-white py-14 text-center">
        <div className="max-w-content mx-auto px-6">
          <h1 className="font-display-hero text-3xl sm:text-4xl font-extrabold">Privacy Policy</h1>
          <p className="font-body-md text-surface-container-high/90 mt-2">
            Effective Date: January 1, 2024 • Last updated: June 2024
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 prose max-w-none text-on-surface-variant font-body-md leading-relaxed space-y-6">
        <h2 className="text-xl font-bold text-primary">1. Our Commitment to Privacy</h2>
        <p>
          RISE International (“we”, “our”, or “us”) is committed to protecting the privacy and personal data of our donors, volunteers, beneficiaries, and website visitors. We adhere to the highest international data protection standards, including the European Union General Data Protection Regulation (GDPR).
        </p>

        <h2 className="text-xl font-bold text-primary">2. Information We Collect</h2>
        <p>
          We only collect personal information that you provide voluntarily when submitting donation pledges, applying to volunteer, subscribing to field dispatches, or contacting our coordination desk. This may include your name, email address, telephone number, country of residence, and communication preferences.
        </p>

        <h2 className="text-xl font-bold text-primary">3. How We Use Your Information</h2>
        <p>
          We utilize your data strictly to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Acknowledge and certify tax-deductible charitable contributions.</li>
          <li>Evaluate volunteer and personnel applications.</li>
          <li>Transmit quarterly newsletters and emergency field appeals (if consented).</li>
          <li>Respond to institutional queries and direct coordination correspondence.</li>
        </ul>

        <h2 className="text-xl font-bold text-primary">4. We Never Sell or Commercialize Your Data</h2>
        <p>
          RISE International will never sell, rent, trade, or exchange your personal information with third-party marketers or commercial brokers.
        </p>

        <h2 className="text-xl font-bold text-primary">5. Contact Our Data Protection Officer</h2>
        <p>
          If you have questions regarding your data or wish to exercise your rights of access, correction, or erasure, email us at <a href="mailto:info@riseintl.org" className="text-secondary font-bold underline">info@riseintl.org</a> or phone +49 1520-6777889.
        </p>
      </section>
    </div>
  );
};
