import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/asset";

const TOTAL = 112;
const FRAME_PATHS = Array.from({ length: TOTAL }, (_, i) =>
  asset(`frames/frame${String(i * 2).padStart(4, "0")}.jpg`)
);

const TEXT_STAGES = [
  { from: 0,    to: 0.20, h: "UE5 ENVIRONMENT",    s: "Real-time rendering" },
  { from: 0.20, to: 0.45, h: "STYLISED LANDSCAPE",  s: "Nanite · Lumen · Foliage" },
  { from: 0.45, to: 0.70, h: "OPEN WORLD",          s: "Dynamic lighting & atmosphere" },
  { from: 0.70, to: 1.00, h: "UNREAL ENGINE 5",     s: "Made by Agrimart.blend" },
];

export default function ScrollFrameCanvas() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const canvasRef  = useRef(null);
  const imgsRef    = useRef([]);
  const loadedRef  = useRef(0);
  const frameRef   = useRef(0);
  const rafRef     = useRef(null);

  const [pct,      setPct]     = useState(0);
  const [ready,    setReady]   = useState(false);
  const [frameNum, setFrameNum]= useState(0);
  const [stage,    setStage]   = useState(TEXT_STAGES[0]);

  /* ── preload ── */
  useEffect(() => {
    imgsRef.current = FRAME_PATHS.map(src => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedRef.current++;
        const p = Math.floor((loadedRef.current / TOTAL) * 100);
        setPct(p);
        if (loadedRef.current >= TOTAL) setReady(true);
      };
      return img;
    });
  }, []);

  /* ── draw ── */
  const draw = (idx) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const img = imgsRef.current[idx];
    if (!img?.complete || !img.naturalWidth) return;
    const W = c.width, H = c.height;
    const sc = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const w = img.naturalWidth * sc, h = img.naturalHeight * sc;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
  };

  /* ── resize canvas ── */
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      draw(frameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [ready]);

  /* ── scroll: toggle position:fixed when section is active ── */
  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const onScroll = () => {
      const rect    = section.getBoundingClientRect();
      const vh      = window.innerHeight;
      const scrolled  = -rect.top;                   // px scrolled into section
      const maxScroll = section.offsetHeight - vh;   // full scroll range the section reserves
      const holdBuffer = vh * 0.4;                   // tail of the range spent "hanging" on the last frame
      const animRange   = Math.max(1, maxScroll - holdBuffer);

      if (scrolled < 0) {
        /* ── BEFORE: not reached yet — sit in normal flow at the top of the
           section, already showing frame 0, so there's no pop-in once it pins ── */
        Object.assign(wrapper.style, {
          position:   "absolute",
          top:        "0",
          bottom:     "auto",
          left:       "0",
          width:      "100%",
          height:     "100vh",
          visibility: "visible",
          zIndex:     "",
        });
        if (frameRef.current !== 0) {
          frameRef.current = 0;
          setFrameNum(0);
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(() => draw(0));
        }
        setStage(TEXT_STAGES[0]);

      } else if (scrolled <= maxScroll) {
        /* ── ACTIVE: pin wrapper over viewport ── */
        Object.assign(wrapper.style, {
          position:   "fixed",
          top:        "0",
          left:       "0",
          width:      "100vw",
          height:     "100vh",
          visibility: "visible",
          zIndex:     "5",
        });

        /* resize canvas to full viewport if needed */
        const c = canvasRef.current;
        if (c && (c.width !== window.innerWidth || c.height !== vh)) {
          c.width  = window.innerWidth;
          c.height = vh;
        }

        /* progress saturates at 1 before scrolled reaches maxScroll, so the
           last frame "hangs" for the holdBuffer stretch instead of cutting
           straight to the next section */
        const progress = Math.min(1, scrolled / animRange);
        const f = Math.min(TOTAL - 1, Math.floor(progress * (TOTAL - 1)));
        if (f !== frameRef.current) {
          frameRef.current = f;
          setFrameNum(f);
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(() => draw(f));
        }

        const s = TEXT_STAGES.find(t => progress >= t.from && progress < t.to)
               || TEXT_STAGES[TEXT_STAGES.length - 1];
        setStage(s);

      } else {
        /* ── AFTER: fully scrolled past — back into document flow, hidden.
           Force the canvas to hold the FINAL frame before hiding it, so a
           fast/programmatic scroll (anchor jump, restored scroll position,
           refresh while scrolled down) can never skip straight past the
           sequence without the last frame ever having been painted — and
           scrolling back up shows the correct frame immediately instead of
           a stale/blank one. ── */
        const last = TOTAL - 1;
        if (frameRef.current !== last) {
          frameRef.current = last;
          setFrameNum(last);
          draw(last);
        }
        setStage(TEXT_STAGES[TEXT_STAGES.length - 1]);
        Object.assign(wrapper.style, {
          position:   "absolute",
          top:        "auto",
          bottom:     "0",
          left:       "0",
          width:      "100%",
          height:     "100vh",
          visibility: "hidden",
          zIndex:     "",
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ready]);

  return (
    /*
      Section is 320vh tall — provides scroll-track for the frame animation.
      Background is transparent so NO black space appears when wrapper is hidden.
      The fixed wrapper covers viewport only while the section is active.
    */
    <section
      ref={sectionRef}
      id="scroll-animation"
      style={{ position: "relative", height: "320vh", background: "transparent" }}
    >
      <div
        ref={wrapperRef}
        style={{
          position:   "absolute",
          top:        0, left: 0,
          width:      "100%",
          height:     "100vh",
          overflow:   "hidden",
          background: "#0a0c0f",
          visibility: "hidden",   /* shown only when fixed */
        }}
      >
        {/* canvas */}
        <canvas ref={canvasRef}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block" }}
        />

        {/* vignette */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(ellipse at center,transparent 50%,rgba(10,12,15,.65) 100%)"
        }} />

        {/* HUD: corner brackets */}
        {[
          ["tl", { top:"1.5rem",    left:"1.8rem"  }],
          ["tr", { top:"1.5rem",    right:"1.8rem" }],
          ["bl", { bottom:"1.8rem", left:"1.8rem"  }],
          ["br", { bottom:"1.8rem", right:"1.8rem" }],
        ].map(([k, pos]) => (
          <div key={k} style={{
            position:"absolute", ...pos, fontSize:"1.3rem", lineHeight:1,
            color:"rgba(247,245,240,.22)", pointerEvents:"none", fontFamily:"monospace",
          }}>
            {k==="tl"?"┌":k==="tr"?"┐":k==="bl"?"└":"┘"}
          </div>
        ))}

        {/* HUD: labels */}
        <div style={{ position:"absolute", top:"1.9rem", left:"3.8rem",
          fontFamily:"Space Mono,monospace", fontSize:".6rem", letterSpacing:".18em",
          textTransform:"uppercase", color:"rgba(247,245,240,.45)", pointerEvents:"none" }}>
          UE5_RENDER_SEQ
        </div>
        <div style={{ position:"absolute", top:"1.9rem", right:"3.8rem",
          fontFamily:"Space Mono,monospace", fontSize:".6rem", letterSpacing:".18em",
          textTransform:"uppercase", color:"rgba(247,245,240,.45)", pointerEvents:"none",
          textAlign:"right" }}>
          AGRIMART.BLEND
        </div>
        <div style={{ position:"absolute", bottom:"1.9rem", right:"3.8rem",
          fontFamily:"Space Mono,monospace", fontSize:".6rem", letterSpacing:".18em",
          textTransform:"uppercase", color:"rgba(247,245,240,.4)", pointerEvents:"none",
          textAlign:"right" }}>
          {ready
            ? `${String(frameNum).padStart(3,"0")} / ${TOTAL - 1}`
            : `LOADING ${pct}%`}
        </div>

        {/* Scanline */}
        <div style={{
          position:"absolute", left:0, right:0, height:"2px", pointerEvents:"none",
          background:"linear-gradient(90deg,transparent,rgba(247,245,240,.08),transparent)",
          animation:"dgScanline 6s linear infinite",
        }} />
        <style>{`@keyframes dgScanline{0%{top:0}100%{top:100%}}`}</style>

        {/* Dynamic text overlay — bottom left */}
        {ready && (
          <div style={{
            position:"absolute", bottom:"clamp(3rem,6vh,5rem)", left:"3.8rem",
            pointerEvents:"none",
          }}>
            <div style={{
              fontFamily:"Bebas Neue,cursive",
              fontSize:"clamp(1.8rem,4vw,3.2rem)",
              letterSpacing:".06em", color:"#f7f5f0", lineHeight:1,
              marginBottom:".4rem", textShadow:"0 2px 20px rgba(0,0,0,.6)",
            }}>
              {stage.h}
            </div>
            <div style={{
              fontFamily:"Space Mono,monospace",
              fontSize:".65rem", letterSpacing:".2em",
              textTransform:"uppercase", color:"rgba(247,245,240,.45)",
            }}>
              {stage.s}
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {!ready && (
          <div style={{
            position:"absolute", top:"50%", left:"50%",
            transform:"translate(-50%,-50%)", textAlign:"center",
            color:"rgba(247,245,240,.4)", fontFamily:"Space Mono,monospace",
            fontSize:".72rem", letterSpacing:".2em", textTransform:"uppercase",
          }}>
            <div>Loading render sequence…</div>
            <div style={{ color:"#c9613a", marginTop:".5rem", fontSize:"1.1rem" }}>{pct}%</div>
          </div>
        )}
      </div>
    </section>
  );
}
