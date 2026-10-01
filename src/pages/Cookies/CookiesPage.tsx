import React from 'react';
import { SEO } from '../../components/common/SEO';

export const CookiesPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Cookie Policy | RISE International"
        description="Learn about the essential and functional cookies utilized by the RISE International platform."
      />

      <section className="bg-primary-container text-white py-14 text-center">
        <div className="max-w-content mx-auto px-6">
          <h1 className="font-display-hero text-3xl sm:text-4xl font-extrabold">Cookie Policy</h1>
          <p className="font-body-md text-surface-container-high/90 mt-2">
            Transparency on our cookie utilization and your consent preferences.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 prose max-w-none text-on-surface-variant font-body-md leading-relaxed space-y-6">
        <h2 className="text-xl font-bold text-primary">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your browser or device by web servers. They allow websites to remember user preferences, facilitate secure sessions, and collect anonymous aggregate analytics.
        </p>

        <h2 className="text-xl font-bold text-primary">2. Types of Cookies We Deploy</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Strictly Necessary Cookies:</strong> Essential for site security, navigation, and completing transaction forms. These cannot be disabled.
          </li>
          <li>
            <strong>Functional Preferences:</strong> Remember your selected donation frequency, currency symbols, and display options across visits.
          </li>
          <li>
            <strong>Anonymous Performance &amp; Telemetry:</strong> Collect non-identifying aggregate visitor counts to help us measure global campaign outreach and page speeds.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-primary">3. Managing Your Choices</h2>
        <p>
          You can update or revoke your cookie choices at any time through the cookie preference modal on our site or by adjusting your browser settings.
        </p>
      </section>
    </div>
  );
};
