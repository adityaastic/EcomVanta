'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export interface VideoHeroStatItem {
  value: string;
  label: string;
}

interface VideoHeroSectionProps {
  onOpenPopup: () => void;
  videoUrl?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  stats?: VideoHeroStatItem[];
}

function extractYouTubeId(url: string): string {
  if (!url) return 'VCPGMjCW0is';
  const cleanUrl = url.trim();
  const match = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : cleanUrl.length === 11 ? cleanUrl : 'VCPGMjCW0is';
}

function isDirectVideoUrl(url: string): boolean {
  if (!url) return false;
  const clean = url.trim().toLowerCase();
  return (
    /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(clean) ||
    clean.startsWith('/uploads/') ||
    clean.includes('/storage/v1/object/public/') ||
    clean.startsWith('data:video/')
  );
}

export default function VideoHeroSection({
  onOpenPopup,
  videoUrl = 'https://youtu.be/VCPGMjCW0is?si=jRCSoA1B7x_wNaAv',
  title = '',
  subtitle = 'From Strategy to Execution',
  buttonText = 'Get Started',
}: VideoHeroSectionProps) {
  const isDirect = isDirectVideoUrl(videoUrl);
  const videoId = isDirect ? '' : extractYouTubeId(videoUrl);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full mt-[88px] md:mt-[130px] min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center overflow-hidden bg-white text-slate-900 border-b border-slate-100"
    >
      {/* Fallback Poster Background while video loads (for YouTube) */}
      {!isDirect && (
        <div className="absolute inset-0 z-0">
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Hero Video Poster"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-35' : 'opacity-85'
            }`}
            loading="eager"
          />
        </div>
      )}

      {/* Video Player: Native HTML5 Video for uploaded files OR Scaled YouTube iframe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {isDirect ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover pointer-events-none"
            onLoadedData={() => setVideoLoaded(true)}
          />
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&disablekb=1`}
            title="Hero Video Banner"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] min-w-[177.78vh] h-[56.25vw] min-h-[100%] scale-105 pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setVideoLoaded(true)}
          />
        )}
      </div>

      {/* Very Minimal White Blur Layer — subtle sheer film keeping video crisp & clearly visible */}
      <div className="absolute inset-0 z-10 bg-white/15 backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/35 via-transparent to-white/40 pointer-events-none" />

      {/* Soft top & bottom subtle transitions */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/50 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/50 to-transparent pointer-events-none z-10" />

      {/* Centered Hero Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24">
        {title && title.trim() !== '' && title !== 'Enabling E-commerce Globally' && (
          <p className="text-base sm:text-lg font-bold text-slate-700 uppercase tracking-widest mb-3 drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]">
            {title}
          </p>
        )}

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.14] drop-shadow-[0_2px_16px_rgba(255,255,255,0.9)]">
          {subtitle || 'From Strategy to Execution'}
        </h1>

        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <button
            onClick={onOpenPopup}
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-[#1c4b27] hover:bg-[#153a1e] text-white font-extrabold text-base sm:text-lg shadow-[0_10px_25px_rgba(28,75,39,0.35)] hover:shadow-[0_15px_30px_rgba(28,75,39,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border border-emerald-600/30 group"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-emerald-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
