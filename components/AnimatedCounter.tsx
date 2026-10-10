'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  // Parse string like "₹50Cr+", "1000+", "98%", "10+"
  const stringVal = String(value || '0').trim();
  
  // Extract prefix (e.g. ₹, $), numeric value (with optional decimals), and suffix (e.g. Cr+, +, %)
  const match = stringVal.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  const prefix = match ? match[1] : '';
  const targetNum = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : '';
  const isDecimal = match ? match[2].includes('.') : false;
  const decimalPlaces = isDecimal && match ? match[2].split('.')[1].length : 0;

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const startAnimation = () => {
      if (isNaN(targetNum) || targetNum === 0) {
        setDisplayValue(stringVal);
        return;
      }

      startTime = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // easeOutExpo for ultra smooth acceleration & soft deceleration
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = ease * targetNum;

        if (progress < 1) {
          const formattedNum = isDecimal 
            ? currentVal.toFixed(decimalPlaces) 
            : Math.floor(currentVal).toLocaleString();

          setDisplayValue(`${prefix}${formattedNum}${suffix}`);
          animationFrameId = requestAnimationFrame(animate);
        } else {
          // Reached original target
          setDisplayValue(stringVal);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    // IntersectionObserver to trigger animation when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            startAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    } else {
      startAnimation();
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [stringVal, targetNum, prefix, suffix, isDecimal, decimalPlaces, duration]);

  return (
    <span ref={elementRef} className={`inline-block tabular-nums transition-all ${className}`}>
      {displayValue}
    </span>
  );
}
