import React, { useState } from 'react';
import { adminService } from '../../services/adminService';

export type AiAssistantMode =
  | 'page-content'
  | 'seo'
  | 'article'
  | 'programme'
  | 'faq'
  | 'image';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageTitle?: string;
  pageType?: string;
  currentContent?: string;
  defaultMode?: AiAssistantMode;
  context?: {
    pageTitle?: string;
    pageType?: string;
    topic?: string;
    currentContent?: string;
  };
  onApply: (data: any) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  pageTitle = '',
  pageType = 'page',
  currentContent = '',
  defaultMode = 'page-content',
  context,
  onApply,
}) => {
  const effectiveTitle = context?.pageTitle || pageTitle || 'RISE Page';
  const effectiveType = context?.pageType || pageType || 'page';
  const effectiveContent = context?.currentContent || currentContent || '';
  const effectiveTopic = context?.topic || effectiveTitle;

  const [activeMode, setActiveMode] = useState<AiAssistantMode>(defaultMode);
  const [targetTopic, setTargetTopic] = useState(effectiveTopic);
  const [category, setCategory] = useState(context?.topic || 'Education');
  const [additionalContext, setAdditionalContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedResult, setGeneratedResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setGeneratedResult(null);

    try {
      let result;
      switch (activeMode) {
        case 'page-content':
          result = await adminService.generateAiContent({
            pageType: effectiveType,
            pageTitle: targetTopic || effectiveTitle,
            context: additionalContext,
            currentContent: effectiveContent,
          });
          break;

        case 'seo':
          result = await adminService.generateAiSeo({
            pageTitle: targetTopic || effectiveTitle,
            pageContent: effectiveContent,
            targetTopic: targetTopic || effectiveTitle,
            pageType: effectiveType,
          });
          break;

        case 'article':
          result = await adminService.generateAiArticle({
            topic: targetTopic || pageTitle,
            category,
            keyPoints: additionalContext ? [additionalContext] : undefined,
          });
          break;

        case 'programme':
          result = await adminService.generateAiProgramme({
            programmeName: targetTopic || pageTitle,
            focusArea: category,
            communityContext: additionalContext,
          });
          break;

        case 'faq':
          result = await adminService.generateAiFaq({
            topic: targetTopic || pageTitle,
            pageType,
            count: 4,
          });
          break;

        case 'image':
          result = await adminService.generateAiImagePrompt({
            pageTitle,
            topic: targetTopic || pageTitle,
            aspectRatio: '16:9',
          });
          break;

        default:
          throw new Error('Unknown generation mode');
      }

      setGeneratedResult(result);
    } catch (err: any) {
      setError(err.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToForm = () => {
    if (!generatedResult) return;
    onApply({ mode: activeMode, data: generatedResult });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-primary-container text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary-fixed text-2xl">auto_awesome</span>
            <div>
              <h3 className="font-bold text-base">RISE International AI Assistant</h3>
              <p className="text-xs text-white/70">Context-Aware Drafting &amp; SEO Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Warning banner enforcing draft status */}
        <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-200 flex items-center gap-2 text-xs text-amber-800">
          <span className="material-symbols-outlined text-sm text-amber-600 flex-shrink-0">verified_user</span>
          <span>
            <strong>Human Review Guardrail:</strong> AI content generates as <em>Draft / Review Required</em>. Never auto-publishes without administrative review.
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-200 flex flex-wrap gap-2">
          {[
            { id: 'page-content', label: 'Page Content', icon: 'article' },
            { id: 'seo', label: 'SEO Metadata', icon: 'search' },
            { id: 'article', label: 'News Article', icon: 'newspaper' },
            { id: 'programme', label: 'Programme Description', icon: 'school' },
            { id: 'faq', label: 'FAQ Items', icon: 'quiz' },
            { id: 'image', label: 'Image Prompt', icon: 'image' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveMode(tab.id as AiAssistantMode);
                setGeneratedResult(null);
                setError(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeMode === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Body Inputs */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Subject / Title</label>
              <input
                type="text"
                value={targetTopic}
                onChange={(e) => setTargetTopic(e.target.value)}
                placeholder="e.g. Education"
                className="w-full h-9 px-3 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pillar / Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
              >
                <option value="Education">Education</option>
                <option value="Community Development">Community Development</option>
                <option value="Humanitarian Aid">Humanitarian Aid</option>
                <option value="Economic Empowerment">Economic Empowerment</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Context Notes / Specific Instructions (optional)
            </label>
            <textarea
              rows={2}
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder="e.g. Focus on youth vocational workshops and community ownership..."
              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                  <span>Generating Draft with Gemini...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  <span>Generate {activeMode.toUpperCase()} Draft</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}

          {/* Generated Result Preview */}
          {generatedResult && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Draft Output (Review Required)</span>
                </span>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500 uppercase">
                  Status: {generatedResult.status || 'Draft'}
                </span>
              </div>

              {/* Formatted display depending on mode */}
              {activeMode === 'seo' && (
                <div className="text-xs space-y-2">
                  <div>
                    <strong className="text-slate-700">SEO Title:</strong>
                    <p className="font-semibold text-slate-900">{generatedResult.seoTitle}</p>
                  </div>
                  <div>
                    <strong className="text-slate-700">Meta Description:</strong>
                    <p className="text-slate-600">{generatedResult.metaDescription}</p>
                  </div>
                  <div>
                    <strong className="text-slate-700">Suggested H1:</strong>
                    <p className="text-slate-800">{generatedResult.suggestedH1}</p>
                  </div>
                  <div>
                    <strong className="text-slate-700">Primary Topic:</strong>
                    <p className="text-slate-800">{generatedResult.primaryTopic}</p>
                  </div>
                </div>
              )}

              {activeMode === 'page-content' && (
                <div className="text-xs space-y-2">
                  <div>
                    <strong className="text-slate-700">Hero Heading:</strong>
                    <p className="font-bold text-slate-900">{generatedResult.heroH1}</p>
                  </div>
                  <div>
                    <strong className="text-slate-700">Overview:</strong>
                    <p className="text-slate-700 leading-relaxed">{generatedResult.overview}</p>
                  </div>
                </div>
              )}

              {activeMode === 'article' && (
                <div className="text-xs space-y-2">
                  <div>
                    <strong className="text-slate-700">Title:</strong>
                    <p className="font-bold text-slate-900">{generatedResult.title}</p>
                  </div>
                  <div>
                    <strong className="text-slate-700">Introduction:</strong>
                    <p className="text-slate-700 leading-relaxed">{generatedResult.introduction}</p>
                  </div>
                </div>
              )}

              {activeMode === 'programme' && (
                <div className="text-xs space-y-2">
                  <div>
                    <strong className="text-slate-700">Programme:</strong>
                    <p className="font-bold text-slate-900">{generatedResult.title}</p>
                  </div>
                  <div>
                    <strong className="text-slate-700">Short Description:</strong>
                    <p className="text-slate-700">{generatedResult.shortDescription}</p>
                  </div>
                  <div>
                    <strong className="text-slate-700">Full Description:</strong>
                    <p className="text-slate-700 leading-relaxed">{generatedResult.fullDescription}</p>
                  </div>
                </div>
              )}

              {activeMode === 'faq' && (
                <div className="text-xs space-y-2">
                  {generatedResult.faqs?.map((f: any, i: number) => (
                    <div key={i} className="p-2 bg-white rounded border border-slate-200">
                      <p className="font-bold text-slate-900">Q: {f.question}</p>
                      <p className="text-slate-600 mt-1">A: {f.answer}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeMode === 'image' && (
                <div className="text-xs space-y-2">
                  <div>
                    <strong className="text-slate-700">Recommended Prompt:</strong>
                    <p className="text-slate-800 bg-white p-2 rounded border border-slate-200 italic">
                      "{generatedResult.imagePrompt}"
                    </p>
                  </div>
                  <div>
                    <strong className="text-slate-700">Recommended Alt Text:</strong>
                    <p className="text-slate-700">{generatedResult.recommendedAltText}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-3 border-t border-slate-200 gap-2">
                <button
                  type="button"
                  onClick={() => setGeneratedResult(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-semibold"
                >
                  Discard Draft
                </button>
                <button
                  type="button"
                  onClick={handleApplyToForm}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">check</span>
                  <span>Apply to Form (Review &amp; Edit)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
