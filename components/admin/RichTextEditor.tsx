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
  Type
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  minHeight?: string;
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
  minHeight = 'min-h-[220px]',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'preview'>('visual');
  const [htmlContent, setHtmlContent] = useState(value || '');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedFont, setSelectedFont] = useState('Default (Sora / Sans)');
  const [selectedSize, setSelectedSize] = useState('Default');

  // Synchronize internal state with external value when not focused or value changed externally
  useEffect(() => {
    if (!isFocusedRef.current && editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
    setHtmlContent(value || '');
  }, [value]);

  const executeCommand = useCallback((command: string, arg?: string) => {
    if (activeTab !== 'visual') return;
    
    // Ensure document styleWithCSS is true so execCommand outputs clean inline styles
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
  }, [activeTab, onChange]);

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
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      // If no text selected, fallback to execCommand fontSize 1-7
      return;
    }

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
    } catch (e) {
      console.warn('Font size insert error:', e);
    }
  };

  const applyCustomFontFamily = (fontFamily: string, labelText: string) => {
    if (activeTab !== 'visual') return;
    setSelectedFont(labelText);

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      executeCommand('fontName', fontFamily);
      return;
    }

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontFamily = fontFamily;

    try {
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      selection.addRange(newRange);
      handleEditorInput();
    } catch (e) {
      executeCommand('fontName', fontFamily);
    }
  };

  const handleInsertLink = () => {
    if (!linkUrl) {
      setShowLinkModal(false);
      return;
    }
    const fullUrl = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') || linkUrl.startsWith('/')
      ? linkUrl
      : `https://${linkUrl}`;
    
    executeCommand('createLink', fullUrl);
    setLinkUrl('');
    setShowLinkModal(false);
  };

  // Helper stats
  const cleanText = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = cleanText ? cleanText.split(' ').length : 0;
  const charCount = cleanText.length;

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            {label}
          </label>
          <span className="text-[11px] text-gray-400 font-medium">
            {wordCount} words &bull; {charCount} chars
          </span>
        </div>
      )}

      <div className="border border-slate-300 rounded-2xl bg-white shadow-xs overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
        {/* Top Control Bar & Mode Tabs */}
        <div className="bg-slate-50/90 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2 select-none">
          {/* Main Toolbar Buttons */}
          <div className="flex flex-wrap items-center gap-1">
            
            {/* Formatting Group: Bold, Italic, Underline, Strike */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('bold'); }}
                title="Bold (Ctrl+B)"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Bold className="w-4 h-4 font-bold" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('italic'); }}
                title="Italic (Ctrl+I)"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('underline'); }}
                title="Underline (Ctrl+U)"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('strikeThrough'); }}
                title="Strikethrough"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Strikethrough className="w-4 h-4" />
              </button>
            </div>

            {/* Headings Hierarchy Group */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('formatBlock', '<p>'); }}
                title="Normal Paragraph"
                className="px-2 py-1 text-xs font-semibold rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                Normal
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('formatBlock', '<h2>'); }}
                title="Heading 2 (H2)"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Heading2 className="w-4 h-4 font-bold" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('formatBlock', '<h3>'); }}
                title="Heading 3 (H3)"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Heading3 className="w-4 h-4 font-bold" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('formatBlock', '<blockquote>'); }}
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
                <option value="Default" disabled>Size</option>
                <option value="12px">12px (Small)</option>
                <option value="14px">14px (Regular)</option>
                <option value="16px">16px (Medium)</option>
                <option value="18px">18px (Large)</option>
                <option value="22px">22px (Extra Large)</option>
                <option value="28px">28px (Title)</option>
              </select>
            </div>

            {/* Font Family Dropdown */}
            <div className="relative">
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'sans') applyCustomFontFamily('var(--font-sora), system-ui, sans-serif', 'Sora Sans');
                  if (val === 'serif') applyCustomFontFamily('Georgia, Cambria, serif', 'Georgia Serif');
                  if (val === 'mono') applyCustomFontFamily('ui-monospace, monospace', 'Code Mono');
                }}
                title="Font Family"
                className="h-8 px-2 py-1 text-xs font-medium bg-white rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="" disabled>Font Style</option>
                <option value="sans">Modern Sans (Sora)</option>
                <option value="serif">Editorial Serif</option>
                <option value="mono">Tech Monospace</option>
              </select>
            </div>

            {/* Text Color Picker Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowColorPicker(!showColorPicker);
                  setShowHighlightPicker(false);
                }}
                title="Text Color"
                className="flex items-center gap-1 px-2 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-slate-300 transition-colors"
              >
                <Palette className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="text-[11px] font-bold">Color</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showColorPicker && (
                <div className="absolute left-0 top-9 z-50 bg-white p-3 rounded-xl shadow-xl border border-slate-200 w-48 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Choose Text Color</p>
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
                        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:scale-110 transition-transform"
                        style={{ backgroundColor: c.color }}
                      />
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">Custom:</span>
                    <input
                      type="color"
                      onChange={(e) => {
                        executeCommand('foreColor', e.target.value);
                      }}
                      className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Background Highlight Picker Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowHighlightPicker(!showHighlightPicker);
                  setShowColorPicker(false);
                }}
                title="Highlight Background"
                className="flex items-center gap-1 px-2 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-amber-600 hover:border-slate-300 transition-colors"
              >
                <Highlighter className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] font-bold">Highlight</span>
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
                        title={c.name}
                        className="h-7 px-2 rounded-lg border border-slate-200 text-[10px] font-bold hover:scale-105 transition-transform flex items-center justify-center text-slate-800"
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
                onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyLeft'); }}
                title="Align Left"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyCenter'); }}
                title="Align Center"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyRight'); }}
                title="Align Right"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <AlignRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyFull'); }}
                title="Justify"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <AlignJustify className="w-4 h-4" />
              </button>
            </div>

            {/* Lists Group */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('insertUnorderedList'); }}
                title="Bullet List"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('insertOrderedList'); }}
                title="Numbered List"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
            </div>

            {/* Link & Divider */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setShowLinkModal(true)}
                title="Insert Link"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('unlink'); }}
                title="Remove Link"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-red-500"
              >
                <Unlink className="w-4 h-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('insertHorizontalRule'); }}
                title="Horizontal Divider"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* History & Clear */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-2xs">
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('undo'); }}
                title="Undo (Ctrl+Z)"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('redo'); }}
                title="Redo (Ctrl+Y)"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('removeFormat'); }}
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
                activeTab === 'visual'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Visual Editor</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'code'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>HTML Source</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>
        </div>

        {/* Link Insertion Modal / Prompt */}
        {showLinkModal && (
          <div className="p-3 bg-blue-50/80 border-b border-blue-200 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-xs font-bold text-blue-900">Insert URL:</span>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com or /contact-us"
              className="flex-1 px-3 py-1.5 text-xs border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleInsertLink();
                }
              }}
            />
            <button
              type="button"
              onClick={handleInsertLink}
              className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700 shadow-xs"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setShowLinkModal(false)}
              className="px-2.5 py-1.5 text-slate-500 hover:text-slate-700 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        )}

        {/* EDITOR BODY */}
        <div className="relative p-4">
          {/* TAB 1: Visual WYSIWYG Editor */}
          <div className={activeTab === 'visual' ? 'block' : 'hidden'}>
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onFocus={() => { isFocusedRef.current = true; }}
              onBlur={() => {
                isFocusedRef.current = false;
                handleEditorInput();
              }}
              onInput={handleEditorInput}
              data-placeholder={placeholder}
              className={`w-full outline-none text-slate-800 text-sm leading-relaxed rich-text-content ${minHeight}`}
              style={{
                fontFamily: 'inherit',
                minHeight: '160px',
              }}
            />
          </div>

          {/* TAB 2: HTML Source Code View */}
          {activeTab === 'code' && (
            <textarea
              rows={10}
              value={htmlContent}
              onChange={handleCodeChange}
              placeholder="Paste raw HTML here..."
              className="w-full text-xs font-mono text-slate-800 leading-relaxed outline-none resize-y bg-slate-50/70 p-3 rounded-xl border border-slate-200"
            />
          )}

          {/* TAB 3: Live Preview View */}
          {activeTab === 'preview' && (
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200 min-h-[160px]">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Public Website Render Preview:
              </div>
              {htmlContent ? (
                <div
                  className="rich-text-content text-slate-800 text-sm sm:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              ) : (
                <p className="text-xs text-slate-400 italic">No content to preview.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-500 font-medium">
          {helperText}
        </p>
      )}
    </div>
  );
}
