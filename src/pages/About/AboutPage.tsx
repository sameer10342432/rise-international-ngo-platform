import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

const valuesList = [
  {
    title: "People First",
    explanation: "We place the well-being, rights, and potential of community members at the centre of every decision and action.",
    icon: "person_heart",
  },
  {
    title: "Dignity & Respect",
    explanation: "We honour local cultures, customs, and knowledge, ensuring that all programmes support self-determination without condescension.",
    icon: "sentiment_satisfied",
  },
  {
    title: "Integrity",
    explanation: "We act with honesty, fairness, and uncompromising ethical standards in all our relationships and operations.",
    icon: "gavel",
  },
  {
    title: "Collaboration",
    explanation: "We believe lasting transformation happens when communities, local authorities, and partners unite around shared goals.",
    icon: "groups",
  },
  {
    title: "Sustainability",
    explanation: "We design programmes and infrastructure to be ecologically sound and independently maintainable by communities over the long term.",
    icon: "eco",
  },
  {
    title: "Accountability",
    explanation: "We are responsible stewards of resources, providing clear, open, and verifiable information to supporters and communities alike.",
    icon: "verified",
  },
  {
    title: "Learning & Improvement",
    explanation: "We continuously evaluate our work, listen to feedback from community participants, and refine our approach for maximum impact.",
    icon: "auto_stories",
  },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <SEO
        title="About RISE International | International Nonprofit Organisation"
        description="Learn about RISE International, an international nonprofit organisation dedicated to community development, humanitarian support, education, and economic empowerment."
        canonical="https://riseintl.org/about"
        ogImage="/images/rise-about-hero-leadership.webp"
        breadcrumbs={[
          { name: "Home", item: "https://riseintl.org/" },
          { name: "About Us", item: "https://riseintl.org/about" },
        ]}
      />

      {/* Hero Banner */}
      <section className="bg-primary-container text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-about-hero-leadership.webp"
            alt="RISE International executive team and community facilitators reviewing regional strategy plans"
            className="w-full h-full object-cover object-center opacity-25"
            loading="eager"
            width={1344}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/90 to-primary-container/60" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "About Us" }]} className="text-white/80" />
          </div>

          <div className="max-w-3xl">
            <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
              ABOUT RISE INTERNATIONAL
            </span>
            <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 leading-tight">
              Empowering Communities. Transforming Lives.
            </h1>
            <p className="font-body-xl text-lg sm:text-xl text-surface-container-high/90 mt-4 leading-relaxed">
              RISE International is an international nonprofit organisation committed to sustainable community development, educational access, humanitarian support, and economic empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* Subpage Nav Links */}
      <section className="bg-surface-container-low border-b border-outline-variant/30 py-4">
        <div className="max-w-content mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Link to="/about" className="px-5 py-2 rounded-full bg-secondary text-white font-label-md font-bold text-sm shadow-sm">
            Overview
          </Link>
          <Link to="/about/our-story" className="px-5 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-sm transition-colors font-medium">
            Our Story
          </Link>
          <Link to="/about/mission-vision" className="px-5 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-sm transition-colors font-medium">
            Mission &amp; Vision
          </Link>
          <Link to="/about/values" className="px-5 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-sm transition-colors font-medium">
            Our Values
          </Link>
          <Link to="/about/team" className="px-5 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-sm transition-colors font-medium">
            Governance &amp; Stewardship
          </Link>
        </div>
      </section>

      {/* Section 1: Who We Are */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              WHO WE ARE
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-primary font-bold">
              A People-Centred International Nonprofit
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              RISE International was established on the fundamental conviction that every individual and community possesses the potential to build a thriving, dignified future when given equitable access to resources, knowledge, and opportunities.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              We collaborate with community leaders, grassroots groups, and local organisations across four core pillars: Education, Community Development, Humanitarian Aid, and Economic Empowerment. Our work is guided by deep respect for community ownership and an unwavering dedication to sustainable change.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-level-2 border border-outline-variant/30">
              <img
                src="/images/rise-about-approach-partnership.webp"
                alt="Community leaders and facilitators collaborating on local initiatives"
                className="w-full h-[380px] object-cover"
                loading="lazy"
                width={1024}
                height={768}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Story (General Overview & CMS-Editable) */}
      <section className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              OUR STORY
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-primary font-bold mt-2">
              Driven by Community Collaboration
            </h2>
            <p className="font-body-lg text-on-surface-variant mt-4 leading-relaxed">
              RISE International developed out of a shared realization that conventional aid initiatives frequently deliver short-term remedies without fostering lasting community resilience. By centering communities as the primary authors of their own progress, we support initiatives that are locally led and independently sustained.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 text-xs text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">info</span>
              <span>Note: Detailed historical milestones and archival narratives are editable via the organisation CMS.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sections 3 & 4: Our Mission and Our Vision */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-surface-container-lowest shadow-level-1 border border-outline-variant/30 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[28px]">flag</span>
            </div>
            <span className="font-label-sm text-secondary font-bold uppercase tracking-wider mb-2">PURPOSE &amp; COMMITMENT</span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold mb-4">Our Mission</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              RISE International works to empower communities, expand educational opportunities, provide compassionate humanitarian relief, and foster sustainable development through collaborative, people-centred partnerships that uphold human dignity.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-surface-container-lowest shadow-level-1 border border-outline-variant/30 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[28px]">visibility</span>
            </div>
            <span className="font-label-sm text-primary font-bold uppercase tracking-wider mb-2">FUTURE ASPIRATION</span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold mb-4">Our Vision</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              A future where communities have the opportunities, resources, and support needed to thrive with dignity, resilience, and lasting independence.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Our Values */}
      <section className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              GUIDING PRINCIPLES
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-primary font-bold mt-2">
              Our Core Values
            </h2>
            <p className="font-body-md text-on-surface-variant mt-3">
              These seven commitments guide how we interact with communities, partners, and supporters every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesList.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-level-1 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-[22px]">{val.icon}</span>
                </div>
                <h3 className="font-headline-sm text-xl text-primary font-bold mb-2">{val.title}</h3>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">{val.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Our Approach & Section 7: Why Our Work Matters */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              METHODOLOGY
            </span>
            <h2 className="font-headline-xl text-3xl text-primary font-bold mt-2 mb-4">
              Our Approach: Co-Development in Practice
            </h2>
            <div className="space-y-4 text-on-surface-variant font-body-md leading-relaxed">
              <p>
                We do not implement standardized top-down models. Instead, we initiate programmes through structured dialogue with local elders, educators, and grassroots associations.
              </p>
              <p>
                Every project incorporates comprehensive local capacity building. From water maintenance committees to teacher mentorship circles, community members possess complete operational stewardship from day one.
              </p>
            </div>
          </div>

          <div>
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              PURPOSE &amp; IMPACT
            </span>
            <h2 className="font-headline-xl text-3xl text-primary font-bold mt-2 mb-4">
              Why Our Work Matters
            </h2>
            <div className="space-y-4 text-on-surface-variant font-body-md leading-relaxed">
              <p>
                Poverty, limited educational opportunities, and environmental vulnerabilities do not resolve through temporary handouts. They require enduring investments in human potential, sustainable infrastructure, and economic self-reliance.
              </p>
              <p>
                By equipping communities with essential learning spaces, dependable clean water, and practical vocational skills, we help create conditions where future generations can flourish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: How We Work With Communities */}
      <section className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              PARTNERSHIP ROADMAP
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-primary font-bold mt-2">
              How We Work With Communities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
              <span className="font-display-hero text-3xl font-extrabold text-secondary block mb-2">01</span>
              <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Invitation &amp; Listening</h3>
              <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed">
                We engage upon community invitation, conducting participatory consultations to understand self-identified priorities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
              <span className="font-display-hero text-3xl font-extrabold text-secondary block mb-2">02</span>
              <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Collaborative Design</h3>
              <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed">
                Programmes are co-created with local stakeholders, integrating traditional wisdom with modern technical tools.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
              <span className="font-display-hero text-3xl font-extrabold text-secondary block mb-2">03</span>
              <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Capacity Building</h3>
              <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed">
                Local participants receive training in technical maintenance, pedagogical skills, and collective governance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
              <span className="font-display-hero text-3xl font-extrabold text-secondary block mb-2">04</span>
              <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Local Stewardship</h3>
              <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed">
                Communities assume full autonomy, maintaining infrastructure and guiding incoming initiatives independently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Get Involved CTA */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20 text-center">
        <div className="bg-primary rounded-3xl p-10 sm:p-16 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold mb-2">
              JOIN OUR EFFORTS
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl font-bold mb-4">
              Be Part of Sustainable Transformation
            </h2>
            <p className="font-body-lg text-surface-container-high/90 mb-8 leading-relaxed">
              Whether you choose to contribute financially, volunteer your skills, or partner with us, your involvement helps strengthen communities worldwide.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/donate"
                className="px-8 py-3.5 rounded-xl bg-secondary text-white font-label-lg font-bold hover:bg-secondary/90 transition-all shadow-md"
              >
                Donate Now
              </Link>
              <Link
                to="/volunteer"
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label-lg font-bold transition-all border border-white/20"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
