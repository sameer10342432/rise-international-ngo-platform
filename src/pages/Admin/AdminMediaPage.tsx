import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';
import wordpressMediaData from '../../data/wordpressMediaManifest.json';

export const AdminMediaPage: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const [usageData, setUsageData] = useState<{ usageCount: number; usages: any[] } | null>(null);
  const [checkingUsage, setCheckingUsage] = useState(false);
  const [editingMeta, setEditingMeta] = useState(false);
  const [metaForm, setMetaForm] = useState({ title: '', altText: '', caption: '', category: '' });
  const [savingMeta, setSavingMeta] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [syncingManifest, setSyncingManifest] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Upload modal state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await adminService.getMedia({
        limit: 150,
        search,
        source: filterSource,
        type: filterType,
      });
      if (res && res.items && res.items.length > 0) {
        setMediaItems(res.items);
      } else {
        // Static fallback
        loadStaticManifest();
      }
    } catch {
      loadStaticManifest();
    } finally {
      setLoading(false);
    }
  };

  const loadStaticManifest = () => {
    const staticItems = (wordpressMediaData as any[]).map((m) => {
      const ext = (m.extension || '').toLowerCase();
      return {
        _id: m.filename,
        filename: m.filename,
        url: m.publicUrl,
        width: m.width,
        height: m.height,
        fileSize: m.sizeBytes,
        source: 'wordpress',
        title: m.filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''),
        altText: m.filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''),
        caption: '',
        category: ext === '.pdf' ? 'document' : 'gallery',
        mimeType: ext === '.png' ? 'image/png' : ext === '.pdf' ? 'application/pdf' : 'image/jpeg',
      };
    });
    setMediaItems(staticItems);
  };

  useEffect(() => {
    loadMedia();
  }, [search, filterSource, filterType]);

  const handleSelectAsset = async (asset: any) => {
    setSelectedAsset(asset);
    setMetaForm({
      title: asset.title || '',
      altText: asset.altText || '',
      caption: asset.caption || '',
      category: asset.category || 'general',
    });
    setEditingMeta(false);

    // Fetch dynamic usage
    if (asset._id && !asset._id.includes('.')) {
      setCheckingUsage(true);
      try {
        const usageRes = await adminService.getMediaUsage(asset._id);
        setUsageData({ usageCount: usageRes.usageCount, usages: usageRes.usages });
      } catch {
        setUsageData({ usageCount: 0, usages: [] });
      } finally {
        setCheckingUsage(false);
      }
    } else {
      setUsageData({ usageCount: 0, usages: [] });
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleSaveMeta = async () => {
    if (!selectedAsset) return;
    setSavingMeta(true);
    try {
      await adminService.updateMedia(selectedAsset._id, metaForm);
      setSelectedAsset({ ...selectedAsset, ...metaForm });
      setMediaItems((prev) =>
        prev.map((item) => (item._id === selectedAsset._id ? { ...item, ...metaForm } : item))
      );
      setEditingMeta(false);
    } catch (err: any) {
      alert(err.message || 'Failed to update metadata.');
    } finally {
      setSavingMeta(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAsset) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await adminService.deleteMedia(selectedAsset._id, true);
      setMediaItems((prev) => prev.filter((item) => item._id !== selectedAsset._id));
      setSelectedAsset(null);
      setDeleteModalOpen(false);
    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete asset.');
    } finally {
      setDeleting(false);
    }
  };

  const handleSyncManifest = async () => {
    setSyncingManifest(true);
    setSyncMessage(null);
    try {
      const res = await adminService.syncWordPressManifest();
      setSyncMessage(`Manifest synchronized! Total: ${res.total} items.`);
      loadMedia();
    } catch (err: any) {
      setSyncMessage(`Sync failed: ${err.message}`);
    } finally {
      setSyncingManifest(false);
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFile) return;
    setUploading(true);
    setUploadError(null);
    try {
      await adminService.uploadMediaAsset(uploadFile, {
        title: uploadAlt,
        altText: uploadAlt,
      });
      setIsUploadOpen(false);
      setUploadFile(null);
      setUploadPreview(null);
      loadMedia();
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const formatBytes = (bytes?: number) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const wpCount = mediaItems.filter((i) => i.source === 'wordpress').length;
  const docCount = mediaItems.filter((i) => i.category === 'document' || i.mimeType === 'application/pdf').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-emerald-600 text-2xl">photo_library</span>
              <h1 className="text-xl font-bold text-slate-900">Media Library</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Browse, search, and manage all 189 authentic WordPress assets and uploaded media files.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSyncManifest}
              disabled={syncingManifest}
              className="px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 transition-colors disabled:opacity-50"
              title="Resynchronize all 189 authentic assets from /public_html"
            >
              <span className="material-symbols-outlined text-sm">sync</span>
              <span>{syncingManifest ? 'Syncing...' : 'Sync WP Assets'}</span>
            </button>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow flex items-center space-x-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">cloud_upload</span>
              <span>Upload Media</span>
            </button>
          </div>
        </div>

        {/* Sync alert */}
        {syncMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
            <span>{syncMessage}</span>
            <button onClick={() => setSyncMessage(null)} className="text-emerald-600 hover:text-emerald-900 font-bold">
              ×
            </button>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total Assets
            </span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{mediaItems.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block">
              WP Originals
            </span>
            <p className="text-2xl font-bold text-emerald-700 mt-1">{wpCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block">
              Documents & PDFs
            </span>
            <p className="text-2xl font-bold text-blue-700 mt-1">{docCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider block">
              Admin Uploads
            </span>
            <p className="text-2xl font-bold text-amber-700 mt-1">{mediaItems.length - wpCount}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
            <input
              type="text"
              placeholder="Search media by filename, alt text, or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Sources</option>
            <option value="wordpress">Authentic WordPress Media</option>
            <option value="upload">Admin Uploads</option>
            <option value="ai">AI Generated</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All File Types</option>
            <option value="image">Images Only</option>
            <option value="document">Documents Only (PDF/ZIP)</option>
          </select>
        </div>

        {/* Media Grid & Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Media Grid */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-sm min-h-[500px]">
            {loading ? (
              <div className="h-64 flex items-center justify-center text-slate-400 text-xs">
                <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                Loading media library assets...
              </div>
            ) : mediaItems.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-xs">
                <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">image_not_supported</span>
                <span>No media assets match your filters.</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[700px] overflow-y-auto pr-1">
                {mediaItems.map((item) => {
                  const isSelected = selectedAsset?._id === item._id;
                  const isImage = item.mimeType?.startsWith('image/') || item.extension?.match(/\.(jpg|jpeg|png|webp|svg)$/i);
                  return (
                    <div
                      key={item._id || item.filename}
                      onClick={() => handleSelectAsset(item)}
                      className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-white shadow-sm hover:shadow-md ${
                        isSelected
                          ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                        {isImage ? (
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
                            <span className="text-[10px] uppercase font-mono mt-1 font-bold">
                              {item.extension || 'DOC'}
                            </span>
                          </div>
                        )}
                      </div>
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

          {/* Details & Inspector Sidebar */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            {selectedAsset ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900">Asset Inspector</h3>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      selectedAsset.source === 'wordpress'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {selectedAsset.source === 'wordpress' ? 'Original WP' : 'Uploaded'}
                  </span>
                </div>

                {/* Preview Box */}
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center max-h-56">
                  {selectedAsset.mimeType?.startsWith('image/') || selectedAsset.extension?.match(/\.(jpg|jpeg|png|webp|svg)$/i) ? (
                    <img
                      src={selectedAsset.url}
                      alt={selectedAsset.altText || ''}
                      className="max-h-56 w-auto object-contain"
                    />
                  ) : (
                    <div className="py-8 text-center">
                      <span className="material-symbols-outlined text-4xl text-emerald-600">description</span>
                      <p className="text-xs text-slate-600 mt-1 font-semibold">{selectedAsset.filename}</p>
                    </div>
                  )}
                </div>

                {/* Copy URL */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Public Path / URL
                  </label>
                  <div className="flex items-center space-x-1.5">
                    <input
                      type="text"
                      readOnly
                      value={selectedAsset.url}
                      className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-mono truncate"
                    />
                    <button
                      onClick={() => handleCopyUrl(selectedAsset.url)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xs">
                        {copyFeedback ? 'check' : 'content_copy'}
                      </span>
                      <span>{copyFeedback ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Metadata Info */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Dimensions</span>
                    <span className="font-semibold text-slate-800">
                      {selectedAsset.width && selectedAsset.height
                        ? `${selectedAsset.width} × ${selectedAsset.height} px`
                        : 'Vector / N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">File Size</span>
                    <span className="font-semibold text-slate-800">{formatBytes(selectedAsset.fileSize)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">MIME Type</span>
                    <span className="font-semibold text-slate-800 truncate block">{selectedAsset.mimeType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Protection</span>
                    <span className="font-semibold text-slate-800">
                      {selectedAsset.source === 'wordpress' ? 'Protected WP' : 'Mutable'}
                    </span>
                  </div>
                </div>

                {/* Dynamic Usage Section */}
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center space-x-1">
                      <span className="material-symbols-outlined text-sm text-emerald-600">link</span>
                      <span>Website References</span>
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      {checkingUsage ? 'Checking...' : `${usageData?.usageCount || 0} usage(s)`}
                    </span>
                  </div>
                  {usageData && usageData.usages.length > 0 ? (
                    <ul className="text-[11px] text-slate-600 space-y-1 max-h-28 overflow-y-auto pt-1">
                      {usageData.usages.map((u, i) => (
                        <li key={i} className="flex items-center space-x-1.5">
                          <span className="text-emerald-500">•</span>
                          <span className="font-medium text-slate-800">{u.type}:</span>
                          <span className="truncate">{u.title}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[11px] text-slate-400">
                      {checkingUsage ? 'Inspecting references...' : 'Not actively bound to featured headers.'}
                    </p>
                  )}
                </div>

                {/* Edit Metadata Form */}
                {editingMeta ? (
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Asset Title</label>
                      <input
                        type="text"
                        value={metaForm.title}
                        onChange={(e) => setMetaForm({ ...metaForm, title: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Alt Text (Accessibility & SEO)</label>
                      <input
                        type="text"
                        value={metaForm.altText}
                        onChange={(e) => setMetaForm({ ...metaForm, altText: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Caption</label>
                      <input
                        type="text"
                        value={metaForm.caption}
                        onChange={(e) => setMetaForm({ ...metaForm, caption: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-1">
                      <button
                        onClick={() => setEditingMeta(false)}
                        className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveMeta}
                        disabled={savingMeta}
                        className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {savingMeta ? 'Saving...' : 'Save Metadata'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setEditingMeta(true)}
                      className="flex-1 py-2 border border-slate-300 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center space-x-1"
                    >
                      <span className="material-symbols-outlined text-xs">edit</span>
                      <span>Edit Metadata</span>
                    </button>
                    {selectedAsset.source !== 'wordpress' && (
                      <button
                        onClick={() => setDeleteModalOpen(true)}
                        className="p-2 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg text-xs flex items-center justify-center transition-colors"
                        title="Delete Uploaded Asset"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-6">
                <span className="material-symbols-outlined text-3xl text-slate-300 mb-2">touch_app</span>
                <span className="font-medium text-slate-700">No Asset Selected</span>
                <span className="text-[11px] mt-1 text-slate-400">
                  Click any image or document from the media grid to view dimensions, file size, usage, and edit metadata.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 flex items-center space-x-2">
                  <span className="material-symbols-outlined text-emerald-600">cloud_upload</span>
                  <span>Upload Media Asset</span>
                </h3>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors bg-slate-50/50">
                {uploadPreview ? (
                  <div className="space-y-2">
                    <img
                      src={uploadPreview}
                      alt="Upload Preview"
                      className="max-h-40 mx-auto rounded-lg object-contain shadow-sm border border-slate-200"
                    />
                    <p className="text-xs text-slate-500 font-medium">{uploadFile?.name}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadFile(null);
                        setUploadPreview(null);
                      }}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Choose different file
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <span className="material-symbols-outlined text-3xl text-emerald-600 mb-1">upload_file</span>
                    <p className="text-xs font-semibold text-slate-800">Click to choose image or drag & drop</p>
                    <p className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG, WebP (Max 5MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          setUploadFile(file);
                          setUploadPreview(URL.createObjectURL(file));
                          setUploadAlt(file.name.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''));
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {uploadPreview && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alt Text & Accessibility Description
                  </label>
                  <input
                    type="text"
                    value={uploadAlt}
                    onChange={(e) => setUploadAlt(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              )}

              {uploadError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                  {uploadError}
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
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
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Upload Asset</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && selectedAsset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center space-x-2 text-rose-600">
                <span className="material-symbols-outlined text-2xl">warning</span>
                <h3 className="font-bold text-base text-slate-900">Confirm Asset Deletion</h3>
              </div>

              <p className="text-xs text-slate-600">
                Are you sure you want to permanently delete{' '}
                <span className="font-semibold text-slate-900">{selectedAsset.filename}</span>?
              </p>

              {usageData && usageData.usageCount > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                  <p className="font-semibold mb-1">Active Usage Warning:</p>
                  This media file is actively referenced across {usageData.usageCount} page(s) or section(s). Deleting it will result in missing imagery on those pages.
                </div>
              )}

              {deleteError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                  {deleteError}
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDeleteConfirm}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete Permanently'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
