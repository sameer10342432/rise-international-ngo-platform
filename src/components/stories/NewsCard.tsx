import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../../types';

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-level-1 hover:shadow-level-3 transition-all duration-300 flex flex-col justify-between border border-outline-variant/30">
      <div className="p-7 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm font-bold border border-secondary/20">
            {article.category}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
            {article.publishedAt}
          </span>
        </div>

        <h3 className="font-headline-sm text-headline-sm text-primary font-bold hover:text-secondary transition-colors">
          <Link to={`/news/${article.slug}`}>{article.title}</Link>
        </h3>

        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
      </div>

      <div className="px-7 pb-7 pt-2">
        <Link
          to={`/news/${article.slug}`}
          className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md hover:gap-3 transition-all font-bold"
        >
          <span>Read More</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
};
