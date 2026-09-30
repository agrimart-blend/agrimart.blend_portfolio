import { useEffect, useRef } from "react";

/* Each checkpoint's `gap` controls the visual breathing room to the next. */
const CHECKPOINTS = [
  { n: 1, title: "Started with drawing", desc: "Sketchbooks and pencils became my first way to shape ideas and tell stories.", gap: 1.2 },
  { n: 2, title: "Art recognition", desc: "Earned awards and certificates for my creative work.", gap: 1.2 },
  { n: 3, title: "Moved into digital art", desc: "Brought traditional drawing into digital illustration, design and 3D.", gap: 1.2 },
  { n: 4, title: "Found my world in Blender", desc: "Built anime-inspired renders, hand-painted HDRIs and immersive environments.", gap: 1.5 },
  { n: 5, title: "First creative sale", desc: "Turned my art into a product and began sharing it with other creators.", gap: 1.2 },
  { n: 6, title: "Expanded the toolkit", desc: "Grew into Unreal Engine 5, Photoshop, Clip Studio Paint and more.", gap: 1.5 },
  { n: 7, title: "600+ product sales", desc: "Creative assets sold across Gumroad and CGTrader.", gap: 1.5 },
  { n: 8, title: "Creating interactive worlds", desc: "Building a Godot mobile racing game and an original 2D adventure, while continuing to explore real-time 3D.", current: true },
];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export default function RoadmapSection() {
  const spineRef = useRef(null);
  const fillRef  = useRef(null);

  useEffect(() => {
    const spine = spineRef.current;
    const fill  = fillRef.current;
    if (!spine || !fill) return;

    let raf = null;
    const update = () => {
      raf = null;
      const rect = spine.getBoundingClientRect();
      const vh = window.innerHeight;
      /* progress: 0 when the spine's top is at the bottom of the viewport,
         1 once its bottom has passed ~40% up the viewport */
      const total = rect.height + vh * 0.6;
      const scrolledPast = vh - rect.top;
      const progress = clamp(scrolledPast / total, 0, 1);
      fill.style.height = `${(progress * 100).toFixed(2)}%`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="roadmap" className="roadmap-section">
      <div className="roadmap-header reveal">
        <div className="section-label">Creative Journey</div>
        <h2 className="section-title roadmap-title">From Sketches<br/>to Playable Worlds</h2>
        <p className="roadmap-sub">DRAWING · DIGITAL ART · 3D · GAMES</p>
      </div>

      <div className="roadmap-track">
        <div className="roadmap-spine" ref={spineRef}>
          <div className="roadmap-line-track">
            <div className="roadmap-line-fill" ref={fillRef} />
          </div>

          {CHECKPOINTS.map((cp, i) => {
            /* a checkpoint's own `gap` is the distance to the NEXT node,
               so the node's margin-top comes from the PREVIOUS one's gap */
            const gapBefore = i === 0 ? 1 : (CHECKPOINTS[i - 1].gap ?? 1.2);
            return (
              <div
                key={cp.n}
                className={`roadmap-node reveal ${i % 2 === 0 ? "roadmap-node-l" : "roadmap-node-r"}`}
                style={{ "--rm-gap": gapBefore }}
              >
                <div className={`roadmap-dot${cp.current ? " roadmap-dot-current" : ""}`} />
                <div className="roadmap-card">
                  <span className="roadmap-cp">
                    CP.{String(cp.n).padStart(2, "0")}
                    {cp.current && <span className="roadmap-cp-live">NOW</span>}
                  </span>
                  <h3 className="roadmap-card-title">{cp.title}</h3>
                  <p className="roadmap-card-desc">{cp.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="roadmap-fog">
          <span className="roadmap-fog-label">// STILL CREATING</span>
        </div>
      </div>
    </section>
  );
}
