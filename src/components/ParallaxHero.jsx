import { useEffect, useRef } from "react";

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
        <img ref={bgRef} src="/ue5.jpg" alt="UE5 environment" className="hero-bg-img"
          onError={e => { e.target.src = "/sky.jpg"; }} />
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
          <span>3D Artist · Blender · UE5 · Photoshop</span>
        </div>
        <h1 className="hero-title">
          <span className="hero-title-line-1">AGRIMART</span>
          <span className="hero-title-line-2">.BLEND</span>
        </h1>
        <p className="hero-subtitle">Handpainted HDRIs · Anime Environments · Digital Assets</p>
        <div className="hero-ctas">
          <a href="#disciplines" className="hero-btn hero-btn-primary">View Work</a>
          <a href="https://agrimart.gumroad.com/" target="_blank" rel="noopener"
             className="hero-btn hero-btn-outline">Browse Store ↗</a>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-dot" />
        <div className="scroll-track"><div className="scroll-track-fill" /></div>
        <span style={{ fontSize:".55rem", letterSpacing:".2em", color:"var(--muted)", marginTop:".3rem" }}>
          SCROLL
        </span>
      </div>
      <div className="hero-corner hero-corner-bl">AGRIM KAUSHAL — 2026</div>
      <div className="hero-corner hero-corner-br">BLENDER · UE5 · ART</div>
    </section>
  );
}
