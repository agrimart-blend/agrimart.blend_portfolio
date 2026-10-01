import { useEffect, useRef } from "react";
import HeroFrames from "./HeroFrames";

export default function ParallaxHero() {
  const bgRef   = useRef(null);
  const txtRef  = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (bgRef.current)  bgRef.current.style.transform  = `translateY(${y * 0.38}px) scale(1.1)`;
      if (txtRef.current) txtRef.current.style.transform = `translateY(${y * 0.15}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg-wrap">
        <HeroFrames ref={bgRef} className="hero-bg-img" />
        <div className="hero-bg-gradient" />
      </div>

      {/* Geometric grid */}
      <div className="hero-grid-overlay" aria-hidden="true">
        {[...Array(8)].map((_,i) => (
          <div key={i} className="hero-grid-line-v" style={{ left:`${(i+1)*12.5}%` }} />
        ))}
        {[...Array(4)].map((_,i) => (
          <div key={i} className="hero-grid-line-h" style={{ top:`${(i+1)*25}%` }} />
        ))}
      </div>

      <div className="hero-content" ref={txtRef}>
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span>3D artist · Blender shaders · games</span>
        </div>
        <h1 className="hero-title">
          <span className="hero-title-line-1">AGRIMART</span>
          <span className="hero-title-line-2">.BLEND</span>
        </h1>
        <p className="hero-subtitle">Stylised 3D worlds · hand-painted skies · playable games</p>
        <div className="hero-ctas">
          <a href="#disciplines" className="hero-btn hero-btn-primary">View Work</a>
          <a href="https://agrimart.gumroad.com/l/paint" target="_blank" rel="noopener noreferrer"
             className="hero-btn hero-btn-outline">Get Arcane Shader ↗</a>
        </div>
      </div>
    </section>
  );
}
