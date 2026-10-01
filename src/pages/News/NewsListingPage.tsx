import React, { useState } from 'react';
import { SEO } from '../../components/common/SEO';
import { newsArticlesData } from '../../data/news';
import { NewsCard } from '../../components/stories/NewsCard';

export const NewsListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Field Dispatch', 'Education', 'Impact Report'];

  const filteredArticles = selectedCategory === 'All'
    ? newsArticlesData
    : newsArticlesData.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="w-full">
      <SEO
        title="News &amp; Field Stories | RISE International"
        description="Stay informed with quarterly dispatches, clinical reports, and infrastructure commissioning news from RISE International."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20 text-center">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            COMMUNICATIONS &amp; FIELD LOGS
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold mt-2">
            News &amp; Dispatches
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            Real-time updates, program expansions, and transparency announcements straight from the ground.
          </p>
        </div>
      </section>

      <section className="max-w-content mx-auto px-6 lg:px-12 py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-label-md text-sm transition-all ${
                selectedCategory === cat
                  ? 'bg-secondary text-white font-bold shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};
