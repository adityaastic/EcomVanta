'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon, Video, Loader2, Copy, ExternalLink, Play } from 'lucide-react';

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  previewHeight?: string;
}

const isVideoUrl = (url: string) => {
  if (!url) return false;
  return (
    /\.(mp4|webm|ogg|mov|mkv|avi)(\?.*)?$/i.test(url) ||
    url.startsWith('data:video/')
  );
};

const isVideoFile = (file: File) => {
  if (file.type && file.type.startsWith('video/')) return true;
  return /\.(mp4|webm|ogg|mov|mkv|avi)$/i.test(file.name);
};

async function compressImageFile(file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.85): Promise<File> {
  // If video or SVG / GIF animation or non-image, don't compress with canvas
  if (isVideoFile(file) || !file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight WebP or fallback to original mime
        const targetMime = 'image/webp';
        canvas.toBlob(
          (blob) => {
            if (blob && (blob.size < file.size || file.size > 200 * 1024)) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
                type: targetMime,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          targetMime,
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

import { supabase } from '@/lib/supabase';

export default function MediaUploader({
  label,
  value,
  onChange,
  helperText,
  previewHeight = 'h-32',
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCurrentVideo = isVideoUrl(value) || label.toLowerCase().includes('video');

  const uploadFile = async (rawFile: File) => {
    if (!rawFile) return;

    // Check size limit: 50MB
    const MAX_SIZE = 50 * 1024 * 1024;
    if (rawFile.size > MAX_SIZE) {
      setError(`File size (${(rawFile.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum limit of 50MB. Please compress or optimize the file.`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Auto-compress high-res images in browser before uploading (skips videos)
      const file = await compressImageFile(rawFile);
      let finalUploadedUrl = '';

      // 1. Direct Signed URL Upload to Supabase (Bypasses Vercel 4.5MB Serverless Body Limit)
      try {
        const signRes = await fetch('/api/admin/upload?sign=1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type || 'application/octet-stream',
            size: file.size,
          }),
        });

        if (signRes.ok) {
          const signData = await signRes.json();
          if (signData.success && signData.signedUrl && signData.token) {
            // Use Supabase JS SDK uploadToSignedUrl if client is initialized
            if (supabase) {
              const { error: upErr } = await supabase.storage
                .from('media')
                .uploadToSignedUrl(signData.path, signData.token, file, {
                  contentType: file.type || 'application/octet-stream',
                });

              if (!upErr) {
                finalUploadedUrl = signData.publicUrl;
              }
            }

            // Direct PUT fallback
            if (!finalUploadedUrl) {
              const putRes = await fetch(signData.signedUrl, {
                method: 'PUT',
                headers: {
                  'Content-Type': file.type || 'application/octet-stream',
                },
                body: file,
              });
              if (putRes.ok) {
                finalUploadedUrl = signData.publicUrl;
              }
            }
          }
        }
      } catch (directSignErr) {
        console.warn('Direct signed upload attempt:', directSignErr);
      }

      // 2. Fallback to standard multipart upload route if direct signed upload wasn't used
      if (!finalUploadedUrl) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        let data: any = {};
        try {
          data = await res.json();
        } catch {
          const text = await res.text().catch(() => '');
          data = { success: false, error: text || `HTTP ${res.status} response` };
        }

        if (data.success && data.url) {
          finalUploadedUrl = data.url;
        } else {
          setError(data.error || 'Upload failed');
          return;
        }
      }

      if (finalUploadedUrl) {
        onChange(finalUploadedUrl);
      }
    } catch (err: any) {
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-bold text-slate-800 tracking-wide">{label}</label>
        {value && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="text-[11px] text-slate-600 hover:text-[#0066FF] font-semibold flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied URL!' : 'Copy URL'}</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[11px] text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start">
        {/* Preview & Drag-Drop Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          title="Click or drag a file here to replace"
          className={`relative ${previewHeight} w-full sm:w-48 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden shrink-0 cursor-pointer transition-all shadow-xs ${
            isDragOver
              ? 'border-[#0066FF] bg-blue-50/70 scale-[1.02]'
              : 'border-slate-200/90 hover:border-blue-400 bg-slate-50/70 hover:bg-slate-100/70'
          }`}
        >
          {value ? (
            <div className="relative w-full h-full p-2 flex items-center justify-center bg-slate-900/5">
              {isVideoUrl(value) ? (
                <div className="relative w-full h-full flex items-center justify-center bg-black/10 rounded-lg overflow-hidden">
                  <video
                    src={value}
                    className="max-h-full max-w-full object-contain rounded-lg"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Video className="w-2.5 h-2.5 text-blue-400" />
                    <span>VIDEO</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/80 shadow flex items-center justify-center pointer-events-none">
                    <Play className="w-3.5 h-3.5 text-slate-800 fill-slate-800 ml-0.5" />
                  </div>
                </div>
              ) : (
                <img
                  src={value}
                  alt={label}
                  className="max-h-full max-w-full object-contain rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                <span className="text-[11px] font-bold text-white bg-white/20 border border-white/30 px-3 py-1.5 rounded-lg shadow-sm">
                  Replace File
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center p-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto mb-1.5 border border-blue-100">
                {isCurrentVideo ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
              </div>
              <span className="text-[11px] font-bold text-slate-700 block">Click / Drop to upload</span>
              <span className="text-[10px] text-slate-400">PNG, WebP, JPG, MP4, WebM</span>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center gap-1.5 z-20">
              <Loader2 className="w-6 h-6 text-[#0066FF] animate-spin" />
              <span className="text-[10px] font-bold text-slate-700">Uploading media...</span>
            </div>
          )}
        </div>

        {/* Input & Upload Controls */}
        <div className="flex-1 space-y-2 w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter file URL (e.g. /image/video.mp4 or https://...)"
              className="flex-1 px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#0066FF] bg-slate-50/50 focus:bg-white text-slate-900 font-medium transition-all"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl text-xs font-bold hover:from-slate-800 hover:to-slate-700 transition-all flex items-center gap-1.5 shrink-0 shadow-sm disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span>{uploading ? 'Uploading...' : isCurrentVideo ? 'Upload Video' : 'Upload File'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,.mp4,.webm,.mov,.ogg"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div className="flex items-center justify-between">
            {helperText && <p className="text-[11px] text-slate-500 font-medium">{helperText}</p>}
            {value && (
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#0066FF] hover:text-blue-800 flex items-center gap-1 font-bold ml-auto"
              >
                <ExternalLink className="w-3 h-3" /> View Asset
              </a>
            )}
          </div>
          {error && <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2 rounded-lg border border-rose-200">{error}</p>}
        </div>
      </div>
    </div>
  );
}

