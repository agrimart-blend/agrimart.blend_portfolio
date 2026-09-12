import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./PageReveal.css";

export default function PageReveal({ onComplete }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const panels = el.querySelectorAll(".pr-panel");
    const logo   = el.querySelector(".pr-logo");
    const lines  = el.querySelectorAll(".pr-line");
    const corners = el.querySelectorAll(".pr-corner");
    const tag    = el.querySelector(".pr-tag");

    gsap.set(panels,  { xPercent: -105 });
    gsap.set(logo,    { opacity: 0, scale: 0.92 });
    gsap.set(lines,   { scaleX: 0, transformOrigin: "left center" });
    gsap.set(corners, { opacity: 0, scale: 0 });
    gsap.set(tag,     { opacity: 0, y: 8 });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
        gsap.set(el, { display: "none" });
      },
    });

    tl
      // Panels sweep in from left — staggered diagonals
      .to(panels, {
        xPercent: 0, duration: 0.5,
        stagger: { each: 0.055, ease: "power2.in" },
        ease: "power3.out",
      })
      // Logo snaps in
      .to(logo,    { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(1.6)" }, "-=0.1")
      .to(corners, { opacity: 1, scale: 1, duration: 0.22, stagger: 0.04, ease: "back.out(2)" }, "<+0.05")
      .to(lines,   { scaleX: 1, duration: 0.3, stagger: 0.06, ease: "power2.out" }, "<")
      .to(tag,     { opacity: 1, y: 0, duration: 0.2 }, "-=0.1")
      // Hold
      .to({}, { duration: 0.55 })
      // Exit: panels sweep right
      .to(lines,   { scaleX: 0, transformOrigin: "right center", duration: 0.18, stagger: 0.04 })
      .to(logo,    { opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.in" }, "<")
      .to(corners, { opacity: 0, scale: 0, duration: 0.15, stagger: 0.03 }, "<")
      .to(panels, {
        xPercent: 105, duration: 0.48,
        stagger: { each: 0.05, from: "end", ease: "power2.out" },
        ease: "power3.in",
      }, "-=0.1");

    return () => tl.kill();
  }, [onComplete]);

  // 6 diagonal panels — white + dark blue + sky blue alternating
  const PANELS = [
    { bg: "#ffffff", clip: "polygon(0 0,100% 0,92% 100%,0 100%)" },
    { bg: "#0f2744", clip: "polygon(2% 0,100% 0,98% 100%,0 100%)" },
    { bg: "#5ec8ff", clip: "polygon(0 0,100% 0,100% 100%,5% 100%)" },
    { bg: "#ffffff", clip: "polygon(0 0,98% 0,100% 100%,2% 100%)" },
    { bg: "#0f2744", clip: "polygon(5% 0,100% 0,95% 100%,0 100%)" },
    { bg: "#5ec8ff", clip: "polygon(0 0,100% 0,100% 100%,8% 100%)" },
  ];

  return (
    <div ref={ref} className="pr-overlay">
      {PANELS.map((p, i) => (
        <div key={i} className="pr-panel"
          style={{ background: p.bg, clipPath: p.clip }} />
      ))}

      {/* Centre logo block */}
      <div className="pr-logo">
        {/* Geometric bracket top */}
        <div className="pr-bracket pr-bracket-tl" />
        <div className="pr-bracket pr-bracket-tr" />

        <div className="pr-logo-name">
          <span className="pr-logo-main">AGRIMART</span>
          <span className="pr-logo-accent">.BLEND</span>
        </div>

        <div className="pr-lines">
          {[220,160,100,50].map((w,i) => (
            <div key={i} className="pr-line" style={{ width: w }} />
          ))}
        </div>

        <div className="pr-tag">3D · UE5 · PHOTOSHOP</div>

        {/* Bracket bottom */}
        <div className="pr-bracket pr-bracket-bl" />
        <div className="pr-bracket pr-bracket-br" />
      </div>

      {/* Corner decorations */}
      <div className="pr-corner pr-corner-tl"><div className="pr-corner-inner" /></div>
      <div className="pr-corner pr-corner-tr"><div className="pr-corner-inner" /></div>
      <div className="pr-corner pr-corner-bl"><div className="pr-corner-inner" /></div>
      <div className="pr-corner pr-corner-br"><div className="pr-corner-inner" /></div>
    </div>
  );
}
