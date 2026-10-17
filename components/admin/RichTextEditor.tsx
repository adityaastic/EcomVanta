'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link as LinkIcon,
  Unlink,
  Palette,
  Highlighter,
  Undo2,
  Redo2,
  RemoveFormatting,
  Minus,
  Quote,
  Code,
  Eye,
  Edit3,
  ChevronDown,
  Image as ImageIcon,
  Table as TableIcon,
  Search,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export interface InternalLinkPickerItem {
  title: string;
  path: string;
  category: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  minHeight?: string;
  internalLinkItems?: InternalLinkPickerItem[];
}

const PRESET_TEXT_COLORS = [
  { name: 'Default Dark', color: '#0F172A' },
  { name: 'Primary Blue', color: '#0066FF' },
  { name: 'Cyan Teal', color: '#00C2FF' },
  { name: 'Emerald Green', color: '#16A34A' },
  { name: 'Crimson Red', color: '#DC2626' },
  { name: 'Amber Gold', color: '#D97706' },
  { name: 'Purple', color: '#9333EA' },
  { name: 'Slate Muted', color: '#64748B' },
];

const PRESET_HIGHLIGHT_COLORS = [
  { name: 'None', color: 'transparent' },
  { name: 'Yellow', color: '#FEF08A' },
  { name: 'Soft Blue', color: '#BAE6FD' },
  { name: 'Soft Green', color: '#BBF7D0' },
  { name: 'Soft Pink', color: '#FBCFE8' },
  { name: 'Light Gray', color: '#F1F5F9' },
];

