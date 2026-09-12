import { useEffect, useRef, useState, useCallback } from "react";
import "./LogoLoop.css";

export default function LogoLoop({
  logos = [],
  speed = 80,
  direction = "left",
  logoHeight = 44,
  gap = 56,
  pauseOnHover = true,
  fadeOut = true,
  className = "",
}) {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);
  const seqRef       = useRef(null);
  const offsetRef    = useRef(0);
  const velRef       = useRef(0);
  const hovRef       = useRef(false);
  const rafRef       = useRef(null);
  const lastRef      = useRef(null);
  const [seqW, setSeqW] = useState(0);
  const [copies, setCopies] = useState(3);

  const measure = useCallback(() => {
    if (!seqRef.current || !containerRef.current) return;
    const sw = seqRef.current.getBoundingClientRect().width;
    if (sw > 0) {
      setSeqW(Math.ceil(sw));
      const cw = containerRef.current.clientWidth || window.innerWidth;
      setCopies(Math.max(3, Math.ceil(cw / sw) + 2));
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [logos, gap, logoHeight, measure]);

  useEffect(() => {
    const target = direction === "left" ? speed : -speed;
    const track = trackRef.current;
    if (!track || seqW === 0) return;

    const animate = (ts) => {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min((ts - lastRef.current) / 1000, 0.1);
      lastRef.current = ts;

      const t = (hovRef.current && pauseOnHover) ? 0 : target;
      const factor = 1 - Math.exp(-dt / 0.18);
      velRef.current += (t - velRef.current) * factor;

      offsetRef.current = ((offsetRef.current + velRef.current * dt) % seqW + seqW) % seqW;
      track.style.transform = `translateX(${-offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(rafRef.current); lastRef.current = null; };
  }, [speed, direction, seqW, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={`ll-root ${fadeOut ? "ll-fade" : ""} ${className}`}
      style={{ "--ll-gap": `${gap}px`, "--ll-h": `${logoHeight}px` }}
    >
      <div
        ref={trackRef}
        className="ll-track"
        onMouseEnter={() => { hovRef.current = true; }}
        onMouseLeave={() => { hovRef.current = false; }}
      >
        {Array.from({ length: copies }, (_, ci) => (
          <ul
            key={ci}
            className="ll-seq"
            ref={ci === 0 ? seqRef : undefined}
            aria-hidden={ci > 0}
          >
            {logos.map((logo, li) => (
              <li key={li} className="ll-item">
                {"node" in logo
                  ? logo.href
                    ? <a href={logo.href} target="_blank" rel="noreferrer" className="ll-link" title={logo.title}>{logo.node}</a>
                    : <span className="ll-node" title={logo.title}>{logo.node}</span>
                  : <img src={logo.src} alt={logo.alt || ""} className="ll-img" loading="lazy" />
                }
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
