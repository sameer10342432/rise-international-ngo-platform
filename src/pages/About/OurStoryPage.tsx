import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Our Story | RISE International"
        description="The history and founding journey of RISE International, empowering communities through grassroots development since inception."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20">
        <div className="max-w-content mx-auto px-6 lg:px-12 text-center">
          <Link to="/about" className="inline-flex items-center gap-1.5 text-secondary-fixed font-label-md text-sm mb-3 hover:underline">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>About Us</span>
          </Link>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold text-white">
            Our Story &amp; Origins
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            How a commitment to genuine community partnership grew into an international humanitarian initiative.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose max-w-none space-y-6 text-on-surface-variant font-body-lg leading-relaxed">
          <p className="text-xl text-primary font-medium">
            RISE International emerged from a direct field realization: humanitarian aid is only as enduring as the community capacity built to sustain it.
          </p>
          <p>
            In the early 2010s, our founding team observed countless non-profit projects that fell silent shortly after ribbon-cutting ceremonies: boreholes with broken mechanical seals, empty solar clinics lacking technicians, and schools without curricula.
          </p>
          <div className="my-8 rounded-2xl overflow-hidden shadow-level-2 border border-outline-variant/30">
            <img
              src="/images/rise-about-story-grassroots.webp"
              alt="Grassroots community assembly in an open-air village pavilion with local elders and youth discussing priorities"
              className="w-full h-80 object-cover"
              loading="lazy"
              width={1024}
              height={768}
            />
          </div>
          <h2 className="font-headline-md text-2xl text-primary font-bold mt-8">
            The RISE Protocol: Co-Design &amp; Autonomy
          </h2>
          <p>
            We resolved to do things differently. We instituted the <em>RISE Protocol</em>: a covenant that no project is greenlit without formal partnership with indigenous community elders, women's cooperatives, and local professionals.
          </p>
          <p>
            Today, RISE International supports active educational centers, solar water networks, and mobile clinic units across more than 25 nations. Over 98% of our field staff and technical coordinators are residents of the communities they serve.
          </p>
          <div className="pt-8 border-t border-outline-variant/30 flex items-center justify-between">
            <Link to="/about/mission-vision" className="text-secondary font-bold inline-flex items-center gap-2">
              <span>Next: Mission &amp; Vision</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link to="/donate" className="px-5 py-2.5 rounded-xl bg-secondary text-white font-label-md font-bold">
              Support Our Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
