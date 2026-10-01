import React from 'react';
import { SEO } from '../../components/common/SEO';
import { storiesData } from '../../data/stories';

export const StoriesPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Stories of Change | Field Dispatches | RISE International"
        description="Inspiring first-hand accounts and community transformation journeys across our global education, water, and relief initiatives."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20 text-center">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            FIELD DISPATCHES
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold mt-2">
            Stories of Change
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            Real voices, personal perseverance, and community-led progress from the ground.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-20 space-y-16">
        {storiesData.map((story) => (
          <article
            key={story.id}
            id={story.slug}
            className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-level-1 scroll-mt-28"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="px-3.5 py-1 rounded-full bg-secondary/15 text-secondary font-label-sm font-bold text-xs uppercase">
                {story.category}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                {story.publishedAt} • {story.location}
              </span>
            </div>

            <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary mb-4">
              {story.title}
            </h2>

            <div className="my-6 rounded-2xl overflow-hidden shadow-level-2 max-h-[420px]">
              <img
                src={story.image}
                alt={story.altText}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {story.quote && (
              <blockquote className="my-6 p-6 rounded-2xl bg-surface-container-low border-l-4 border-secondary text-primary font-medium italic text-lg leading-relaxed">
                {story.quote}
              </blockquote>
            )}

            <div className="space-y-4 text-on-surface-variant font-body-md leading-relaxed">
              {story.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-4 text-xs text-on-surface-variant">
              <div>
                <span className="font-bold text-primary block">Beneficiary:</span>
                <span>{story.beneficiary}</span>
              </div>
              <div>
                <span className="font-bold text-primary block">Reported By:</span>
                <span>{story.author}</span>
              </div>
              {story.metrics && (
                <div className="px-3 py-1.5 rounded-lg bg-surface-container font-semibold text-secondary">
                  {story.metrics}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
