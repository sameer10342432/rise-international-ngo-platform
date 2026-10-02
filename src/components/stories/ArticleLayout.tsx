import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../../types';
import { newsArticlesData } from '../../data/news';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface ArticleLayoutProps {
  article: NewsArticle;
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ article }) => {
  const relatedArticles = newsArticlesData
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'News', path: '/news' },
          { label: article.title },
        ]}
      />

      <div className="mt-6 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Published: {article.publishedAt} • {article.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-slate-900 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 mt-4 text-xs sm:text-sm text-slate-600">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
            RI
          </div>
          <span>Reported by <strong className="text-slate-900">{article.author}</strong></span>
        </div>
      </div>

      <div className="my-8 rounded-2xl overflow-hidden shadow-sm max-h-[500px] border border-slate-200 bg-slate-100">
        <img
          src={article.image}
          alt={article.altText}
          className="w-full h-full object-cover"
          loading="eager"
          width={1344}
          height={768}
        />
      </div>

      {/* Excerpt / Lead */}
      {article.excerpt && (
        <div className="text-lg font-medium text-slate-700 leading-relaxed border-l-4 border-emerald-600 pl-4 my-6 italic bg-slate-50 py-3 rounded-r-lg">
          {article.excerpt}
        </div>
      )}

      {/* Main Content */}
      <div className="text-slate-700 text-base sm:text-lg leading-relaxed space-y-6">
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* CTA Box */}
      <div className="my-12 p-8 rounded-2xl bg-emerald-50 border border-emerald-200">
        <h3 className="text-xl font-bold font-serif text-emerald-950 mb-2">
          Support Community-Driven Initiatives
        </h3>
        <p className="text-sm text-emerald-900 leading-relaxed mb-4 max-w-xl">
          Programmes like these are made possible through dedicated local collaboration and transparent stewardship. Learn how you can partner or contribute.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/donate"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Support This Programme
          </Link>
          <Link
            to="/our-work"
            className="px-5 py-2.5 bg-white border border-emerald-300 text-emerald-900 font-semibold text-xs rounded-lg hover:bg-emerald-100 transition-colors"
          >
            Explore All Programmes
          </Link>
        </div>
      </div>

      {/* Related Stories */}
      {relatedArticles.length > 0 && (
        <section className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold font-serif text-slate-900 mb-6">
            Related Field Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                to={`/news/${rel.slug}`}
                className="group block p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all"
              >
                <div className="h-36 rounded-lg overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={rel.image}
                    alt={rel.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  {rel.category}
                </span>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer Navigation */}
      <footer className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          Published by RISE International Communications • Editorial Standard: Verified Neutral
        </div>
        <Link
          to="/news"
          className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors inline-flex items-center space-x-1"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>All News Articles</span>
        </Link>
      </footer>
    </article>
  );
};
