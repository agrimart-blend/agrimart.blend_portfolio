import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { asset } from "../lib/asset";
import "./AccordionGallery.css";

const STUDIES = [
  {
    image: asset("art/meteor.webp"),
    label: "Meteor night",
    detail: "An anime-inspired scene lit by twin falling stars",
    tool: "Blender",
    cursor: asset("artworks/cursor-blender.svg"),
    alt: "Blender scene of a stylised Japanese village under two falling stars",
  },
  {
    image: asset("art/santorini.webp"),
    label: "Santorini café",
    detail: "A painterly Mediterranean street and café environment",
    tool: "Blender",
    cursor: asset("artworks/cursor-blender.svg"),
    alt: "Painterly 3D render of a white Mediterranean café and blue doorway",
  },
  {
    image: asset("artworks/wall-plaster.webp"),
    label: "Painted plaster",
    detail: "Warm, hand-painted wall surface",
    tool: "Substance Designer",
    cursor: asset("artworks/cursor-substance-designer.svg"),
    alt: "Warm beige hand-painted plaster wall material with a diagonal Agrimart ownership watermark",
  },
  {
    image: asset("artworks/anime-grass.webp"),
    label: "Anime grass ground",
    detail: "A stylised base-colour texture for game environments",
    tool: "Substance Designer",
    cursor: asset("artworks/cursor-substance-designer.svg"),
    alt: "Stylised green grass ground texture with a diagonal Agrimart ownership watermark",
  },
  {
    image: asset("ue5.jpg"),
    label: "Stylised landscape",
    detail: "A real-time environment built and lit in Unreal Engine 5",
    tool: "Unreal Engine 5",
    cursor: asset("artworks/cursor-unreal.svg"),
    alt: "Stylised real-time landscape environment created in Unreal Engine 5",
  },
  {
    image: asset("free-drive/lighthouse-island.webp"),
    label: "Free Drive World",
    detail: "Island coast environment made in Blender and used in the Godot mobile game",
    tool: "Godot · Blender environment",
    cursor: asset("artworks/cursor-godot.svg"),
    alt: "Sunset island coastline environment from Free Drive World, made in Blender for Godot",
  },
  {
    image: asset("wallfall/shot-1.webp"),
    label: "Wallfall Barricade",
    detail: "A live strategy game with Nakama online multiplayer",
    tool: "Godot · Nakama",
    cursor: asset("artworks/cursor-godot.svg"),
    alt: "Wallfall Barricade gameplay screenshot showing the tactical board and online match controls",
  },
  {
    image: asset("games/pixel-adventure-gameplay.png"),
    label: "2D adventure · WIP",
    detail: "Early gameplay from an original pixel-art adventure",
    tool: "Game in development",
    cursor: asset("artworks/cursor-2d.svg"),
    fit: "contain",
    alt: "Early pixel-art gameplay screenshot from an original 2D adventure game in development",
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
  const captionsRef = useRef([]);
  const timelineRef = useRef(null);
  const [active, setActive] = useState(0);
  const reducedMotion = typeof window !== "undefined"
    && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const applyLayout = useCallback((animate = true) => {
    const panels = panelsRef.current.filter(Boolean);
    if (!panels.length) return;
    timelineRef.current?.kill();
    const duration = animate && !reducedMotion ? 0.72 : 0;
    const expandedGrow = (0.52 * (panels.length - 1)) / (1 - 0.52);
    const timeline = gsap.timeline();
    panels.forEach((panel, index) => {
      const selected = index === active;
      timeline.to(panel, {
        flexGrow: selected ? expandedGrow : 1,
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
      const caption = captionsRef.current[index];
      if (caption) timeline.to(caption, {
        autoAlpha: selected ? 1 : 0,
        x: selected ? 0 : 12,
        duration: duration * 0.75,
        ease: "power4.out",
      }, 0);
    });
    timelineRef.current = timeline;
  }, [active, reducedMotion]);

  useEffect(() => {
    applyLayout(false);
    return () => timelineRef.current?.kill();
  }, [applyLayout]);

  const move = (index) => setActive((index + STUDIES.length) % STUDIES.length);

  return (
    <section className="artwork-section" aria-labelledby="artwork-title">
      <div className="artwork-inner">
        <header className="artwork-heading reveal">
          <div>
            <span className="section-label">Selected work · 01—08</span>
            <h2 id="artwork-title" className="section-title">Pixels to<br />playable worlds.</h2>
          </div>
          <p className="artwork-intro">
            Rendered scenes, hand-painted materials and playable worlds, each paired
            with the tools behind it. More work is on the way.
          </p>
        </header>

        <div className="artwork-shell reveal reveal-d1">
          <div className="artwork-shell-core">
            <div className="artwork-gallery-meta">
              <span>Artwork index</span>
              <span>Hover, focus or tap to explore</span>
            </div>
            <div ref={rootRef} className="accordion-gallery" role="group" aria-label="Selected creative work">
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
                  aria-label={`${study.label}, ${study.tool}`}
                  style={{ cursor: `url("${study.cursor}") 16 16, pointer` }}
                >
                  <span className="ag-panel__frame" style={study.fit ? { background: "#5fc5d8" } : undefined}>
                    <span className="ag-panel__media" ref={(node) => { mediaRef.current[index] = node; }}>
                      <img src={study.image} alt={study.alt} draggable="false" loading="lazy"
                        style={study.fit ? { objectFit: study.fit } : undefined} />
                    </span>
                    <span className="ag-panel__shade" aria-hidden="true" />
                  </span>
                  <span className="ag-panel__peek" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{study.label}</strong>
                  </span>
                  <span className="ag-panel__caption" ref={(node) => { captionsRef.current[index] = node; }}>
                    <span className="ag-panel__index">{String(index + 1).padStart(2, "0")} / {String(STUDIES.length).padStart(2, "0")}</span>
                    <span className="ag-panel__caption-title">{study.label}</span>
                    <span className="ag-panel__detail">{study.detail}</span>
                    <span className="ag-panel__tool">
                      <img src={study.cursor} alt="" aria-hidden="true" />
                      {study.tool}
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
