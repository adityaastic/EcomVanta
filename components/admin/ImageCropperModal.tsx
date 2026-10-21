'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Check,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Sliders,
  Crop,
  RefreshCw,
  Move,
  Sparkles,
  Upload,
} from 'lucide-react';

export interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  fileName?: string;
  label?: string;
  canSkipCrop?: boolean;
  onClose: () => void;
  onConfirm: (croppedFile: File) => void;
  onSkipCrop?: () => void;
}

type AspectPreset = {
  id: string;
  label: string;
  sub: string;
  ratio: number | null; // null = Free / Custom, 0 = Original image ratio
};

const ASPECT_PRESETS: AspectPreset[] = [
  { id: 'free', label: 'Free', sub: 'Custom Box', ratio: null },
  { id: 'original', label: 'Original', sub: 'Photo Ratio', ratio: 0 },
  { id: '1:1', label: '1 : 1', sub: 'Square / Logo', ratio: 1 },
  { id: '4:5', label: '4 : 5', sub: 'Founder / Portrait', ratio: 4 / 5 },
  { id: '4:3', label: '4 : 3', sub: 'Standard Card', ratio: 4 / 3 },
  { id: '16:9', label: '16 : 9', sub: 'Wide Banner', ratio: 16 / 9 },
  { id: '3:1', label: '3 : 1', sub: 'Header / Strip', ratio: 3 / 1 },
];

const BG_OPTIONS = [
  { id: 'transparent', label: 'Transparent', color: 'transparent', previewClass: 'bg-[conic-gradient(#cbd5e1_25%,#f8fafc_0_50%,#cbd5e1_0_75%,#f8fafc_0)] bg-[length:12px_12px]' },
  { id: 'white', label: 'White', color: '#FFFFFF', previewClass: 'bg-white border-slate-300' },
  { id: 'light', label: 'Soft Blue', color: '#F0F7FF', previewClass: 'bg-[#F0F7FF]' },
  { id: 'navy', label: 'Dark Navy', color: '#081325', previewClass: 'bg-[#081325]' },
  { id: 'black', label: 'Black', color: '#000000', previewClass: 'bg-black' },
];

function detectInitialPreset(label = ''): string {
  const lower = label.toLowerCase();
  if (lower.includes('founder') || lower.includes('portrait')) return '4:5';
  if (lower.includes('team') || lower.includes('avatar') || lower.includes('icon')) return '1:1';
  if (lower.includes('logo')) return 'free';
  if (lower.includes('banner') || lower.includes('blog') || lower.includes('cover')) return '16:9';
  if (lower.includes('hero') || lower.includes('partner')) return '4:3';
  return 'original';
}

