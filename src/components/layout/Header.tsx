import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export const Header: React.FC = () => {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu and dropdowns upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
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
        hamburgerButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur-xl shadow-[0_1px_12px_rgba(11,33,69,0.08)] py-0'
          : 'bg-surface/90 backdrop-blur-md py-1'
      }`}
    >
      <div className="h-20 max-w-content mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 group focus:outline-none" aria-label="RISE International Home">
            <img
              src="/images/rise-logo.svg"
              alt="RISE International Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 font-label-md text-label-md rounded-lg transition-colors ${
                isActive
                  ? 'bg-surface-container text-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
              }`
            }
          >
            HOME
          </NavLink>

          {/* ABOUT US Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setOpenDropdown('about')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 font-label-md text-label-md rounded-lg transition-colors inline-flex items-center gap-1 ${
                  isActive || location.pathname.startsWith('/about')
                    ? 'bg-surface-container text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                }`
              }
              aria-haspopup="true"
              aria-expanded={openDropdown === 'about'}
            >
              <span>ABOUT US</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </NavLink>
            <div
              className={`absolute left-0 top-full pt-2 w-56 transition-all duration-200 ${
                openDropdown === 'about' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="bg-surface-container-lowest rounded-xl shadow-level-3 p-2 flex flex-col gap-1 border border-outline-variant/40">
                <Link
                  to="/about/our-story"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors"
                >
                  Our Story
                </Link>
                <Link
                  to="/about/mission-vision"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors"
                >
                  Mission &amp; Vision
                </Link>
                <Link
                  to="/about/values"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors"
                >
                  Our Values
                </Link>
                <Link
                  to="/about/team"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors"
                >
                  Our Team
                </Link>
              </div>
            </div>
          </div>

          {/* OUR WORK Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setOpenDropdown('work')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <NavLink
              to="/our-work"
              className={({ isActive }) =>
                `px-3 py-2 font-label-md text-label-md rounded-lg transition-colors inline-flex items-center gap-1 ${
                  isActive || location.pathname.startsWith('/our-work')
                    ? 'bg-surface-container text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                }`
              }
              aria-haspopup="true"
              aria-expanded={openDropdown === 'work'}
            >
              <span>OUR WORK</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </NavLink>
            <div
              className={`absolute left-0 top-full pt-2 w-64 transition-all duration-200 ${
                openDropdown === 'work' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="bg-surface-container-lowest rounded-xl shadow-level-3 p-2 flex flex-col gap-1 border border-outline-variant/40">
                <Link
                  to="/our-work/education"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">school</span>
                  <span>Education</span>
                </Link>
                <Link
                  to="/our-work/community-development"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">solar_power</span>
                  <span>Community Development</span>
                </Link>
                <Link
                  to="/our-work/humanitarian-aid"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">health_and_safety</span>
                  <span>Humanitarian Aid</span>
                </Link>
                <Link
                  to="/our-work/economic-empowerment"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">monetization_on</span>
                  <span>Economic Empowerment</span>
                </Link>
              </div>
            </div>
          </div>

          {/* IMPACT Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setOpenDropdown('impact')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <NavLink
              to="/impact"
              className={({ isActive }) =>
                `px-3 py-2 font-label-md text-label-md rounded-lg transition-colors inline-flex items-center gap-1 ${
                  isActive || location.pathname.startsWith('/impact')
                    ? 'bg-surface-container text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                }`
              }
              aria-haspopup="true"
              aria-expanded={openDropdown === 'impact'}
            >
              <span>IMPACT</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </NavLink>
            <div
              className={`absolute left-0 top-full pt-2 w-56 transition-all duration-200 ${
                openDropdown === 'impact' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="bg-surface-container-lowest rounded-xl shadow-level-3 p-2 flex flex-col gap-1 border border-outline-variant/40">
                <Link
                  to="/impact"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors"
                >
                  Impact Overview
                </Link>
                <Link
                  to="/impact/stories"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors"
                >
                  Stories of Change
                </Link>
                <Link
                  to="/impact/report"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors"
                >
                  Annual Report
                </Link>
              </div>
            </div>
          </div>

          {/* GET INVOLVED Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setOpenDropdown('involved')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <NavLink
              to="/get-involved"
              className={({ isActive }) =>
                `px-3 py-2 font-label-md text-label-md rounded-lg transition-colors inline-flex items-center gap-1 ${
                  isActive || location.pathname.startsWith('/get-involved')
                    ? 'bg-surface-container text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                }`
              }
              aria-haspopup="true"
              aria-expanded={openDropdown === 'involved'}
            >
              <span>GET INVOLVED</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </NavLink>
            <div
              className={`absolute left-0 top-full pt-2 w-60 transition-all duration-200 ${
                openDropdown === 'involved' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="bg-surface-container-lowest rounded-xl shadow-level-3 p-2 flex flex-col gap-1 border border-outline-variant/40">
                <Link
                  to="/donate"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">favorite</span>
                  <span>Donate</span>
                </Link>
                <Link
                  to="/get-involved/sponsor-a-child"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">child_care</span>
                  <span>Sponsor a Child</span>
                </Link>
                <Link
                  to="/volunteer"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">how_to_reg</span>
                  <span>Volunteer</span>
                </Link>
                <Link
                  to="/get-involved/partner"
                  className="px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">handshake</span>
                  <span>Partner With Us</span>
                </Link>
              </div>
            </div>
          </div>

          <NavLink
            to="/news"
            className={({ isActive }) =>
              `px-3 py-2 font-label-md text-label-md rounded-lg transition-colors ${
                isActive
                  ? 'bg-surface-container text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
              }`
            }
          >
            NEWS &amp; STORIES
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3 py-2 font-label-md text-label-md rounded-lg transition-colors ${
                isActive
                  ? 'bg-surface-container text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
              }`
            }
          >
            CONTACT US
          </NavLink>
        </nav>

        {/* Right Action Section */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors"
            aria-label="Language selector, current language English"
          >
            <span className="text-sm leading-none" aria-hidden="true">🇬🇧</span>
            <span>English</span>
          </button>

          <Link
            to="/donate"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-[10px] bg-secondary text-white font-label-lg text-label-lg shadow-sm hover:bg-secondary/90 transition-all hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            <span className="whitespace-nowrap">DONATE NOW</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            ref={hamburgerButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-primary hover:bg-surface-container transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-[28px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-on-surface/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            ref={mobileMenuRef}
            className="h-[calc(100vh-5rem)] w-full max-w-sm ml-auto bg-surface-container-lowest p-6 shadow-2xl overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-label-lg text-label-lg transition-colors ${
                    isActive ? 'bg-secondary text-white font-bold' : 'text-primary hover:bg-surface-container'
                  }`
                }
              >
                HOME
              </NavLink>

              <div className="py-1">
                <span className="px-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">About Us</span>
                <div className="mt-1 flex flex-col pl-3">
                  <Link to="/about" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Overview</Link>
                  <Link to="/about/our-story" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Our Story</Link>
                  <Link to="/about/mission-vision" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Mission &amp; Vision</Link>
                  <Link to="/about/values" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Our Values</Link>
                  <Link to="/about/team" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Our Team</Link>
                </div>
              </div>

              <div className="py-1">
                <span className="px-4 text-xs font-bold uppercase tracking-wider text-secondary">Our Work</span>
                <div className="mt-1 flex flex-col pl-3">
                  <Link to="/our-work" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">All Programmes</Link>
                  <Link to="/our-work/education" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Education</Link>
                  <Link to="/our-work/community-development" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Community Development</Link>
                  <Link to="/our-work/humanitarian-aid" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Humanitarian Aid</Link>
                  <Link to="/our-work/economic-empowerment" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Economic Empowerment</Link>
                </div>
              </div>

              <div className="py-1">
                <span className="px-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Impact</span>
                <div className="mt-1 flex flex-col pl-3">
                  <Link to="/impact" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Impact Overview</Link>
                  <Link to="/impact/stories" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Stories of Change</Link>
                  <Link to="/impact/report" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Annual Report</Link>
                </div>
              </div>

              <div className="py-1">
                <span className="px-4 text-xs font-bold uppercase tracking-wider text-secondary">Get Involved</span>
                <div className="mt-1 flex flex-col pl-3">
                  <Link to="/donate" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Donate</Link>
                  <Link to="/get-involved/sponsor-a-child" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Sponsor a Child</Link>
                  <Link to="/volunteer" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Volunteer</Link>
                  <Link to="/get-involved/partner" className="px-3 py-2 text-on-surface hover:text-secondary rounded-lg font-medium text-sm">Partner With Us</Link>
                </div>
              </div>

              <NavLink
                to="/news"
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl font-label-lg text-label-lg transition-colors ${
                    isActive ? 'bg-secondary text-white font-bold' : 'text-primary hover:bg-surface-container'
                  }`
                }
              >
                NEWS &amp; STORIES
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl font-label-lg text-label-lg transition-colors ${
                    isActive ? 'bg-secondary text-white font-bold' : 'text-primary hover:bg-surface-container'
                  }`
                }
              >
                CONTACT US
              </NavLink>
            </div>

            <div className="pt-6 border-t border-outline-variant/30 flex flex-col gap-3">
              <Link
                to="/donate"
                className="w-full py-3.5 rounded-xl bg-secondary text-white text-center font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                <span>DONATE NOW</span>
              </Link>
              <div className="text-center text-xs text-on-surface-variant">
                <span>Direct Line: +49 1520-6777889</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
