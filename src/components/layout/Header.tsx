import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';

interface DropdownItem {
  name: string;
  href: string;
  desc?: string;
  icon?: string;
}

const aboutItems: DropdownItem[] = [
  { name: 'Overview', href: '/about', desc: 'Our mission, reach and leadership', icon: 'info' },
  { name: 'Our Story', href: '/about/our-story', desc: 'Grassroots journey and history', icon: 'auto_stories' },
  { name: 'Mission & Vision', href: '/about/mission-vision', desc: 'Core purpose & long-term goals', icon: 'visibility' },
  { name: 'Our Values', href: '/about/values', desc: 'Dignity, integrity & stewardship', icon: 'verified' },
  { name: 'Our Team', href: '/about/team', desc: 'Dedicated staff & field leaders', icon: 'groups' },
];

const workItems: DropdownItem[] = [
  { name: 'All Programmes', href: '/our-work', desc: 'Overview of all active interventions', icon: 'hub' },
  { name: 'Education', href: '/our-work/education', desc: 'Classrooms, literacy & skills training', icon: 'school' },
  { name: 'Community Development', href: '/our-work/community-development', desc: 'Solar power, clean water & facilities', icon: 'solar_power' },
  { name: 'Humanitarian Aid', href: '/our-work/humanitarian-aid', desc: 'Emergency relief & medical outreach', icon: 'health_and_safety' },
  { name: 'Economic Empowerment', href: '/our-work/economic-empowerment', desc: 'Vocational training & artisan support', icon: 'monetization_on' },
];

const impactItems: DropdownItem[] = [
  { name: 'Impact Overview', href: '/impact', desc: 'Measurable outcomes & field metrics', icon: 'monitoring' },
  { name: 'Stories of Change', href: '/impact/stories', desc: 'Personal journeys of local resilience', icon: 'record_voice_over' },
  { name: 'Annual Report', href: '/impact/report', desc: 'Financial audit & governance review', icon: 'description' },
];

const getInvolvedItems: DropdownItem[] = [
  { name: 'Donate', href: '/donate', desc: 'Support critical community projects', icon: 'favorite' },
  { name: 'Sponsor a Child', href: '/get-involved/sponsor-a-child', desc: 'Fund quality schooling & essentials', icon: 'child_care' },
  { name: 'Volunteer', href: '/volunteer', desc: 'Share your skills & energy on the ground', icon: 'how_to_reg' },
  { name: 'Partner With Us', href: '/get-involved/partner', desc: 'Institutional & grassroots alliances', icon: 'handshake' },
];

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰' },
];