export default function ImageCropperModal({
  isOpen,
  imageSrc,
  fileName = 'cropped-image.webp',
  label = 'Photo',
  canSkipCrop = false,
  onClose,
  onConfirm,
  onSkipCrop,
}: ImageCropperModalProps) {
  const STAGE_WIDTH = 520;
  const STAGE_HEIGHT = 380;

  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imgLoaded, setImgLoaded] = useState(false);
  const [naturalSize, setNaturalSize] = useState({ width: 800, height: 600 });
  const [activeTab, setActiveTab] = useState<'crop' | 'adjust'>('crop');

  // Crop box dimensions inside the 520x380 stage
  const [selectedPreset, setSelectedPreset] = useState<string>(() => detectInitialPreset(label));
  const [cropBox, setCropBox] = useState({ width: 400, height: 300 });

  // Transform state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0); // 90 deg steps + fine angle
  const [fineAngle, setFineAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [bgColor, setBgColor] = useState<string>('transparent');

  // Image color adjustment state
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  // Dragging state for panning the image or resizing the crop box
  const [dragMode, setDragMode] = useState<null | 'pan' | 'resize-br' | 'resize-r' | 'resize-b'>(null);
  const dragStartRef = useRef({
    clientX: 0,
    clientY: 0,
    panX: 0,
    panY: 0,
    cropW: 400,
    cropH: 300,
  });

  const [processing, setProcessing] = useState(false);

  // Compute crop box size for a given aspect ratio inside the stage
  const computeCropBoxForRatio = useCallback(
    (ratio: number, natW = naturalSize.width, natH = naturalSize.height) => {
      const targetRatio = ratio === 0 ? natW / Math.max(1, natH) : ratio;
      const maxW = STAGE_WIDTH - 48;
      const maxH = STAGE_HEIGHT - 48;

      let w = maxW;
      let h = w / targetRatio;
      if (h > maxH) {
        h = maxH;
        w = h * targetRatio;
      }
      return {
        width: Math.max(80, Math.round(w)),
        height: Math.max(80, Math.round(h)),
      };
    },
    [naturalSize.width, naturalSize.height]
  );

  // Compute zoom so image either covers or fits inside cropBox
  const computeZoom = useCallback(
    (mode: 'cover' | 'contain', boxW: number, boxH: number, natW: number, natH: number, rotDeg: number) => {
      const isRotated90 = Math.abs(rotDeg % 180) === 90;
      const effW = isRotated90 ? natH : natW;
      const effH = isRotated90 ? natW : natH;
      if (!effW || !effH) return 1;

      // Base scale maps natural image into stage
      const baseScale = Math.min((STAGE_WIDTH - 48) / effW, (STAGE_HEIGHT - 48) / effH);
      const renderedW = effW * baseScale;
      const renderedH = effH * baseScale;

      const scaleX = boxW / renderedW;
      const scaleY = boxH / renderedH;

      return mode === 'cover' ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
    },
    []
  );

  // Load image when modal opens
  useEffect(() => {
    if (!isOpen || !imageSrc) return;
    setImgLoaded(false);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      const nw = img.naturalWidth || 800;
      const nh = img.naturalHeight || 600;
      setNaturalSize({ width: nw, height: nh });

      const initialPresetId = detectInitialPreset(label);
      setSelectedPreset(initialPresetId);
      const presetObj = ASPECT_PRESETS.find((p) => p.id === initialPresetId);
      const ratioVal = presetObj?.ratio ?? 0;
      const box = computeCropBoxForRatio(ratioVal || 0, nw, nh);
      setCropBox(box);

      const initialZoom = computeZoom('cover', box.width, box.height, nw, nh, 0);
      setZoom(Number(initialZoom.toFixed(2)));
      setPan({ x: 0, y: 0 });
      setRotation(0);
      setFineAngle(0);
      setFlipH(false);
      setFlipV(false);
      setBrightness(100);
      setContrast(100);
      setSaturation(100);
      setBgColor(initialPresetId === 'free' ? 'transparent' : 'transparent');
      setImgLoaded(true);
    };
    img.onerror = () => {
      // Fallback via proxy if direct load had CORS error
      if (!imageSrc.startsWith('data:') && !imageSrc.startsWith('blob:') && !imageSrc.includes('/api/admin/upload?proxyUrl=')) {
        img.src = `/api/admin/upload?proxyUrl=${encodeURIComponent(imageSrc)}`;
      }
    };
    img.src = imageSrc;
  }, [isOpen, imageSrc, label, computeCropBoxForRatio, computeZoom]);

  // Apply aspect ratio preset change
  const handleSelectPreset = (preset: AspectPreset) => {
    setSelectedPreset(preset.id);
    if (preset.ratio === null) {
      // Free mode keeps current box or sets to 85% of stage
      return;
    }
    const newBox = computeCropBoxForRatio(preset.ratio, naturalSize.width, naturalSize.height);
    setCropBox(newBox);
    const coverZ = computeZoom('cover', newBox.width, newBox.height, naturalSize.width, naturalSize.height, rotation);
    setZoom(Number(coverZ.toFixed(2)));
    setPan({ x: 0, y: 0 });
  };

  // Fit entire photo inside crop box (no cutoff)
  const handleFitEntirePhoto = () => {
    const containZ = computeZoom('contain', cropBox.width, cropBox.height, naturalSize.width, naturalSize.height, rotation);
    setZoom(Number(containZ.toFixed(2)));
    setPan({ x: 0, y: 0 });
  };

  // Fill crop box completely
  const handleFillCropBox = () => {
    const coverZ = computeZoom('cover', cropBox.width, cropBox.height, naturalSize.width, naturalSize.height, rotation);
    setZoom(Number(coverZ.toFixed(2)));
    setPan({ x: 0, y: 0 });
  };

  // Reset all adjustments
  const handleResetAll = () => {
    const presetObj = ASPECT_PRESETS.find((p) => p.id === selectedPreset);
    const box = computeCropBoxForRatio(presetObj?.ratio ?? 0, naturalSize.width, naturalSize.height);
    setCropBox(box);
    const coverZ = computeZoom('cover', box.width, box.height, naturalSize.width, naturalSize.height, 0);
    setZoom(Number(coverZ.toFixed(2)));
    setPan({ x: 0, y: 0 });
    setRotation(0);
    setFineAngle(0);
    setFlipH(false);
    setFlipV(false);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  // Draw live preview onto canvas
  useEffect(() => {
    if (!imgLoaded || !imgRef.current || !previewCanvasRef.current) return;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgRef.current;
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;

    ctx.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

    // Draw dark stage background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

    const cropLeft = (STAGE_WIDTH - cropBox.width) / 2;
    const cropTop = (STAGE_HEIGHT - cropBox.height) / 2;

    // Draw checkerboard or selected background inside crop box
    ctx.save();
    ctx.beginPath();
    ctx.rect(cropLeft, cropTop, cropBox.width, cropBox.height);
    ctx.clip();

    if (bgColor === 'transparent') {
      const tileSize = 12;
      for (let y = cropTop; y < cropTop + cropBox.height; y += tileSize) {
        for (let x = cropLeft; x < cropLeft + cropBox.width; x += tileSize) {
          const isEven = (Math.floor((x - cropLeft) / tileSize) + Math.floor((y - cropTop) / tileSize)) % 2 === 0;
          ctx.fillStyle = isEven ? '#1e293b' : '#334155';
          ctx.fillRect(x, y, tileSize, tileSize);
        }
      }
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(cropLeft, cropTop, cropBox.width, cropBox.height);
    }
    ctx.restore();

    // Calculate base image dimensions on stage
    const isRotated90 = Math.abs(rotation % 180) === 90;
    const effW = isRotated90 ? naturalSize.height : naturalSize.width;
    const effH = isRotated90 ? naturalSize.width : naturalSize.height;
    const baseScale = Math.min((STAGE_WIDTH - 48) / Math.max(1, effW), (STAGE_HEIGHT - 48) / Math.max(1, effH));

    const drawW = naturalSize.width * baseScale * zoom;
    const drawH = naturalSize.height * baseScale * zoom;

    // Draw full image dimmed outside crop area + bright inside crop area
    const renderTransformedImage = () => {
      ctx.save();
      ctx.translate(STAGE_WIDTH / 2 + pan.x, STAGE_HEIGHT / 2 + pan.y);
      const totalAngleRad = ((rotation + fineAngle) * Math.PI) / 180;
      ctx.rotate(totalAngleRad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    };

    // 1. Draw image across entire stage
    renderTransformedImage();

    // 2. Darken area outside the crop box
    ctx.save();
    ctx.fillStyle = 'rgba(8, 19, 37, 0.72)';
    ctx.beginPath();
    ctx.rect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    ctx.rect(cropLeft, cropTop, cropBox.width, cropBox.height);
    ctx.fill('evenodd');
    ctx.restore();

    // 3. Draw crisp border and rule-of-thirds grid on cropBox
    ctx.save();
    ctx.strokeStyle = '#00C2FF';
    ctx.lineWidth = 2;
    ctx.strokeRect(cropLeft, cropTop, cropBox.width, cropBox.height);

    // Rule of thirds lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Vertical thirds
    ctx.moveTo(cropLeft + cropBox.width / 3, cropTop);
    ctx.lineTo(cropLeft + cropBox.width / 3, cropTop + cropBox.height);
    ctx.moveTo(cropLeft + (cropBox.width * 2) / 3, cropTop);
    ctx.lineTo(cropLeft + (cropBox.width * 2) / 3, cropTop + cropBox.height);
    // Horizontal thirds
    ctx.moveTo(cropLeft, cropTop + cropBox.height / 3);
    ctx.lineTo(cropLeft + cropBox.width, cropTop + cropBox.height / 3);
    ctx.moveTo(cropLeft, cropTop + (cropBox.height * 2) / 3);
    ctx.lineTo(cropLeft + cropBox.width, cropTop + (cropBox.height * 2) / 3);
    ctx.stroke();

    // Corner L-brackets
    const cornerLen = 16;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    // Top-left
    ctx.moveTo(cropLeft, cropTop + cornerLen);
    ctx.lineTo(cropLeft, cropTop);
    ctx.lineTo(cropLeft + cornerLen, cropTop);
    // Top-right
    ctx.moveTo(cropLeft + cropBox.width - cornerLen, cropTop);
    ctx.lineTo(cropLeft + cropBox.width, cropTop);
    ctx.lineTo(cropLeft + cropBox.width, cropTop + cornerLen);
    // Bottom-left
    ctx.moveTo(cropLeft, cropTop + cropBox.height - cornerLen);
    ctx.lineTo(cropLeft, cropTop + cropBox.height);
    ctx.lineTo(cropLeft + cornerLen, cropTop + cropBox.height);
    // Bottom-right
    ctx.moveTo(cropLeft + cropBox.width - cornerLen, cropTop + cropBox.height);
    ctx.lineTo(cropLeft + cropBox.width, cropTop + cropBox.height);
    ctx.lineTo(cropLeft + cropBox.width, cropTop + cropBox.height - cornerLen);
    ctx.stroke();
    ctx.restore();
  }, [
    imgLoaded,
    cropBox,
    zoom,
    pan,
    rotation,
    fineAngle,
    flipH,
    flipV,
    brightness,
    contrast,
    saturation,
    bgColor,
    naturalSize,
  ]);

  // Pointer down on stage: check if near bottom-right / right / bottom edge for Free resize, otherwise pan image
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = STAGE_WIDTH / rect.width;
    const scaleY = STAGE_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const cropRight = (STAGE_WIDTH + cropBox.width) / 2;
    const cropBottom = (STAGE_HEIGHT + cropBox.height) / 2;

    e.currentTarget.setPointerCapture(e.pointerId);

    // Check if clicking bottom-right corner handle to resize crop box
    if (Math.abs(x - cropRight) < 22 && Math.abs(y - cropBottom) < 22) {
      setSelectedPreset('free');
      setDragMode('resize-br');
    } else if (Math.abs(x - cropRight) < 16 && Math.abs(y - STAGE_HEIGHT / 2) < cropBox.height / 2) {
      setSelectedPreset('free');
      setDragMode('resize-r');
    } else if (Math.abs(y - cropBottom) < 16 && Math.abs(x - STAGE_WIDTH / 2) < cropBox.width / 2) {
      setSelectedPreset('free');
      setDragMode('resize-b');
    } else {
      setDragMode('pan');
    }

    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      panX: pan.x,
      panY: pan.y,
      cropW: cropBox.width,
      cropH: cropBox.height,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = STAGE_WIDTH / rect.width;
    const scaleY = STAGE_HEIGHT / rect.height;
    const dx = (e.clientX - dragStartRef.current.clientX) * scaleX;
    const dy = (e.clientY - dragStartRef.current.clientY) * scaleY;

    if (dragMode === 'pan') {
      setPan({
        x: Math.round(dragStartRef.current.panX + dx),
        y: Math.round(dragStartRef.current.panY + dy),
      });
    } else if (dragMode === 'resize-br') {
      setCropBox({
        width: Math.min(STAGE_WIDTH - 24, Math.max(80, Math.round(dragStartRef.current.cropW + dx * 2))),
        height: Math.min(STAGE_HEIGHT - 24, Math.max(80, Math.round(dragStartRef.current.cropH + dy * 2))),
      });
    } else if (dragMode === 'resize-r') {
      setCropBox((prev) => ({
        ...prev,
        width: Math.min(STAGE_WIDTH - 24, Math.max(80, Math.round(dragStartRef.current.cropW + dx * 2))),
      }));
    } else if (dragMode === 'resize-b') {
      setCropBox((prev) => ({
        ...prev,
        height: Math.min(STAGE_HEIGHT - 24, Math.max(80, Math.round(dragStartRef.current.cropH + dy * 2))),
      }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragMode) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      setDragMode(null);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    setZoom((prev) => Number(Math.min(3.5, Math.max(0.2, prev + delta)).toFixed(2)));
  };

  // Export high-resolution cropped image and pass File to onConfirm
  const handleApplyCrop = async () => {
    if (!imgRef.current) return;
    setProcessing(true);

    try {
      const img = imgRef.current;
      const isRotated90 = Math.abs(rotation % 180) === 90;
      const effW = isRotated90 ? naturalSize.height : naturalSize.width;
      const effH = isRotated90 ? naturalSize.width : naturalSize.height;
      const baseScale = Math.min((STAGE_WIDTH - 48) / Math.max(1, effW), (STAGE_HEIGHT - 48) / Math.max(1, effH));

      // Output resolution multiplier so exported image is crisp HD (up to 1600px on longest side)
      const targetMaxDim = 1400;
      const exportMultiplier = Math.min(
        3.5,
        Math.max(1.5, targetMaxDim / Math.max(cropBox.width, cropBox.height))
      );

      const outW = Math.round(cropBox.width * exportMultiplier);
      const outH = Math.round(cropBox.height * exportMultiplier);

      const outCanvas = document.createElement('canvas');
      outCanvas.width = outW;
      outCanvas.height = outH;
      const ctx = outCanvas.getContext('2d');
      if (!ctx) {
        setProcessing(false);
        return;
      }

      // Fill background if not transparent
      if (bgColor !== 'transparent') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, outW, outH);
      }

      // Translate to center of output canvas + scaled pan offset
      ctx.save();
      ctx.translate(outW / 2 + pan.x * exportMultiplier, outH / 2 + pan.y * exportMultiplier);
      const totalAngleRad = ((rotation + fineAngle) * Math.PI) / 180;
      ctx.rotate(totalAngleRad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

      const drawW = naturalSize.width * baseScale * zoom * exportMultiplier;
      const drawH = naturalSize.height * baseScale * zoom * exportMultiplier;
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      const baseCleanName = (fileName || 'photo').replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
      const outputName = `${baseCleanName}_cropped.webp`;

      outCanvas.toBlob(
        (blob) => {
          setProcessing(false);
          if (blob) {
            const croppedFile = new File([blob], outputName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            onConfirm(croppedFile);
          }
        },
        'image/webp',
        0.92
      );
    } catch (err) {
      console.error('Error exporting cropped photo:', err);
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-[#081325] to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0066FF] flex items-center justify-center shadow-md shadow-blue-500/30">
              <Crop className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                <span>Crop &amp; Adjust Photo</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-[#00C2FF] border border-cyan-400/30">
                  {label}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Drag photo to position • Scroll or use slider to zoom • Drag white corner handles to resize box
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Body: Left Canvas Stage + Right Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Column: Interactive Canvas Stage */}
          <div className="lg:col-span-7 bg-slate-950 p-4 sm:p-6 flex flex-col items-center justify-between gap-4 border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="relative w-full flex items-center justify-center">
              <canvas
                ref={previewCanvasRef}
                width={STAGE_WIDTH}
                height={STAGE_HEIGHT}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onWheel={handleWheel}
                className="w-full max-w-[520px] aspect-[520/380] rounded-2xl border border-slate-800 shadow-2xl cursor-move touch-none bg-slate-900"
              />

              {!imgLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 rounded-2xl text-white gap-2">
                  <RefreshCw className="w-6 h-6 text-[#00C2FF] animate-spin" />
                  <span className="text-xs font-bold text-slate-300">Loading photo studio...</span>
                </div>
              )}
            </div>

            {/* Quick Stage Toolbar under Canvas */}
            <div className="w-full max-w-[520px] flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 border border-slate-800 rounded-2xl px-3.5 py-2.5 text-white">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                <Move className="w-3.5 h-3.5 text-[#00C2FF]" />
                <span>
                  Output: {cropBox.width} × {cropBox.height} ratio
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleFitEntirePhoto}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-[#0066FF] text-[11px] font-bold text-slate-200 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  title="Fit full photo inside frame without cutting edges"
                >
                  <Minimize2 className="w-3 h-3 text-[#00C2FF]" />
                  <span>Fit Full Photo</span>
                </button>

                <button
                  type="button"
                  onClick={handleFillCropBox}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-[#0066FF] text-[11px] font-bold text-slate-200 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  title="Fill the entire crop frame"
                >
                  <Maximize2 className="w-3 h-3 text-[#00C2FF]" />
                  <span>Fill Frame</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPan({ x: 0, y: 0 })}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 transition-colors cursor-pointer"
                  title="Center photo in frame"
                >
                  Center
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Controls Panel */}
          <div className="lg:col-span-5 p-5 space-y-5 bg-slate-50/60 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Mode Switch Tabs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/80 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('crop')}
                  className={`py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'crop'
                      ? 'bg-white text-[#0066FF] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Crop className="w-3.5 h-3.5" />
                  <span>Crop, Zoom &amp; Fit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('adjust')}
                  className={`py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'adjust'
                      ? 'bg-white text-[#0066FF] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Color &amp; Lighting</span>
                </button>
              </div>

              {activeTab === 'crop' ? (
                <div className="space-y-4">
                  {/* Aspect Ratio Presets */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">
                      1. Choose Shape / Aspect Ratio
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-1.5">
                      {ASPECT_PRESETS.map((preset) => {
                        const active = selectedPreset === preset.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleSelectPreset(preset)}
                            className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                              active
                                ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-blue-500/20'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="text-xs font-black leading-tight">{preset.label}</div>
                            <div className={`text-[10px] truncate ${active ? 'text-blue-100' : 'text-slate-400'}`}>
                              {preset.sub}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Zoom Slider */}
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                        <ZoomIn className="w-3.5 h-3.5 text-[#0066FF]" />
                        2. Zoom In / Out
                      </span>
                      <span className="text-xs font-black text-[#0066FF]">{Math.round(zoom * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setZoom((z) => Number(Math.max(0.2, z - 0.1).toFixed(2)))}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="range"
                        min={0.2}
                        max={3.5}
                        step={0.02}
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="flex-1 accent-[#0066FF] cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => setZoom((z) => Number(Math.min(3.5, z + 0.1).toFixed(2)))}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Rotate & Flip Controls */}
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                        3. Rotate &amp; Flip
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        {rotation + fineAngle}°
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setRotation((r) => (r - 90) % 360)}
                        className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#0066FF] text-slate-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        title="Rotate Left 90°"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>-90°</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRotation((r) => (r + 90) % 360)}
                        className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#0066FF] text-slate-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        title="Rotate Right 90°"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>+90°</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFlipH((f) => !f)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                          flipH ? 'bg-[#0066FF] text-white' : 'bg-slate-100 hover:bg-blue-50 text-slate-700'
                        }`}
                        title="Flip Horizontal"
                      >
                        <FlipHorizontal className="w-3.5 h-3.5" />
                        <span>Flip H</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFlipV((f) => !f)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                          flipV ? 'bg-[#0066FF] text-white' : 'bg-slate-100 hover:bg-blue-50 text-slate-700'
                        }`}
                        title="Flip Vertical"
                      >
                        <FlipVertical className="w-3.5 h-3.5" />
                        <span>Flip V</span>
                      </button>
                    </div>

                    {/* Fine Straighten Slider */}
                    <div className="pt-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                        <span>Straighten Angle</span>
                        <span>{fineAngle > 0 ? `+${fineAngle}°` : `${fineAngle}°`}</span>
                      </div>
                      <input
                        type="range"
                        min={-45}
                        max={45}
                        step={1}
                        value={fineAngle}
                        onChange={(e) => setFineAngle(parseInt(e.target.value, 10))}
                        className="w-full accent-[#0066FF] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Background Fill Color (When zoomed out or transparent PNG) */}
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 space-y-2">
                    <span className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                      4. Backdrop Fill (For Fit Mode / Logos)
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {BG_OPTIONS.map((bg) => (
                        <button
                          key={bg.id}
                          type="button"
                          onClick={() => setBgColor(bg.color)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                            bgColor === bg.color
                              ? 'border-[#0066FF] bg-blue-50/80 text-[#0066FF] ring-2 ring-blue-500/20'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full border border-slate-300 ${bg.previewClass}`} />
                          <span>{bg.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Color & Lighting Adjustments Tab */
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/90 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span>Brightness</span>
                        <span className="text-[#0066FF] font-black">{brightness}%</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={150}
                        step={1}
                        value={brightness}
                        onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
                        className="w-full accent-[#0066FF] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span>Contrast</span>
                        <span className="text-[#0066FF] font-black">{contrast}%</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={150}
                        step={1}
                        value={contrast}
                        onChange={(e) => setContrast(parseInt(e.target.value, 10))}
                        className="w-full accent-[#0066FF] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span>Saturation / Vibrance</span>
                        <span className="text-[#0066FF] font-black">{saturation}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={200}
                        step={1}
                        value={saturation}
                        onChange={(e) => setSaturation(parseInt(e.target.value, 10))}
                        className="w-full accent-[#0066FF] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Custom Crop Box Width & Height Sliders */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/90 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                        Custom Frame Size
                      </span>
                      <span className="text-[11px] font-bold text-[#0066FF]">
                        {cropBox.width} × {cropBox.height}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                        <span>Frame Width</span>
                        <span>{cropBox.width}px</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={STAGE_WIDTH - 24}
                        value={cropBox.width}
                        onChange={(e) => {
                          setSelectedPreset('free');
                          setCropBox((prev) => ({ ...prev, width: parseInt(e.target.value, 10) }));
                        }}
                        className="w-full accent-[#0066FF] cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                        <span>Frame Height</span>
                        <span>{cropBox.height}px</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={STAGE_HEIGHT - 24}
                        value={cropBox.height}
                        onChange={(e) => {
                          setSelectedPreset('free');
                          setCropBox((prev) => ({ ...prev, height: parseInt(e.target.value, 10) }));
                        }}
                        className="w-full accent-[#0066FF] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reset Link */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-200/80">
              <button
                type="button"
                onClick={handleResetAll}
                className="text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Adjustments</span>
              </button>
              <span className="text-[11px] font-semibold text-slate-400">
                Auto WebP HD Optimization
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="px-5 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            {canSkipCrop && onSkipCrop && (
              <button
                type="button"
                onClick={onSkipCrop}
                disabled={processing}
                className="px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-[#0066FF] text-xs font-extrabold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Original (Skip Crop)</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleApplyCrop}
              disabled={processing || !imgLoaded}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {processing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Crop...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Apply Crop &amp; Upload</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
