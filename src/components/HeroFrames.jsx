import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { asset } from "../lib/asset";

const TOTAL = 38;
const FPS = 16;
const PATHS = Array.from({ length: TOTAL }, (_, i) =>
  asset(`hero-frames/f${String(i).padStart(3, "0")}.webp`)
);

/**
 * Lightweight autoplaying frame-sequence background for the hero.
 * Preloads once, then plays a cheap requestAnimationFrame loop that
 * ping-pongs across the sequence (no seam needed since the source
 * isn't a loop) — a single <canvas> redraw per tick, nothing else
 * touches the DOM, so it stays smooth even on modest hardware.
 */
const HeroFrames = forwardRef(function HeroFrames({ className }, forwardedRef) {
  const canvasRef = useRef(null);
  useImperativeHandle(forwardedRef, () => canvasRef.current, []);
  const imgsRef = useRef([]);
  const stateRef = useRef({ idx: 0, dir: 1, last: 0, ready: false });
  const rafRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const imgs = PATHS.map((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === 1) draw(0);
        if (loaded >= TOTAL && !cancelled) stateRef.current.ready = true;
      };
      return img;
    });
    imgsRef.current = imgs;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      draw(stateRef.current.idx);
    }

    function draw(idx) {
      const img = imgsRef.current[idx];
      if (!ctx || !canvas || !img?.complete || !img.naturalWidth) return;
      const W = canvas.width, H = canvas.height;
      const sc = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const w = img.naturalWidth * sc, h = img.naturalHeight * sc;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
    }

    function tick(t) {
      const s = stateRef.current;
      if (s.ready && t - s.last > 1000 / FPS) {
        s.last = t;
        s.idx += s.dir;
        if (s.idx >= TOTAL - 1 || s.idx <= 0) s.dir *= -1;
        draw(s.idx);
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
});

export default HeroFrames;
