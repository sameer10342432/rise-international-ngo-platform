import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  faqItems?: FAQItem[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  schemaData?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = 'RISE International works to create opportunities, strengthen communities and support sustainable change through people-centred programmes and partnerships.',
  canonical,
  ogImage = '/images/rise-home-hero-community.webp',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
  breadcrumbs,
  faqs,
  faqItems,
  article,
  schemaData,
}) => {
  const effectiveFaqs = faqs || faqItems;
  const effectivePublishedTime = publishedTime || article?.publishedTime;
  const effectiveModifiedTime = modifiedTime || article?.modifiedTime;

  useEffect(() => {
    // 1. Title formatting
    const fullTitle = title.includes('RISE International')
      ? title
      : `${title} | RISE International`;
    document.title = fullTitle;

    // Helper to set or create a meta tag
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Primary Meta Description
    setMetaTag('name', 'description', description);

    // 3. Robots
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `https://riseintl.org${ogImage}`);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonical || window.location.href);
    setMetaTag('property', 'og:site_name', 'RISE International');

    if (ogType === 'article') {
      if (effectivePublishedTime) {
        setMetaTag('property', 'article:published_time', effectivePublishedTime);
      }
      if (effectiveModifiedTime) {
        setMetaTag('property', 'article:modified_time', effectiveModifiedTime);
      }
      if (article?.author) {
        setMetaTag('property', 'article:author', article.author);
      }
      if (article?.section) {
        setMetaTag('property', 'article:section', article.section);
      }
    }

    // 5. Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `https://riseintl.org${ogImage}`);

    // 6. Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    const targetCanonical = canonical || `https://riseintl.org${window.location.pathname}`;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', targetCanonical);

    // 7. Structured Data (JSON-LD)
    const scriptId = 'rise-seo-structured-data';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    // Build Schema.org Graph
    const schemaGraph: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'NGO',
        name: 'RISE International',
        url: 'https://riseintl.org',
        logo: 'https://riseintl.org/images/rise-logo.svg',
        slogan: 'Empowering Communities. Transforming Lives.',
        description:
          'RISE International works to create opportunities, strengthen communities and support sustainable change through people-centred programmes and partnerships.',
        telephone: '+49 1520-6777889',
        email: 'info@riseintl.org',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'RISE International',
        url: 'https://riseintl.org',
      },
    ];

    // Breadcrumbs Schema if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.item.startsWith('http') ? crumb.item : `https://riseintl.org${crumb.item}`,
        })),
      });
    }

    // FAQ Schema if provided
    if (effectiveFaqs && effectiveFaqs.length > 0) {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: effectiveFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // Article Schema if ogType is article
    if (ogType === 'article') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: ogImage.startsWith('http') ? ogImage : `https://riseintl.org${ogImage}`,
        datePublished: effectivePublishedTime || new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: article?.author || 'RISE Communications',
        },
        publisher: {
          '@type': 'NGO',
          name: 'RISE International',
          logo: {
            '@type': 'ImageObject',
            url: 'https://riseintl.org/images/rise-logo.svg',
          },
        },
      });
    }

    // Custom or Article Schema if provided
    if (schemaData) {
      schemaGraph.push(schemaData);
    }

    scriptElement.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemaGraph,
    });

    return () => {
      // Optional cleanup if component unmounts
    };
  }, [
    title,
    description,
    canonical,
    ogImage,
    ogType,
    publishedTime,
    modifiedTime,
    noindex,
    breadcrumbs,
    faqs,
    schemaData,
  ]);

  return null;
};
