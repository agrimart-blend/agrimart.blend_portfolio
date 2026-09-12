import { useEffect, useRef } from "react";

/*
 * Each checkpoint's `gap` is the relative scroll distance to the NEXT
 * checkpoint — bigger gap = more time passed in real life = a longer
 * stretch of "road" between the two nodes.
 */
const CHECKPOINTS = [
  { n: 1,  title: "Being a Student",        desc: "Where it all began — just a kid in school.",                                                   gap: 4 },
  { n: 2,  title: "Getting Into Art",       desc: "The hand-drawn era — sketchbooks, pencils, and endless doodles.",                               gap: 2 },
  { n: 3,  title: "Awards & Certificates",  desc: "Racked up recognitions for the craft.",                                                         gap: 2 },
  { n: 4,  title: "Passing 10th",           desc: "Cleared a major milestone in school.",                                                          gap: 2 },
  { n: 5,  title: "First PC / Laptop",      desc: "The machine that opened the digital door.",                                                     gap: 1 },
  { n: 6,  title: "Started Using Blender",  desc: "First steps into 3D.",                                                                           gap: 2 },
  { n: 7,  title: "Made First Sale",        desc: "Turned skill into income for the first time.",                                                  gap: 3 },
  { n: 8,  title: "Learned New Software",   desc: "Clip Studio Paint, UE5, Substance Designer, Substance Painter, Photoshop.",                     gap: 2 },
  { n: 9,  title: "600+ Sales",             desc: "Hundreds of 3D art pieces — 600+ sales across Gumroad & CGTrader.",                              gap: 2 },
  { n: 10, title: "The Learning Phase",     desc: "Learning UE5, making a game in Godot, learning After Effects — the road keeps going.", current: true },
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
        <div className="section-label">Journey</div>
        <h2 className="section-title roadmap-title">The Road<br/>So Far</h2>
        <p className="roadmap-sub">22 AUG 2007 — PRESENT</p>
      </div>

      <div className="roadmap-track">
        <div className="roadmap-spine" ref={spineRef}>
          <div className="roadmap-line-track">
            <div className="roadmap-line-fill" ref={fillRef} />
          </div>

          {/* Birth marker */}
          <div className="roadmap-node roadmap-node-birth reveal">
            <div className="roadmap-dot roadmap-dot-birth" />
            <div className="roadmap-card roadmap-card-birth">
              <span className="roadmap-cp">ORIGIN</span>
              <h3 className="roadmap-card-title">Born</h3>
              <p className="roadmap-card-desc roadmap-card-date">22 August 2007</p>
            </div>
          </div>

          {CHECKPOINTS.map((cp, i) => {
            /* a checkpoint's own `gap` is the distance to the NEXT node,
               so the node's margin-top comes from the PREVIOUS one's gap */
            const gapBefore = i === 0 ? 3 : (CHECKPOINTS[i - 1].gap ?? 3);
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
          <span className="roadmap-fog-label">// UNWRITTEN</span>
        </div>
      </div>
    </section>
  );
}
