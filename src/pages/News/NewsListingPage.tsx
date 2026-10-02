import React, { useState, useMemo } from 'react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { newsArticlesData } from '../../data/news';
import { NewsCard } from '../../components/stories/NewsCard';

export const NewsListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const categories = ['All', 'Field Dispatch', 'Education', 'Impact Report'];

  const filteredArticles = useMemo(() => {
    return newsArticlesData.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <SEO
        title="News & Field Updates | RISE International"
        description="Stay updated with program developments, community dispatches, and institutional reporting from RISE International."
        canonical="/news"
        ogImage="/images/rise-news-hero.webp"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'News', item: '/news' },
        ]}
      />

      {/* Header */}
      <section className="bg-primary text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-news-hero.webp"
            alt="Humanitarian press officer reviewing international NGO field reports and community dispatches"
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
              { label: 'News' },
            ]}
          />
          <div className="max-w-3xl mt-6">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
              Communications &amp; Field Logs
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
              News, Field Logs &amp; Organisational Updates
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Explore recent announcements, community developments, and institutional publications across our programmes.
            </p>
          </div>
        </div>
      </section>

      {/* Draft/Demo Disclaimer */}
      <div className="max-w-content mx-auto px-6 lg:px-12 pt-8">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
          <span className="material-symbols-outlined text-amber-600 text-base mt-0.5">info</span>
          <div>
            <span className="font-bold">Editorial Transparency Notice:</span> The articles below represent draft demo content illustrating publication structure and category taxonomy. Final operational announcements are audited and verified prior to official field publication.
          </div>
        </div>
      </div>

      <section className="max-w-content mx-auto px-6 lg:px-12 py-12">
        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <input
              type="text"
              placeholder="Search updates..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-sm">
              search
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        {paginatedArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No articles match your search criteria. Try selecting another category or keyword.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-white transition-colors"
            >
              Previous
            </button>
            <span className="text-xs text-slate-500 px-3">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-white transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
