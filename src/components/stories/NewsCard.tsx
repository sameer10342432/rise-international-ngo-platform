import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../../types';

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-level-1 hover:shadow-level-3 transition-all duration-300 flex flex-col justify-between border border-outline-variant/30">
      <div className="h-48 sm:h-52 overflow-hidden relative bg-surface-container">
        <img
          src={article.image}
          alt={article.altText}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={1024}
          height={768}
        />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-sm">
          {article.category}
        </span>
      </div>

      <div className="p-7 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
            {article.publishedAt}
          </span>
          <span className="text-xs text-on-surface-variant font-medium">
            {article.readTime}
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
