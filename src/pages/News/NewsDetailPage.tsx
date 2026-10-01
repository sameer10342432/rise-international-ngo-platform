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
    <div className="w-full">
      <SEO
        title={`${article.title} | RISE International`}
        description={article.excerpt}
        ogImage={article.image}
      />
      <ArticleLayout article={article} />
    </div>
  );
};