// Clean vector SVG icons to guarantee crisp rendering without font loading latency
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const Header: React.FC = () => {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mobile menu and dropdowns upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setLangMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
        setLangMenuOpen(false);
        hamburgerButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleMobileSection = (section: string) => {
    setMobileOpenSection((prev) => (prev === section ? null : section));
  };

  const currentLangObj = languages.find((l) => l.code === selectedLang) || languages[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_16px_rgba(11,33,69,0.06)] border-b border-outline-variant/30 py-0'
            : 'bg-white/90 backdrop-blur-sm border-b border-outline-variant/20 py-0'
        }`}
      >
        <div
          className={`max-w-content mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-[72px]' : 'h-20'
          }`}
        >
          {/* ============================================================== */}
          {/* LEFT: Logo Section (Original Old WordPress Logo Preserved)    */}
          {/* ============================================================== */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none"
              aria-label="RISE International Homepage"
            >
              <img
                src="/images/logo/rise-logo-trimmed.png"
                alt="RISE International"
                className="h-9 sm:h-10 lg:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                width={138}
                height={147}
              />
              <div className="flex flex-col">
                <span className="font-serif font-black text-base sm:text-lg tracking-tight text-primary leading-none">
                  RISE INTL
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] md:text-[9px] font-semibold text-neutral-600 tracking-wider uppercase font-sans whitespace-nowrap mt-0.5">
                  Translating Thoughts Into Actions
                </span>
              </div>
            </Link>
          </div>

          {/* ============================================================== */}
          {/* CENTER: Desktop Navigation (Clean, Refined 14px Typography)   */}
          {/* ============================================================== */}
          <nav
            className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5"
            aria-label="Main Navigation"
          >
            {/* HOME */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-2 2xl:px-2.5 py-1.5 rounded-lg text-[13.5px] 2xl:text-[14px] font-medium leading-[1.2] tracking-[-0.01em] whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-surface-container text-primary font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/70'
                }`
              }
            >
              HOME
            </NavLink>

            {/* ABOUT US Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-2 2xl:px-2.5 py-1.5 rounded-lg text-[13.5px] 2xl:text-[14px] font-medium leading-[1.2] tracking-[-0.01em] whitespace-nowrap transition-colors inline-flex items-center gap-1 ${
                    isActive || location.pathname.startsWith('/about')
                      ? 'bg-surface-container text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/70'
                  }`
                }
                aria-haspopup="true"
                aria-expanded={openDropdown === 'about'}
              >
                <span>ABOUT US</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 ${
                    openDropdown === 'about' ? 'rotate-180' : ''
                  }`}
                />
              </NavLink>

              <AnimatePresence>
                {openDropdown === 'about' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute left-0 top-full pt-2 w-64 z-50"
                  >
                    <div className="bg-white rounded-xl shadow-level-3 p-2 flex flex-col gap-0.5 border border-outline-variant/40">
                      {aboutItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors flex items-start gap-2.5 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary/80 flex-shrink-0 mt-2 group-hover:scale-125 transition-transform" />
                          <div className="flex flex-col">
                            <span className="text-[13.5px] font-medium text-primary group-hover:text-secondary transition-colors">
                              {item.name}
                            </span>
                            {item.desc && (
                              <span className="text-[11px] text-on-surface-variant/80 leading-snug">
                                {item.desc}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* OUR WORK Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('work')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/our-work"
                className={({ isActive }) =>
                  `px-2 2xl:px-2.5 py-1.5 rounded-lg text-[13.5px] 2xl:text-[14px] font-medium leading-[1.2] tracking-[-0.01em] whitespace-nowrap transition-colors inline-flex items-center gap-1 ${
                    isActive || location.pathname.startsWith('/our-work')
                      ? 'bg-surface-container text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/70'
                  }`
                }
                aria-haspopup="true"
                aria-expanded={openDropdown === 'work'}
              >
                <span>OUR WORK</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 ${
                    openDropdown === 'work' ? 'rotate-180' : ''
                  }`}
                />
              </NavLink>

              <AnimatePresence>
                {openDropdown === 'work' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute left-0 top-full pt-2 w-72 z-50"
                  >
                    <div className="bg-white rounded-xl shadow-level-3 p-2 flex flex-col gap-0.5 border border-outline-variant/40">
                      {workItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors flex items-start gap-2.5 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary/80 flex-shrink-0 mt-2 group-hover:scale-125 transition-transform" />
                          <div className="flex flex-col">
                            <span className="text-[13.5px] font-medium text-primary group-hover:text-secondary transition-colors">
                              {item.name}
                            </span>
                            {item.desc && (
                              <span className="text-[11px] text-on-surface-variant/80 leading-snug">
                                {item.desc}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* IMPACT Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('impact')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/impact"
                className={({ isActive }) =>
                  `px-2 2xl:px-2.5 py-1.5 rounded-lg text-[13.5px] 2xl:text-[14px] font-medium leading-[1.2] tracking-[-0.01em] whitespace-nowrap transition-colors inline-flex items-center gap-1 ${
                    isActive || location.pathname.startsWith('/impact')
                      ? 'bg-surface-container text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/70'
                  }`
                }
                aria-haspopup="true"
                aria-expanded={openDropdown === 'impact'}
              >
                <span>IMPACT</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 ${
                    openDropdown === 'impact' ? 'rotate-180' : ''
                  }`}
                />
              </NavLink>

              <AnimatePresence>
                {openDropdown === 'impact' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute left-0 top-full pt-2 w-64 z-50"
                  >
                    <div className="bg-white rounded-xl shadow-level-3 p-2 flex flex-col gap-0.5 border border-outline-variant/40">
                      {impactItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors flex items-start gap-2.5 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary/80 flex-shrink-0 mt-2 group-hover:scale-125 transition-transform" />
                          <div className="flex flex-col">
                            <span className="text-[13.5px] font-medium text-primary group-hover:text-secondary transition-colors">
                              {item.name}
                            </span>
                            {item.desc && (
                              <span className="text-[11px] text-on-surface-variant/80 leading-snug">
                                {item.desc}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GET INVOLVED Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('involved')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/get-involved"
                className={({ isActive }) =>
                  `px-2 2xl:px-2.5 py-1.5 rounded-lg text-[13.5px] 2xl:text-[14px] font-medium leading-[1.2] tracking-[-0.01em] whitespace-nowrap transition-colors inline-flex items-center gap-1 ${
                    isActive || location.pathname.startsWith('/get-involved')
                      ? 'bg-surface-container text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/70'
                  }`
                }
                aria-haspopup="true"
                aria-expanded={openDropdown === 'involved'}
              >
                <span>GET INVOLVED</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 ${
                    openDropdown === 'involved' ? 'rotate-180' : ''
                  }`}
                />
              </NavLink>

              <AnimatePresence>
                {openDropdown === 'involved' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute left-0 top-full pt-2 w-72 z-50"
                  >
                    <div className="bg-white rounded-xl shadow-level-3 p-2 flex flex-col gap-0.5 border border-outline-variant/40">
                      {getInvolvedItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors flex items-start gap-2.5 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary/80 flex-shrink-0 mt-2 group-hover:scale-125 transition-transform" />
                          <div className="flex flex-col">
                            <span className="text-[13.5px] font-medium text-primary group-hover:text-secondary transition-colors">
                              {item.name}
                            </span>
                            {item.desc && (
                              <span className="text-[11px] text-on-surface-variant/80 leading-snug">
                                {item.desc}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* NEWS & STORIES */}
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `px-2 2xl:px-2.5 py-1.5 rounded-lg text-[13.5px] 2xl:text-[14px] font-medium leading-[1.2] tracking-[-0.01em] whitespace-nowrap transition-colors ${
                  isActive || location.pathname.startsWith('/news')
                    ? 'bg-surface-container text-primary font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/70'
                }`
              }
            >
              NEWS &amp; STORIES
            </NavLink>

            {/* CONTACT US */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-2 2xl:px-2.5 py-1.5 rounded-lg text-[13.5px] 2xl:text-[14px] font-medium leading-[1.2] tracking-[-0.01em] whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-surface-container text-primary font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/70'
                }`
              }
            >
              CONTACT US
            </NavLink>
          </nav>

          {/* ============================================================== */}
          {/* RIGHT: Actions (Language Selector + Donate + Mobile Toggle)    */}
          {/* ============================================================== */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Language Selector Dropdown (Desktop) */}
            <div className="relative hidden 2xl:block">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-low text-on-surface text-[12.5px] font-medium hover:bg-surface-container transition-colors border border-outline-variant/30"
                aria-label={`Language selector, current language ${currentLangObj.label}`}
                aria-expanded={langMenuOpen}
              >
                <span className="text-sm leading-none" aria-hidden="true">
                  {currentLangObj.flag}
                </span>
                <span>{currentLangObj.label}</span>
                <ChevronDownIcon className="w-3.5 h-3.5 text-on-surface-variant" />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 2, scale: 0.98 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 top-full pt-1.5 w-36 z-50"
                  >
                    <div className="bg-white rounded-xl shadow-level-3 p-1 border border-outline-variant/40 flex flex-col gap-0.5">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => {
                            setSelectedLang(l.code);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full px-2.5 py-1.5 text-left rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                            selectedLang === l.code
                              ? 'bg-secondary/10 text-secondary font-semibold'
                              : 'text-on-surface hover:bg-surface-container-low'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{l.flag}</span>
                            <span>{l.label}</span>
                          </span>
                          {selectedLang === l.code && (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DONATE Button (Shown on sm: screens and up; on mobile, inside drawer) */}
            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-white text-[13px] font-semibold shadow-xs hover:bg-secondary/90 transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <HeartIcon className="w-3.5 h-3.5 text-white" />
              <span>DONATE</span>
            </Link>

            {/* Mobile / Tablet Hamburger Toggle Button */}
            <button
              ref={hamburgerButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-primary hover:bg-surface-container transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary/40"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* MOBILE / TABLET NAVIGATION DRAWER (Rendered via React Portal)  */}
      {/* ============================================================== */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-[100] xl:hidden">
                {/* Backdrop Blur Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-primary/60 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-hidden="true"
                />

                {/* Slide-in Drawer Container */}
                <motion.div
                  ref={mobileMenuRef}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                  className="fixed top-0 right-0 bottom-0 w-[88vw] max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-hidden z-[101]"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile Navigation"
                >
                  {/* Drawer Top Bar: Brand & Close Button */}
                  <div className="p-4 sm:p-5 flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest">
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <img
                        src="/images/logo/rise-logo-trimmed.png"
                        alt="RISE International"
                        className="h-8 w-auto object-contain"
                      />
                      <div className="flex flex-col">
                        <span className="font-serif font-black text-base text-primary leading-tight">
                          RISE INTL
                        </span>
                        <span className="text-[7.5px] font-semibold text-neutral-600 tracking-wider uppercase font-sans">
                          Translating Thoughts Into Actions
                        </span>
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-xl text-primary hover:bg-surface-container transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary/40"
                      aria-label="Close navigation menu"
                    >
                      <CloseIcon className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Drawer Scrollable Navigation Links */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-1 divide-y divide-outline-variant/20">
                    {/* 1. HOME */}
                    <div className="pb-1">
                      <NavLink
                        to="/"
                        end
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center px-3.5 py-3 rounded-xl text-[16px] font-semibold min-h-[44px] transition-colors ${
                            isActive
                              ? 'bg-secondary text-white'
                              : 'text-primary hover:bg-surface-container-low'
                          }`
                        }
                      >
                        HOME
                      </NavLink>
                    </div>

                    {/* 2. ABOUT US Accordion */}
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => toggleMobileSection('about')}
                        className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-[16px] font-semibold text-primary hover:bg-surface-container-low min-h-[44px] transition-colors"
                        aria-expanded={mobileOpenSection === 'about'}
                      >
                        <span>ABOUT US</span>
                        <ChevronDownIcon
                          className={`w-4 h-4 text-on-surface-variant transition-transform duration-200 ${
                            mobileOpenSection === 'about' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileOpenSection === 'about' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 pr-1 flex flex-col gap-1 pb-2"
                          >
                            {aboutItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14.5px] font-medium text-on-surface hover:text-secondary hover:bg-surface-container-low min-h-[44px] transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 3. OUR WORK Accordion */}
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => toggleMobileSection('work')}
                        className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-[16px] font-semibold text-primary hover:bg-surface-container-low min-h-[44px] transition-colors"
                        aria-expanded={mobileOpenSection === 'work'}
                      >
                        <span>OUR WORK</span>
                        <ChevronDownIcon
                          className={`w-4 h-4 text-on-surface-variant transition-transform duration-200 ${
                            mobileOpenSection === 'work' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileOpenSection === 'work' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 pr-1 flex flex-col gap-1 pb-2"
                          >
                            {workItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14.5px] font-medium text-on-surface hover:text-secondary hover:bg-surface-container-low min-h-[44px] transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 4. IMPACT Accordion */}
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => toggleMobileSection('impact')}
                        className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-[16px] font-semibold text-primary hover:bg-surface-container-low min-h-[44px] transition-colors"
                        aria-expanded={mobileOpenSection === 'impact'}
                      >
                        <span>IMPACT</span>
                        <ChevronDownIcon
                          className={`w-4 h-4 text-on-surface-variant transition-transform duration-200 ${
                            mobileOpenSection === 'impact' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileOpenSection === 'impact' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 pr-1 flex flex-col gap-1 pb-2"
                          >
                            {impactItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14.5px] font-medium text-on-surface hover:text-secondary hover:bg-surface-container-low min-h-[44px] transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 5. GET INVOLVED Accordion */}
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => toggleMobileSection('involved')}
                        className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-[16px] font-semibold text-primary hover:bg-surface-container-low min-h-[44px] transition-colors"
                        aria-expanded={mobileOpenSection === 'involved'}
                      >
                        <span>GET INVOLVED</span>
                        <ChevronDownIcon
                          className={`w-4 h-4 text-on-surface-variant transition-transform duration-200 ${
                            mobileOpenSection === 'involved' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileOpenSection === 'involved' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 pr-1 flex flex-col gap-1 pb-2"
                          >
                            {getInvolvedItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14.5px] font-medium text-on-surface hover:text-secondary hover:bg-surface-container-low min-h-[44px] transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 6. NEWS & STORIES */}
                    <div className="py-1">
                      <NavLink
                        to="/news"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center px-3.5 py-3 rounded-xl text-[16px] font-semibold min-h-[44px] transition-colors ${
                            isActive
                              ? 'bg-secondary text-white'
                              : 'text-primary hover:bg-surface-container-low'
                          }`
                        }
                      >
                        NEWS &amp; STORIES
                      </NavLink>
                    </div>

                    {/* 7. CONTACT US */}
                    <div className="py-1">
                      <NavLink
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center px-3.5 py-3 rounded-xl text-[16px] font-semibold min-h-[44px] transition-colors ${
                            isActive
                              ? 'bg-secondary text-white'
                              : 'text-primary hover:bg-surface-container-low'
                          }`
                        }
                      >
                        CONTACT US
                      </NavLink>
                    </div>
                  </div>

                  {/* Drawer Bottom: Language Selector + Full Width Donate + Direct Contact */}
                  <div className="p-4 sm:p-5 border-t border-outline-variant/30 bg-surface-container-lowest flex flex-col gap-3">
                    {/* Mobile Language Switcher */}
                    <div className="flex items-center justify-between px-2 py-1 bg-surface-container-low rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider pl-2">
                        Language
                      </span>
                      <div className="flex items-center gap-1">
                        {languages.map((l) => (
                          <button
                            key={l.code}
                            type="button"
                            onClick={() => setSelectedLang(l.code)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                              selectedLang === l.code
                                ? 'bg-white shadow-xs text-secondary font-bold'
                                : 'text-on-surface-variant hover:text-primary'
                            }`}
                          >
                            {l.flag} {l.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/donate"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3.5 rounded-xl bg-secondary text-white text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:bg-secondary/90 transition-all min-h-[44px]"
                    >
                      <HeartIcon className="w-5 h-5 text-white" />
                      <span>DONATE NOW</span>
                    </Link>

                    <div className="text-center text-xs text-on-surface-variant pt-1">
                      <span>Direct Hotline: </span>
                      <a href="tel:+4915206777889" className="font-semibold text-primary hover:underline">
                        +49 1520-6777889
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
