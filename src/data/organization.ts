export const organizationInfo = {
  name: "RISE International",
  shortName: "RISE INTL",
  tagline: "Empowering Communities. Transforming Lives.",
  phone: "+49 1520-6777889",
  email: "info@riseintl.org",
  primaryCta: {
    label: "DONATE NOW",
    path: "/donate",
  },
  secondaryCta: {
    label: "BECOME A VOLUNTEER",
    path: "/volunteer",
  },
  registration: "Registered 501(c)(3) International Non-Governmental Organization dedicated to sustainable education, relief, and economic dignity worldwide.",
  financialEfficiency: "88% of all funds directly support verified on-the-ground programs.",
  socialLinks: [
    { name: "Facebook", href: "https://facebook.com", icon: "public" },
    { name: "Twitter / X", href: "https://x.com", icon: "share" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: "work" },
    { name: "Instagram", href: "https://instagram.com", icon: "photo_camera" },
    { name: "YouTube", href: "https://youtube.com", icon: "play_arrow" },
  ],
  navLinks: [
    { label: "Home", path: "/" },
    {
      label: "About Us",
      path: "/about",
      dropdown: [
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
        { label: "Statistics", path: "/impact#statistics" },
        { label: "Stories of Change", path: "/impact/stories" },
        { label: "Annual Report", path: "/impact/report" },
      ],
    },
    {
      label: "Get Involved",
      path: "/get-involved",
      dropdown: [
        { label: "Donate", path: "/donate" },
        { label: "Sponsor a Child", path: "/get-involved/sponsor-a-child" },
        { label: "Volunteer", path: "/volunteer" },
        { label: "Partner With Us", path: "/get-involved/partner" },
      ],
    },
    { label: "News & Stories", path: "/news" },
    { label: "Contact Us", path: "/contact" },
  ],
};