export default function RichTextEditor({
  value,
  onChange,
  label,
  placeholder = 'Write or paste your formatted content here...',
  helperText,
  minHeight = 'min-h-[260px]',
  internalLinkItems = [],
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'preview'>('visual');
  const [htmlContent, setHtmlContent] = useState(value || '');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  // Link insertion state (supports external URL + searchable internal content picker)
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkAnchorText, setLinkAnchorText] = useState('');
  const [linkNofollow, setLinkNofollow] = useState(false);
  const [linkOpenNewTab, setLinkOpenNewTab] = useState(false);
  const [internalSearch, setInternalSearch] = useState('');

  // Inline Image insertion state (with alt text, title, caption)
  const [showImageModal, setShowImageModal] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [imgTitle, setImgTitle] = useState('');
  const [imgCaption, setImgCaption] = useState('');
  const [uploadingInlineImg, setUploadingInlineImg] = useState(false);

  // Table insertion state
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const [selectedSize, setSelectedSize] = useState('Default');

  useEffect(() => {
    if (!isFocusedRef.current && editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
    setHtmlContent(value || '');
  }, [value]);

  const executeCommand = useCallback(
    (command: string, arg?: string) => {
      if (activeTab !== 'visual') return;
      try {
        document.execCommand('styleWithCSS', false, 'true');
      } catch {
        // ignore
      }
      if (editorRef.current) {
        editorRef.current.focus();
      }
      document.execCommand(command, false, arg);
      if (editorRef.current) {
        const updated = editorRef.current.innerHTML;
        setHtmlContent(updated);
        onChange(updated);
      }
    },
    [activeTab, onChange]
  );

  const insertHtmlAtCursor = useCallback(
    (snippet: string) => {
      if (activeTab === 'code') {
        const updated = `${htmlContent}\n${snippet}`;
        setHtmlContent(updated);
        onChange(updated);
        return;
      }
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand('insertHTML', false, snippet);
        const updated = editorRef.current.innerHTML;
        setHtmlContent(updated);
        onChange(updated);
      }
    },
    [activeTab, htmlContent, onChange]
  );

  const handleEditorInput = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlContent(html);
      onChange(html);
    }
  }, [onChange]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtmlContent(newHtml);
    onChange(newHtml);
    if (editorRef.current) {
      editorRef.current.innerHTML = newHtml;
    }
  };

  const applyCustomFontSize = (px: string) => {
    if (activeTab !== 'visual') return;
    setSelectedSize(px);
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontSize = px;
    try {
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      selection.addRange(newRange);
      handleEditorInput();
    } catch {
      // ignore
    }
  };

  const applyHeadingBlock = (tag: string) => {
    if (!tag) return;
    executeCommand('formatBlock', `<${tag}>`);
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) {
      setShowLinkModal(false);
      return;
    }
    const raw = linkUrl.trim();
    const fullUrl =
      raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('/') || raw.startsWith('#')
        ? raw
        : `https://${raw}`;

    const relAttrs: string[] = [];
    if (linkNofollow) relAttrs.push('nofollow');
    if (linkOpenNewTab) relAttrs.push('noopener', 'noreferrer');
    const relStr = relAttrs.length > 0 ? ` rel="${relAttrs.join(' ')}"` : '';
    const targetStr = linkOpenNewTab ? ' target="_blank"' : '';

    if (linkAnchorText.trim()) {
      const aTag = `<a href="${fullUrl}"${targetStr}${relStr}>${linkAnchorText.trim()}</a>`;
      insertHtmlAtCursor(aTag);
    } else {
      executeCommand('createLink', fullUrl);
    }

    setLinkUrl('');
    setLinkAnchorText('');
    setLinkNofollow(false);
    setLinkOpenNewTab(false);
    setShowLinkModal(false);
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingInlineImg(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setImgSrc(data.url);
        if (!imgAlt) {
          setImgAlt(file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '));
        }
      }
    } catch {
      // ignore
    } finally {
      setUploadingInlineImg(false);
    }
  };

  const handleInsertInlineImage = () => {
    if (!imgSrc.trim()) {
      setShowImageModal(false);
      return;
    }
    const cleanAlt = (imgAlt || '').replace(/"/g, '&quot;');
    const cleanTitle = (imgTitle || cleanAlt).replace(/"/g, '&quot;');
    let htmlSnippet = `<img src="${imgSrc.trim()}" alt="${cleanAlt}" title="${cleanTitle}" class="rounded-2xl my-4 max-w-full h-auto" />`;
    if (imgCaption.trim()) {
      htmlSnippet = `<figure class="my-6"><img src="${imgSrc.trim()}" alt="${cleanAlt}" title="${cleanTitle}" class="rounded-2xl max-w-full h-auto" /><figcaption class="text-xs text-slate-500 italic mt-2">${imgCaption.trim()}</figcaption></figure>`;
    }
    insertHtmlAtCursor(htmlSnippet);
    setImgSrc('');
    setImgAlt('');
    setImgTitle('');
    setImgCaption('');
    setShowImageModal(false);
  };

  const handleInsertTable = () => {
    const rCount = Math.max(1, Math.min(12, tableRows));
    const cCount = Math.max(1, Math.min(8, tableCols));
    let thead = '<thead><tr>';
    for (let c = 1; c <= cCount; c++) {
      thead += `<th>Heading ${c}</th>`;
    }
    thead += '</tr></thead>';

    let tbody = '<tbody>';
    for (let r = 1; r <= rCount; r++) {
      tbody += '<tr>';
      for (let c = 1; c <= cCount; c++) {
        tbody += `<td>Row ${r}, Cell ${c}</td>`;
      }
      tbody += '</tr>';
    }
    tbody += '</tbody>';

    insertHtmlAtCursor(`<table>${thead}${tbody}</table><p></p>`);
    setShowTableModal(false);
  };

  const filteredInternalItems = internalLinkItems
    .filter(
      (item) =>
        !internalSearch ||
        item.title.toLowerCase().includes(internalSearch.toLowerCase()) ||
        item.path.toLowerCase().includes(internalSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(internalSearch.toLowerCase())
    )
    .slice(0, 8);

  const cleanText = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = cleanText ? cleanText.split(' ').length : 0;
  const charCount = cleanText.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            {label}
          </label>
          <span className="text-[11px] text-gray-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full">
            {wordCount} words &bull; {charCount} chars &bull; ~{readingTime} min read
          </span>
        </div>
      )}

      <div className="border border-slate-300 rounded-2xl bg-white shadow-xs overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
        {/* Top Control Bar & Mode Tabs */}
        <div className="bg-slate-50/90 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2 select-none">
          <div className="flex flex-wrap items-center gap-1">
            {/* Formatting Group: Bold, Italic, Underline, Strike */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('bold');
                }}
                title="Bold (Ctrl+B)"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Bold className="w-4 h-4 font-bold" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('italic');
                }}
                title="Italic (Ctrl+I)"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('underline');
                }}
                title="Underline (Ctrl+U)"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('strikeThrough');
                }}
                title="Strikethrough"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Strikethrough className="w-4 h-4" />
              </button>
            </div>

            {/* Headings Hierarchy Group (H1 to H6 + Paragraph + Quote) */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <select
                defaultValue="p"
                onChange={(e) => applyHeadingBlock(e.target.value)}
                title="Heading Level (H1–H6) or Paragraph"
                className="h-7 px-2 text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="p">Paragraph (P)</option>
                <option value="h1">Heading 1 (H1)</option>
                <option value="h2">Heading 2 (H2)</option>
                <option value="h3">Heading 3 (H3)</option>
                <option value="h4">Heading 4 (H4)</option>
                <option value="h5">Heading 5 (H5)</option>
                <option value="h6">Heading 6 (H6)</option>
              </select>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('formatBlock', '<h2>');
                }}
                title="Quick H2 Subheading"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Heading2 className="w-4 h-4 font-bold" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('formatBlock', '<h3>');
                }}
                title="Quick H3 Subheading"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Heading3 className="w-4 h-4 font-bold" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('formatBlock', '<blockquote>');
                }}
                title="Quote Block"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Quote className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Font Size Dropdown */}
            <div className="relative">
              <select
                onChange={(e) => applyCustomFontSize(e.target.value)}
                value={selectedSize}
                title="Font Size"
                className="h-8 px-2 py-1 text-xs font-medium bg-white rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="Default" disabled>
                  Size
                </option>
                <option value="12px">12px (Small)</option>
                <option value="14px">14px (Regular)</option>
                <option value="16px">16px (Medium)</option>
                <option value="18px">18px (Large)</option>
                <option value="22px">22px (Extra Large)</option>
                <option value="28px">28px (Title)</option>
              </select>
            </div>

            {/* Text Color & Highlight */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowColorPicker(!showColorPicker);
                  setShowHighlightPicker(false);
                }}
                title="Text Color"
                className="flex items-center gap-1 px-2 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Palette className="w-3.5 h-3.5 text-[#0066FF]" />
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {showColorPicker && (
                <div className="absolute left-0 top-9 z-50 bg-white p-3 rounded-xl shadow-xl border border-slate-200 w-48 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Text Color</p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {PRESET_TEXT_COLORS.map((c) => (
                      <button
                        key={c.color}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          executeCommand('foreColor', c.color);
                          setShowColorPicker(false);
                        }}
                        title={c.name}
                        className="w-8 h-8 rounded-lg border border-slate-200 hover:scale-110 transition-transform"
                        style={{ backgroundColor: c.color }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowHighlightPicker(!showHighlightPicker);
                  setShowColorPicker(false);
                }}
                title="Highlight Background"
                className="flex items-center gap-1 px-2 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-amber-600 transition-colors"
              >
                <Highlighter className="w-3.5 h-3.5 text-amber-500" />
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {showHighlightPicker && (
                <div className="absolute left-0 top-9 z-50 bg-white p-3 rounded-xl shadow-xl border border-slate-200 w-48 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Highlight Color</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {PRESET_HIGHLIGHT_COLORS.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          executeCommand('hiliteColor', c.color);
                          setShowHighlightPicker(false);
                        }}
                        className="h-7 px-2 rounded-lg border border-slate-200 text-[10px] font-bold hover:scale-105 transition-transform"
                        style={{ backgroundColor: c.color === 'transparent' ? '#fff' : c.color }}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Alignment Group */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('justifyLeft');
                }}
                title="Align Left"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('justifyCenter');
                }}
                title="Align Center"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('justifyRight');
                }}
                title="Align Right"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <AlignRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('justifyFull');
                }}
                title="Justify"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <AlignJustify className="w-4 h-4" />
              </button>
            </div>

            {/* Lists & Table Group */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('insertUnorderedList');
                }}
                title="Bullet List"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('insertOrderedList');
                }}
                title="Numbered List"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowTableModal(!showTableModal);
                  setShowLinkModal(false);
                  setShowImageModal(false);
                }}
                title="Insert Table"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Link, Inline Image & Divider */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  const sel = window.getSelection()?.toString() || '';
                  if (sel) setLinkAnchorText(sel);
                  setShowLinkModal(!showLinkModal);
                  setShowImageModal(false);
                  setShowTableModal(false);
                }}
                title="Insert Internal or External Link"
                className="px-2 py-1 rounded hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center gap-1 text-xs font-bold"
              >
                <LinkIcon className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Link</span>
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('unlink');
                }}
                title="Remove Link"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-red-500"
              >
                <Unlink className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowImageModal(!showImageModal);
                  setShowLinkModal(false);
                  setShowTableModal(false);
                }}
                title="Insert Inline Image with Alt Text & Caption"
                className="px-2 py-1 rounded hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center gap-1 text-xs font-bold"
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Image</span>
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('insertHorizontalRule');
                }}
                title="Horizontal Divider"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Undo/Redo & Clear */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('undo');
                }}
                title="Undo"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('redo');
                }}
                title="Redo"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('removeFormat');
                }}
                title="Clear Formatting"
                className="p-1.5 rounded hover:bg-red-50 text-slate-500 hover:text-red-600"
              >
                <RemoveFormatting className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-200/80 rounded-xl p-0.5 text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab('visual')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'visual' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Visual</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'code' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>HTML</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'preview' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Link Insertion & Searchable Internal Content Picker Drawer */}
        {showLinkModal && (
          <div className="p-4 bg-blue-50/80 border-b border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#0066FF]" />
                Insert Internal or External Link
              </span>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Anchor Text</label>
                <input
                  type="text"
                  value={linkAnchorText}
                  onChange={(e) => setLinkAnchorText(e.target.value)}
                  placeholder="e.g. Amazon Seller Account Management"
                  className="w-full px-3 py-1.5 text-xs border border-blue-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Destination URL or Internal Path</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="/amazon-seller-account-management-services or https://..."
                  className="w-full px-3 py-1.5 text-xs font-mono border border-blue-300 rounded-lg bg-white"
                />
              </div>
            </div>

            {/* Searchable Internal Content Picker */}
            {internalLinkItems.length > 0 && (
              <div className="bg-white rounded-xl border border-blue-200 p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-extrabold text-slate-700">
                    Search Existing Published Pages &amp; Blogs to Link:
                  </span>
                  <div className="relative w-56">
                    <input
                      type="text"
                      value={internalSearch}
                      onChange={(e) => setInternalSearch(e.target.value)}
                      placeholder="Filter pages or blogs..."
                      className="w-full pl-7 pr-2.5 py-1 text-xs border border-slate-200 rounded-lg"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1.5" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
                  {filteredInternalItems.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => {
                        setLinkUrl(item.path);
                        if (!linkAnchorText) setLinkAnchorText(item.title);
                      }}
                      className="text-left px-2.5 py-1.5 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{item.title}</p>
                        <p className="text-[10px] font-mono text-slate-400 truncate">{item.path}</p>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-blue-50 text-[#0066FF] text-[9px] font-bold shrink-0">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-4 text-xs text-slate-700 font-medium">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={linkOpenNewTab}
                    onChange={(e) => setLinkOpenNewTab(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <span>Open in new tab</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={linkNofollow}
                    onChange={(e) => setLinkNofollow(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <span>Add rel=&quot;nofollow&quot;</span>
                </label>
              </div>
              <button
                type="button"
                onClick={handleInsertLink}
                className="px-4 py-1.5 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-xs rounded-lg shadow-xs"
              >
                Insert Link
              </button>
            </div>
          </div>
        )}

        {/* Inline Image Insertion Drawer (with Alt Text, Title, Caption) */}
        {showImageModal && (
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                Insert Inline Image with SEO Alt Text &amp; Caption
              </span>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Image URL or Upload File</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imgSrc}
                    onChange={(e) => setImgSrc(e.target.value)}
                    placeholder="/arvian-blogs.jpeg or https://..."
                    className="flex-1 px-3 py-1.5 text-xs border border-emerald-300 rounded-lg bg-white"
                  />
                  <label className="px-3 py-1.5 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg cursor-pointer shrink-0">
                    {uploadingInlineImg ? 'Uploading...' : 'Upload'}
                    <input type="file" accept="image/*" onChange={handleInlineImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Image Alt Text <span className="text-red-500">(Required for SEO)</span>
                </label>
                <input
                  type="text"
                  value={imgAlt}
                  onChange={(e) => setImgAlt(e.target.value)}
                  placeholder="Describe the image including relevant keywords..."
                  className="w-full px-3 py-1.5 text-xs border border-emerald-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Image Title Attribute</label>
                <input
                  type="text"
                  value={imgTitle}
                  onChange={(e) => setImgTitle(e.target.value)}
                  placeholder="Optional hover title..."
                  className="w-full px-3 py-1.5 text-xs border border-emerald-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Visible Caption (figcaption)</label>
                <input
                  type="text"
                  value={imgCaption}
                  onChange={(e) => setImgCaption(e.target.value)}
                  placeholder="Optional caption shown below the image..."
                  className="w-full px-3 py-1.5 text-xs border border-emerald-300 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleInsertInlineImage}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs"
              >
                Insert Image into Article
              </button>
            </div>
          </div>
        )}

        {/* Table Insertion Drawer */}
        {showTableModal && (
          <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
              <TableIcon className="w-4 h-4 text-[#0066FF]" />
              <span>Insert Comparison Table:</span>
              <label className="flex items-center gap-1">
                <span>Rows:</span>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={tableRows}
                  onChange={(e) => setTableRows(Number(e.target.value))}
                  className="w-14 px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>Columns:</span>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={tableCols}
                  onChange={(e) => setTableCols(Number(e.target.value))}
                  className="w-14 px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleInsertTable}
                className="px-3 py-1.5 bg-[#0066FF] text-white text-xs font-bold rounded-lg"
              >
                Insert Table
              </button>
              <button
                type="button"
                onClick={() => setShowTableModal(false)}
                className="px-2.5 py-1.5 text-xs text-slate-500 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* EDITOR BODY */}
        <div className="relative p-4">
          <div className={activeTab === 'visual' ? 'block' : 'hidden'}>
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onFocus={() => {
                isFocusedRef.current = true;
              }}
              onBlur={() => {
                isFocusedRef.current = false;
                handleEditorInput();
              }}
              onInput={handleEditorInput}
              data-placeholder={placeholder}
              className={`w-full outline-none text-slate-800 text-sm leading-relaxed rich-text-content ${minHeight} [&_h1]:text-2xl [&_h1]:font-black [&_h1]:my-3 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:my-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-3 [&_blockquote]:italic [&_a]:text-blue-600 [&_a]:underline [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:p-2 [&_td]:border [&_td]:border-slate-300 [&_td]:p-2`}
              style={{
                fontFamily: 'inherit',
                minHeight: '220px',
              }}
            />
          </div>

          {activeTab === 'code' && (
            <textarea
              rows={12}
              value={htmlContent}
              onChange={handleCodeChange}
              placeholder="Paste or edit raw HTML here..."
              className="w-full text-xs font-mono text-slate-800 leading-relaxed outline-none resize-y bg-slate-50/70 p-3 rounded-xl border border-slate-200"
            />
          )}

          {activeTab === 'preview' && (
            <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-200 min-h-[220px]">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Public Website Render Preview:
              </div>
              {htmlContent ? (
                <div
                  className="rich-text-content text-slate-800 text-sm sm:text-base leading-relaxed space-y-3 [&_h2]:text-xl [&_h2]:font-black [&_h3]:text-lg [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-blue-600 [&_a]:underline [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:p-2 [&_td]:border [&_td]:border-slate-300 [&_td]:p-2"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              ) : (
                <p className="text-xs text-slate-400 italic">No content to preview.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {helperText && <p className="text-[11px] text-slate-500 font-medium">{helperText}</p>}
    </div>
  );
}
