import React, { useEffect, useRef, useState, useId, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localHeroBg from '../assets/images/hero-bg.png';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface IrisScrollMaskProps {
  /** The main cinematic background photograph */
  image?: string;
  /** Reveal variant */
  variant?: 'iris' | string;
  /** Number of coordinated mask columns/segments (default: 9) */
  columns?: number;
  /** Settle threshold where reveal completes seamlessly (default: 0.84) */
  settle?: number;
  /** Stagger intensity across segments from center outward (default: 0.55) */
  stagger?: number;
  /** Center origin X percentage (default: 50) */
  originX?: number | string;
  /** Center origin Y percentage (default: 50) */
  originY?: number | string;
  /** Corner radius for segments in pixels (default: 18) */
  radius?: number;
  /** Image fit (default: cover) */
  fit?: 'cover' | 'contain';
  /** Lerp smoothing factor for scroll inertia (default: 0.14) */
  smooth?: number;
  /** Orientation angle of the iris segmentation in degrees (default: 108) */
  angle?: number;
  /** Cinematic dark overlay opacity above image (default: 0.34) */
  overlay?: number;
  /** Scroll track length multiplier relative to viewport height (default: 1.7) */
  scrollLength?: number | string;
  /** Edge feathering percentage (default: 14) */
  feather?: number;
  /** Image zoom / overscan multiplier to prevent visible edges (default: 1.14) */
  zoom?: number;
  /** Base background color behind unrevealed areas (default: #0a0a0a) */
  background?: string;
  /** Content to render above the mask (headings, CTAs, navigation) */
  children?: React.ReactNode;
  /** Additional container classes */
  className?: string;
  /** ID for accessibility and targeting */
  id?: string;
  /** Callback fired when normalized progress changes */
  onProgress?: (progress: number) => void;
}

export const IrisScrollMask: React.FC<IrisScrollMaskProps> = ({
  image = 'https://i.ibb.co/sJWv8vZQ/hero-bg.png',
  variant = 'iris',
  columns = 9,
  settle = 0.84,
  stagger = 0.55,
  originX = 50,
  originY = 50,
  radius = 18,
  fit = 'cover',
  smooth = 0.14,
  angle = 108,
  overlay = 0.34,
  scrollLength = 1.7,
  feather = 14,
  zoom = 1.14,
  background = '#0a0a0a',
  children,
  className = '',
  id = 'iris-scroll-mask',
  onProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState(image);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Live viewport stage dimensions state for SVG viewBox and coordinate system
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  const uniqueId = useId().replace(/:/g, '-');
  const maskId = `iris-mask-${uniqueId}`;
  const filterId = `iris-feather-${uniqueId}`;

  // Normalized origin percentages
  const origXNum = typeof originX === 'number' ? originX : parseFloat(originX) || 50;
  const origYNum = typeof originY === 'number' ? originY : parseFloat(originY) || 50;

  // Normalized scroll lengths (1.7 * 100vh = 170vh track)
  const numScrollLength = typeof scrollLength === 'number' ? scrollLength : parseFloat(scrollLength) || 1.7;

  // Geometry ref to allow 60fps animation ticker to access real-time geometry without tearing down context
  const geomRef = useRef({
    width: 1920,
    height: 1080,
    centerX: 960,
    centerY: 540,
    maskSpan: 3000,
    colWidth: 333,
    centerIndex: (columns - 1) / 2,
    radius: radius,
    stagger: stagger,
    settle: settle,
    smooth: smooth,
    angle: angle,
  });

  // Keep configuration values in sync inside geometry ref
  useEffect(() => {
    geomRef.current.radius = radius;
    geomRef.current.stagger = stagger;
    geomRef.current.settle = settle;
    geomRef.current.smooth = smooth;
    geomRef.current.angle = angle;
    geomRef.current.centerIndex = (columns - 1) / 2;
  }, [radius, stagger, settle, smooth, angle, columns]);

  // Recalculate geometry for a given width and height
  const updateGeometry = useCallback((w: number, h: number) => {
    const validW = Math.max(300, Math.round(w));
    const validH = Math.max(400, Math.round(h));
    const centerX = (validW * origXNum) / 100;
    const centerY = (validH * origYNum) / 100;
    const diagonal = Math.hypot(validW, validH);
    // Guarantees complete 100% cover across all aspect ratios (mobile vertical to ultrawide horizontal)
    const maskSpan = diagonal * 1.55;
    const colWidth = maskSpan / columns;
    const centerIndex = (columns - 1) / 2;

    geomRef.current.width = validW;
    geomRef.current.height = validH;
    geomRef.current.centerX = centerX;
    geomRef.current.centerY = centerY;
    geomRef.current.maskSpan = maskSpan;
    geomRef.current.colWidth = colWidth;
    geomRef.current.centerIndex = centerIndex;

    setDimensions({ width: validW, height: validH });
  }, [columns, origXNum, origYNum]);

  // Handle stage dimensions dynamically with ResizeObserver for mobile, tablet, desktop, & orientation changes
  useEffect(() => {
    if (!stageRef.current) return;

    const handleResize = () => {
      if (stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        const w = rect.width || window.innerWidth;
        const h = rect.height || window.innerHeight;
        updateGeometry(w, h);

        // Update rotate center on SVG mask group immediately
        if (maskGroupRef.current) {
          const cX = (w * origXNum) / 100;
          const cY = (h * origYNum) / 100;
          maskGroupRef.current.setAttribute('transform', `rotate(${angle}, ${cX}, ${cY})`);
        }

        ScrollTrigger.refresh();
      }
    };

    handleResize();

    const observer = new ResizeObserver(() => {
      handleResize();
    });

    observer.observe(stageRef.current);
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [updateGeometry, origXNum, origYNum, angle]);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Preload image with automatic local fallback
  useEffect(() => {
    let active = true;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      if (active) {
        setImageSrc(image);
        setImageLoaded(true);
      }
    };
    img.onerror = () => {
      if (active) {
        setImageSrc(localHeroBg);
        setImageLoaded(true);
      }
    };

    return () => {
      active = false;
    };
  }, [image]);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current || prefersReducedMotion) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId: number;
    let scrollTriggerInstance: ScrollTrigger | null = null;

    const ctx = gsap.context(() => {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * numScrollLength}`,
        pin: stageRef.current,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetProgress = self.progress;
        },
      });

      // Smooth RAF Lerp loop adhering to smooth: 0.14 & settle: 0.84
      const updateMaskFrame = () => {
        const { smooth: currentSmooth, settle: currentSettle, stagger: currentStagger, centerX, centerY, maskSpan, colWidth, centerIndex, radius: currentRadius } = geomRef.current;

        const diff = targetProgress - currentProgress;
        if (Math.abs(diff) > 0.0002) {
          currentProgress += diff * currentSmooth;
        } else {
          currentProgress = targetProgress;
        }

        const p = Math.max(0, Math.min(1, currentProgress));

        if (onProgress) {
          onProgress(p);
        }

        // Update mask segments directly for 60fps GPU performance
        if (maskGroupRef.current) {
          const rects = maskGroupRef.current.querySelectorAll<SVGRectElement>('.iris-segment');

          rects.forEach((rect, i) => {
            // Distance of segment from center column (0 at center, 1 at outermost edges)
            const distFromCenter = Math.abs(i - centerIndex) / Math.max(1, centerIndex);

            // Stagger offset calculation: center opens first, then lateral columns follow smoothly
            const staggerDelay = distFromCenter * currentStagger * 0.45;

            // Map progress with settle curve
            const rawProgress = (p - staggerDelay) / (1 - staggerDelay * 0.8);
            const clampedProgress = Math.max(0, Math.min(1, rawProgress));

            // Settle acceleration: as progress reaches settle threshold (0.84), expand seamlessly to 100% full coverage
            let segmentProgress: number;
            if (clampedProgress >= currentSettle) {
              const settleNorm = (clampedProgress - currentSettle) / (1 - currentSettle);
              segmentProgress = currentSettle + (1 - currentSettle) * Math.pow(settleNorm, 0.45);
            } else {
              segmentProgress = Math.pow(clampedProgress, 1.35);
            }

            // Segment dimension calculations in live stage coordinate space:
            const centerOffset = (i - centerIndex) * colWidth;

            // Aperture scaling from origin
            const expansion = Math.max(0, segmentProgress);
            const scaleY = expansion <= 0 ? 0.001 : Math.min(1.6, expansion * 1.55);
            const scaleX = expansion <= 0 ? 0.001 : Math.min(1.45, 0.88 + expansion * 0.54);

            const segmentHeight = maskSpan * scaleY;
            const segmentWidth = colWidth * 1.15 * scaleX;

            const x = centerX + centerOffset * (0.35 + 0.65 * scaleX) - segmentWidth / 2;
            const y = centerY - segmentHeight / 2;

            rect.setAttribute('x', x.toFixed(2));
            rect.setAttribute('y', y.toFixed(2));
            rect.setAttribute('width', segmentWidth.toFixed(2));
            rect.setAttribute('height', segmentHeight.toFixed(2));
            rect.setAttribute('rx', (currentRadius * (0.5 + 0.5 * expansion)).toFixed(1));
            rect.setAttribute('ry', (currentRadius * (0.5 + 0.5 * expansion)).toFixed(1));
            rect.setAttribute('opacity', Math.min(1, expansion * 2.5).toFixed(3));
          });
        }

        // Update subtle cinematic overlay opacity
        if (overlayRef.current) {
          const dynamicOverlay = overlay + (1 - p) * 0.28;
          overlayRef.current.style.opacity = dynamicOverlay.toFixed(3);
        }

        rafId = requestAnimationFrame(updateMaskFrame);
      };

      rafId = requestAnimationFrame(updateMaskFrame);
    }, containerRef);

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      ctx.revert();
    };
  }, [
    columns,
    overlay,
    numScrollLength,
    prefersReducedMotion,
    onProgress,
  ]);

  // Center point and initial coordinates
  const initialCenterX = (dimensions.width * origXNum) / 100;
  const initialCenterY = (dimensions.height * origYNum) / 100;
  const initialDiagonal = Math.hypot(dimensions.width, dimensions.height);
  const initialMaskSpan = initialDiagonal * 1.55;
  const initialColWidth = initialMaskSpan / columns;
  const initialCenterIndex = (columns - 1) / 2;

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full ${className}`}
      style={{
        backgroundColor: background,
        minHeight: prefersReducedMotion ? '100vh' : `calc(100vh + ${numScrollLength * 100}vh)`,
      }}
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="relative w-full h-screen min-h-[600px] overflow-hidden flex flex-col justify-between"
        style={{
          backgroundColor: background,
        }}
      >
        {/* Layer 1: Solid Base Background */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ backgroundColor: background }}
        />

        {/* 
          Layer 2: Continuous Single Photograph with SVG Iris Mask System
          The image covers 100% of the viewport (with 1.14x overscan zoom to eliminate edge gaps),
          maintains true aspect ratio without stretching, and is revealed through the 9-column Iris mask.
        */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden flex items-center justify-center"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: `${origXNum}% ${origYNum}%`,
          }}
        >
          {prefersReducedMotion ? (
            /* Accessible fallback for reduced motion: crisp continuous image covering the hero */
            <img
              src={imageSrc}
              alt="Hero background"
              className="w-full h-full object-cover object-center"
              style={{ objectFit: fit }}
            />
          ) : (
            <svg
              className="w-full h-full block select-none pointer-events-none"
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Subtle edge feather filter based on feather: 14% */}
                <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation={feather * 0.45} />
                </filter>

                {/* 
                  The 9-Segment Iris Mask:
                  Oriented at angle (108deg) around center (centerX, centerY)
                */}
                <mask
                  id={maskId}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width={dimensions.width}
                  height={dimensions.height}
                >
                  {/* Black mask background (concealed) */}
                  <rect x="0" y="0" width={dimensions.width} height={dimensions.height} fill="black" />

                  {/* 9 Coordinated Iris Segments rotated at 108° with feathering */}
                  <g
                    ref={maskGroupRef}
                    transform={`rotate(${angle}, ${initialCenterX}, ${initialCenterY})`}
                    filter={`url(#${filterId})`}
                  >
                    {Array.from({ length: columns }).map((_, i) => {
                      const centerOffset = (i - initialCenterIndex) * initialColWidth;
                      const initialW = initialColWidth * 1.15 * 0.001;
                      const initialH = initialMaskSpan * 0.001;
                      return (
                        <rect
                          key={i}
                          className="iris-segment"
                          x={initialCenterX + centerOffset * 0.35 - initialW / 2}
                          y={initialCenterY - initialH / 2}
                          width={initialW}
                          height={initialH}
                          rx={radius}
                          ry={radius}
                          fill="white"
                          opacity="0"
                        />
                      );
                    })}
                  </g>
                </mask>
              </defs>

              {/* 
                Single continuous photograph rendered inside SVG matching exact stage dimensions.
                Uses preserveAspectRatio="xMidYMid slice" (object-fit: cover equivalent)
                Ensures 100% full cover across mobile, tablet, desktop, and ultrawide.
              */}
              <image
                href={imageSrc}
                x="0"
                y="0"
                width={dimensions.width}
                height={dimensions.height}
                preserveAspectRatio="xMidYMid slice"
                mask={`url(#${maskId})`}
                className={`transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </svg>
          )}
        </div>

        {/* 
          Layer 3: Cinematic Overlay (dark gradient & radial vignette) 
          Preserves the high-end luxury dark atmosphere without obscuring the photograph.
        */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none z-15 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-[#0a0a0a]/60"
          style={{ opacity: overlay }}
        />
        <div className="absolute inset-0 pointer-events-none z-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/25 to-[#0a0a0a]/75" />

        {/* 
          Layer 4: Hero Content & UI (Headings, CTAs, Scroll Cues, Children)
          Positioned securely on top of mask and image with high z-index.
        */}
        <div className="relative z-30 w-full h-full flex flex-col justify-between pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default IrisScrollMask;

