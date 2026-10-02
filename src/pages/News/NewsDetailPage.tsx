import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { newsArticlesData } from '../../data/news';
import { ArticleLayout } from '../../components/stories/ArticleLayout';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = newsArticlesData.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <SEO
        title={`${article.title} | RISE International`}
        description={article.excerpt}
        canonical={`/news/${article.slug}`}
        ogImage={article.image}
        ogType="article"
        article={{
          publishedTime: article.publishedAt,
          author: article.author,
          section: article.category,
        }}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'News', item: '/news' },
          { name: article.title, item: `/news/${article.slug}` },
        ]}
      />
      <ArticleLayout article={article} />
    </div>
  );
};
