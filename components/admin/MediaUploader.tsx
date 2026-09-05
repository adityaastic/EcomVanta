'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon, Loader2, Copy, ExternalLink } from 'lucide-react';

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  previewHeight?: string;
}

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

  const uploadFile = async (file: File) => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || 'Upload failed');
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
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">{label}</label>
        {value && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="text-[11px] text-gray-500 hover:text-gray-800 font-medium flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied URL!' : 'Copy URL'}</span>
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[11px] text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
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
          title="Click or drag an image here to replace"
          className={`relative ${previewHeight} w-full sm:w-44 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden shrink-0 cursor-pointer transition-all ${
            isDragOver
              ? 'border-red-500 bg-red-50/50 scale-[1.02]'
              : 'border-gray-300 hover:border-red-400 bg-gray-50/80 hover:bg-gray-100/80'
          }`}
        >
          {value ? (
            <div className="relative w-full h-full p-2 flex items-center justify-center">
              <img
                src={value}
                alt={label}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[11px] font-bold text-white bg-black/60 px-2 py-1 rounded-md">
                  Change File
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center p-3">
              <ImageIcon className="w-7 h-7 text-gray-400 mx-auto mb-1" />
              <span className="text-[11px] font-medium text-gray-500">Drop / Click to upload</span>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center gap-1">
              <Loader2 className="w-6 h-6 text-red-600 animate-spin" />
              <span className="text-[10px] font-bold text-gray-600">Uploading...</span>
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
              placeholder="Enter file URL (e.g. /uploads/image.png or https://...)"
              className="flex-1 px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? 'Uploading...' : 'Upload'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div className="flex items-center justify-between">
            {helperText && <p className="text-[11px] text-gray-500">{helperText}</p>}
            {value && (
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium ml-auto"
              >
                <ExternalLink className="w-3 h-3" /> View Original
              </a>
            )}
          </div>
          {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
        </div>
      </div>
    </div>
  );
}

