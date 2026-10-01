import React from 'react';
import { Link } from 'react-router-dom';
import { organizationInfo } from '../../data/organization';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface border-t border-outline-variant/30">
      <div className="max-w-content mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group" aria-label="RISE International">
              <img
                src="/images/rise-logo.svg"
                alt="RISE International Logo"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <p className="font-headline-sm text-base text-primary font-bold">
              {organizationInfo.tagline}
            </p>

            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm leading-relaxed">
              {organizationInfo.registration}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2" aria-label="Social media channels">
              {organizationInfo.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-secondary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-label-lg text-label-lg text-primary tracking-tight font-bold">
              Quick Links
            </span>
            <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <Link to="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-secondary transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-secondary transition-colors">
                  Impact
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-secondary transition-colors">
                  News &amp; Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-lg text-label-lg text-primary tracking-tight font-bold">
              Get Involved
            </span>
            <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <Link to="/donate" className="hover:text-secondary transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/get-involved/sponsor-a-child" className="hover:text-secondary transition-colors">
                  Sponsor a Child
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-secondary transition-colors">
                  Volunteer Opportunities
                </Link>
              </li>
              <li>
                <Link to="/get-involved/partner" className="hover:text-secondary transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/impact/report" className="hover:text-secondary transition-colors">
                  Annual Reports &amp; Fiscal Audits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Verification */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-lg text-label-lg text-primary tracking-tight font-bold">
              Contact &amp; Verification
            </span>
            <div className="flex flex-col gap-2 text-on-surface-variant font-body-sm text-body-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
                <a href={`tel:${organizationInfo.phone}`} className="hover:text-secondary transition-colors">
                  {organizationInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary">mail</span>
                <a href={`mailto:${organizationInfo.email}`} className="hover:text-secondary transition-colors">
                  {organizationInfo.email}
                </a>
              </div>
            </div>

            <div className="mt-3 p-4 rounded-xl bg-surface-container flex items-start gap-3 border border-outline-variant/30">
              <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
              <div>
                <p className="font-label-md text-label-md text-primary font-bold">Transparent Reporting</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-0.5 leading-relaxed">
                  Independently audited governance. 88% of funds go directly toward field programs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant text-xs">
          <p>© {new Date().getFullYear()} RISE International. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-secondary transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/cookie-policy" className="hover:text-secondary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
