import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../../types';

interface ArticleLayoutProps {
  article: NewsArticle;
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ article }) => {
  return (
    <article className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
      <Link
        to="/news"
        className="inline-flex items-center gap-1.5 text-secondary font-label-md font-bold text-sm mb-6 hover:underline"
      >
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        <span>Back to All News &amp; Stories</span>
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary font-label-sm font-bold text-xs uppercase">
            {article.category}
          </span>
          <span className="text-xs text-on-surface-variant font-medium">
            {article.publishedAt} • {article.readTime}
          </span>
        </div>

        <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 mt-4 text-sm text-on-surface-variant">
          <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
            RI
          </div>
          <span>By <strong>{article.author}</strong></span>
        </div>
      </header>

      <div className="my-8 rounded-3xl overflow-hidden shadow-level-2 max-h-[500px]">
        <img
          src={article.image}
          alt={article.altText}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose max-w-none text-on-surface-variant font-body-lg text-base sm:text-lg leading-relaxed space-y-6">
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <footer className="mt-12 pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-on-surface-variant">
          Category: <strong>{article.category}</strong> • Published by RISE International Field Communications
        </div>
        <Link
          to="/news"
          className="px-5 py-2.5 rounded-xl bg-surface-container text-primary font-label-md font-bold hover:bg-surface-container-high transition-colors"
        >
          View More Updates
        </Link>
      </footer>
    </article>
  );
};
