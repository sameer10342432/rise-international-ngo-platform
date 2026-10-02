import React from 'react';

export interface SeoFields {
  seoTitle: string;
  seoDescription: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  slug?: string;
  noindex?: boolean;
}

interface SeoEditorFieldsProps {
  values: SeoFields;
  onChange: (fields: Partial<SeoFields>) => void;
  showSlug?: boolean;
  basePath?: string;
}

export const SeoEditorFields: React.FC<SeoEditorFieldsProps> = ({
  values,
  onChange,
  showSlug = true,
  basePath = '',
}) => {
  return (
    <div className="space-y-5 bg-slate-50 p-5 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600 text-lg">search</span>
          <h4 className="text-sm font-bold text-slate-800">Search Engine Optimisation (SEO) &amp; Social Metadata</h4>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
          Editable CMS Fields
        </span>
      </div>

      {showSlug && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700">URL Slug</label>
            <span className="text-[11px] text-slate-400">Clean URL identifier</span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 h-9 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-500 text-xs">
              {basePath ? `${basePath}/` : '/'}
            </span>
            <input
              type="text"
              value={values.slug || ''}
              onChange={(e) => onChange({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-') })}
              placeholder="e.g. community-development"
              className="w-full h-9 px-3 rounded-r-lg border border-slate-300 bg-white text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Defines the web address path. Use lowercase letters, hyphens, and no spaces.
          </p>
        </div>
      )}

      {/* SEO Title */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-bold text-slate-700">SEO Title Tag</label>
          <span className="text-[11px] text-slate-400">
            {values.seoTitle ? `${values.seoTitle.length} chars (aim for 50-60)` : 'Recommended: Title | RISE International'}
          </span>
        </div>
        <input
          type="text"
          value={values.seoTitle || ''}
          onChange={(e) => onChange({ seoTitle: e.target.value })}
          placeholder="e.g. Education Programme | RISE International"
          className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <p className="text-[11px] text-slate-500 mt-1">
          The main headline displayed in search engine results and browser tabs.
        </p>
      </div>

      {/* Meta Description */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-bold text-slate-700">Meta Description</label>
          <span className="text-[11px] text-slate-400">
            {values.seoDescription ? `${values.seoDescription.length} chars (aim for 140-160)` : 'Target: 140-160 characters'}
          </span>
        </div>
        <textarea
          rows={2}
          value={values.seoDescription || ''}
          onChange={(e) => onChange({ seoDescription: e.target.value })}
          placeholder="Summarize the core purpose of this page in 1-2 natural, compelling sentences..."
          className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <p className="text-[11px] text-slate-500 mt-0.5">
          Snippet shown below the title in Google search results. Should be descriptive and human.
        </p>
      </div>

      {/* Canonical URL */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-bold text-slate-700">Canonical URL</label>
          <span className="text-[11px] text-slate-400">Prevents duplicate content</span>
        </div>
        <input
          type="url"
          value={values.canonicalUrl || ''}
          onChange={(e) => onChange({ canonicalUrl: e.target.value })}
          placeholder="https://riseintl.org/your-page-slug"
          className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <p className="text-[11px] text-slate-500 mt-1">
          The preferred URL for this page that search engines should index.
        </p>
      </div>

      {/* Open Graph Social Sharing */}
      <div className="pt-2 border-t border-slate-200">
        <h5 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-slate-500">share</span>
          <span>Open Graph &amp; Social Share Card</span>
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">OG Title</label>
            <input
              type="text"
              value={values.ogTitle || ''}
              onChange={(e) => onChange({ ogTitle: e.target.value })}
              placeholder="Title for social media shares"
              className="w-full h-8 px-2.5 rounded-md border border-slate-300 bg-white text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">OG Featured Image URL</label>
            <input
              type="text"
              value={values.ogImage || ''}
              onChange={(e) => onChange({ ogImage: e.target.value })}
              placeholder="/images/your-feature-photo.jpg"
              className="w-full h-8 px-2.5 rounded-md border border-slate-300 bg-white text-xs text-slate-900"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">OG Description</label>
          <textarea
            rows={2}
            value={values.ogDescription || ''}
            onChange={(e) => onChange({ ogDescription: e.target.value })}
            placeholder="Social preview description (defaults to Meta Description if blank)..."
            className="w-full p-2 rounded-md border border-slate-300 bg-white text-xs text-slate-900"
          />
        </div>
      </div>

      {/* Robots Indexing Control */}
      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
        <div>
          <label className="text-xs font-bold text-slate-800 block">Search Engine Visibility</label>
          <p className="text-[11px] text-slate-500">
            Keep page indexable by Google, or mark as noindex for drafts and private pages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChange({ noindex: !values.noindex })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              values.noindex
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}
          >
            {values.noindex ? 'Noindex (Hidden from Search)' : 'Indexable (Allow Crawling)'}
          </button>
        </div>
      </div>
    </div>
  );
};
