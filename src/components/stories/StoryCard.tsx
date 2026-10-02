import React from 'react';
import { Link } from 'react-router-dom';
import { Story } from '../../types';

interface StoryCardProps {
  story: Story;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <article className="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-level-1 hover:shadow-level-3 transition-all duration-300 hover:-translate-y-1 border border-outline-variant/30">
      <div className="h-60 overflow-hidden relative bg-surface-container">
        <img
          src={story.image}
          alt={story.altText}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={1024}
          height={768}
        />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-sm">
          {story.category}
        </span>
      </div>

      <div className="p-7 flex flex-col flex-1 justify-between gap-4">
        <div>
          <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
            {story.publishedAt} • {story.location}
          </span>
          <h3 className="font-headline-sm text-headline-sm text-primary mt-2 mb-3 font-bold hover:text-secondary transition-colors">
            {story.title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
            {story.excerpt}
          </p>
        </div>

        <Link
          to={`/impact/stories#${story.slug}`}
          className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md hover:gap-3 transition-all pt-2 font-bold"
        >
          <span>Read Story</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
};
