import DomeGallery from "./DomeGallery";
import { asset } from "../lib/asset";

const ARTWORKS = [
  { src: "room.jpg", title: "Tatami Room", tool: "Blender 3D", alt: "Anime-inspired Japanese interior made in Blender" },
  { src: "metro.jpg", title: "River Crossing", tool: "Blender 3D", alt: "Train crossing a river in a stylised Blender environment" },
  { src: "art/donut-render.webp", title: "Sweet Stack", tool: "Blender 3D", alt: "Stylised product food render made in Blender" },
  { src: "art/beach.webp", title: "Painted Coast", tool: "Blender 3D", alt: "Painterly coastal environment rendered in Blender" },
  { src: "art/gun.webp", title: "Plasma Blaster", tool: "Blender 3D", alt: "Emissive hard-surface prop modelled and rendered in Blender" },
  { src: "ue5-new.jpg", title: "Meadow Study", tool: "Unreal Engine 5", alt: "Soft, painterly meadow environment built in Unreal Engine 5" },
  { src: "free-drive/coastal-sunset.webp", title: "Coastal Sunset", tool: "Blender + Godot", alt: "Sunset coast environment made in Blender for Free Drive World" },
  { src: "free-drive/city-loop-dusk.webp", title: "City Loop at Dusk", tool: "Blender + Godot", alt: "Elevated city circuit environment used in Free Drive World" },
  { src: "free-drive/river-bridge.webp", title: "River Bridge", tool: "Blender + Godot", alt: "Road bridge and river environment used in Free Drive World" },
  { src: "free-drive/alpine-road.webp", title: "Alpine Pass", tool: "Blender + Godot", alt: "Mountain road through a snowy alpine environment" },
  { src: "games/pixel-adventure-platform.png", title: "First Route", tool: "Godot · in development", alt: "Platforming route from a pixel-art adventure in development" },
  { src: "games/pixel-adventure-castle.png", title: "Castle Encounter", tool: "Godot · in development", alt: "Castle and fire hazard from a pixel-art adventure in development" },
  { src: "games/pixel-adventure-bridge.png", title: "Bridge to the Village", tool: "Godot · in development", alt: "Bridge and village from a pixel-art adventure in development" },
  { src: "wallfall/shot-2.webp", title: "Wallfall · Match View", tool: "Godot + Nakama", alt: "Gameplay screenshot from Wallfall Barricade" },
  { src: "wallfall/shot-3.webp", title: "Wallfall · Online Play", tool: "Godot + Nakama", alt: "Online match screenshot from Wallfall Barricade" },
  { src: "wallfall/shot-4.webp", title: "Wallfall · Tactics", tool: "Godot + Nakama", alt: "Strategy gameplay screenshot from Wallfall Barricade" },
].map((work) => ({ ...work, src: asset(work.src) }));

export default function ArtworkGallerySection() {
  return (
    <section id="selected-work" className="selected-work-section" aria-labelledby="selected-work-title" data-scroll-guide="Selected artworks">
      <header className="selected-work-header reveal">
        <div>
          <div className="section-label">Artwork archive · 16 selected pieces</div>
          <h2 id="selected-work-title" className="section-title selected-work-title">Scenes, props<br />&amp; playable worlds.</h2>
        </div>
        <p className="selected-work-desc">
          Blender renders, real-time environments and real game captures from finished work and
          projects still taking shape. Drag to browse; click any piece to enlarge it.
        </p>
      </header>

      <div className="selected-work-gallery-wrap reveal reveal-d1">
        <div className="selected-work-gallery">
          <DomeGallery
            images={ARTWORKS.map(({ src, alt }) => ({ src, alt }))}
            fit={0.68}
            minRadius={380}
            maxRadius={680}
            padFactor={0.3}
            dragDampening={3.4}
            segments={28}
            maxVerticalRotationDeg={14}
            grayscale={false}
            overlayBlurColor="#05070a"
            imageBorderRadius="16px"
            openedImageBorderRadius="20px"
            openedImageWidth="480px"
            openedImageHeight="320px"
            autoRotate
            autoRotateSpeed={4}
          />
          <div className="dome-scan" aria-hidden="true" />
          <div className="dome-corner dome-corner-tl" aria-hidden="true" />
          <div className="dome-corner dome-corner-tr" aria-hidden="true" />
          <div className="dome-corner dome-corner-bl" aria-hidden="true" />
          <div className="dome-corner dome-corner-br" aria-hidden="true" />
          <div className="dome-hud dome-hud-tl"><span className="dome-hud-dot" />16 WORKS · 3 APPS</div>
          <div className="dome-hud dome-hud-bl">DRAG TO EXPLORE · CLICK TO ENLARGE</div>
          <div className="dome-hud dome-hud-br">AGRIMART.BLEND</div>
        </div>
      </div>

      <div className="selected-work-index" aria-label="Artwork index">
        {ARTWORKS.map((work, index) => (
          <div className="selected-work-index-item" key={work.title}>
            <span className="selected-work-index-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="selected-work-index-copy">
              <strong>{work.title}</strong>
              <span>{work.tool}</span>
            </span>
          </div>
        ))}
      </div>

      <div id="shaders" className="shader-products">
        <div className="shader-products-copy">
          <span className="section-label">Blender shader tools</span>
          <p>Try Arcane Shader and Edge Glow on the live model, or open their Gumroad pages.</p>
        </div>
        <div className="shader-product-actions">
          <a className="shader-product-link shader-product-link-primary" href="https://agrimart.gumroad.com/l/paint" target="_blank" rel="noopener noreferrer">
            Get Arcane Shader <span aria-hidden="true">↗</span>
          </a>
          <a className="shader-product-link" href="https://agrimart.gumroad.com/l/edge_glow" target="_blank" rel="noopener noreferrer">
            Get Edge Glow · Free <span aria-hidden="true">↗</span>
          </a>
          <a className="shader-workbench-link" href="#/3d">Open the interactive Blender workbench <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
