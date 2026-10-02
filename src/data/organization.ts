export const organizationInfo = {
  name: "RISE International",
  shortName: "RISE INTL",
  tagline: "Empowering Communities. Transforming Lives.",
  phone: "+49 1520-6777889",
  email: "info@riseintl.org",
  supportingCopy:
    "RISE International works to create opportunities, strengthen communities and support sustainable change through people-centred programmes and partnerships.",
  primaryCta: {
    label: "DONATE NOW",
    path: "/donate",
  },
  secondaryCta: {
    label: "BECOME A VOLUNTEER",
    path: "/volunteer",
  },
  overview:
    "RISE International is an international nonprofit organisation committed to supporting community resilience, educational access, emergency humanitarian relief, and long-term economic empowerment through locally led initiatives.",
  financialEfficiency:
    "Dedicated to transparent stewardship, ethical governance, and accountable community partnerships.",
  socialLinks: [
    { name: "LinkedIn", href: "https://linkedin.com", icon: "work" },
    { name: "X / Twitter", href: "https://x.com", icon: "share" },
    { name: "Facebook", href: "https://facebook.com", icon: "public" },
    { name: "Instagram", href: "https://instagram.com", icon: "photo_camera" },
  ],
  navLinks: [
    { label: "Home", path: "/" },
    {
      label: "About Us",
      path: "/about",
      dropdown: [
        { label: "Overview", path: "/about" },
        { label: "Our Story", path: "/about/our-story" },
        { label: "Mission & Vision", path: "/about/mission-vision" },
        { label: "Our Values", path: "/about/values" },
        { label: "Our Team", path: "/about/team" },
      ],
    },
    {
      label: "Our Work",
      path: "/our-work",
      dropdown: [
        { label: "All Programmes", path: "/our-work" },
        { label: "Education", path: "/our-work/education" },
        { label: "Community Development", path: "/our-work/community-development" },
        { label: "Humanitarian Aid", path: "/our-work/humanitarian-aid" },
        { label: "Economic Empowerment", path: "/our-work/economic-empowerment" },
      ],
    },
    {
      label: "Impact",
      path: "/impact",
      dropdown: [
        { label: "Impact Overview", path: "/impact" },
        { label: "Stories of Change", path: "/impact/stories" },
        { label: "Impact Reporting", path: "/impact/report" },
      ],
    },
    {
      label: "Get Involved",
      path: "/get-involved",
      dropdown: [
        { label: "Overview", path: "/get-involved" },
        { label: "Donate", path: "/donate" },
        { label: "Volunteer", path: "/volunteer" },
        { label: "Partner With Us", path: "/get-involved/partner" },
        { label: "Sponsor a Child", path: "/get-involved/sponsor-a-child" },
      ],
    },
    { label: "News", path: "/news" },
    { label: "Contact", path: "/contact" },
  ],
};
