import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { teamData } from '../../data/team';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="About RISE International | Our Mission &amp; Vision"
        description="Learn about RISE International, our global history, mission to empower vulnerable communities, and our localized grassroots team."
      />

      {/* Hero Banner */}
      <section className="bg-primary-container text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/community-woman-harvest.png"
            alt="RISE humanitarian field presence"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 text-center">
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            WHO WE ARE
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 max-w-3xl mx-auto">
            Empowering Communities. Transforming Lives.
          </h1>
          <p className="font-body-xl text-lg sm:text-xl text-surface-container-high/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            Founded with an uncompromising belief in human dignity, RISE International delivers localized education, renewable water infrastructure, and sustainable emergency relief worldwide.
          </p>
        </div>
      </section>

      {/* Subpage Nav Pills */}
      <section className="bg-surface-container-low border-b border-outline-variant/30 py-4">
        <div className="max-w-content mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Link to="/about" className="px-4 py-2 rounded-full bg-secondary text-white font-label-md font-bold text-sm shadow-sm">
            Overview
          </Link>
          <Link to="/about/our-story" className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-sm transition-colors">
            Our Story
          </Link>
          <Link to="/about/mission-vision" className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-sm transition-colors">
            Mission &amp; Vision
          </Link>
          <Link to="/about/values" className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-sm transition-colors">
            Our Values
          </Link>
          <Link to="/about/team" className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-sm transition-colors">
            Our Team
          </Link>
        </div>
      </section>

      {/* Story & Introduction */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              ORGANISATION INTRODUCTION
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold mt-2">
              From Grassroots Vision to Global Movement
            </h2>
            <p className="font-body-lg text-on-surface-variant mt-4 leading-relaxed">
              RISE International was founded by humanitarian engineers, frontline physicians, and educators who recognized that traditional aid too often creates cycles of dependency. 
            </p>
            <p className="font-body-md text-on-surface-variant mt-4 leading-relaxed">
              Our model centers on <strong>co-development</strong>: we only enter communities upon formal invitation from local councils, and every borehole, school clinic, and farming cooperative is designed from day one to be owned, maintained, and operated by local residents.
            </p>
            <div className="pt-6">
              <Link
                to="/about/our-story"
                className="inline-flex items-center gap-2 text-secondary font-label-lg font-bold hover:gap-3 transition-all"
              >
                <span>Read the Full Founding Story</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-level-2 border border-outline-variant/30">
              <img
                src="/images/classroom-children-education.png"
                alt="RISE humanitarian educational program in session"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Overview */}
      <section className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-surface-container-lowest shadow-level-1 border border-outline-variant/30">
              <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[28px]">flag</span>
              </div>
              <h3 className="font-headline-md text-2xl text-primary font-bold mb-3">Our Mission</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                To uplift vulnerable families and end generational poverty by providing dignified educational environments, climate-resilient water infrastructure, rapid emergency relief, and scalable economic cooperatives.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface-container-lowest shadow-level-1 border border-outline-variant/30">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[28px]">visibility</span>
              </div>
              <h3 className="font-headline-md text-2xl text-primary font-bold mb-3">Our Vision</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                A world where every human being, regardless of regional birth or socioeconomic condition, possesses the tools, health, and freedom to thrive in a resilient, self-governing community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              GOVERNANCE &amp; STEWARDSHIP
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold mt-2">
              Our Leadership Team
            </h2>
          </div>
          <Link
            to="/about/team"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary font-label-md font-bold transition-colors"
          >
            <span>Meet All Team Members</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-level-1 border border-outline-variant/30 p-6 flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-container text-white flex items-center justify-center font-bold text-xl mb-4">
                {member.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="font-headline-sm text-lg text-primary font-bold">{member.name}</h3>
              <span className="font-label-sm text-secondary font-bold text-xs uppercase tracking-wider mt-0.5">
                {member.role}
              </span>
              <p className="font-body-sm text-on-surface-variant text-sm mt-3 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
