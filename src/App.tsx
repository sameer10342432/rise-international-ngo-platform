import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Lazy-loaded route components for high performance code splitting
const HomePage = lazy(() =>
  import('./pages/Home/HomePage').then((m) => ({ default: m.HomePage }))
);
const AboutPage = lazy(() =>
  import('./pages/About/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const OurStoryPage = lazy(() =>
  import('./pages/About/OurStoryPage').then((m) => ({ default: m.OurStoryPage }))
);
const MissionVisionPage = lazy(() =>
  import('./pages/About/MissionVisionPage').then((m) => ({ default: m.MissionVisionPage }))
);
const ValuesPage = lazy(() =>
  import('./pages/About/ValuesPage').then((m) => ({ default: m.ValuesPage }))
);
const TeamPage = lazy(() =>
  import('./pages/About/TeamPage').then((m) => ({ default: m.TeamPage }))
);

const ProgramsPage = lazy(() =>
  import('./pages/Programs/ProgramsPage').then((m) => ({ default: m.ProgramsPage }))
);
const ProgrammeDetailPage = lazy(() =>
  import('./pages/Programs/ProgrammeDetailPage').then((m) => ({ default: m.ProgrammeDetailPage }))
);

const ImpactPage = lazy(() =>
  import('./pages/Impact/ImpactPage').then((m) => ({ default: m.ImpactPage }))
);
const StoriesPage = lazy(() =>
  import('./pages/Impact/StoriesPage').then((m) => ({ default: m.StoriesPage }))
);
const ReportPage = lazy(() =>
  import('./pages/Impact/ReportPage').then((m) => ({ default: m.ReportPage }))
);

const GetInvolvedPage = lazy(() =>
  import('./pages/GetInvolved/GetInvolvedPage').then((m) => ({ default: m.GetInvolvedPage }))
);
const SponsorChildPage = lazy(() =>
  import('./pages/GetInvolved/SponsorChildPage').then((m) => ({ default: m.SponsorChildPage }))
);
const PartnerPage = lazy(() =>
  import('./pages/GetInvolved/PartnerPage').then((m) => ({ default: m.PartnerPage }))
);

const NewsListingPage = lazy(() =>
  import('./pages/News/NewsListingPage').then((m) => ({ default: m.NewsListingPage }))
);
const NewsDetailPage = lazy(() =>
  import('./pages/News/NewsDetailPage').then((m) => ({ default: m.NewsDetailPage }))
);

const ContactPage = lazy(() =>
  import('./pages/Contact/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const DonatePage = lazy(() =>
  import('./pages/Donate/DonatePage').then((m) => ({ default: m.DonatePage }))
);
const VolunteerPage = lazy(() =>
  import('./pages/Volunteer/VolunteerPage').then((m) => ({ default: m.VolunteerPage }))
);

const PrivacyPage = lazy(() =>
  import('./pages/Privacy/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);
const TermsPage = lazy(() =>
  import('./pages/Terms/TermsPage').then((m) => ({ default: m.TermsPage }))
);
const CookiesPage = lazy(() =>
  import('./pages/Cookies/CookiesPage').then((m) => ({ default: m.CookiesPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFound/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

// Admin CMS Portal Pages
const AdminLoginPage = lazy(() =>
  import('./pages/Admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage }))
);
const AdminDashboardPage = lazy(() =>
  import('./pages/Admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage }))
);
const AdminProgrammesPage = lazy(() =>
  import('./pages/Admin/AdminProgrammesPage').then((m) => ({ default: m.AdminProgrammesPage }))
);
const AdminImpactPage = lazy(() =>
  import('./pages/Admin/AdminImpactPage').then((m) => ({ default: m.AdminImpactPage }))
);
const AdminStoriesPage = lazy(() =>
  import('./pages/Admin/AdminStoriesPage').then((m) => ({ default: m.AdminStoriesPage }))
);
const AdminNewsPage = lazy(() =>
  import('./pages/Admin/AdminNewsPage').then((m) => ({ default: m.AdminNewsPage }))
);
const AdminDonationsPage = lazy(() =>
  import('./pages/Admin/AdminDonationsPage').then((m) => ({ default: m.AdminDonationsPage }))
);
const AdminVolunteersPage = lazy(() =>
  import('./pages/Admin/AdminVolunteersPage').then((m) => ({ default: m.AdminVolunteersPage }))
);
const AdminContactPage = lazy(() =>
  import('./pages/Admin/AdminContactPage').then((m) => ({ default: m.AdminContactPage }))
);
const AdminNewsletterPage = lazy(() =>
  import('./pages/Admin/AdminNewsletterPage').then((m) => ({ default: m.AdminNewsletterPage }))
);
const AdminTeamPage = lazy(() =>
  import('./pages/Admin/AdminTeamPage').then((m) => ({ default: m.AdminTeamPage }))
);
const AdminPartnersPage = lazy(() =>
  import('./pages/Admin/AdminPartnersPage').then((m) => ({ default: m.AdminPartnersPage }))
);
const AdminPagesPage = lazy(() =>
  import('./pages/Admin/AdminPagesPage').then((m) => ({ default: m.AdminPagesPage }))
);
const AdminSettingsPage = lazy(() =>
  import('./pages/Admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage }))
);
const AdminUsersPage = lazy(() =>
  import('./pages/Admin/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage }))
);
const AdminAuditPage = lazy(() =>
  import('./pages/Admin/AdminAuditPage').then((m) => ({ default: m.AdminAuditPage }))
);

export const App: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-surface">
          <LoadingSpinner size="lg" label="Loading RISE International..." />
        </div>
      }
    >
      <Routes>
        {/* Admin CMS Portal Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/programmes" element={<AdminProgrammesPage />} />
        <Route path="/admin/impact" element={<AdminImpactPage />} />
        <Route path="/admin/stories" element={<AdminStoriesPage />} />
        <Route path="/admin/news" element={<AdminNewsPage />} />
        <Route path="/admin/donations" element={<AdminDonationsPage />} />
        <Route path="/admin/volunteers" element={<AdminVolunteersPage />} />
        <Route path="/admin/contact" element={<AdminContactPage />} />
        <Route path="/admin/newsletter" element={<AdminNewsletterPage />} />
        <Route path="/admin/team" element={<AdminTeamPage />} />
        <Route path="/admin/partners" element={<AdminPartnersPage />} />
        <Route path="/admin/pages" element={<AdminPagesPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/audit" element={<AdminAuditPage />} />

        {/* Public Website Routes */}
        <Route element={<Layout />}>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* About */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/our-story" element={<OurStoryPage />} />
          <Route path="/about/mission-vision" element={<MissionVisionPage />} />
          <Route path="/about/values" element={<ValuesPage />} />
          <Route path="/about/team" element={<TeamPage />} />

          {/* Our Work */}
          <Route path="/our-work" element={<ProgramsPage />} />
          <Route path="/our-work/education" element={<ProgrammeDetailPage forcedSlug="education" />} />
          <Route path="/our-work/community-development" element={<ProgrammeDetailPage forcedSlug="community-development" />} />
          <Route path="/our-work/humanitarian-aid" element={<ProgrammeDetailPage forcedSlug="humanitarian-aid" />} />
          <Route path="/our-work/economic-empowerment" element={<ProgrammeDetailPage forcedSlug="economic-empowerment" />} />
          <Route path="/our-work/:slug" element={<ProgrammeDetailPage />} />

          {/* Impact */}
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/impact/stories" element={<StoriesPage />} />
          <Route path="/impact/report" element={<ReportPage />} />

          {/* Get Involved */}
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/get-involved/donate" element={<DonatePage />} />
          <Route path="/get-involved/sponsor-a-child" element={<SponsorChildPage />} />
          <Route path="/get-involved/volunteer" element={<VolunteerPage />} />
          <Route path="/get-involved/partner" element={<PartnerPage />} />

          {/* News */}
          <Route path="/news" element={<NewsListingPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />

          {/* Primary Top-level Actions */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />

          {/* Legal / Policy */}
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookie-policy" element={<CookiesPage />} />

          {/* Legacy / Aliases */}
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
          <Route path="/news-and-stories" element={<Navigate to="/news" replace />} />
          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

    </Suspense>
  );
};

export default App;
