import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center py-20 px-6">
      <SEO
        title="Page Not Found | RISE International"
        description="The page you are looking for may have moved or no longer exists."
        noindex={true}
      />

      <div className="text-center max-w-lg mx-auto flex flex-col items-center">
        <div className="w-20 h-20 rounded-3xl bg-secondary/15 text-secondary flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[48px]">travel_explore</span>
        </div>
        <span className="text-sm font-bold uppercase tracking-wider text-secondary">
          Error 404
        </span>
        <h1 className="font-headline-xl text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-3">
          Page Not Found
        </h1>
        <p className="font-body-lg text-on-surface-variant mb-8 leading-relaxed">
          The page you are looking for may have moved or no longer exists.
        </p>
        <Link
          to="/"
          className="px-8 py-3.5 rounded-xl bg-secondary text-white font-label-lg font-bold shadow-md hover:bg-secondary/90 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span>BACK TO HOME</span>
        </Link>
      </div>
    </div>
  );
};
