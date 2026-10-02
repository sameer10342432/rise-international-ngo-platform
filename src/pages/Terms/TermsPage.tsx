import React from 'react';
import { SEO } from '../../components/common/SEO';

export const TermsPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Terms & Conditions | RISE International"
        description="Terms and conditions governing the use of the RISE International nonprofit platform."
        canonical="/terms"
      />

      <section className="bg-primary-container text-white py-14 text-center">
        <div className="max-w-content mx-auto px-6">
          <h1 className="font-display-hero text-3xl sm:text-4xl font-extrabold">Terms &amp; Conditions</h1>
          <p className="font-body-md text-surface-container-high/90 mt-2">
            Governance terms for our platform and charitable donation services.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 prose max-w-none text-on-surface-variant font-body-md leading-relaxed space-y-6">
        <h2 className="text-xl font-bold text-primary">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the RISE International web platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-xl font-bold text-primary">2. Charitable Contributions &amp; Allocations</h2>
        <p>
          All donations made to RISE International support registered non-profit humanitarian interventions, school infrastructure, clean water development, and emergency relief programs. We strive to fulfill donor-designated requests whenever practical. Where specific emergency projects reach full funding, donations are deployed to areas of greatest urgent need.
        </p>

        <h2 className="text-xl font-bold text-primary">3. Intellectual Property</h2>
        <p>
          The text, logos, photography, graphics, and emblems displayed on this platform are owned by or licensed to RISE International and protected under international intellectual property and copyright laws.
        </p>

        <h2 className="text-xl font-bold text-primary">4. Limitation of Liability</h2>
        <p>
          RISE International makes every effort to ensure accurate, timely information. However, we cannot guarantee that website services will be uninterrupted or error-free.
        </p>
      </section>
    </div>
  );
};
