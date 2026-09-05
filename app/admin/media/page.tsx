'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Copy,
  Check,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Search,
  ExternalLink,
  Trash2,
  X,
  Eye,
  Filter
} from 'lucide-react';

interface MediaItem {
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<MediaItem | null>(null);
  const [deletingName, setDeletingName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/upload');
      const data = await res.json();
      if (data.success) {
        setMediaList(data.media || []);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      let count = 0;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.success) count++;
      }
      await fetchMedia();
      showToast(`Successfully uploaded ${count} file${count > 1 ? 's' : ''}!`);
    } catch (err) {
      showToast('Error uploading media files');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${filename}"?`)) return;

    setDeletingName(filename);
    try {
      const res = await fetch(`/api/admin/upload?file=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setMediaList(mediaList.filter((m) => m.name !== filename));
        showToast('File deleted successfully');
        if (previewImage?.name === filename) {
          setPreviewImage(null);
        }
      } else {
        alert(data.error || 'Failed to delete file');
      }
    } catch (err) {
      alert('Error deleting file');
    } finally {
      setDeletingName(null);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    showToast('Copied URL to clipboard!');
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const isVideo = (name: string) => /\.(mp4|webm|ogg|mov)$/i.test(name);

  const filteredMedia = mediaList.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === 'video') return isVideo(m.name);
    if (filterType === 'image') return !isVideo(m.name);
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Media Library & Asset Uploads
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Upload banners, photos, brand logos, and icons to use anywhere across the website.
          </p>
        </div>

        <button
          onClick={fetchMedia}
          className="p-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold"
          title="Refresh Media"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Drag & Drop Upload Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-red-500 bg-red-50/50 scale-[1.01]'
            : 'border-gray-300 hover:border-red-400 bg-white hover:bg-gray-50/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />

        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 mx-auto flex items-center justify-center">
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              {uploading ? 'Uploading your files...' : 'Click to upload or drag & drop assets'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports PNG, JPG, WebP, SVG, MP4. Files are saved directly to /public/uploads/
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200/80">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search uploaded files..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({mediaList.length})
          </button>
          <button
            onClick={() => setFilterType('image')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'image'
                ? 'bg-slate-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Images ({mediaList.filter((m) => !isVideo(m.name)).length})
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'video'
                ? 'bg-slate-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Videos ({mediaList.filter((m) => isVideo(m.name)).length})
          </button>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
          {search ? 'No files match your search criteria.' : 'No files in the uploads library yet. Drag & drop files above to upload!'}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => {
            const isCopied = copiedUrl === item.url;
            const isVid = isVideo(item.name);
            const isDeleting = deletingName === item.name;

            return (
              <div
                key={item.name}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div
                  onClick={() => setPreviewImage(item)}
                  className="relative h-32 bg-gray-50 flex items-center justify-center p-2 overflow-hidden cursor-pointer"
                >
                  {isVid ? (
                    <video
                      src={item.url}
                      className="max-h-full max-w-full object-contain"
                      muted
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="p-1.5 bg-white text-gray-900 rounded-lg text-xs font-bold flex items-center gap-1 shadow">
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </span>
                  </div>
                </div>

                <div className="p-3 space-y-2 border-t border-gray-100">
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {formatFileSize(item.size)}
                    </p>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleCopy(item.url)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(item.name)}
                      disabled={isDeleting}
                      title="Delete File"
                      className="p-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-400 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox / Full-size Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-900 truncate max-w-sm">
                  {previewImage.name}
                </p>
                <p className="text-[10px] text-gray-400">
                  {formatFileSize(previewImage.size)} • {previewImage.url}
                </p>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-gray-900/5 flex items-center justify-center max-h-[60vh] overflow-auto">
              {isVideo(previewImage.name) ? (
                <video
                  src={previewImage.url}
                  controls
                  autoPlay
                  className="max-h-[50vh] max-w-full rounded-lg"
                />
              ) : (
                <img
                  src={previewImage.url}
                  alt={previewImage.name}
                  className="max-h-[50vh] max-w-full object-contain rounded-lg shadow-sm"
                />
              )}
            </div>

            <div className="p-4 bg-gray-50 flex items-center justify-between border-t border-gray-100">
              <a
                href={previewImage.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Direct URL
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(previewImage.url)}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Image URL
                </button>
                <button
                  onClick={() => handleDelete(previewImage.name)}
                  className="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

