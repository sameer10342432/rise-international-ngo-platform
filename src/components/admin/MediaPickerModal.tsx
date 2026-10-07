import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import wordpressMediaData from '../../data/wordpressMediaManifest.json';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, altText?: string) => void;
  currentValue?: string;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentValue = '',
  title = 'Select Media Asset',
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'ai'>('library');
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);

  // Upload tab state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // AI Tab state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResultUrl, setAiResultUrl] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen, search, filterType, filterSource]);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await adminService.getMedia({
        limit: 100,
        search,
        type: filterType,
        source: filterSource,
      });
      if (res && res.items && res.items.length > 0) {
        setMediaItems(res.items);
      } else {
        // Fallback to static WordPress manifest
        const staticItems = (wordpressMediaData as any[]).map((m) => ({
          _id: m.filename,
          filename: m.filename,
          url: m.publicUrl,
          width: m.width,
          height: m.height,
          fileSize: m.sizeBytes,
          source: 'wordpress',
          title: m.filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''),
          altText: m.filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''),
          mimeType: m.extension === '.png' ? 'image/png' : 'image/jpeg',
        }));
        setMediaItems(staticItems);
      }
    } catch {
      // Fallback to static WordPress manifest
      const staticItems = (wordpressMediaData as any[]).map((m) => ({
        _id: m.filename,
        filename: m.filename,
        url: m.publicUrl,
        width: m.width,
        height: m.height,
        fileSize: m.sizeBytes,
        source: 'wordpress',
        title: m.filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''),
        altText: m.filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''),
        mimeType: m.extension === '.png' ? 'image/png' : 'image/jpeg',
      }));
      setMediaItems(staticItems);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadFile(file);
      setUploadPreview(URL.createObjectURL(file));
      setUploadAlt(file.name.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''));
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFile) return;
    setUploading(true);
    setUploadError(null);
    try {
      const res = await adminService.uploadMediaAsset(uploadFile, {
        title: uploadAlt,
        altText: uploadAlt,
      });
      const url = res.url || res.data?.url;
      onSelect(url, uploadAlt);
      onClose();
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);
    setAiError(null);
    try {
      const res = await adminService.generateAiImage({
        prompt: aiPrompt,
        aspectRatio: '16:9',
      });
      if (res && res.imageUrl) {
        setAiResultUrl(res.imageUrl);
      } else {
        setAiError('No image returned by AI service.');
      }
    } catch (err: any) {
      setAiError(err.message || 'AI generation failed');
    } finally {
      setAiGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="material-symbols-outlined text-emerald-600 text-xl">photo_library</span>
              <span>{title}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Select an authentic WordPress photo, upload a new asset, or generate with AI.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('library')}
            className={`py-3 px-4 font-semibold text-xs border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'library'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-base">perm_media</span>
            <span>Media Library</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-4 font-semibold text-xs border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'upload'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-base">cloud_upload</span>
            <span>Upload New</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 px-4 font-semibold text-xs border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'ai'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>Generate With AI</span>
          </button>
        </div>

        {/* Tab 1: Media Library */}
        {activeTab === 'library' && (
          <div className="flex-1 flex flex-col p-6 overflow-hidden min-h-[400px]">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search assets by name or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="all">All Sources</option>
                <option value="wordpress">WordPress (Authentic)</option>
                <option value="upload">Admin Uploads</option>
                <option value="ai">AI Generated</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="all">All File Types</option>
                <option value="image">Images Only</option>
                <option value="document">Documents (PDF/ZIP)</option>
              </select>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto border border-slate-100 rounded-xl p-3 bg-slate-50">
              {loading ? (
                <div className="h-full flex items-center justify-center text-slate-400 text-xs py-16">
                  <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                  Loading media assets...
                </div>
              ) : mediaItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs py-16">
                  <span className="material-symbols-outlined text-3xl mb-2 text-slate-300">image_not_supported</span>
                  <span>No media assets found matching query.</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {mediaItems.map((item) => {
                    const isSelected = selectedAsset?.url === item.url || currentValue === item.url;
                    return (
                      <div
                        key={item._id || item.filename}
                        onClick={() => setSelectedAsset(item)}
                        className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-white shadow-sm hover:shadow-md ${
                          isSelected
                            ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                          {item.mimeType?.startsWith('image/') || item.extension?.match(/\.(jpg|jpeg|png|webp|svg)$/i) ? (
                            <img
                              src={item.url}
                              alt={item.altText || item.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/logo/rise-logo.png';
                              }}
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-400 p-2">
                              <span className="material-symbols-outlined text-3xl text-emerald-600">description</span>
                              <span className="text-[10px] uppercase font-mono mt-1 font-bold">{item.extension || 'DOC'}</span>
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white rounded-full p-0.5 shadow">
                            <span className="material-symbols-outlined text-xs block">check</span>
                          </div>
                        )}
                        <div className="p-2 text-left">
                          <p className="text-[11px] font-medium text-slate-800 truncate" title={item.filename}>
                            {item.title || item.filename}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                            <span>{item.source === 'wordpress' ? 'WP Original' : 'Upload'}</span>
                            {item.width && item.height && <span>{item.width}×{item.height}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Selection Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                {selectedAsset ? (
                  <span className="font-medium text-slate-800 truncate block max-w-md">
                    Selected: {selectedAsset.filename} ({selectedAsset.width ? `${selectedAsset.width}×${selectedAsset.height}` : 'Asset'})
                  </span>
                ) : (
                  <span>Select an image to use</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!selectedAsset}
                  onClick={() => {
                    if (selectedAsset) {
                      onSelect(selectedAsset.url, selectedAsset.altText || selectedAsset.title);
                      onClose();
                    }
                  }}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow disabled:opacity-50"
                >
                  Use Selected Asset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Upload New */}
        {activeTab === 'upload' && (
          <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="max-w-xl mx-auto w-full space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-emerald-500 transition-colors bg-slate-50/50">
                {uploadPreview ? (
                  <div className="space-y-3">
                    <img
                      src={uploadPreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg shadow-sm border border-slate-200 object-contain"
                    />
                    <p className="text-xs text-slate-500">{uploadFile?.name}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadFile(null);
                        setUploadPreview(null);
                      }}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Choose a different file
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <span className="material-symbols-outlined text-4xl text-emerald-600 mb-2">cloud_upload</span>
                    <p className="text-sm font-semibold text-slate-800">Click to choose image or drag & drop</p>
                    <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WebP (Max 5MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {uploadPreview && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Image Title & Alt Text (SEO Accessibility)
                  </label>
                  <input
                    type="text"
                    value={uploadAlt}
                    onChange={(e) => setUploadAlt(e.target.value)}
                    placeholder="Describe what is in the image..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              )}

              {uploadError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                  {uploadError}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!uploadFile || uploading}
                onClick={handleUploadSubmit}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow disabled:opacity-50 flex items-center space-x-1.5"
              >
                {uploading ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    <span>Optimizing & Uploading...</span>
                  </>
                ) : (
                  <span>Upload & Select</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: AI Generation */}
        {activeTab === 'ai' && (
          <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="max-w-xl mx-auto w-full space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
                <p className="font-semibold mb-1">Authenticity Reminder:</p>
                Original WordPress photographs must always take priority over AI generated imagery. Only generate AI imagery when no authentic photograph is available for the initiative.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  AI Generation Prompt
                </label>
                <textarea
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="E.g., High-resolution photography of modern computer science students collaborating in rural laboratory..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="button"
                disabled={!aiPrompt.trim() || aiGenerating}
                onClick={handleAiGenerate}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow disabled:opacity-50 flex items-center justify-center space-x-1.5"
              >
                {aiGenerating ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    <span>Generating Image with Gemini...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    <span>Generate With AI</span>
                  </>
                )}
              </button>

              {aiError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                  {aiError}
                </div>
              )}

              {aiResultUrl && (
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-2">
                  <p className="text-xs font-semibold text-slate-700">Generated Result Preview:</p>
                  <img
                    src={aiResultUrl}
                    alt="AI Generated"
                    className="max-h-56 mx-auto rounded-lg shadow-sm object-cover"
                  />
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!aiResultUrl}
                onClick={() => {
                  if (aiResultUrl) {
                    onSelect(aiResultUrl, aiPrompt);
                    onClose();
                  }
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow disabled:opacity-50"
              >
                Use Generated Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
