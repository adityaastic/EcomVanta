'use client';

import React, { useState } from 'react';

export interface VideoHeroStatItem {
  value: string;
  label: string;
}

interface VideoHeroSectionProps {
  onOpenPopup?: () => void;
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
  videoUrl = 'https://youtu.be/VCPGMjCW0is?si=jRCSoA1B7x_wNaAv',
}: VideoHeroSectionProps) {
  const isDirect = isDirectVideoUrl(videoUrl);
  const videoId = isDirect ? '' : extractYouTubeId(videoUrl);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full mt-[88px] md:mt-[130px] aspect-video sm:aspect-auto sm:h-[480px] md:h-[560px] lg:h-[640px] xl:h-[720px] overflow-hidden bg-black"
    >
      {/* Fallback Poster Background while video loads (for YouTube) */}
      {!isDirect && (
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-700 ${
            videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Hero Video Poster"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* Video Player: Native HTML5 Video for uploaded files OR Scaled YouTube iframe */}
      <div className="w-full h-full overflow-hidden relative z-10">
        {isDirect ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onLoadedData={() => setVideoLoaded(true)}
          />
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`}
            title="Hero Video Banner"
            className="w-full h-full aspect-video sm:aspect-auto sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[100vw] sm:min-w-[177.78vh] sm:h-[56.25vw] sm:min-h-[100%] sm:scale-105 border-0 pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setVideoLoaded(true)}
          />
        )}
      </div>

      {/* Subtle white layer & very very light blue effect overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-white/[0.08]" />
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-[#0066FF]/[0.10] via-sky-400/[0.05] to-blue-500/[0.08]" />
    </section>
  );
}
