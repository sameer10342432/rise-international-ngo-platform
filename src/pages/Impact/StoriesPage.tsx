import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { storiesData } from '../../data/stories';

export const StoriesPage: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <SEO
        title="Impact Stories & Community Dispatches | RISE International"
        description="Read transparent field narratives illustrating community challenges, collaborative local approaches, and sustainable development outcomes."
        canonical="/impact/stories"
        ogImage="/images/rise-stories-hero.webp"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Impact', item: '/impact' },
          { name: 'Stories of Change', item: '/impact/stories' },
        ]}
      />

      {/* Header */}
      <section className="bg-primary text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-stories-hero.webp"
            alt="Community members gathering under a village tree sharing oral histories and documenting grassroots development milestones"
            className="w-full h-full object-cover opacity-25"
            loading="eager"
            width={1344}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/90 to-primary/80" />
        </div>
        <div className="max-w-content mx-auto px-6 lg:px-12 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Impact', path: '/impact' },
              { label: 'Stories of Change' },
            ]}
          />
          <div className="max-w-3xl mt-6">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
              Field Documentation
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
              Stories of Community Resilience &amp; Change
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Transparent dispatches documenting local challenges, participatory approaches, and community outcomes. Every narrative adheres to our strict principles of human dignity and verified transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Content Verification Notice */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-10">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs text-amber-900">
          <span className="material-symbols-outlined text-amber-600 text-base mt-0.5">verified_user</span>
          <div>
            <span className="font-bold">Editorial &amp; Verification Standard:</span> RISE International adheres to strict non-fabrication policies. Case studies reflect genuine community frameworks. Personal names and identifying specifics are anonymized to protect community privacy, and ongoing stories are subject to field audit before final publication.
          </div>
        </div>
      </div>

      {/* Stories Listing */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 space-y-12">
        {storiesData.map((story) => (
          <article
            key={story.id}
            id={story.slug}
            className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm scroll-mt-28"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                {story.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {story.publishedAt} • {story.location}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mb-4">
              {story.title}
            </h2>

            <div className="my-6 rounded-xl overflow-hidden shadow-sm max-h-[420px] bg-slate-100 border border-slate-200">
              <img
                src={story.image}
                alt={story.altText}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {story.quote && (
              <blockquote className="my-6 p-5 rounded-xl bg-emerald-50/70 border-l-4 border-emerald-600 text-slate-800 font-medium italic text-base leading-relaxed">
                "{story.quote}"
              </blockquote>
            )}

            {/* Story Paragraphs */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {story.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Context & Metadata Footer */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div>
                <span className="font-bold text-slate-900 block">Focus Group / Community:</span>
                <span>{story.beneficiary}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Reported By:</span>
                <span>{story.author}</span>
              </div>
              {story.metrics && (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-50 font-semibold text-emerald-800 border border-emerald-200">
                  {story.metrics}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <Link
                to="/donate"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Support This Work
              </Link>
              <Link
                to="/our-work"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Learn About Our Programmes
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
