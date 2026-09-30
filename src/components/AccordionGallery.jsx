import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { asset } from "../lib/asset";
import "./AccordionGallery.css";

const STUDIES = [
  {
    image: asset("artworks/wall-plaster.webp"),
    label: "Painted plaster",
    detail: "Warm, hand-painted wall surface",
    tool: "Substance 3D Designer",
    cursor: asset("artworks/cursor-substance-designer.svg"),
    alt: "Warm beige hand-painted plaster wall material with a diagonal Agrimart ownership watermark",
  },
  {
    image: asset("artworks/anime-grass.webp"),
    label: "Anime grass ground",
    detail: "A stylised base-colour texture for game environments",
    tool: "Substance 3D Designer",
    cursor: asset("artworks/cursor-substance-designer.svg"),
    alt: "Stylised green grass ground texture with a diagonal Agrimart ownership watermark",
  },
];

const TOOLS = [
  { name: "Blender", icon: asset("artworks/cursor-blender.svg") },
  { name: "Substance Designer", icon: asset("artworks/cursor-substance-designer.svg") },
  { name: "Substance Painter", icon: asset("artworks/cursor-substance-painter.svg") },
  { name: "Photoshop", icon: asset("artworks/cursor-photoshop.svg") },
  { name: "Godot", icon: asset("artworks/cursor-godot.svg") },
  { name: "Unreal Engine 5", icon: asset("artworks/cursor-unreal.svg") },
];

export default function AccordionGallery() {
  const rootRef = useRef(null);
  const panelsRef = useRef([]);
  const mediaRef = useRef([]);
  const timelineRef = useRef(null);
  const [active, setActive] = useState(0);
  const reducedMotion = typeof window !== "undefined"
    && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const applyLayout = useCallback((animate = true) => {
    const panels = panelsRef.current.filter(Boolean);
    if (!panels.length) return;
    timelineRef.current?.kill();
    const duration = animate && !reducedMotion ? 0.72 : 0;
    const timeline = gsap.timeline();
    panels.forEach((panel, index) => {
      const selected = index === active;
      timeline.to(panel, {
        flexGrow: selected ? 1.9 : 1,
        rotateY: selected ? 0 : index < active ? 2 : -2,
        duration,
        ease: "power4.out",
      }, 0);
      const media = mediaRef.current[index];
      if (media) timeline.to(media, {
        scale: selected ? 1 : 1.07,
        xPercent: selected ? 0 : index < active ? 1.5 : -1.5,
        duration,
        ease: "power4.out",
      }, 0);
    });
    timelineRef.current = timeline;
  }, [active, reducedMotion]);

  useEffect(() => {
    applyLayout(false);
    return () => timelineRef.current?.kill();
  }, [applyLayout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new ResizeObserver(() => applyLayout(false));
    observer.observe(root);
    return () => observer.disconnect();
  }, [applyLayout]);

  const move = (index) => setActive((index + STUDIES.length) % STUDIES.length);

  return (
    <section className="artwork-section" aria-labelledby="artwork-title">
      <div className="artwork-inner">
        <header className="artwork-heading reveal">
          <div>
            <span className="section-label">Material studies · 01—02</span>
            <h2 id="artwork-title" className="section-title">Made layer<br />by layer.</h2>
          </div>
          <p className="artwork-intro">
            Stylised surfaces built for game worlds. Select a study to explore it;
            more original work will join this gallery soon.
          </p>
        </header>

        <div className="artwork-shell reveal reveal-d1">
          <div className="artwork-shell-core">
            <div className="artwork-gallery-meta">
              <span>Texture library</span>
              <span>Hover, focus or tap to explore</span>
            </div>
            <div ref={rootRef} className="accordion-gallery" role="group" aria-label="Texture artwork">
              {STUDIES.map((study, index) => (
                <button
                  key={study.image}
                  ref={(node) => { panelsRef.current[index] = node; }}
                  className={`ag-panel${active === index ? " ag-panel--active" : ""}`}
                  type="button"
                  onMouseEnter={() => move(index)}
                  onFocus={() => move(index)}
                  onClick={() => move(index)}
                  onKeyDown={(event) => {
                    if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); move(index + 1); }
                    if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); move(index - 1); }
                  }}
                  aria-pressed={active === index}
                  aria-label={`${study.label}, created in ${study.tool}`}
                  style={{ cursor: `url("${study.cursor}") 16 16, pointer` }}
                >
                  <span className="ag-panel__frame">
                    <span className="ag-panel__media" ref={(node) => { mediaRef.current[index] = node; }}>
                      <img src={study.image} alt={study.alt} draggable="false" loading="lazy" />
                    </span>
                    <span className="ag-panel__shade" aria-hidden="true" />
                  </span>
                  <span className="ag-panel__caption">
                    <span className="ag-panel__index">0{index + 1} / 0{STUDIES.length}</span>
                    <span className="ag-panel__caption-title">{study.label}</span>
                    <span className="ag-panel__detail">{study.detail}</span>
                    <span className="ag-panel__tool">
                      <img src={study.cursor} alt="" aria-hidden="true" />
                      Made in {study.tool}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="artwork-tools reveal reveal-d2">
          <div className="artwork-tools-copy">
            <span className="artwork-tools-kicker">The toolkit</span>
            <span className="artwork-tools-note">Hover an application to see its cursor mark</span>
          </div>
          <div className="artwork-tool-list" aria-label="Creative applications">
            {TOOLS.map((tool) => (
              <span
                className="artwork-tool"
                key={tool.name}
                tabIndex={0}
                title={tool.name}
                style={{ cursor: `url("${tool.icon}") 16 16, pointer` }}
              >
                <img src={tool.icon} alt="" aria-hidden="true" />
                <span>{tool.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
